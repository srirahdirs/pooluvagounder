import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import config from '../config';
import { useToast } from '../assets/utils/toastUtil';
import { Toast } from 'primereact/toast';


const ProfileDetails = () => {
  const [user, setUser] = useState('');
  const [userDetails, setUserDetails] = useState('');
  const [userImages, setUserImages] = useState([]);
  const [userHoroscopes, setUserHoroscopes] = useState([]);
  const [userProfilePicture, setUserProfilePicture] = useState('');
  const [loading, setLoading] = useState(true); // State for loading
  const [hasAccess, setHasAccess] = useState(true); // State for access control
  const { toast, showToast } = useToast();
  const apiUrl = config?.apiUrl;
  const navigate = useNavigate();
  let fullApiUrl;

  if (apiUrl) {
    fullApiUrl = apiUrl + 'getUserDetails';
  } else {
    console.error('Invalid API URL');
  }
  const { id } = useParams();  // This will give you the encrypted user ID

  if (!id) {
    console.error("Encrypted user ID is undefined!");
  }


  const userId = atob(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(fullApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: userId, token: token }),
        });

        if (response.ok) {
          const getuserdetails = await response.json();
          console.log(getuserdetails, 'getuserdetails');

          setUser(getuserdetails.user);
          setUserDetails(getuserdetails.user?.user_details);
          setUserImages(getuserdetails.user.user_images);
          setUserHoroscopes(getuserdetails.user.user_horoscopes);
          setUserProfilePicture(getuserdetails.user?.user_profile_picture);
        } else {
          if (response.status === 401) {
            setHasAccess(false);
            showToast("Authentication token is required", 'error');
            setTimeout(() => {
              navigate('/allprofiles');
            }, 2000);
          } else if (response.status === 402) {
            setHasAccess(false);  // Block access
            showToast("Please purchase a plan to view user details", 'error');
            setTimeout(() => {
              navigate('/allprofiles');
            }, 3000);
          } else {
            showToast("Please try again!", 'error');
          }
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return <p>Loading...</p>;  // You can customize the loading indicator as needed
  }

  if (!hasAccess) {
    return (
      <div style={{
        backgroundColor: '#f8d7da',
        color: '#721c24',
        padding: '10px',
        borderRadius: '5px',
        textAlign: 'center',
        margin: '20px 0'
      }}>
        <strong>Access Restricted</strong>
        <p className='mt-2'>You do not have permission to view this page.</p>
        <p>Please purchase a <a href='/pricing'>PLAN</a> to view user details.</p>
      </div>
    );
  }

  const image = userDetails.gender === 'Male' ? 'user_default_boy.png' : 'user_default_girl.png';
  return (
    <>
      <section>
        <Toast ref={toast} />
        <div className="profi-pg profi-ban">
          <div className="">
            <div className="">
              <div className="profile">
                <div className="pg-pro-big-im">
                  <div className="s1">
                    {/* Replace with dynamic profile picture */}
                    <img
                      src={userProfilePicture || `${process.env.PUBLIC_URL}/matrimo/images/${image}`}
                      loading="lazy"
                      className="pro"
                      alt={user?.name}
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
                    <h1>{user?.name}</h1>
                    <div className="pro-info-status">
                      {/* <span className="stat-1"><b>0</b> viewers</span> */}
                      <span className="stat-2"><b>Available</b></span>
                    </div>
                    <ul>
                      <li>
                        <div>
                          <img src={`${process.env.PUBLIC_URL}/matrimo/images/icon/pro-city.png`} loading="lazy" alt="City Icon" />
                          <span>State: <strong style={{ color: 'inherit' }}>{userDetails.state || "Not specified"}</strong></span>
                        </div>
                      </li>
                      <li>
                        <div>
                          <img src={`${process.env.PUBLIC_URL}/matrimo/images/icon/pro-city.png`} loading="lazy" alt="City Icon" />
                          <span>City: <strong style={{ color: 'inherit' }}>{userDetails.city || "Not specified"}</strong></span>
                        </div>
                      </li>
                      <li>
                        <div>
                          <img src={`${process.env.PUBLIC_URL}/matrimo/images/icon/pro-age.png`} loading="lazy" alt="Age Icon" />
                          <span>Age: <strong style={{ color: 'inherit' }}>{userDetails.age || "Not specified"}</strong></span>
                        </div>
                      </li>
                      {/* <li>
                        <div>
                          <img src={`${process.env.PUBLIC_URL}/matrimo/images/icon/height_icon_transparent.png`} loading="lazy" alt="Height Icon" />
                          <span>Height: <strong style={{ color: 'inherit' }}>{userDetails.height || "Not specified"}</strong></span>
                        </div>
                      </li> */}
                      <li>
                        <div>
                          <img src={`${process.env.PUBLIC_URL}/matrimo/images/icon/job.png`} loading="lazy" alt="Job Icon" />
                          <span>Job: <strong style={{ color: 'inherit' }}>{userDetails.job_type || "Not specified"}</strong></span>
                        </div>
                      </li>

                    </ul>
                  </div>
                  <div className="pr-bio-c pr-bio-abo">
                    <h3>About</h3>
                    <p style={{ color: 'inherit' }}>{userDetails.about || "Not specified"}</p>
                  </div>
                  <div className="pr-bio-c pr-bio-gal" id="gallery">
                    <h3>Photo gallery</h3>
                    <div id="image-gallery">
                      {userImages && userImages.length > 0 && user?.photos_visibility === 0 ? (
                        userImages.map(image => (
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
                        <p style={{ color: 'inherit' }}> {user?.photos_visibility === 1 ? 'Photos are locked by the user.' : 'No images available'}</p>
                      )}
                    </div>
                  </div>

                  {/* The rest of the sections remain the same */}
                  <div className="pr-bio-c pr-bio-conta">
                    <h3>Contact info</h3>

                    <ul>
                      <li>
                        <span>
                          <i className="fa fa-mobile" aria-hidden="true"></i>
                          <b>Phone:</b> {user?.mobile_number_visibility === 1 ? "Phone number is hidden" : (user.phone || "Phone number not specified")}
                        </span>
                      </li>
                      <li>
                        <span>
                          <i className="fa fa-envelope-o" aria-hidden="true"></i>
                          <b>Email:</b> {user.email}
                        </span>
                      </li>
                      <li>
                        <span>
                          <i className="fa fa-map-marker" aria-hidden="true"></i>
                          <b>Address:</b> {userDetails.address || "Not specified"}
                        </span>
                      </li>
                    </ul>

                  </div>


                  {/* Other sections go here */}

                  <div className="pr-bio-c pr-bio-info">
                    <h3>Personal information</h3>
                    <ul>
                      <li><b>Name:</b> {user?.name || "Not specified"}</li>
                      <li><b>Father's name:</b> {userDetails.fathers_name || "Not specified"}</li>
                      <li><b>Mother's name:</b> {userDetails.mothers_name || "Not specified"}</li>
                      <li><b>Age:</b> {userDetails.age || "Not specified"}</li>
                      <li>
                        <b>Date of birth:</b>
                        {userDetails.dob
                          ? new Date(userDetails.dob).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',  // Formats month as "December"
                            day: 'numeric'  // Formats day as "12"
                          })
                          : "Not specified"}
                      </li>

                      <li><b style={{ color: 'inherit' }}>Height:</b>{userDetails.height || "Not specified"}</li>
                      <li><b>Weight:</b>{userDetails.weight || "Not specified"}</li>
                      <li><b>Degree:</b> {userDetails.degree || "Not specified"}</li>
                      <li><b>Profession:</b> {userDetails.job_type || "Not specified"}</li>
                      <li><b>Company:</b> {userDetails.company_name || "Not specified"}</li>
                      <li><b>Position:</b> {userDetails.total_experience || "Not specified"}</li>
                      <li><b>Salary:</b> {userDetails.salary || "Not specified"}</li>
                    </ul>
                  </div>
                  <div className="pr-bio-c pr-bio-info">
                    <h3>Religion & Caste Information</h3>
                    <ul>
                      <li><b>Religion:</b> <span>{userDetails.religion || "Not specified"}</span></li>
                      <li><b>Caste:</b> {userDetails.caste || "Not specified"}</li>
                      <li><b>Sub Caste:</b> {userDetails.sub_caste || "Not specified"}</li>
                      <li><b>Gothram:</b> {userDetails.gothram || "Not specified"}</li>
                      <li><b>Dosam:</b> {userDetails.dosam || "Not specified"}</li>
                      <li><b>Star:</b> {userDetails.star || "Not specified"}</li>
                      <li><b>Raasi:</b> {userDetails.raasi || "Not specified"}</li>
                    </ul>
                  </div>

                  <div className="pr-bio-c pr-bio-hob">
                    <h3>Other Details</h3>
                    <ul>
                      <li>
                        <span>
                          Willing to marry from another caste:{" "}
                          <b>{userDetails?.willing_to_marry_from_another_caste === 1 ? "Yes" : "No"}</b>
                        </span>

                      </li>
                      <br />
                    </ul>
                  </div>
                  <div className="pr-bio-c pr-bio-gal" id="horoscope-gallery">
                    <h3>Horoscope gallery</h3>
                    <div id="horoscope-gallery">
                      {userHoroscopes && userHoroscopes.length > 0 && user?.horoscope_visibility === 0 ? (
                        userHoroscopes.map(horoscope => (
                          <div className="pro-gal-imag text-center" key={horoscope.id}>
                            <div className="img-wrapper">
                              <a href={user?.premium_user ? horoscope.horoscope_premium_path : horoscope.horoscope_premium_path} target="_blank" rel="noopener noreferrer">
                                <img
                                  src={user?.premium_user ? horoscope.horoscope_premium_path : horoscope.horoscope_premium_path}
                                  className="img-responsive"
                                  alt={`Horoscope image ${horoscope.id}`}
                                />
                              </a>
                              <div className="img-overlay">
                                <i className="fa fa-arrows-alt" aria-hidden="true"></i>
                              </div>
                            </div>
                            <div className="download-wrapper">
                              <a
                                href={user?.premium_user ? horoscope.horoscope_premium_path : horoscope.horoscope_premium_path}
                                download={`horoscope_${horoscope.file_name}`}
                                className="btn btn-download "
                                target='_blank'
                                style={{ 'color': '#b5345e', 'font-weight': 'bold', 'textDecoration': 'underline' }}
                              >
                                View
                              </a>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p style={{ color: 'inherit' }}>
                          {user?.horoscope_visibility === 1 ? 'Horoscopes are locked by the user.' : 'No horoscopes available'}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="pr-bio-c menu-pop-soci pr-bio-soc">
                    <h3>Social media</h3>
                    <ul>
                      <li><a href={userDetails.facebook ? userDetails.facebook : "#"} target='_blank'><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                      <li><a href={userDetails.twitter ? userDetails.twitter : "#"} target='_blank'><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                      <li><a href={userDetails.whatsapp ? userDetails.whatsapp : "#"} target='_blank'><i className="fa fa-whatsapp" aria-hidden="true"></i></a></li>
                      <li><a href={userDetails.linkedin ? userDetails.linkedin : "#"} target='_blank'><i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
                      <li><a href={userDetails.youtube ? userDetails.youtube : "#"} target='_blank'><i className="fa fa-youtube-play" aria-hidden="true"></i></a></li>
                      <li><a href={userDetails.instagram ? userDetails.instagram : "#"} target='_blank'><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
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