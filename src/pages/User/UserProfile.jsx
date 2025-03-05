import React, { useState, useEffect, useRef } from "react";
import { FileUpload } from "primereact/fileupload";
import { Toast } from "primereact/toast";
import { useToast } from "../../assets/utils/toastUtil";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import config from "../../config";
import UserLeftMenu from "./UserLeftMenu";

const UserProfile = () => {
  const { user, setUser } = useAuth();
  const { toast, showToast } = useToast();
  const [userImages, setUserImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [hoveredImage, setHoveredImage] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [isUploading, setIsUploading] = useState(false); // State to handle upload loader
  const [uploadProgress, setUploadProgress] = useState(0);

  const toastRef = useRef(null);
  const apiUrl = config?.apiUrl;
  const fullApiUrl = apiUrl ? `${apiUrl}makeProfilePicture` : null;

  useEffect(() => {
    if (user) {
      calculateProfileCompletion(user);
    }
  }, [user]);

  const calculateProfileCompletion = (user) => {
    let completion = 0;

    if (
      !(
        user.user_details.marital_status ||
        user.user_profile_picture ||
        user.partner_preferences.gender ||
        user.user_details.religion
      )
    ) {
      completion = 0;
    }

    if (
      user.user_details.marital_status ||
      user.user_profile_picture ||
      user.partner_preferences.gender ||
      user.user_details.religion
    ) {
      completion = 25;
    }

    if (
      (user.user_details.marital_status && user.user_profile_picture) ||
      (user.user_profile_picture && user.partner_preferences.gender) ||
      (user.partner_preferences.gender && user.user_details.religion) ||
      (user.user_details.religion && user.user_details.marital_status) ||
      (user.user_details.marital_status && user.partner_preferences.gender) ||
      (user.user_profile_picture && user.user_details.religion)
    ) {
      completion = 50;
    }

    if (
      (user.user_details.marital_status &&
        user.user_profile_picture &&
        user.partner_preferences.gender) ||
      (user.user_profile_picture &&
        user.partner_preferences.gender &&
        user.user_details.religion) ||
      (user.partner_preferences.gender &&
        user.user_details.religion &&
        user.user_details.marital_status) ||
      (user.user_details.religion &&
        user.user_details.marital_status &&
        user.user_profile_picture)
    ) {
      completion = 75;
    }
    if (
      user.user_details.marital_status &&
      user.user_profile_picture &&
      user.partner_preferences.gender &&
      user.user_details.religion
    ) {
      completion = 100;
    }

    setProfileCompletion(completion);
  };

  useEffect(() => {
    if (user) {
      const validUserImages =
        user.user_images?.filter((image) => image.file_path && image.id) || [];

      setUserImages(validUserImages);
      console.log(validUserImages, "validUserImages");
      if (user.user_profile_picture && user.user_profile_picture !== "") {
        setProfilePicture(user.user_profile_picture);
      } else if (validUserImages.length > 0) {
        setProfilePicture(validUserImages[0].file_path);
      }
    }
  }, [user]);

  if (!user) {
    return (
      <Navigate to="/login" state={{ message: "Login required" }} replace />
    );
  }

  const handleMouseEnter = (index) => setHoveredImage(index);
  const handleMouseLeave = () => setHoveredImage(null);

  const handleMakeProfilePicture = async (image) => {
    if (!fullApiUrl) {
      console.error("Invalid API URL");
      return;
    }

    try {
      const response = await fetch(fullApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id, image_id: image.id })
      });

      if (response.ok) {
        showToast("Profile picture updated");
        setProfilePicture(image.file_path);

        const updatedUser = {
          ...user,
          user_profile_picture: image.file_path
        };
        setUser(updatedUser);
      } else {
        console.error("Failed to update profile picture");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deletePicture = async (image) => {
    console.log(image);
    const deleteApiUrl = apiUrl ? `${apiUrl}deletePicture` : null;
    if (!deleteApiUrl) {
      console.error("Invalid API URL");
      return;
    }

    try {
      const response = await fetch(deleteApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id, image_id: image.id })
      });

      if (response.ok) {
        showToast("Picture deleted");

        const updatedImages = user.user_images.filter(
          (img) => img.id !== image.id
        );
        let newProfilePicture = null; // Default to null if there are no images left

        if (updatedImages.length > 0) {
          // If there are still images left, set the first image as the profile picture
          if (image.file_path === user.user_profile_picture) {
            newProfilePicture = updatedImages[0].file_path;
          } else {
            // If the deleted image wasn't the profile picture, keep the same profile picture
            newProfilePicture = user.user_profile_picture;
          }
        }

        const updatedUser = {
          ...user,
          user_images: updatedImages,
          user_profile_picture: newProfilePicture
        };

        setUser(updatedUser);
        console.log("newProfilePicture", newProfilePicture);
        setProfilePicture(newProfilePicture);
      } else {
        console.error("Failed to delete picture");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const uploadHandler = async (e) => {
    const formData = new FormData();
    const maxPhotos = 6;
    const maxFileSize = 10000000; // 10 MB limit per image
    const userImages = user?.user_images || [];

    // Check if the total number of files (existing + new) exceeds the limit
    if (e.files.length + userImages.length > maxPhotos) {
      showToast(`You can only upload a total of ${maxPhotos} photos.`, "error");
      return;
    }

    // Validate file size
    for (let file of e.files) {
      if (file.size > maxFileSize) {
        showToast(
          `File size must be less than 10 MB. File "${file.name}" is too large.`,
          "error"
        );
        return;
      }
      formData.append("files[]", file);
    }

    formData.append("user_id", user.id);

    setIsUploading(true); // Set loading to true when uploading starts

    const uploadPhotosApiUrl = apiUrl ? `${apiUrl}uploadPhotos` : null;
    if (!uploadPhotosApiUrl) {
      console.error("Invalid API URL");
      return;
    }

    // Create a new XMLHttpRequest to upload the files and track progress
    const xhr = new XMLHttpRequest();

    // Track upload progress
    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        console.log(`Upload progress: ${percent}%`);
        setUploadProgress(percent); // Update the progress state
      }
    });

    xhr.open("POST", uploadPhotosApiUrl, true);

    xhr.onload = async () => {
      if (xhr.status === 200) {
        const responseData = JSON.parse(xhr.responseText);
        console.log(responseData, "responseData");

        if (responseData.user?.user_images) {
          const existingImages = user.user_images || [];

          // Check if the profile picture exists in the new images
          const newProfilePicture = responseData.user.user_images.find(
            (image) => image.profile_picture === 1
          );

          // Filter out any existing images that are not in the response
          const newImages = responseData.user.user_images.filter(
            (newImage) =>
              !existingImages.some(
                (existingImage) => existingImage.id === newImage.id
              )
          );

          // Merge the new images with existing ones
          const updatedImages = [...existingImages, ...newImages];

          // Update the user profile picture if it exists in the response
          const updatedUser = {
            ...user,
            user_images: updatedImages,
            user_profile_picture: newProfilePicture
              ? newProfilePicture.file_path
              : user.user_profile_picture // Update the profile picture
          };

          console.log(updatedUser, "updatedUser");

          // Save the updated user to localStorage and update state globally
          localStorage.setItem("user", JSON.stringify(updatedUser));
          setUser(updatedUser); // Update the user in context

          // Set the updated profile picture in local state
          setProfilePicture(updatedUser.user_profile_picture);

          // Show a success message
          showToast("Photos uploaded successfully");
          setTimeout(hideModal, 1000);

          // Reset the progress bar after the upload completes
          setUploadProgress(0); // Reset progress to 0
          setIsUploading(false); // Hide progress bar after upload
        } else {
          console.error("User images not found in response");
        }
      } else {
        const errorResponse = JSON.parse(xhr.responseText);
        console.error("Error uploading files:", errorResponse);

        // Handle errors here and reset progress
        setUploadProgress(0);
        setIsUploading(false);
      }
    };

    xhr.onerror = (error) => {
      console.error("Upload failed:", error);
      // Reset progress and hide the progress bar in case of error
      setUploadProgress(0);
      setIsUploading(false);
    };

    // Send the form data
    xhr.send(formData);
  };

  // Function to show modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  // Function to hide modal
  const hideModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="image_upload">
        <Toast ref={toast} />
        {/* Modal */}
        {isModalOpen && (
          <div
            className="modal fade show"
            id="sendInter"
            aria-modal="true"
            role="dialog"
            style={{ display: "block" }} // Ensures it's visible when `isModalOpen` is true
          >
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content position-relative">
                {/* Modal Header */}
                <div className="modal-header ">
                  <h4 className="modal-title seninter-tit">Upload Images</h4>
                  <a
                    href="#"
                    type="button"
                    className="btn-close text-danger"
                    aria-label="Close"
                    onClick={hideModal} // Close modal when clicked
                  />
                </div>

                {/* Modal Body */}
                <div className="modal-body seninter">
                  <FileUpload
                    name="image"
                    url="/upload" // Not used since we are using customUpload
                    onUpload={() => {}} // Callback on file upload completion
                    accept="image/*" // Accept only image files
                    maxFileSize={10000000} // Increased limit to 10 MB
                    chooseLabel="Select Image"
                    auto
                    customUpload
                    uploadHandler={uploadHandler} // Custom handler for file upload
                    multiple
                    className="file-upload" // Add custom className for file upload styling
                  />

                  {/* Loader Spinner */}
                  {isUploading && (
                    <div className="loader">
                      <div className="spinner"></div>
                    </div>
                  )}

                  {/* Progress bar */}
                  {isUploading && uploadProgress > 0 && (
                    <div>
                      <div
                        className="progress-bar"
                        style={{
                          width: `${uploadProgress}%`,
                          height: "20px",
                          backgroundColor: "green"
                        }}
                      ></div>
                      <p>{uploadProgress}%</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <section>
        <div className="db">
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-lg-3">
                <UserLeftMenu />
              </div>
              <div className="col-md-8 col-lg-9">
                <div className="pr-bio-c pr-bio-gal" id="gallery">
                  <h3>Photo gallery</h3>
                  <div id="image-gallery">
                    {userImages.length > 0 ? (
                      userImages.map((image, index) => (
                        <div
                          className="pro-gal-imag"
                          key={index}
                          onMouseEnter={() => handleMouseEnter(index)}
                          onMouseLeave={handleMouseLeave}
                          onClick={() => handleMouseEnter(index)}
                        >
                          <div className="img-wrapper">
                            <a href={image.file_path}>
                              <img
                                src={image.file_path}
                                className="img-responsive"
                                alt={`Uploaded image ${index + 1}`}
                                loading="lazy"
                              />
                            </a>
                            <div
                              className="img-overlay"
                              style={{
                                opacity: hoveredImage === index ? 1 : 0,
                                cursor: "pointer"
                              }}
                            >
                              <i
                                className="fa fa-trash"
                                aria-hidden="true"
                                onClick={() => deletePicture(image)}
                              ></i>
                            </div>

                            {hoveredImage === index && (
                              <button
                                className="make-profile-btn"
                                onClick={() => handleMakeProfilePicture(image)}
                                style={{
                                  position: "absolute",
                                  bottom: "10px",
                                  left: "50%",
                                  transform: "translateX(-50%)",
                                  padding: "5px 10px",
                                  backgroundColor: "#fff",
                                  border: "1px solid #000",
                                  cursor: "pointer"
                                }}
                              >
                                Set Avatar
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="pro-gal-imag dummy_image">
                        <div className="img-wrapper">
                          <a
                            href={`${process.env.PUBLIC_URL}/matrimo/images/icon/user.png`}
                          >
                            <img
                              src={`${process.env.PUBLIC_URL}/matrimo/images/icon/user.png`}
                              className="img-responsive"
                              alt="Default profile"
                              loading="lazy"
                            />
                          </a>
                          <div className="img-overlay" style={{ opacity: "0" }}>
                            <i
                              className="fa fa-arrows-alt"
                              aria-hidden="true"
                            ></i>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12 col-lg-6 col-xl-8 db-sec-com dummy_image">
                    <h2 className="db-tit">Profiles Display Picture</h2>
                    <div className="db-profile">
                      <div className="img">
                        {profilePicture ? (
                          <img
                            src={profilePicture}
                            loading="lazy"
                            alt="Profile picture"
                          />
                        ) : (
                          <img
                            src={`${process.env.PUBLIC_URL}/matrimo/images/icon/users.svg`}
                            loading="lazy"
                            alt="Default profile"
                          />
                        )}
                      </div>
                    </div>

                    <div
                      className="edit"
                      style={{ textAlign: "right", marginTop: "10px" }}
                    >
                      <a
                        onClick={showModal}
                        className="cta-dark"
                        target="_blank"
                      >
                        <i className="fa fa-plus" aria-hidden="true"></i> Upload
                        Photos
                      </a>
                    </div>
                  </div>

                  <div className="col-md-12 col-lg-6 col-xl-4 db-sec-com">
                    <h2 className="db-tit">Profiles status</h2>
                    <div className="db-pro-stat">
                      <h6>Profile completion</h6>
                      <div className="db-pro-pgog">
                        <span>
                          <b className="count">{profileCompletion}</b>%
                        </span>
                      </div>
                      {/* <ul className="pro-stat-ic">
                        <li>
                          <span>
                            <i
                              className="fa fa-heart-o like"
                              aria-hidden="true"
                            ></i>
                            <b>0</b>Likes
                          </span>
                        </li>
                        <li>
                          <span>
                            <i
                              className="fa fa-eye view"
                              aria-hidden="true"
                            ></i>
                            <b>0</b>Views
                          </span>
                        </li>
                        <li>
                          <span>
                            <i
                              className="fa fa-handshake-o inte"
                              aria-hidden="true"
                            ></i>
                            <b>0</b>Interests
                          </span>
                        </li>
                        <li>
                          <span>
                            <i
                              className="fa fa-hand-pointer-o clic"
                              aria-hidden="true"
                            ></i>
                            <b>0</b>Clicks
                          </span>
                        </li>
                      </ul> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserProfile;
