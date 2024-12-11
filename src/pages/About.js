import React from 'react';

const About = () => {
  return (
    <>
      {/* Hero Section */}
      <section>
        <div className="str">
          <div className="ban-inn ab-ban">
            <div className="container">
              <div className="row">
                <div className="hom-ban">
                  <div className="ban-tit">
                    <span><i className="no1"> <em style={{ fontFamily: 'Cinzel Decorative', fontStyle: 'cursive' }}>Wedding Soul Mates</em></i> <br />Matrimony</span>
                    <h1>About Us</h1>
                    <p>Your Most Trusted Premium Matrimony Platform, where meaningful connections lead to lifelong happiness.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section>
        <div className="ab-sec2">
          <div className="container">
            <div className="row">
              <ul>
                <li>
                  <div>
                    <img src={`${process.env.PUBLIC_URL}/matrimo/images/icon/prize.png`} alt="Genuine Profiles" />
                    <h4>Genuine Profiles</h4>
                    <p>We verify every profile to ensure you find a genuine match.</p>
                  </div>
                </li>
                <li>
                  <div>
                    <img src={`${process.env.PUBLIC_URL}/matrimo/images/icon/trust.png`} alt="Most Trusted" />
                    <h4>Most Trusted</h4>
                    <p>A growing community of members trust us to find their life partner.</p>
                  </div>
                </li>
                <li>
                  <div>
                    <img src={`${process.env.PUBLIC_URL}/matrimo/images/icon/rings.png`} alt="2000+ Weddings" />
                    <h4>Numerous Joyful Unions"</h4>
                    <p>We take pride in playing a role in countless happy marriages.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section>
        <div className="ab-wel">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="ab-wel-lhs">
                  <span className="ab-wel-3"></span>
                  <img src={`${process.env.PUBLIC_URL}/matrimo/images/about/1.jpg`} alt="Wedding Event" className="ab-wel-1" />
                  <img src={`${process.env.PUBLIC_URL}/matrimo/images/about/2.jpg`} alt="Wedding Ceremony" className="ab-wel-2" />
                  <span className="ab-wel-4"></span>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="ab-wel-rhs">
                  <div className="ab-wel-tit">
                    <h2>Welcome to <em>Wedding Soul Mates</em></h2>
                    <p>Wedding Soul Mates is more than a matrimony service. We are a platform that understands the importance of finding a partner who shares your values and dreams. Our goal is to connect people for life-long happiness and mutual respect.</p>
                    <p><a href="plans.html">Start your journey</a> today and find your perfect match with us.</p>
                  </div>
                  <div className="ab-wel-tit-1">
                    <p>We believe that every individual deserves to find their perfect partner. Our platform offers a unique approach that blends tradition with modern technology, ensuring you meet the right person.</p>
                  </div>
                  <div className="ab-wel-tit-2">
                    <ul>
                      {/* <li>
                        <div>
                          <i className="fa fa-phone" aria-hidden="true"></i>
                          <h4>Enquiry <em>+01 2242 3366</em></h4>
                        </div>
                      </li> */}
                      <li>
                        <div>
                          <i className="fa fa-envelope-o" aria-hidden="true"></i>
                          <h4>Get Support <em>info@weddingsoulmates.com</em></h4>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section>
        <div className="ab-cont">
          <div className="container">
            <div className="row">
              <ul>
                <li>
                  <div className="ab-cont-po">
                    <i className="fa fa-heart-o" aria-hidden="true"></i>
                    <div>
                      <h4>10+</h4>
                      <span>Happy Couples</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="ab-cont-po">
                    <i className="fa fa-users" aria-hidden="true"></i>
                    <div>
                      <h4>100+</h4>
                      <span>Registered Users</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="ab-cont-po">
                    <i className="fa fa-male" aria-hidden="true"></i>
                    <div>
                      <h4>70+</h4>
                      <span>Grooms</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="ab-cont-po">
                    <i className="fa fa-female" aria-hidden="true"></i>
                    <div>
                      <h4>50+</h4>
                      <span>Brides</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
