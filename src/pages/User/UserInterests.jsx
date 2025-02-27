import React, { useState, useEffect, useRef } from 'react';
import config from '../../config'
import { Toast } from 'primereact/toast';
import { useToast } from '../../assets/utils/toastUtil';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import UserLeftMenu from './UserLeftMenu';

const UserInterests = () => {
    const { user, setUser } = useAuth();
    const { toast, showToast } = useToast();
    const [sentInterests, setSentInterests] = useState([]);



    const fetchSentInterests = async () => {
        if (apiUrl) {
            const fullApiUrl = `${apiUrl}getSentInterests/${user.id}`;
            try {
                const response = await fetch(fullApiUrl);
                const data = await response.json();
                if (response.ok) {
                    setSentInterests(data); // Set the sent interests
                } else {
                    console.error('Failed to fetch sent interests');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };
    useEffect(() => {
        fetchSentInterests(); // Fetch sent interests on component mount
    }, []);


    if (!user) {
        return <Navigate to="/login" state={{ message: 'Login required' }} replace />;
    }
    const apiUrl = config?.apiUrl;
    let fullApiUrl;
    if (apiUrl) {
        fullApiUrl = apiUrl + 'search';
    } else {
        console.error('Invalid API URL');
    }


    return (
        <>
            <section>
                <Toast ref={toast} />
                <div className="db">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 col-lg-3">
                                <UserLeftMenu />
                            </div>
                            <div class="col-md-8 col-lg-9">
                                <div class="row">
                                    <div class="col-md-12 db-sec-com">

                                        <div class="db-pro-stat">
                                            <div class="dropdown">
                                                <h2 class="db-tit">Interest requests</h2>
                                            </div>
                                            <div class="db-inte-main">

                                                <ul class="nav nav-tabs" role="tablist">
                                                    <li class="nav-item">
                                                        <a class="nav-link active" data-bs-toggle="tab" href="#home">New requests</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link" data-bs-toggle="tab" href="#menu1">Accepted requests</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link" data-bs-toggle="tab" href="#menu2">Declined requests</a>
                                                    </li>
                                                </ul>

                                                <div class="tab-content">
                                                    <div id="home" class="container tab-pane active"><br />
                                                        <div class="db-inte-prof-list">
                                                            <ul>
                                                                <li>
                                                                    <div class="db-int-pro-1"> <img src="images/profiles/men1.jpg" alt="" /> <span class="badge bg-primary user-pla-pat">Platinum user</span></div>
                                                                    <div class="db-int-pro-2">
                                                                        <h5>John Smith</h5>
                                                                        <ol class="poi">
                                                                            <li>City: <strong>Illunois</strong></li>
                                                                            <li>Age: <strong>21</strong></li>
                                                                            <li>Height: <strong>5.7</strong></li>
                                                                            <li>Job: <strong>Working</strong></li>
                                                                        </ol>
                                                                        <ol class="poi poi-date">
                                                                            <li>Request on: 10:30 AM, 18 August 2024</li>
                                                                        </ol>
                                                                        <a href="profile-details.html" class="cta-5" target="_blank">View full profile</a>
                                                                    </div>
                                                                    <div class="db-int-pro-3">
                                                                        <button type="button" class="btn btn-success btn-sm">Accept</button>
                                                                        <button type="button" class="btn btn-outline-danger btn-sm">Denay</button>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div id="menu1" class="container tab-pane fade"><br />
                                                        <div class="db-inte-prof-list">
                                                            <ul>
                                                                <li>
                                                                    <div class="db-int-pro-1"> <img src="images/profiles/men5.jpg" alt="" /> </div>
                                                                    <div class="db-int-pro-2">
                                                                        <h5>John Smith</h5>
                                                                        <ol class="poi">
                                                                            <li>City: <strong>Illunois</strong></li>
                                                                            <li>Age: <strong>21</strong></li>
                                                                            <li>Height: <strong>5.7</strong></li>
                                                                            <li>Job: <strong>Working</strong></li>
                                                                        </ol>
                                                                        <ol class="poi poi-date">
                                                                            <li>Request on: 10:30 AM, 18 August 2024</li>
                                                                            <li>Accept on: 3:000 PM, 21 August 2024</li>
                                                                        </ol>
                                                                        <a href="profile-details.html" class="cta-5" target="_blank">View full profile</a>
                                                                    </div>
                                                                    <div class="db-int-pro-3">
                                                                        <button type="button" class="btn btn-outline-danger btn-sm">Denay</button>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div id="menu2" class="container tab-pane fade"><br />
                                                        <div class="db-inte-prof-list">
                                                            <ul>
                                                                <li>
                                                                    <div class="db-int-pro-1"> <img src="images/profiles/men1.jpg" alt="" /> </div>
                                                                    <div class="db-int-pro-2">
                                                                        <h5>John Smith</h5>
                                                                        <ol class="poi">
                                                                            <li>City: <strong>Illunois</strong></li>
                                                                            <li>Age: <strong>21</strong></li>
                                                                            <li>Height: <strong>5.7</strong></li>
                                                                            <li>Job: <strong>Working</strong></li>
                                                                        </ol>
                                                                        <ol class="poi poi-date">
                                                                            <li>Request on: 10:30 AM, 18 August 2024</li>
                                                                            <li>Denay on: 3:000 PM, 21 August 2024</li>
                                                                        </ol>
                                                                        <a href="profile-details.html" class="cta-5" target="_blank">View full profile</a>
                                                                    </div>
                                                                    <div class="db-int-pro-3">
                                                                        <button type="button" class="btn btn-success btn-sm">Accept</button>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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

export default UserInterests;