import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import Select from 'react-select';
import { format } from 'date-fns';
import { Toast } from "primereact/toast";
import { useToast } from '../../assets/utils/toastUtil';
import config from '../../config';
import UserLeftMenu from "./UserLeftMenu";
import { Navigate } from "react-router-dom";
const UpdateUserProfile = () => {


    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const { toast, showToast } = useToast();
    const [dobError, setDobError] = useState('');
    const { user1, setUser1 } = useAuth();

    // Get today's date and set minAllowedDate to 18 years back
    const today = new Date();
    const minAllowedDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())
        .toISOString()
        .split('T')[0];

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : {};
    });



    function calculateAge(dob) {
        if (!dob) return "";
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    const apiUrl = config?.apiUrl;
    let fullApiUrl;
    if (apiUrl) {
        fullApiUrl = apiUrl + 'updateProfile';
    } else {
        console.error('Invalid API url');
    }


    const dob = new Date(user.dob);
    if (isNaN(dob.getTime())) {
        // return res.status(400).json({ message: 'Invalid date format for date of birth' });
    } else {
        const formattedDate = dob.toISOString().split('T')[0]; // Format to YYYY-MM-DD
        user.dob = formattedDate;
    }

    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        about: user.about,
        phone: user.phone,
        password: "",
        gender: user.gender,
        state: user.state,
        city: user.city,
        dob: user.dob,
        age: user.age,
        height: user.height,
        weight: user.weight,
        fathersName: user.fathersName,
        mothersName: user.mothersName,
        address: user.address,
        marital_status: user.marital_status,
        job_type: user.job_type,
        company_name: user.company_name,
        salary: user.salary,
        total_experience: user.total_experience,
        degree: user.degree,
        school: user.school,
        college: user.college,
        whatsapp: user.whatsapp,
        facebook: user.facebook,
        instagram: user.instagram,
        twitter: user.twitter,
        youtube: user.youtube,
        linkedin: user.linkedin,
        willing_to_marry_from_another_caste: user.willing_to_marry_from_another_caste === 1, // Co Make sure it's a boolean
        religion: user.religion,
        mother_tongue: user.mother_tongue,
        caste: user.caste,
        sub_caste: user.sub_caste,
        gothram: user.gothram,
        dosam: user.dosam,
        star: user.star,
        raasi: user.raasi,

    });

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: checked, // Update the checkbox value to true or false
        }));
    };
    useEffect(() => {
        console.log(user);
        const fetchStates = async () => {
            try {
                const response = await fetch(`https://countriesnow.space/api/v0.1/countries/states`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ country: 'India' }),
                });

                const result = await response.json();
                setStates(result.data.states || []); // Assume states are inside `data.states`
            } catch (error) {
                console.error('Error fetching states:', error);
            }
        };

        fetchStates();
    }, []);
    const fetchCities = async (e) => {
        const selectedState = e.target.selectedOptions[0].text;
        const selectedStateVal = e.target.value;
        if (selectedStateVal) {
            // setFormData({ ...formData, state: selectedState });
            setFormData({
                ...formData,
                state: selectedStateVal // this will set formData.state to the selected value
            });
            try {
                const response = await fetch(`https://countriesnow.space/api/v0.1/countries/state/cities`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ country: 'India', state: selectedState }),
                });

                const result = await response.json();
                setCities(result.data || []); // Assuming cities are in result.data
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        }
    };

    const cityOptions = cities.map((city) => ({ label: city, value: city }));

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "dob") {
            if (!value) {
                setDobError("Date of Birth is required");
                return;
            }
            setDobError("");

            const selectedDate = new Date(value);
            const minAllowed = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

            if (selectedDate > minAllowed) {
                setDobError("You must be at least 18 years old.");
                return;
            }


            const calculatedAge = calculateAge(value);
            setFormData({ ...formData, dob: value, age: calculatedAge });

            // Update localStorage as well
            const updatedUser = { ...user, dob: value };
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
        }

        if (name != 'dob') {
            setFormData({ ...formData, [name]: value });
        }
        // if (name === 'dob') {
        //     if (value === '') {
        //         setDobError('Dob is required');
        //     } else {
        //         setDobError('');
        //     }
        //     const formattedDate = format(value, 'yyyy-MM-dd');

        //     setFormData({ ...formData, dob: formattedDate });
        // }
        if (name === 'state') {
            if (value.trim() === '') {
                setStateError('State is required');
            } else {
                setStateError('');
            }
        }
        if (name === 'city') {
            if (value.trim() === '') {
                setCityError('City is required');
            } else {
                setCityError('');
            }
        }

        // if (name === 'age') {

        //     if (value.trim() === '') {
        //         setAgeError('Age is required');
        //     } else {
        //         setAgeError('');
        //     }
        // }


        if (name === "age") {
            if (value.trim() === "") {
                setAgeError("Age is required");
            } else {
                setAgeError("");
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
        if (name === 'fathersName') {
            if (value.trim() === '') {
                setfathersNameError('Father\'s Name is required');
            } else {
                setfathersNameError('');
            }
        }
        if (name === 'mothersName') {
            if (value.trim() === '') {
                setmothersNameError('Mother\'s Name is required');
            } else {
                setmothersNameError('');
            }
        }
        if (name === 'address') {
            if (value.trim() === '') {
                setAddressError('Address is required');
            } else {
                setAddressError('');
            }
        }
        if (name === 'marital_status') {
            console.log(name, 'marital_status');
            console.log(value, 'marital_status value');
            if (value.trim() === '') {
                setMaritalStatusError('Marital Status is required');
            } else {
                setMaritalStatusError('');
            }
        }
        if (name === 'gender') {
            if (value.trim() === '') {
                setGenderError('Gender is required');
            } else {
                setGenderError('');
            }
        }
    };
    const validateForm = (fieldValues = formData) => {

        let isValid = true;

        // Validate gender
        if (!fieldValues.gender || fieldValues.gender === '') {
            setGenderError('Gender is required');
            isValid = false;
        } else {
            setGenderError('');
        }

        // Validate dob
        if (!fieldValues.dob || fieldValues.dob === '') {
            setDobError('DOB is required');
            isValid = false;
        } else {
            setDobError('');
        }
        // Validate state
        if (!fieldValues.state || fieldValues.state.trim() === '') {
            setStateError('State is required');
            isValid = false;
        } else {
            setStateError('');
        }

        // Validate city
        if (!fieldValues.city || fieldValues.city.trim() === '') {
            setCityError('City is required');
            isValid = false;
        } else {
            setCityError('');
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

        // Validate father's name
        if (!fieldValues.fathersName || fieldValues.fathersName.trim() === '') {
            setfathersNameError('Father\'s Name is required');
            isValid = false;
        } else {
            setfathersNameError('');
        }

        // Validate mother's name
        if (!fieldValues.mothersName || fieldValues.mothersName.trim() === '') {
            setmothersNameError('Mother\'s Name is required');
            isValid = false;
        } else {
            setmothersNameError('');
        }

        // Validate address
        if (!fieldValues.address || fieldValues.address.trim() === '') {
            setAddressError('Address is required');
            isValid = false;
        } else {
            setAddressError('');
        }


        if (!fieldValues.marital_status || fieldValues.marital_status.trim() === '') {
            setMaritalStatusError('Marital Status is required');
            isValid = false;
        } else {
            setMaritalStatusError('');
        }
        return isValid; // Return the overall validity of the form
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const token = localStorage.getItem('authToken');
            const payload = {
                token,
                user_id: formData.user_id, // Assuming you have this in your formData
                gender: formData.gender,
                state: formData.state,
                city: formData.city,
                dob: formData.dob,
                age: formData.age,
                height: formData.height,
                weight: formData.weight,
                fathers_name: formData.fathersName,
                mothers_name: formData.mothersName,
                address: formData.address,
                about: formData.about,
                marital_status: formData.marital_status,
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
                console.log(data, "data");
                if (data.success) {
                    setUser(data.user);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    showToast('Profile updated successfully!');
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


    const handleEducationSubmit = async (e) => {
        e.preventDefault();

        // Perform full form validation before submission

        const token = localStorage.getItem('authToken');

        const payload = {
            token,
            user_id: formData.user_id, // Assuming you have this in your formData
            job_type: formData.job_type,
            company_name: formData.company_name,
            salary: formData.salary,
            total_experience: formData.total_experience,
            degree: formData.degree,
            school: formData.school,
            college: formData.college
        };

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
                setUser(data.user);
                localStorage.setItem('user', JSON.stringify(data.user));
                showToast('Profile updated successfully!');
            } else {
                showToast(data.message || 'Update failed', 'error');
            }
        } catch (error) {
            showToast('Something went wrong, please try again.', 'error');
        }

    };
    const handleSocialMediaSubmit = async (e) => {
        e.preventDefault();

        // Perform full form validation before submission

        const token = localStorage.getItem('authToken');
        // Gather all data from formData into a JSON object
        const payload = {
            token,
            user_id: formData.user_id, // Assuming you have this in your formData
            whatsapp: formData.whatsapp,
            facebook: formData.facebook,
            instagram: formData.instagram,
            twitter: formData.twitter,
            youtube: formData.youtube,
            linkedin: formData.linkedin
        };

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
                setUser(data.user);
                localStorage.setItem('user', JSON.stringify(data.user));
                showToast('Profile updated successfully!');
            } else {
                showToast(data.message || 'Update failed', 'error');
            }
        } catch (error) {
            showToast('Something went wrong, please try again.', 'error');
        }

    };
    const handleReligionSubmit = async (e) => {
        e.preventDefault();
        console.log("handleReligionSubmit", formData);

        // Perform full form validation before submission
        if (!formData.religion || formData.religion === '') {
            setReligionError('Religion is required');
            return false;
        } else {
            setReligionError('');
        }
        if (!formData.caste || formData.caste === '') {
            setCasteError('Caste is required');
            return false;
        } else {
            setCasteError('');
        }
        const token = localStorage.getItem('authToken');
        // Gather all data from formData into a JSON object
        const payload = {
            token,
            user_id: formData.user_id, // Assuming you have this in your formData
            religion: formData.religion,
            mother_tongue: formData.mother_tongue,
            caste: formData.caste,
            sub_caste: formData.sub_caste,
            gothram: formData.gothram,
            dosam: formData.dosam,
            star: formData.star,
            raasi: formData.raasi,
            willing_to_marry_from_another_caste: formData.willing_to_marry_from_another_caste,
        };

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
                setUser(data.user);
                localStorage.setItem('user', JSON.stringify(data.user));
                showToast('Profile updated successfully!');
            } else {
                showToast(data.message || 'Update failed', 'error');
            }
        } catch (error) {
            showToast('Something went wrong, please try again.', 'error');
        }

    };

    const [genderError, setGenderError] = useState('');
    const [stateError, setStateError] = useState('');
    const [cityError, setCityError] = useState('');
    // const [dobError, setDobError] = useState('');
    const [ageError, setAgeError] = useState('');
    const [heightError, setHeightError] = useState('');
    const [weightError, setWeightError] = useState('');
    const [fathersNameError, setfathersNameError] = useState('');
    const [mothersNameError, setmothersNameError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [maritalStatusError, setMaritalStatusError] = useState('');
    const [religionError, setReligionError] = useState('');
    const [casteError, setCasteError] = useState('');


    if (!user1) {
        return <Navigate to="/login" state={{ message: 'Login required' }} replace />;
    }

    return (
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
                                                <h4>Basic info</h4>
                                                <h1>Edit my profile</h1>
                                            </div>
                                            <div className="form-group">
                                                <label className="lb">Name:<span>*</span></label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter your full name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="lb">Email:<span>*</span></label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="Enter email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    disabled
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="lb">Phone:<span>*</span></label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="Enter phone number"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    disabled
                                                />
                                            </div>

                                        </div>
                                        {/* Advanced Bio */}
                                        <div className="edit-pro-parti">
                                            <div className="form-tit">
                                                <h4>Basic info</h4>
                                                <h1>Advanced bio</h1>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 form-group">
                                                    <label className="lb">Gender:<span>*</span></label>
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
                                            <div className="form-group">
                                                <label className="lb">About yourself:</label>
                                                <textarea
                                                    className="form-control"
                                                    name="about"
                                                    value={formData.about || ''}
                                                    onChange={handleChange}
                                                    placeholder="Share a little about yourself: your personality, hobbies, values, and what you're looking for in a partner."
                                                />

                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 form-group">
                                                    <label className="lb">State:<span>*</span></label>
                                                    <select

                                                        className="form-select"
                                                        name="state"
                                                        value={formData.state}
                                                        onChange={fetchCities}
                                                    >
                                                        <option value="">Select a State</option>
                                                        {states.map((state) => (
                                                            <option key={state.state_code} value={state.state_code}>
                                                                {state.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {stateError && <p className="error-message">{stateError}</p>}
                                                </div>

                                                <div className="col-md-6 form-group">
                                                    <label className="lb">City:<span>*</span></label>
                                                    <Select
                                                        className='city_dropdown'
                                                        options={cityOptions}
                                                        name="city"
                                                        value={formData.city ? { label: formData.city, value: formData.city } : null} // Set selected city if present
                                                        onChange={(selectedOption) => setFormData({ ...formData, city: selectedOption ? selectedOption.value : "" })}
                                                        placeholder="Select a City"
                                                        isClearable // Allow clearing the selection
                                                    />
                                                    {cityError && <p className="error-message">{cityError}</p>}
                                                </div>
                                            </div>
                                            <div className="row">
                                                {/* <div className="col-md-6 form-group dob-container">
                                                    <label className="lb">Date of Birth:<span style={{ color: 'red' }}>*</span></label>
                                                    <div className="flex justify-content-center">
                                                        <input
                                                            type="date"
                                                            name="dob"
                                                            value={formData.dob ? new Date(formData.dob).toISOString().split('T')[0] : ''} // Ensure correct format
                                                            onChange={handleChange} // Use the existing handleChange function
                                                            className="form-control"
                                                        />
                                                    </div>

                                                    {dobError && <p className="error-message">{dobError}</p>}
                                                </div> */}
                                                <div className="col-md-6 form-group">
                                                    <label className="lb">
                                                        Date of Birth:<span style={{ color: "red" }}>*</span>
                                                    </label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        name="dob"
                                                        onChange={handleChange}
                                                        value={formData.dob}
                                                        // defaultValue={'24/04/1992'}
                                                        max={minAllowedDate} // Prevent future date selection
                                                    />
                                                    {dobError && <p className="error-message">{dobError}</p>}
                                                </div>

                                                {/* Age Input Field (Read-Only) */}
                                                <div className="col-md-6 form-group">
                                                    <label className="lb">
                                                        Age:<span style={{ color: "red" }}>*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="age"
                                                        onChange={handleChange}
                                                        value={formData.age || ""}
                                                        readOnly // Prevent manual edits
                                                    />
                                                    {ageError && <p className="error-message">{ageError}</p>}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 form-group">
                                                    <label className="lb">Height:<span>*</span></label>
                                                    <select
                                                        type="text"
                                                        className="form-control"
                                                        name="height"
                                                        value={formData.height || ''}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="">Select Height in Feet</option>
                                                        <option value="5& below">5 & below</option>
                                                        <option value="5.1">5.1</option>
                                                        <option value="5.2">5.2</option>
                                                        <option value="5.3">5.3</option>
                                                        <option value="5.4">5.4</option>
                                                        <option value="5.5">5.5</option>
                                                        <option value="5.6">5.6</option>
                                                        <option value="5.7">5.7</option>
                                                        <option value="5.8">5.8</option>
                                                        <option value="5.9">5.9</option>
                                                        <option value="5.10">5.10</option>
                                                        <option value="5.11">5.11</option>
                                                        <option value="6">6</option>
                                                        <option value="6.1">6.1</option>
                                                        <option value="6.2">6.2</option>
                                                        <option value="6.3">6.3</option>
                                                        <option value="6.4">6.4</option>
                                                        <option value="6.5">6.5</option>
                                                        <option value="6.6">6.6</option>
                                                        <option value="6.7">6.7</option>
                                                        <option value="6.8">6.8</option>
                                                        <option value="6.9">6.9</option>
                                                        <option value="6.10">6.10</option>
                                                        <option value="6.11">6.11</option>
                                                        <option value="7">7 & above</option>
                                                    </select>
                                                    {heightError && <p className="error-message">{heightError}</p>}
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="lb">Weight:<span>*</span></label>
                                                    <select
                                                        type="text"
                                                        className="form-control"
                                                        name="weight"
                                                        value={formData.weight || ''} // Fallback to an empty string if weight is undefined/null
                                                        onChange={handleChange}
                                                    >
                                                        <option value="">Select Weight in KG</option>
                                                        <option value="below 40">Below 40</option>
                                                        <option value="40-45">40-45</option>
                                                        <option value="45-50">45-50</option>
                                                        <option value="50-55">50-55</option>
                                                        <option value="55-60">55-60</option>
                                                        <option value="60-65">60-65</option>
                                                        <option value="65-70">65-70</option>
                                                        <option value="70-75">70-75</option>
                                                        <option value="75-80">75-80</option>
                                                        <option value="80-85">80-85</option>
                                                        <option value="85-90">85-90</option>
                                                        <option value="90-95">90-95</option>
                                                        <option value="95-100">95-100</option>
                                                        <option value="above 100">Above 100</option>
                                                    </select>
                                                    {weightError && <p className="error-message">{weightError}</p>}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 form-group">
                                                    <label className="lb">Father's Name:<span>*</span></label>

                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="fathersName"
                                                        value={formData.fathersName || ''}
                                                        onChange={handleChange}
                                                    />
                                                    {fathersNameError && <p className="error-message">{fathersNameError}</p>}
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="lb">Mother's Name:<span>*</span></label>

                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="mothersName"
                                                        value={formData.mothersName || ''}
                                                        onChange={handleChange}
                                                    />
                                                    {mothersNameError && <p className="error-message">{mothersNameError}</p>}
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="lb">Address:<span>*</span></label>
                                                <textarea
                                                    className="form-control"
                                                    name="address"
                                                    value={formData.address || ''}
                                                    onChange={handleChange}
                                                />
                                                {addressError && <p className="error-message">{addressError}</p>}
                                            </div>
                                            <div className="form-group">
                                                <label className="lb">Marital Status:<span>*</span></label>
                                                <div className="form-group">
                                                    <select
                                                        value={formData.marital_status} // Bind to formData state
                                                        name="marital_status"
                                                        onChange={handleChange} // Update form data on change
                                                        className="form-control" // Normal form control styling
                                                    >
                                                        <option value="">Select Marital Status</option> {/* Default placeholder */}
                                                        <option value="Never Married">Never Married</option>
                                                        <option value="Divorced">Divorced</option>
                                                        <option value="Widowed">Widowed</option>
                                                        <option value="Awaiting Divorce">Awaiting Divorce</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                    {maritalStatusError && <p className="error-message">{maritalStatusError}</p>}
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
                                                        Save & Continue
                                                    </button>
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
                                                <label className="lb">Job Type:</label>
                                                <select
                                                    className="form-select"
                                                    name="job_type"
                                                    value={formData.job_type}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Select Your Job Type</option>
                                                    <option value="Business">Business</option>
                                                    <option value="Employee">Employee</option>
                                                    <option value="Government">Government</option>
                                                    <option value="Jobless">Jobless</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label className="lb">Company Name:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="company_name"
                                                    value={formData.company_name}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 form-group">
                                                    <label className="lb">Monthly Income / Salary:</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="salary"
                                                        value={formData.salary}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="lb">Total Experience:</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="total_experience"
                                                        value={formData.total_experience}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="lb">Degree:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="degree"
                                                    value={formData.degree}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 form-group">
                                                    <label className="lb">School:</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="school"
                                                        value={formData.school}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="lb">College:</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="college"
                                                        value={formData.college}
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
                                                        onClick={handleEducationSubmit}
                                                    >
                                                        Save & Continue
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Caste information */}
                                        <div className="edit-pro-parti">
                                            <div className="form-tit">
                                                <h4>Religion</h4>
                                                <h1>Religion & Caste Information</h1>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 form-group">
                                                    <label className="lb">Religion:<span>*</span></label>
                                                    <select
                                                        className="form-control"
                                                        name="religion"
                                                        value={formData.religion || ''}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="">Select Religion</option>
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
                                                    <label className="lb">Caste:<span>*</span></label>
                                                    <select
                                                        className="form-control"
                                                        name="caste"
                                                        value={formData.caste || ''}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="">Select Caste</option>
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
                                                <div className="col-md-6 form-group">
                                                    <label className="lb">Gothram:</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="gothram"
                                                        value={formData.gothram}
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
                                                <div className="col-md-6 form-group">
                                                    <label className="lb">Star / Natchatra:</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="star"
                                                        value={formData.star}
                                                        onChange={handleChange}
                                                        placeholder="ex:Revathi/Rohini"
                                                    />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="lb">Zodiacal Sign / Raasi:</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="raasi"
                                                        value={formData.raasi}
                                                        onChange={handleChange}
                                                        placeholder="ex:Meenam/Mesam"
                                                    />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="lb">Mother Tongue:</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="mother_tongue"
                                                        value={formData.mother_tongue}
                                                        onChange={handleChange}
                                                        placeholder="ex:Tamil/Telugu..."
                                                    />

                                                </div>
                                                <div className="form-group" style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                                                    <input
                                                        type="checkbox"
                                                        name="willing_to_marry_from_another_caste"
                                                        checked={formData.willing_to_marry_from_another_caste}// Will be true or false
                                                        onChange={handleCheckboxChange}
                                                        style={{ marginRight: '10px' }}
                                                    />

                                                    <label style={{ margin: 0 }}>
                                                        Willing to marry from another caste
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 form-group"></div>
                                                <div className="col-md-6 form-group">
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary"
                                                        onClick={handleReligionSubmit}
                                                    >
                                                        Save & Continue
                                                    </button>
                                                </div>
                                            </div>
                                        </div>



                                        <div className="edit-pro-parti">
                                            <div className="form-tit">
                                                <h4>Media</h4>
                                                <h1>Social media</h1>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 form-group">
                                                    <label className="lb">WhatsApp:</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="whatsapp"
                                                        value={formData.whatsapp}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="lb">Facebook:</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="facebook"
                                                        value={formData.facebook}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 form-group">
                                                    <label className="lb">Instagram:</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="instagram"
                                                        value={formData.instagram}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="lb">X (Twitter):</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="twitter"
                                                        value={formData.twitter}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 form-group">
                                                    <label className="lb">YouTube:</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="youtube"
                                                        value={formData.youtube}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="lb">LinkedIn:</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="linkedin"
                                                        value={formData.linkedin}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12 form-group">
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary"
                                                        disabled={!(formData.whatsapp || formData.facebook || formData.instagram || formData.twitter || formData.youtube || formData.linkedin)}
                                                        onClick={handleSocialMediaSubmit}
                                                    >
                                                        Save & Complete
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
            </div >
        </section >
    );
};

export default UpdateUserProfile;
