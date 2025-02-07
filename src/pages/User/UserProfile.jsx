import React, { useState, useEffect } from 'react';
import { FileUpload } from 'primereact/fileupload';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { useToast } from '../../assets/utils/toastUtil';
import { useAuth } from '../../context/AuthContext'
import { Navigate } from 'react-router-dom';
import config from '../../config';

const UserProfile = () => {

    const { user, setUser } = useAuth();
    const { toast, showToast } = useToast();
    const [userImages, setUserImages] = useState([]);
    const [visible, setVisible] = useState(false);
    const [hoveredImage, setHoveredImage] = useState(null); // Track which image is hovered
    const [profilePicture, setProfilePicture] = useState(null);

    const apiUrl = config?.apiUrl;
    let fullApiUrl;
    if (apiUrl) {
        fullApiUrl = apiUrl + 'makeProfilePicture';
    } else {
        console.error('Invalid API url');
    }

    useEffect(() => {
        console.log(user);
        if (user && user.user_images && user.user_images.length > 0) {
            const validUserImages = user.user_images.filter(image => image.file_path && image.image_id);
            if (validUserImages.length > 0) {
                setUserImages(validUserImages);
            }
            if (user && user.user_profile_picture) {
                setProfilePicture(user.user_profile_picture); // Explicitly set profile picture here
            }
        }
    }, [user, setUser]);

    if (!user) {
        return <Navigate to="/login" state={{ message: 'Login required' }} replace />;
    }



    const handleMouseEnter = (index) => {
        setHoveredImage(index);
    };

    // Function to handle mouse leave
    const handleMouseLeave = () => {
        setHoveredImage(null);
    };

    // Function to call API and set profile picture
    const handleMakeProfilePicture = async (image) => {
        try {
            const response = await fetch(fullApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id: user.id, image_id: image.image_id }),
            });

            if (response.ok) {
                const result = await response.json();
                showToast('Profile picture updated');

                // Set the new profile picture in the UI
                setProfilePicture(image.file_path);

                // Update the user object in AuthContext with the new profile picture
                const updatedUser = {
                    ...user,
                    user_profile_picture: image.file_path, // Update this field with the new profile picture
                };

                setUser(updatedUser); // Update the user in the AuthContext

                console.log('Profile picture updated:', image.file_path);

            } else {
                console.error('Failed to update profile picture');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const deletePicture = async (image) => {
        try {
            const deleteApiUrl = apiUrl + 'deletePicture';
            const response = await fetch(deleteApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id: user.id, image_id: image.image_id }),
            });

            if (response.ok) {
                showToast('Picture deleted');

                // Remove the deleted picture from user_images
                const updatedImages = user.user_images.filter(img => img.image_id !== image.image_id);

                // If the deleted image was the profile picture, handle setting a new profile picture
                let newProfilePicture = user.user_profile_picture;
                if (image.file_path === user.user_profile_picture) {
                    newProfilePicture = updatedImages.length > 0 ? updatedImages[0].file_path : null;
                }

                // Update the user object with the new images and profile picture
                const updatedUser = {
                    ...user,
                    user_images: updatedImages,             // Update the images array
                    user_profile_picture: newProfilePicture // Update the profile picture
                };

                setUser(updatedUser); // Update the user in the AuthContext
                setProfilePicture(newProfilePicture); // Update the profile picture in the UI

            } else {
                console.error('Failed to delete picture');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };



    // State to toggle modal visibility




    const onUpload = (e) => {


        // setUploadedFiles(e.files);  // Update the state with uploaded files
    };

    const showModal = () => {
        setVisible(true);
    };
    const hideModal = () => {
        setVisible(false);
    };
    const uploadHandler = async (e) => {
        const formData = new FormData();
        e.files.forEach((file) => {
            formData.append('files[]', file);
        });
        formData.append("user_id", user.id);

        try {
            const uploadPhotosApiUrl = apiUrl + 'uploadPhotos';
            const response = await fetch(uploadPhotosApiUrl, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('Response Data:', responseData);

                if (responseData.user && Array.isArray(responseData.user.user_images)) {
                    // Ensure user.user_images is an array before mapping
                    const existingImages = (user.user_images || [])
                        .filter(image => image.image_id !== null && image.file_path !== null)  // Remove null values
                        .map(image => ({
                            image_id: image.image_id,
                            file_path: image.file_path,
                        }));

                    console.log('Existing Images:', existingImages);
                    console.log('New Images from response:', responseData.user.user_images);

                    // Merge new images from the response, avoiding duplicates based on image_id
                    const updatedImages = [
                        ...existingImages, // Keep the existing images
                        ...responseData.user.user_images.filter(newImage =>
                            !existingImages.some(existingImage => existingImage.image_id === newImage.image_id)
                        ).map(image => ({
                            image_id: image.image_id,
                            file_path: image.file_path,
                        }))
                    ];

                    console.log('Updated Images (no duplicates):', updatedImages);

                    // Update the user object with the new images (including image_id and file_path)
                    const updatedUser = {
                        ...user,
                        user_images: updatedImages,
                    };

                    // Store updated user object in localStorage
                    localStorage.setItem('user', JSON.stringify(updatedUser));

                    // Update the state with the new images
                    setUserImages(updatedImages);

                    console.log('User Images after setUserImages:', updatedImages);
                    showToast('Photos uploaded successfully');

                    setTimeout(() => {
                        hideModal();
                    }, 2000);
                } else {
                    console.error('User images not found in response');
                }
            } else {
                console.error('Error uploading files');
            }







        } catch (error) {
            console.error('Error uploading files:', error);
        }
    };



    return (
        <>
            <div className="image_upload">
                <Toast ref={toast} />
                <Dialog
                    header="Upload Image"
                    visible={visible}
                    style={{ width: '50vw' }}
                    onHide={hideModal}
                    modal
                    className="custom-dialog"
                >
                    <div className="card">
                        <FileUpload
                            name="image"
                            url="/upload"  // Not used since we are using customUpload
                            onUpload={onUpload}  // Callback on file upload completion
                            accept="image/*"  // Accept only image files
                            maxFileSize={1000000}  // Optional: limit file size (1MB in this case)
                            chooseLabel="Select Image"
                            auto
                            customUpload
                            uploadHandler={uploadHandler}  // Custom handler for file upload
                            multiple
                            className="file-upload"  // Add custom className for file upload styling
                        />

                    </div>
                </Dialog>

            </div>
            <section>
                <div className="db">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 col-lg-3">
                                <div className="db-nav">
                                    <div className="db-nav-pro">
                                        {profilePicture ? (
                                            <img
                                                src={`${profilePicture}`}
                                                loading="lazy"
                                                alt="Profile picture"
                                                className='image-fluid'
                                            />
                                        ) : (
                                            // Display default image if no profile picture is available
                                            <img
                                                src={`${process.env.PUBLIC_URL}/matrimo/images/icon/users.svg`}
                                                loading="lazy"
                                                alt="Default profile"
                                                className='image-fluid'
                                            />
                                        )}
                                    </div>
                                    <div className="db-nav-list">
                                        <ul>
                                            <li>
                                                <a href="/home">
                                                    <i className="fa fa-tachometer" aria-hidden="true"></i>Dashboard
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/edituserprofile" className="act">
                                                    <i className="fa fa-male" aria-hidden="true"></i>Profile
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/partnerpreferences">
                                                    <i className="fa fa-handshake-o" aria-hidden="true"></i>Partner Preferences
                                                </a>
                                            </li>
                                            <li>
                                                <a href="user-chat.html">
                                                    <i className="fa fa-commenting-o" aria-hidden="true"></i>Chat list
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/pricing">
                                                    <i className="fa fa-money" aria-hidden="true"></i>Plan
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/edituserprofile">
                                                    <i className="fa fa-cog" aria-hidden="true"></i>Edit profile
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="fa fa-sign-out" aria-hidden="true"></i>Log out
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
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
                                                            style={{ opacity: hoveredImage === index ? 1 : 0, cursor: 'pointer' }}
                                                            onClick={() => deletePicture(image)}  // Add the onClick handler here
                                                        >
                                                            <i className="fa fa-trash" aria-hidden="true"></i>
                                                        </div>

                                                        {hoveredImage === index && (
                                                            <button
                                                                className="make-profile-btn"
                                                                onClick={() => handleMakeProfilePicture(image)}
                                                                style={{
                                                                    position: 'absolute',
                                                                    bottom: '10px',
                                                                    left: '50%',
                                                                    transform: 'translateX(-50%)',
                                                                    padding: '5px 10px',
                                                                    backgroundColor: '#fff',
                                                                    border: '1px solid #000',
                                                                    cursor: 'pointer',
                                                                }}
                                                            >
                                                                Set Avatar
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            ))
                                        ) : (

                                            // Default images if no user images are available
                                            <>
                                                <div className="pro-gal-imag dummy_image">
                                                    <div className="img-wrapper">
                                                        <a href={`${process.env.PUBLIC_URL}/matrimo/images/icon/user.png`}>
                                                            <img
                                                                src={`${process.env.PUBLIC_URL}/matrimo/images/icon/user.png`}
                                                                className="img-responsive"
                                                                alt="Default profile 1"
                                                                loading="lazy"
                                                            />
                                                        </a>
                                                        <div className="img-overlay" style={{ opacity: '0' }}>
                                                            <i className="fa fa-arrows-alt" aria-hidden="true"></i>
                                                        </div>
                                                    </div>
                                                </div>

                                            </>
                                        )}
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col-md-12 col-lg-6 col-xl-8 db-sec-com dummy_image">

                                        <h2 className="db-tit">Profiles Display Picture</h2>

                                        <div className="db-profile ">
                                            <div className="img">
                                                {profilePicture ? (
                                                    <img
                                                        src={`${profilePicture}`}
                                                        loading="lazy"
                                                        alt="Profile picture"
                                                    />
                                                ) : (
                                                    // Display default image if no profile picture is available
                                                    <img
                                                        src={`${process.env.PUBLIC_URL}/matrimo/images/icon/users.svg`}
                                                        loading="lazy"
                                                        alt="Default profile"
                                                    />
                                                )}
                                            </div>

                                        </div>

                                        <div className="edit" style={{ textAlign: 'right', marginTop: '10px' }}>
                                            <a onClick={showModal} className="cta-dark" target="_blank">
                                                <i className="fa fa-plus" aria-hidden="true"></i> Upload Photos
                                            </a>
                                        </div>
                                    </div>

                                    <div className="col-md-12 col-lg-6 col-xl-4 db-sec-com">
                                        <h2 className="db-tit">Profiles status</h2>
                                        <div className="db-pro-stat">
                                            <h6>Profile completion</h6>
                                            {/* <div className="dropdown">
                                                <button type="button" className="btn btn-outline-secondary" data-bs-toggle="dropdown">
                                                    <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
                                                </button>
                                                <ul className="dropdown-menu">
                                                    <li>
                                                        <a className="dropdown-item" href="/edituserprofile">Edit profile</a>
                                                    </li>
                                                    <li>
                                                        <a className="dropdown-item" href="#">View profile</a>
                                                    </li>
                                                    <li>
                                                        <a className="dropdown-item" href="#">Profile visibility settings</a>
                                                    </li>
                                                </ul>
                                            </div> */}
                                            <div className="db-pro-pgog">
                                                <span>
                                                    <b className="count">0</b>%
                                                </span>
                                            </div>
                                            <ul className="pro-stat-ic">
                                                <li>
                                                    <span>
                                                        <i className="fa fa-heart-o like" aria-hidden="true"></i>
                                                        <b>0</b>Likes
                                                    </span>
                                                </li>
                                                <li>
                                                    <span>
                                                        <i className="fa fa-eye view" aria-hidden="true"></i>
                                                        <b>0</b>Views
                                                    </span>
                                                </li>
                                                <li>
                                                    <span>
                                                        <i className="fa fa-handshake-o inte" aria-hidden="true"></i>
                                                        <b>0</b>Interests
                                                    </span>
                                                </li>
                                                <li>
                                                    <span>
                                                        <i className="fa fa-hand-pointer-o clic" aria-hidden="true"></i>
                                                        <b>0</b>Clicks
                                                    </span>
                                                </li>
                                            </ul>

                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div >

            </section >
        </>
    )
}

export default UserProfile