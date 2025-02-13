import React, { useState, useEffect } from "react";
import Select from 'react-select';
import { Toast } from 'primereact/toast'; // Assuming you're using PrimeReact
import { useToast } from '../../assets/utils/toastUtil';
import config from '../../config';
import { useLocation, useNavigate } from 'react-router-dom';
import UserLeftMenu from './UserLeftMenu';

const PartnerPreferences = () => {
    const location = useLocation();
    const { toast, showToast } = useToast();
    const navigate = useNavigate();
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : {};
    });

    const apiUrl = config?.apiUrl;
    let fullApiUrl;
    if (apiUrl) {
        fullApiUrl = apiUrl + 'updatePartnerPreferences';
    } else {
        console.error('Invalid API url');
    }

    // if (user?.gender == null || user?.gender === undefined || user?.gender === '') {
    //     showToast('You need to update your profile before updating the partner preferences!');
    //     setTimeout(() => {
    //         navigate('/edituserprofile');
    //     }, 3000);
    // }
    const dataExists = location.state?.dataExists;
    console.log(dataExists, 'dataExists');

    useEffect(() => {
        if (dataExists) {
            showToast('You need to update your profile before updating the partner preferences!');
            setTimeout(() => {
                navigate('/edituserprofile');
            }, 3000);
        }
    }, [dataExists, navigate]);


    const userGender = user?.gender || ''; // Get user's gender

    const partnerGender = userGender === 'Male' ? 'Female' : (userGender === 'Female' ? 'Male' : '');
    const [formData, setFormData] = useState({
        gender: partnerGender || user.partner_preferences?.gender || '',  // Default to empty string if undefined
        age: user.partner_preferences?.age || '',
        height: user.partner_preferences?.height || '',
        weight: user.partner_preferences?.weight || '',
        marital_status: user.partner_preferences?.marital_status || '',
        job_type: user.partner_preferences?.job_type || '',
        monthly_income: user.partner_preferences?.monthly_income || '',
        religion: user.partner_preferences?.religion || '',
        caste: user.partner_preferences?.caste || '',
        sub_caste: user.partner_preferences?.sub_caste || '',
        dosam: user.partner_preferences?.dosam || ''
    });



    const handleChange = (e) => {

        const { name, value } = e.target;
        if (name === 'gender') {
            if (value.trim() === '') {
                setGenderError('Gender is required');
            } else {
                setGenderError('');
            }
        }
        setFormData({ ...formData, [name]: value });



        if (name === 'age') {
            if (value.trim() === '') {
                setAgeError('Age is required');
            } else {
                setAgeError('');
            }
        }
        if (name === 'weight') {
            if (value.trim() === '') {
                setWeightError('Weight is required');
            } else {
                setWeightError('');
            }
        }
        if (name === 'height') {
            if (value.trim() === '') {
                setHeightError('Hight is required');
            } else {
                setHeightError('');
            }
        }

        if (name === 'marital_status') {

            if (value.trim() === '') {
                setMaritalStatusError('Marital Status is required');
            } else {
                setMaritalStatusError('');
            }
        }
        if (name === 'caste') {
            console.log(name, 'caste');
            console.log(value, 'marital_scastetatus value');
            if (value.trim() === '') {
                setCasteError('Caste is required');
            } else {
                setCasteError('');
            }
        }
        if (name === 'religion') {
            if (value.trim() === '') {
                setReligionError('Religion is required');
            } else {
                setReligionError('');
            }
        }
    };
    const validateForm = (fieldValues = formData) => {


        let isValid = true;
        console.log("fieldValues");
        console.log(fieldValues);
        console.log(fieldValues.age, 'age');
        // Validate gender
        if (!fieldValues.gender || fieldValues.gender === '') {
            setGenderError('Gender is required');
            isValid = false;
        } else {
            setGenderError('');
        }

        // Validate age
        if (!fieldValues.age || fieldValues.age <= 0) {
            setAgeError('Age is required');
            isValid = false;
        } else {
            setAgeError('');
        }

        // Validate weight
        if (!fieldValues.weight || fieldValues.weight.trim() === '') {
            setWeightError('Weight is required');
            isValid = false;
        } else {
            setWeightError('');
        }

        // Validate height
        if (!fieldValues.height || fieldValues.height.trim() === '') {
            setHeightError('Height is required');
            isValid = false;
        } else {
            setHeightError('');
        }

        if (!fieldValues.marital_status || fieldValues.marital_status.trim() === '') {
            setMaritalStatusError('Marital Status is required');
            isValid = false;
        } else {
            setMaritalStatusError('');
        }
        if (!fieldValues.religion || fieldValues.religion === '') {
            setReligionError('Religion is required');
            isValid = false;
        } else {
            setReligionError('');
        }
        if (!fieldValues.caste || fieldValues.caste === '') {
            setCasteError('Caste is required');
            isValid = false;
        } else {
            setCasteError('');
        }
        return isValid; // Return the overall validity of the form
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Perform full form validation before submission
        if (validateForm()) {
            const token = localStorage.getItem('authToken');
            const payload = {
                token,
                user_id: formData.user_id, // Assuming you have this in your formData
                gender: formData.gender,
                age: formData.age,
                height: formData.height,
                weight: formData.weight,
                marital_status: formData.marital_status,
                monthly_income: formData.monthly_income,
                job_type: formData.job_type,
                religion: formData.religion,
                caste: formData.caste,
                sub_caste: formData.sub_caste,
                dosam: formData.dosam,
            };
            console.log(payload);
            try {
                const response = await fetch(fullApiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload), // Send the full form data as JSON
                });

                const data = await response.json();
                if (data.success) {
                    const updatedUser = {
                        ...user, // Spread the existing user details
                        partner_preferences: data.user.partner_preferences // Update only partner preferences
                    };

                    // Set the updated user details in state and localStorage
                    setUser(updatedUser);
                    localStorage.setItem('user', JSON.stringify(updatedUser));

                    // Show success toast
                    showToast('Partner\'s preferences updated successfully!');
                } else {
                    showToast(data.message || 'Update failed', 'error');
                }

            } catch (error) {
                showToast('Something went wrong, please try again.', 'error');
            }
        } else {
            showToast('please fill all the values', 'error');
            console.log('Form has validation errors.', 'error');
            return false;
        }
    };


    const [genderError, setGenderError] = useState('');
    const [ageError, setAgeError] = useState('');
    const [heightError, setHeightError] = useState('');
    const [weightError, setWeightError] = useState('');
    const [maritalStatusError, setMaritalStatusError] = useState('');
    const [religionError, setReligionError] = useState('');
    const [casteError, setCasteError] = useState('');

    return (
        <>
            <Toast ref={toast} />
            <section>
                <div className="login pro-edit-update">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 col-lg-3">
                                <UserLeftMenu />
                            </div>
                            <div className="inn">
                                <div className="rhs">
                                    <div className="form-login">
                                        <form onSubmit={handleSubmit}>

                                            <div className="edit-pro-parti">
                                                <div className="form-tit">
                                                    <h4>Set your partner Preferences</h4>
                                                    <h1>Basic Preferences</h1>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6 form-group" style={{ display: 'none' }}>
                                                        <label className="lb">Gender: <span style={{ color: 'red' }}>*</span></label>
                                                        <select
                                                            className="form-select"
                                                            name="gender"
                                                            value={formData.gender}
                                                            onChange={(e) => {
                                                                handleChange(e);
                                                            }}
                                                        >
                                                            <option value="">Select your Gender</option>
                                                            <option value="Male">Male</option>
                                                            <option value="Female">Female</option>
                                                        </select>
                                                        {genderError && <p className="error-message">{genderError}</p>}
                                                    </div>

                                                </div>

                                                <div className="row">
                                                    <div className="col-md-6 form-group">
                                                        <label className="lb">Age: <span style={{ color: 'red' }}>*</span></label>
                                                        <div className="form-group">
                                                            <select
                                                                className="form-control"
                                                                name="age"
                                                                onChange={(e) => {
                                                                    handleChange(e);
                                                                }}
                                                                value={formData.age || ''}
                                                            >
                                                                <option value="">Select Age Range</option>
                                                                <option value="no_preference">No Preference</option>
                                                                <option value="20 to 25">20 to 25</option>
                                                                <option value="25 to 30">25 to 30</option>
                                                                <option value="30 to 35">30 to 35</option>
                                                                <option value="35 to 40">35 to 40</option>
                                                                <option value="40 to 45">40 to 45</option>
                                                                <option value="45 to 50">45 to 50</option>
                                                                <option value="50 to 55">50 to 55</option>
                                                            </select>
                                                        </div>

                                                        {ageError && <p className="error-message">{ageError}</p>}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6 form-group">
                                                        <label className="lb">Height:</label>
                                                        <select
                                                            className="form-control"
                                                            name="height"
                                                            value={formData.height || ''}
                                                            onChange={handleChange}
                                                        >
                                                            <option value="">Select Height</option>
                                                            <option value="no_preference">No Preference</option>
                                                            <option value="4'5&quot; - 4'8&quot;">4'5" - 4'8"</option>
                                                            <option value="4'8&quot; - 5'0&quot;">4'8" - 5'0"</option>
                                                            <option value="5'0&quot; - 5'5&quot;">5'0" - 5'5"</option>
                                                            <option value="5'5&quot; - 6'0&quot;">5'5" - 6'0"</option>
                                                            <option value="6'0&quot; - 6'5&quot;">6'0" - 6'5"</option>
                                                            <option value="6'5&quot; - 7'0&quot;">6'5" - 7'0"</option>
                                                        </select>
                                                        {heightError && <p className="error-message">{heightError}</p>}
                                                    </div>

                                                    <div className="col-md-6 form-group">
                                                        <label className="lb">Weight:</label>
                                                        <select
                                                            className="form-control"
                                                            name="weight"
                                                            value={formData.weight || ''}
                                                            onChange={handleChange}
                                                        >

                                                            <option value="">Select Weight</option>
                                                            <option value="no_preference">No Preference</option>
                                                            <option value="40-50">40-50 kg</option>
                                                            <option value="50-60">50-60 kg</option>
                                                            <option value="60-70">60-70 kg</option>
                                                            <option value="70-80">70-80 kg</option>
                                                            <option value="80-90">80-90 kg</option>
                                                            <option value="90-100">90-100 kg</option>
                                                            <option value="100+">100+ kg</option>
                                                        </select>
                                                        {weightError && <p className="error-message">{weightError}</p>}
                                                    </div>

                                                </div>


                                                <div className="form-group">
                                                    <label className="lb">Marital Status:</label>
                                                    <div className="form-group">
                                                        <select
                                                            value={formData.marital_status} // Bind to formData state
                                                            name="marital_status"
                                                            onChange={handleChange} // Update form data on change
                                                            className="form-control" // Normal form control styling
                                                        >
                                                            <option value="">Select Marital Status</option> {/* Default placeholder */}
                                                            <option value="no_preference">No Preference</option>
                                                            <option value="Never Married">Never Married</option>
                                                            <option value="Divorced">Divorced</option>
                                                            <option value="Widowed">Widowed</option>
                                                            <option value="Awaiting Divorce">Awaiting Divorce</option>
                                                            <option value="Other">Other</option>
                                                        </select>
                                                        {maritalStatusError && <p className="error-message">{maritalStatusError}</p>}
                                                    </div>
                                                </div>

                                            </div>
                                            {/* Job & Education */}
                                            <div className="edit-pro-parti">
                                                <div className="form-tit">
                                                    <h4>Job details</h4>
                                                    <h1>Job & Education</h1>
                                                </div>
                                                <div className="form-group">
                                                    <label className="lb">Job type:</label>
                                                    <select
                                                        className="form-select"
                                                        name="job_type"
                                                        value={formData.job_type}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="">Select your Job Type</option>
                                                        <option value="no_preference">No Preference</option>
                                                        <option value="Business">Business</option>
                                                        <option value="Employee">Employee</option>
                                                        <option value="Government">Government</option>
                                                        <option value="Jobless">Jobless</option>
                                                    </select>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-6 form-group">
                                                        <label className="lb">Monthly Income / Salary:</label>
                                                        <select
                                                            className="form-control"
                                                            name="monthly_income"
                                                            value={formData.monthly_income || ''}
                                                            onChange={handleChange}
                                                        >
                                                            <option value="">Select Salary Range</option>
                                                            <option value="no_preference">No Preference</option>
                                                            <option value="Less than 20,000">Less than 20,000</option>
                                                            <option value="20,000 - 30,000">20,000 - 30,000</option>
                                                            <option value="30,000 - 40,000">30,000 - 40,000</option>
                                                            <option value="40,000 - 50,000">40,000 - 50,000</option>
                                                            <option value="50,000 - 75,000">50,000 - 75,000</option>
                                                            <option value="75,000 - 1,00,000">75,000 - 1,00,000</option>
                                                            <option value="1,00,000 - 1,50,000">1,00,000 - 1,50,000</option>
                                                            <option value="1,50,000 - 2,00,000">1,50,000 - 2,00,000</option>
                                                            <option value="More than 2,00,000">More than 2,00,000</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="edit-pro-parti">
                                                <div className="form-tit">
                                                    <h4>Religion</h4>
                                                    <h1>Religion & Caste Information</h1>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6 form-group">
                                                        <label className="lb">Religion:<span style={{ color: 'red' }}>*</span></label>
                                                        <select
                                                            className="form-control"
                                                            name="religion"
                                                            value={formData.religion || ''}
                                                            onChange={handleChange}
                                                        >
                                                            <option value="">Select Religion</option>
                                                            <option value="no_preference">No Preference</option>
                                                            <option value="Hindu">Hindu</option>
                                                            <option value="Muslim">Muslim</option>
                                                            <option value="Christian">Christian</option>
                                                            <option value="Sikh">Sikh</option>
                                                            <option value="Buddhist">Buddhist</option>
                                                            <option value="Jain">Jain</option>
                                                            <option value="Parsi">Parsi</option>
                                                            <option value="Jewish">Jewish</option>
                                                            <option value="Other">Other</option>
                                                        </select>
                                                        {religionError && <p className="error-message">{religionError}</p>}
                                                    </div>
                                                    <div className="col-md-6 form-group">
                                                        <label className="lb">Caste: <span style={{ color: 'red' }}>*</span></label>
                                                        <select
                                                            className="form-control"
                                                            name="caste"
                                                            value={formData.caste || ''}
                                                            onChange={handleChange}
                                                        >
                                                            <option value="">Select Caste</option>
                                                            <option value="no_preference">No Preference</option>
                                                            <option value="Adi Dravidar">Adi Dravidar</option>
                                                            <option value="Agarwal">Agarwal</option>
                                                            <option value="Arya Vysya">Arya Vysya</option>
                                                            <option value="Bania">Bania</option>
                                                            <option value="Brahmin">Brahmin</option>
                                                            <option value="Chettiar">Chettiar</option>
                                                            <option value="Choudhary">Choudhary</option>
                                                            <option value="Devanga">Devanga</option>
                                                            <option value="Ezhava">Ezhava</option>
                                                            <option value="Gounder">Gounder</option>
                                                            <option value="Gujar">Gujar</option>
                                                            <option value="Gupta">Gupta</option>
                                                            <option value="Iyer">Iyer</option>
                                                            <option value="Iyengar">Iyengar</option>
                                                            <option value="Jain">Jain</option>
                                                            <option value="Jat">Jat</option>
                                                            <option value="Kamma">Kamma</option>
                                                            <option value="Kayastha">Kayastha</option>
                                                            <option value="Koli">Koli</option>
                                                            <option value="Kshatriya">Kshatriya</option>
                                                            <option value="Kuruba">Kuruba</option>
                                                            <option value="Lingayat">Lingayat</option>
                                                            <option value="Maratha">Maratha</option>
                                                            <option value="Mudaliar">Mudaliar</option>
                                                            <option value="Nadar">Nadar</option>
                                                            <option value="Naidu">Naidu</option>
                                                            <option value="Nair">Nair</option>
                                                            <option value="Patel">Patel</option>
                                                            <option value="Pillai">Pillai</option>
                                                            <option value="Rajput">Rajput</option>
                                                            <option value="Reddy">Reddy</option>
                                                            <option value="SC">SC (Scheduled Caste)</option>
                                                            <option value="ST">ST (Scheduled Tribe)</option>
                                                            <option value="Thevar">Thevar</option>
                                                            <option value="Vanniyar">Vanniyar</option>
                                                            <option value="Vishwakarma">Vishwakarma</option>
                                                            <option value="Yadav">Yadav</option>
                                                            <option value="Other">Other</option>
                                                        </select>
                                                        {casteError && <p className="error-message">{casteError}</p>}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6 form-group">
                                                        <label className="lb">Sub Caste:</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="sub_caste"
                                                            value={formData.sub_caste}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6 form-group">
                                                        <label className="lb">Dosam:</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="dosam"
                                                            value={formData.dosam}
                                                            onChange={handleChange}
                                                        />
                                                    </div>

                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6 form-group"></div>
                                                    <div className="col-md-6 form-group">
                                                        <button
                                                            type="button"
                                                            className="btn btn-primary"
                                                            onClick={handleSubmit}
                                                        >
                                                            Save
                                                        </button>
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

export default PartnerPreferences;
