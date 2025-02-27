import UserLeftMenu from "./UserLeftMenu";
import { Toast } from "primereact/toast";
import { useToast } from '../../assets/utils/toastUtil';
import { useAuth } from '../../context/AuthContext';
import config from '../../config';


const PremiumUserBenefits = () => {
    const { toast, showToast } = useToast();
    const { isLoggedIn, user } = useAuth();
    const isPaidUser = user?.premium_user;
 

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
                                                    <h4>Premium User Benefits</h4>
                                                    <h2>Set your privacy benefits</h2>
                                                    <div class="fol-sett-box">
                                                        <ul>
                                                            {/* Mobile number */}
                                                            <li className="no-border">
                                                                <div class="sett-lef">
                                                                    <div class="sett-rad-left">
                                                                        <h5>Mobile number visible to prime members only</h5>
                                                                        <p>let premium users can view my mobile number</p>
                                                                    </div>
                                                                </div>
                                                                <div class="sett-rig">
                                                                    <div class="checkboxes-and-radios">
                                                                        <input type="checkbox" name="checkbox-cats" id="sett-mob" value="1" />
                                                                        <label for="sett-mob"></label>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div class="sett-lef">
                                                                    <div class="sett-rad-left">
                                                                        <h5>Hide mobile number, allow contact via email</h5>
                                                                        <p>Your phone number is hidden, and users can only reach you by email.</p>
                                                                    </div>
                                                                </div>
                                                                <div class="sett-rig">
                                                                    <div class="checkboxes-and-radios">
                                                                        <input type="checkbox" name="checkbox-cats" id="sett-not-mob" value="1"  />
                                                                        <label for="sett-not-mob"></label>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            {/* Photos privacy */}
                                                            <li className="no-border">
                                                                <div class="sett-lef">
                                                                    <div class="sett-rad-left">
                                                                        <h5>Show my photos to prime members only</h5>
                                                                        <p>let premium users can view my photos</p>
                                                                    </div>
                                                                </div>
                                                                <div class="sett-rig">
                                                                    <div class="checkboxes-and-radios">
                                                                        <input type="checkbox" name="checkbox-cats" id="sett-photo" value="1"  />
                                                                        <label for="sett-photo"></label>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div class="sett-lef">
                                                                    <div class="sett-rad-left">
                                                                        <h5>Hide my photos from everyone</h5>
                                                                        <p>Your photos will be private and not visible to anyone.</p>
                                                                    </div>
                                                                </div>
                                                                <div class="sett-rig">
                                                                    <div class="checkboxes-and-radios">
                                                                        <input type="checkbox" name="checkbox-cats" id="sett-not-photo" value="1"  />
                                                                        <label for="sett-not-photo"></label>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            {/* horoscope privacy */}
                                                            <li className="no-border">
                                                                <div class="sett-lef">
                                                                    <div class="sett-rad-left">
                                                                        <h5>Show my horoscope to prime members only</h5>
                                                                        <p>Only prime members can view your horoscope, while others cannot.</p>
                                                                    </div>
                                                                </div>
                                                                <div class="sett-rig">
                                                                    <div class="checkboxes-and-radios">
                                                                        <input type="checkbox" name="checkbox-cats" id="sett-hrc" value="1"  />
                                                                        <label for="sett-hrc"></label>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li className="no-border">
                                                                <div class="sett-lef">
                                                                    <div class="sett-rad-left">
                                                                        <h5>Hide horoscope, allow contact via email</h5>
                                                                        <p>Your horoscope is hidden, and people can only contact you through email.</p>
                                                                    </div>
                                                                </div>
                                                                <div class="sett-rig">
                                                                    <div class="checkboxes-and-radios">
                                                                        <input type="checkbox" name="checkbox-cats" id="sett-not-hrc-e" value="1"  />
                                                                        <label for="sett-not-hrc-e"></label>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li className="no-border">
                                                                <div class="sett-lef">
                                                                    <div class="sett-rad-left">
                                                                        <h5>Hide my horoscope from everyone</h5>
                                                                        <p>Your horoscope will be private and not visible to anyone.</p>
                                                                    </div>
                                                                </div>
                                                                <div class="sett-rig">
                                                                    <div class="checkboxes-and-radios">
                                                                        <input type="checkbox" name="checkbox-cats" id="sett-not-hrc" value="1"  />
                                                                        <label for="sett-not-hrc"></label>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                        {!isPaidUser && (
                                                          <>
                                                            <div class="alert alert-warning db-plan-canc">
                                                            <p>This feature is available only for paid members.</p>
                                                            </div>
                                                            
                                                              <a className="cta-dark text-center" >UPGRADE</a>
                                                            
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
                </div >
            </section >
        </>
    )
};
export default PremiumUserBenefits;