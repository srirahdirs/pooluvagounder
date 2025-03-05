import React, { useState } from "react";
import UserLeftMenu from "./UserLeftMenu";
import { Toast } from "primereact/toast";
import { useToast } from '../../assets/utils/toastUtil';
import { useAuth } from '../../context/AuthContext';
import config from '../../config';

const PremiumUserBenefits = () => {
    const { toast, showToast } = useToast();
    const { user, setUser } = useAuth();
    const isPaidUser = user?.premium_user;

    const apiUrl = config?.apiUrl;
    let fullApiUrl;
    if (apiUrl) {
        fullApiUrl = apiUrl + 'updateUser';
    } else {
        console.error('Invalid API url');
    }

    const [settings, setSettings] = useState({
        mobile: user?.mobile_number_visibility === 1,
        photos: user?.photos_visibility === 1,
        horoscope: user?.horoscope_visibility === 1,
    });

    // Update settings and store them in local state
    const updateSettings = (key, value) => {
        setSettings((prevSettings) => ({
            ...prevSettings,
            [key]: value,
        }));
    };

    const handleUpdatePhotos = async (event) => {
        if (!isPaidUser) {
            showToast('You must upgrade to a premium membership to change this setting.', 'error');
            return;
        }
        const token = localStorage.getItem('authToken');
        const checked = event.target.checked;
        const payload = {
            token,
            photos_visibility: checked ? 1 : 0
        };

        try {
            const response = await fetch(fullApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                setUser(data.user);
                localStorage.setItem('user', JSON.stringify(data.user));
                showToast('Settings updated successfully!');
                updateSettings('photos', checked);
            } else {
                showToast(data?.message || 'Something went wrong!', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showToast('An error occurred while updating settings.', 'error');
        }
    };

    const handleUpdateHrc = async (event) => {
        if (!isPaidUser) {
            showToast('You must upgrade to a premium membership to change this setting.', 'error');
            return;
        }
        const token = localStorage.getItem('authToken');
        const checked = event.target.checked;
        const payload = {
            token,
            horoscope_visibility: checked ? 1 : 0
        };

        try {
            const response = await fetch(fullApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                setUser(data.user);
                localStorage.setItem('user', JSON.stringify(data.user));
                showToast('Settings updated successfully!');
                updateSettings('horoscope', checked);
            } else {
                showToast(data?.message || 'Something went wrong!', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showToast('An error occurred while updating settings.', 'error');
        }
    };

    const handleUpdateMobile = async (event) => {
        if (!isPaidUser) {
            showToast('You must upgrade to a premium membership to change this setting.', 'error');
            return;
        }
        const token = localStorage.getItem('authToken');
        const checked = event.target.checked;
        const payload = {
            token,
            mobile_number_visibility: checked ? 1 : 0
        };

        try {
            const response = await fetch(fullApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                setUser(data.user);
                localStorage.setItem('user', JSON.stringify(data.user));
                showToast('Settings updated successfully!');
                updateSettings('mobile', checked);
            } else {
                showToast(data?.message || 'Something went wrong!', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showToast('An error occurred while updating settings.', 'error');
        }
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
                            <div className="col-md-8 col-lg-9">
                                <div className="form-login">
                                    <form action="#">
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
                                                                    <input
                                                                        type="checkbox"
                                                                        name="checkbox-cats"
                                                                        id="photos"
                                                                        value="1"
                                                                        onChange={handleUpdatePhotos}
                                                                        checked={settings.photos}
                                                                    />
                                                                    <label htmlFor="photos"></label>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li className="no-border">
                                                            <div className="sett-lef">
                                                                <div className="sett-rad-left">
                                                                    <h5>Hide my horoscope from everyone</h5>
                                                                    <p>Your horoscope will be private and not visible to anyone.</p>
                                                                </div>
                                                            </div>
                                                            <div className="sett-rig">
                                                                <div className="checkboxes-and-radios">
                                                                    <input
                                                                        type="checkbox"
                                                                        name="checkbox-cats"
                                                                        id="hrc"
                                                                        value="1"
                                                                        onChange={handleUpdateHrc}
                                                                        checked={settings.horoscope}
                                                                    />
                                                                    <label htmlFor="hrc"></label>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                    {!isPaidUser && (
                                                        <>
                                                            <div className="alert alert-warning db-plan-canc">
                                                                <p>This feature is available only for paid members.</p>
                                                            </div>
                                                            <div className="text-center">
                                                                <a className="cta-dark" href="/pricing">UPGRADE</a>
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
            </section>

        </>
    );
};

export default PremiumUserBenefits;
