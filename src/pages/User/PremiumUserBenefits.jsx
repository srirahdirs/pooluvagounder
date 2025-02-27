import UserLeftMenu from "./UserLeftMenu";
import { Toast } from "primereact/toast";
import { useToast } from '../../assets/utils/toastUtil';

const PremiumUserBenefits = () => {
    const { toast, showToast } = useToast();
    const handleSubmit = async (e) => {
        e.preventDefault();
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
                                        <form onSubmit={handleSubmit}>
                                            {/* Basic Info */}
                                            <div className="edit-pro-parti">
                                                <div className="form-tit">
                                                    <h4>Premium User Benefits</h4>
                                                    <h2>Set your privacy benefits</h2>
                                                    <div class="fol-sett-box">
                                                        <ul>
                                                            <li>
                                                                <div class="sett-lef">
                                                                    <div class="sett-rad-left">
                                                                        <h5>Interest request</h5>
                                                                        <p>Interest request email notificatios</p>
                                                                    </div>
                                                                </div>
                                                                <div class="sett-rig">
                                                                    <div class="checkboxes-and-radios">
                                                                        <input type="checkbox" name="checkbox-cats" id="sett-not-mail" value="1" checked="" />
                                                                        <label for="sett-not-mail"></label>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div class="sett-lef">
                                                                    <div class="sett-rad-left">
                                                                        <h5>Chat</h5>
                                                                        <p>New chat notificatios</p>
                                                                    </div>
                                                                </div>
                                                                <div class="sett-rig">
                                                                    <div class="checkboxes-and-radios">
                                                                        <input type="checkbox" name="checkbox-cats" id="sett-not-fri" value="1" checked="" />
                                                                        <label for="sett-not-fri"></label>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div class="sett-lef">
                                                                    <div class="sett-rad-left">
                                                                        <h5>Profile views</h5>
                                                                        <p>If any one view your profile means you get the notifications at end of the day</p>
                                                                    </div>
                                                                </div>
                                                                <div class="sett-rig">
                                                                    <div class="checkboxes-and-radios">
                                                                        <input type="checkbox" name="checkbox-cats" id="sett-not-fol" value="1" checked="" />
                                                                        <label for="sett-not-fol"></label>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div class="sett-lef">
                                                                    <div class="sett-rad-left">
                                                                        <h5>New profile match</h5>
                                                                        <p>You get the profile match emails</p>
                                                                    </div>
                                                                </div>
                                                                <div class="sett-rig">
                                                                    <div class="checkboxes-and-radios">
                                                                        <input type="checkbox" name="checkbox-cats" id="sett-not-mes" value="1" checked="" />
                                                                        <label for="sett-not-mes"></label>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </ul>
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