import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import config from '../config';
import CryptoJS from 'crypto-js';

const ProfileDetails = () => {

  const [user_details, setUserDetails] = useState('');

  const apiUrl = config?.apiUrl;
  let fullApiUrl;
  if (apiUrl) {
    fullApiUrl = apiUrl + 'getUserDetails';
  } else {
    console.error('Invalid API url');
  }

  const secretKey = config?.cryptoSecretKey;
  const { id } = useParams();  // This will give you the encrypted user ID

  console.log(id, 'Encrypted User ID');

  if (!id) {
    console.error("Encrypted user ID is undefined!");
  }

  const bytes = CryptoJS.AES.decrypt(decodeURIComponent(id), secretKey);
  const userId = bytes.toString(CryptoJS.enc.Utf8);

  console.log(userId, 'Decrypted User ID');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(fullApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: userId }),
        });

        if (response.ok) {
          const user_details = await response.json();
          setUserDetails(user_details.user);
          console.log(user_details);
        } else {
          console.error('Failed to fetch user_details data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();

    // Cleanup function (if any cleanup is required for external resources)
    return () => {
      // If you're using libraries like sliders or modals, you can destroy them here.
      // Example: If you're using a jQuery-based library that requires `.destroy()`, call it here.
      // SomeComponentInstance?.destroy();
    };
  }, [userId]);
  const image = user_details.gender === 'Male' ? 'user_default_boy.png' : 'user_default_girl.png';
  return (
    <>
      <section>
        <div className="profi-pg profi-ban">
          <div className="">
            <div className="">
              <div className="profile">
                <div className="pg-pro-big-im">
                  <div className="s1">
                    {/* Replace with dynamic profile picture */}
                    <img
                      src={user_details.user_profile_picture || `${process.env.PUBLIC_URL}/matrimo/images/${image}`}
                      loading="lazy"
                      className="pro"
                      alt={user_details.name}
                    />
                  </div>
                  <div className="s3">
                    <a href="#!" className="cta fol cta-chat">Chat now</a>
                    <span className="cta cta-sendint" data-toggle="modal" data-target="#sendInter">Send interest</span>
                  </div>
                </div>
              </div>
              <div className="profi-pg profi-bio">
                <div className="lhs">
                  <div className="pro-pg-intro">
                    <h1>{user_details.name}</h1>
                    <div className="pro-info-status">
                      <span className="stat-1"><b>0</b> viewers</span>
                      <span className="stat-2"><b>Available</b></span>
                    </div>
                    <ul>
                      <li>
                        <div>
                          <img src={`${process.env.PUBLIC_URL}/matrimo/images/icon/pro-city.png`} loading="lazy" alt="City Icon" />
                          <span>City: <strong style={{ color: 'inherit' }}>{user_details.city || "Not specified"}</strong></span>
                        </div>
                      </li>
                      <li>
                        <div>
                          <img src={`${process.env.PUBLIC_URL}/matrimo/images/icon/pro-age.png`} loading="lazy" alt="Age Icon" />
                          <span>Age: <strong style={{ color: 'inherit' }}>{user_details.age || "Not specified"}</strong></span>
                        </div>
                      </li>
                      <li>
                        <div>
                          <img src={`${process.env.PUBLIC_URL}/matrimo/images/icon/height_icon_transparent.png`} loading="lazy" alt="Height Icon" />
                          <span>Height: <strong style={{ color: 'inherit' }}>{user_details.height || "Not specified"}</strong></span>
                        </div>
                      </li>
                      <li>
                        <div>
                          <img src={`${process.env.PUBLIC_URL}/matrimo/images/icon/job.png`} loading="lazy" alt="Job Icon" />
                          <span>Job: <strong style={{ color: 'inherit' }}>{user_details.job_type || "Not specified"}</strong></span>
                        </div>
                      </li>

                    </ul>
                  </div>
                  <div className="pr-bio-c pr-bio-abo">
                    <h3>About</h3>
                    <p style={{ color: 'inherit' }}>{user_details.about || "Not specified"}</p>
                  </div>
                  <div className="pr-bio-c pr-bio-gal" id="gallery">
                    <h3>Photo gallery</h3>
                    <div id="image-gallery">
                      {user_details.user_images && user_details.user_images.length > 0 ? (
                        user_details.user_images.map(image => (
                          <div className="pro-gal-imag" key={image.image_id}>
                            <div className="img-wrapper">
                              <a href="#!">
                                <img src={image.file_path} className="img-responsive" alt={`User image ${image.image_id}`} />
                              </a>
                              <div className="img-overlay">
                                <i className="fa fa-arrows-alt" aria-hidden="true"></i>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p style={{ color: 'inherit' }}>No images available</p>
                      )}
                    </div>
                  </div>

                  {/* The rest of the sections remain the same */}
                  <div className="pr-bio-c pr-bio-conta">
                    <h3>Contact info</h3>
                    {user_details.paid ? (
                      <ul>
                        <li>
                          <span>
                            <i className="fa fa-mobile" aria-hidden="true"></i>
                            <b>Phone:</b> {user_details.phone || "Not specified"}
                          </span>
                        </li>
                        <li>
                          <span>
                            <i className="fa fa-envelope-o" aria-hidden="true"></i>
                            <b>Email:</b> {user_details.email}
                          </span>
                        </li>
                        <li>
                          <span>
                            <i className="fa fa-map-marker" aria-hidden="true"></i>
                            <b>Address:</b> {user_details.address || "Not specified"}
                          </span>
                        </li>
                      </ul>
                    ) : (
                      <div className="">
                        <p>Contact details are available for paid members only. Please make payment to view contact details.</p>
                        <button className="purchase-plan-btn">
                          Buy Plan
                        </button>
                      </div>
                    )}
                  </div>


                  {/* Other sections go here */}

                  <div className="pr-bio-c pr-bio-info">
                    <h3>Personal information</h3>
                    <ul>
                      <li><b>Name:</b> {user_details.name || "Not specified"}</li>
                      <li><b>Father's name:</b> {user_details.fathers_name || "Not specified"}</li>
                      <li><b>Mother's name:</b> {user_details.mothers_name || "Not specified"}</li>
                      <li><b>Age:</b> {user_details.age || "Not specified"}</li>
                      <li>
                        <b>Date of birth:</b>
                        {user_details.dob
                          ? new Date(user_details.dob).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',  // Formats month as "December"
                            day: 'numeric'  // Formats day as "12"
                          })
                          : "Not specified"}
                      </li>

                      <li><b style={{ color: 'inherit' }}>Height:</b>{user_details.height || "Not specified"}</li>
                      <li><b>Weight:</b>{user_details.weight || "Not specified"}</li>
                      <li><b>Degree:</b> {user_details.degree || "Not specified"}</li>
                      <li><b>Profession:</b> {user_details.job_type || "Not specified"}</li>
                      <li><b>Company:</b> {user_details.company_name || "Not specified"}</li>
                      <li><b>Position:</b> {user_details.total_experience || "Not specified"}</li>
                      <li><b>Salary:</b> {user_details.salary || "Not specified"}</li>
                    </ul>
                  </div>
                  <div className="pr-bio-c pr-bio-info">
                    <h3>Religion & Caste Information</h3>
                    <ul>
                      <li><b>Religion:</b> <span>{user_details.religion || "Not specified"}</span></li>
                      <li><b>Caste:</b> {user_details.caste || "Not specified"}</li>
                      <li><b>Sub Caste:</b> {user_details.sub_caste || "Not specified"}</li>
                      <li><b>Gothram:</b> {user_details.gothram || "Not specified"}</li>
                      <li><b>Dosam:</b> {user_details.dosam || "Not specified"}</li>
                      <li><b>Star:</b> {user_details.star || "Not specified"}</li>
                      <li><b>Raasi:</b> {user_details.raasi || "Not specified"}</li>
                    </ul>
                  </div>

                  <div className="pr-bio-c pr-bio-hob">
                    <h3>Other Details</h3>
                    <ul>
                      <li>
                        <span>
                          Willing to marry from another caste:{" "}
                          <b>{user_details.willing_to_marry_from_another_caste === 1 ? "Yes" : "No"}</b>
                        </span>

                      </li>
                    </ul>
                  </div>

                  <div className="pr-bio-c menu-pop-soci pr-bio-soc">
                    <h3>Social media</h3>
                    <ul>
                      <li><a href={user_details.facebook ? user_details.facebook : "#"} target='_blank'><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                      <li><a href={user_details.twitter ? user_details.twitter : "#"} target='_blank'><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                      <li><a href={user_details.whatsapp ? user_details.whatsapp : "#"} target='_blank'><i className="fa fa-whatsapp" aria-hidden="true"></i></a></li>
                      <li><a href={user_details.linkedin ? user_details.linkedin : "#"} target='_blank'><i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
                      <li><a href={user_details.youtube ? user_details.youtube : "#"} target='_blank'><i className="fa fa-youtube-play" aria-hidden="true"></i></a></li>
                      <li><a href={user_details.instagram ? user_details.instagram : "#"} target='_blank'><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
                    </ul>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>




      </section>



    </>
  )
}

export default ProfileDetails