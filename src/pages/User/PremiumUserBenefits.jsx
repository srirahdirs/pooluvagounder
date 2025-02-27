import React, { useState } from "react";
import UserLeftMenu from "./UserLeftMenu";
import { Toast } from "primereact/toast";
import { useToast } from '../../assets/utils/toastUtil';
import { useAuth } from '../../context/AuthContext';
import config from '../../config';

const PremiumUserBenefits = () => {
    const { toast, showToast } = useToast();
    const { isLoggedIn, user } = useAuth();
    const isPaidUser = user?.premium_user;
    

    const apiUrl = config?.apiUrl;
    let fullApiUrl;
    if (apiUrl) {
        fullApiUrl = apiUrl + 'updateProfile';
    } else {
        console.error('Invalid API url');
    }

    const [settings, setSettings] = useState({
        mobile: false,
    });
    
    const handleUpdatePhotos = (event) => {
        const token = localStorage.getItem('authToken');
        const checked = event.target;
        const payload = {
            token,
            photos_visibility: checked ? 1 : 0           
        }
        console.log(payload);
    }
    const handleUpdateHrc = (event) => {
        const token = localStorage.getItem('authToken');
        const checked = event.target;
        const payload = {
            token,
            horoscope_visibility: checked ? 1 : 0
        }
        console.log(payload);
    }

    const handleUpdateMobile = async (event) => {
        const { id, checked } = event.target;

        // Set the checkbox state first
        setSettings((prevSettings) => ({
            ...prevSettings,
            [id]: checked,
        }));

        // Log the updated checkbox state to the console
        console.log(`Checkbox ${id}: ${checked ? 'Checked' : 'Unchecked'}`);

        const token = localStorage.getItem('authToken');
        const payload = {
            token,
            mobile_number_visibility: checked ? 1 : 0, // directly use `checked` value here
        };
        console.log(payload);  // Log the payload to verify the data

        try {
            const response = await fetch(fullApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload), // Send the form data as JSON
            });

            const data = await response.json();

            if (response.ok) {
                showToast('success', 'Settings updated successfully!');
            } else {
                showToast('error', data?.message || 'Something went wrong!');
            }
        } catch (error) {
            console.error('Error:', error);
            showToast('error', 'An error occurred while updating settings.');
        }
    };

    const handleUpdate = async () => {
        // Your code for other settings update goes here
    };

    return (
        <>
            <section>
                <div className="login pro-edit-update">
                    <div className="container">
                        <Toast ref={toast} />
                        <div className="row">
                            <div className="col-md-4 col-lg-3">
                                <UserLeftMenu />
                            </div>
                            <div className="inn">
                                <div className="rhs">
                                    <div className="form-login">
                                        <form action="#">
                                            {/* Basic Info */}
                                            <div className="edit-pro-parti">
                                                <div className="form-tit">
                                                    <h4 className="text-center">Premium User Benefits</h4>
                                                    <h3 className="text-center text-dark">Set your privacy benefits</h3>
                                                    <div className="fol-sett-box">
                                                        <ul>
                                                            <li>
                                                                <div className="sett-lef">
                                                                    <div className="sett-rad-left">
                                                                        <h5>Hide mobile number, allow contact via email</h5>
                                                                        <p>Your phone number is hidden, and users can only reach you by email.</p>
                                                                    </div>
                                                                </div>
                                                                <div className="sett-rig">
                                                                    <div className="checkboxes-and-radios">
                                                                        <input 
                                                                            type="checkbox" 
                                                                            name="checkbox-cats" 
                                                                            id="mobile" 
                                                                            value="1" 
                                                                            onChange={handleUpdateMobile} 
                                                                            checked={settings.mobile} 
                                                                        />
                                                                        <label htmlFor="mobile"></label>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="sett-lef">
                                                                    <div className="sett-rad-left">
                                                                        <h5>Hide my photos from everyone</h5>
                                                                        <p>Your photos will be private and not visible to anyone.</p>
                                                                    </div>
                                                                </div>
                                                                <div className="sett-rig">
                                                                    <div className="checkboxes-and-radios">
                                                                        <input type="checkbox" name="checkbox-cats" id="photos" value="1" onChange={handleUpdatePhotos} checked={settings.photos} />
                                                                        <label htmlFor="photos"></label>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            {/* Horoscope privacy */}
                                                            <li className="no-border">
                                                                <div className="sett-lef">
                                                                    <div className="sett-rad-left">
                                                                        <h5>Hide my horoscope from everyone</h5>
                                                                        <p>Your horoscope will be private and not visible to anyone.</p>
                                                                    </div>
                                                                </div>
                                                                <div className="sett-rig">
                                                                    <div className="checkboxes-and-radios">
                                                                        <input type="checkbox" name="checkbox-cats" id="hrc" value="1" onChange={handleUpdateHrc} checked={settings.hrc} />
                                                                        <label htmlFor="hrc"></label>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                        {/* {isPaidUser && (
                                                            <div className="text-center">
                                                                <a className="cta-dark" onClick={handleSubmit}>Save</a>
                                                            </div>
                                                        )} */}
                                                        {!isPaidUser && (
                                                            <>
                                                                <div className="alert alert-warning db-plan-canc">
                                                                    <p>This feature is available only for paid members.</p>
                                                                </div>
                                                                <div className="text-center">
                                                                    <a className="cta-dark">UPGRADE</a>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
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

export default PremiumUserBenefits;
