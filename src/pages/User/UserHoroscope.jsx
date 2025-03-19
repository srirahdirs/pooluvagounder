import React, { useState, useEffect, useRef } from 'react';
import { FileUpload } from 'primereact/fileupload';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { useToast } from '../../assets/utils/toastUtil';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import config from '../../config';
import UserLeftMenu from './UserLeftMenu';

const UserHoroscope = () => {
    const { user, setUser } = useAuth();
    const { toast, showToast } = useToast();
    const [userHoroscopes, setUserHoroscopes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
    const [hoveredImage, setHoveredImage] = useState(null);
     const [isUploading, setIsUploading] = useState(false); // State to handle upload loader
      const [uploadProgress, setUploadProgress] = useState(0);
    
    const toastRef = useRef(null);
    const apiUrl = config?.apiUrl;

    useEffect(() => {
        if (user) {
            const validUserHoroscopes = user.user_horoscopes?.filter(
                horoscope => horoscope.horoscope_premium_path && horoscope.id
            ) || [];
            setUserHoroscopes(validUserHoroscopes);
        }
    }, [user]);

    if (!user) {
        return <Navigate to="/login" state={{ message: 'Login required' }} replace />;
    }

    const handleMouseEnter = (index) => setHoveredImage(index);
    const handleMouseLeave = () => setHoveredImage(null);

    const deleteHoroscope = async (horoscope) => {
        const deleteApiUrl = apiUrl ? `${apiUrl}deleteHoroscope` : null;
        if (!deleteApiUrl) {
            console.error('Invalid API URL');
            return;
        }

        try {
            const response = await fetch(deleteApiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: user.id, horoscope_id: horoscope.id }),
            });

            if (response.ok) {
                showToast('Horoscope deleted successfully');

                const updatedHoroscopes = user.user_horoscopes.filter(
                    h => h.id !== horoscope.id
                );

                const updatedUser = {
                    ...user,
                    user_horoscopes: updatedHoroscopes,
                };

                localStorage.setItem('user', JSON.stringify(updatedUser));
                setUser(updatedUser);
            } else {
                console.error('Failed to delete horoscope');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const uploadHandler = async (e) => {
        const formData = new FormData();
        const maxPhotos = 3;
        const maxFileSize = 10000000; // 10 MB limit per image
        const userHoroscopes = user?.user_horoscopes || [];
    
        // Check if the total number of files (existing + new) exceeds the limit
        if (e.files.length + userHoroscopes.length > maxPhotos) {
            showToast(`You can only upload a total of ${maxPhotos} photos.`, 'error');
            return;
        }
    
        // Validate file size
        for (let file of e.files) {
            if (file.size > maxFileSize) {
                showToast(`File size must be less than 10 MB. File "${file.name}" is too large.`, 'error');
                return;
            }
            formData.append('files[]', file);
        }
    
        formData.append('user_id', user.id);
    
        setIsUploading(true); // Set loading to true when uploading starts
        setUploadProgress(0); // Reset progress to 0 before upload
    
        try {
            const uploadHoroscopeApiUrl = apiUrl ? `${apiUrl}uploadHoroscope` : null;
            if (!uploadHoroscopeApiUrl) {
                console.error('Invalid API URL');
                return;
            }
    
            const xhr = new XMLHttpRequest();
            xhr.open('POST', uploadHoroscopeApiUrl, true);
    
            // Handle progress updates
            xhr.upload.addEventListener('progress', (event) => {
                if (event.lengthComputable) {
                    const progress = Math.round((event.loaded / event.total) * 100);
                    setUploadProgress(progress); // Update progress state
                }
            });
    
            // Handle response after upload is completed
            xhr.onload = async () => {
                if (xhr.status === 200) {
                    const responseData = JSON.parse(xhr.responseText);
    
                    if (responseData.user?.user_horoscopes) {
                        const existingHoroscopes = user.user_horoscopes || [];
    
                        const newHoroscopes = responseData.user.user_horoscopes.filter(
                            newHoroscope => !existingHoroscopes.some(
                                existingHoroscope => existingHoroscope.id === newHoroscope.id
                            )
                        );
    
                        const updatedHoroscopes = [...existingHoroscopes, ...newHoroscopes];
                        const updatedUser = {
                            ...user,
                            user_horoscopes: updatedHoroscopes,
                        };
    
                        localStorage.setItem('user', JSON.stringify(updatedUser));
                        setUser(updatedUser); // Update the user in context
                        showToast('Horoscope uploaded successfully');
                        setTimeout(hideModal, 1000);
                    } else {
                        console.error('Horoscope images not found in response');
                    }
                } else {
                    const errorResponse = JSON.parse(xhr.responseText);
                    console.error('Error uploading files:', errorResponse);
                }
    
                setIsUploading(false); // Reset the loading state after completion
            };
    
            // Handle error during upload
            xhr.onerror = () => {
                console.error('Error uploading files');
                setIsUploading(false); // Reset the loading state on error
            };
    
            xhr.send(formData);
    
        } catch (error) {
            console.error('Error uploading files:', error);
            setIsUploading(false); // Reset the loading state on error
        }
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

                <div>


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
                                        <h4 className="modal-title seninter-tit">Upload Horoscope</h4>
                                        <a
                                            href="#"
                                            type="button"
                                            className="btn-close text-danger  "
                                            aria-label="Close"
                                            onClick={hideModal} // Close modal when clicked
                                        />
                                    </div>

                                    {/* Modal Body */}
                                    <div className="modal-body seninter">
                                        <FileUpload
                                            name="image"
                                            url="/upload" // Not used since we are using customUpload
                                            onUpload={() => { }} // Callback on file upload completion
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
                                    <h3>Horoscope Gallery</h3>
                                    <div id="image-gallery">
                                        {userHoroscopes.length > 0 ? (
                                            userHoroscopes.map((horoscope, index) => (
                                                <div
                                                    className="pro-gal-imag"
                                                    key={index}
                                                    onMouseEnter={() => handleMouseEnter(index)}
                                                    onMouseLeave={handleMouseLeave}
                                                    onClick={() => handleMouseEnter(index)}
                                                >
                                                    <div className="img-wrapper">
                                                        <a href={horoscope.horoscope_premium_path}>
                                                            <img
                                                                src={horoscope.horoscope_premium_path}
                                                                className="img-responsive"
                                                                alt={`Uploaded horoscope ${index + 1}`}
                                                                loading="lazy"
                                                            />
                                                        </a>
                                                        <div
                                                            className="img-overlay"
                                                            style={{ opacity: hoveredImage === index ? 1 : 0, cursor: 'pointer' }}
                                                            
                                                            aria-label="Delete horoscope image"
                                                        >
                                                            <i className="fa fa-trash" aria-hidden="true" onClick={() => deleteHoroscope(horoscope)}></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No horoscope images found. Upload some to get started!</p>
                                        )}
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12 col-lg-6 col-xl-8 db-sec-com dummy_image">
                                        <div className="edit" style={{ textAlign: 'right', marginTop: '10px' }}>
                                            <a onClick={showModal} className="cta-dark" target="_blank">
                                                <i className="fa fa-plus" aria-hidden="true"></i> Upload Horoscope Images
                                            </a>
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

export default UserHoroscope;