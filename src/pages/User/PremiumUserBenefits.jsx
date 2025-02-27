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