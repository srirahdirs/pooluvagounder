import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useToast } from '../assets/utils/toastUtil';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import config from '../config';

const SearchProfile = ({ user }) => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [searchResult, setSearchResults] = useState('');
  const navigate = useNavigate();
  const { toast, showToast } = useToast();

  const [formData, setFormData] = useState({
    state: '',
    city: ''
  });



  useEffect(() => {
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
    const selectedState = e.target.value;
    console.log('Selected State:', selectedState);
    // Update the form state
    setFormData({
      ...formData,
      state: selectedState,
      city: ""  // Reset the city value when state changes
    });

    // If no state is selected, reset the cities list and return early
    if (!selectedState) {
      console.log('Selected State:', cityRef);

      // Reset city value in searchForm
      setSearchForm((prevState) => ({
        ...prevState,
        city: ""  // Clear city value in searchForm
      }));

      // Clear cityRef value
      if (cityRef.current) {
        cityRef.current.value = "";  // Reset the ref value for the city
      }

      setCities([]);  // Clear the cities list when no state is selected
      return;
    }

    try {
      // Fetch cities only when a valid state is selected
      const response = await fetch(`https://countriesnow.space/api/v0.1/countries/state/cities`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country: 'India', state: selectedState }),
      });

      const result = await response.json();
      setCities(result.data || []);  // Set cities based on the API response
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };



  const apiUrl = config?.apiUrl;
  let fullApiUrl;
  if (apiUrl) {
    fullApiUrl = apiUrl + 'loggedInSearch';
  } else {
    console.error('Invalid API url');
  }
  const [searchForm, setSearchForm] = useState({
    gender: '',
    age: '',
    religion: '',
    caste: '',
    city: ''
  });

  // Handle form change
  const handleInputChange = (e) => {
    console.log('Input Changed:', e.target.name, e.target.value);  // Log the name and value of the input
    setSearchForm({
      ...searchForm,
      [e.target.name]: e.target.value,
    });
  };

  const genderRef = useRef(null);
  const ageRef = useRef(null);
  const religionRef = useRef(null);
  const casteRef = useRef(null);
  const cityRef = useRef(null);

  const validateForm = () => {
    if (searchForm.gender === '') {
      showToast("Gender Required", 'error');
      genderRef.current.focus(); // Focus on the gender select input
      return false;
    }
    if (searchForm.age === '') {
      showToast("Age Required", 'error');
      ageRef.current.focus(); // Focus on the age select input
      return false;
    }
    if (searchForm.religion === '') {
      showToast("Religion Required", 'error');
      religionRef.current.focus(); // Focus on the religion select input
      return false;
    }
    // if (searchForm.caste === '') {
    //   showToast("Caste Required", 'error');
    //   casteRef.current.focus(); // Focus on the caste select input
    //   return false;
    // }
    // if (searchForm.city === '') {
    //   showToast("Location Required", 'error');
    //   cityRef.current.focus(); // Focus on the city select input
    //   return false;
    // }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Validate the form before submitting
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(fullApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
          gender: searchForm.gender,
          age: searchForm.age,
          religion: searchForm.religion,
          caste: searchForm.caste,
          state: formData.state,
          city: searchForm.city
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setSearchResults(result.data);  // Assuming you have a setSearchResults function in context or state
        navigate('/allprofiles', { state: { searchResults: result.data } });
      } else {
        if (response.status === 401) {
          showToast("Authentication token is required", 'error');
        } else {
          showToast("Please try again!", 'error');
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className="col-md-3 fil-mob-view">
        <Toast ref={toast} />
        <span className="filter-clo">+</span>
        <div className="filt-com lhs-cate">
          <h4><i className="fa fa-search" aria-hidden="true"></i> I'm looking for</h4>
          <div className="form-group">
            <select
              className="form-select"
              required
              name="gender"
              ref={genderRef}  // Attach the ref to gender input
              value={searchForm.gender}
              onChange={handleInputChange}
            >
              <option value="">I'm looking for</option>
              <option value="Male">Men</option>
              <option value="Female">Women</option>
            </select>
          </div>
        </div>

        <div className="filt-com lhs-cate">
          <h4><i className="fa fa-clock-o" aria-hidden="true"></i>Age</h4>
          <div className="form-group">
            <select
              className="form-select"
              required
              name="age"
              ref={ageRef}  // Attach the ref to age input
              value={searchForm.age}
              onChange={handleInputChange}
            >
              <option value="">Select age</option>
              <option value="18 to 30">18 to 30</option>
              <option value="31 to 40">31 to 40</option>
              <option value="41 to 50">41 to 50</option>
              <option value="51 to 60">51 to 60</option>
              <option value="61 to 70">60 & above</option>
              {/* <option value="71 to 80">71 to 80</option> */}
            </select>
          </div>
        </div>

        <div className="filt-com lhs-cate">
          <h4><i className="fa fa-bell-o" aria-hidden="true"></i>Select Religion</h4>
          <div className="form-group">
            <select
              className="form-select"
              required
              name="religion"
              ref={religionRef}  // Attach the ref to religion input
              value={searchForm.religion}
              onChange={handleInputChange}
            >
              <option value="">Religion</option>
              <option value="Any">Any</option>
              <option value="Hindu">Hindu</option>
              <option value="Muslim">Muslim</option>
              <option value="Jain">Jain</option>
              <option value="Christian">Christian</option>
            </select>
          </div>
        </div>

        <div className="filt-com lhs-cate">
          <h4><i className="fa fa-bell-o" aria-hidden="true"></i>Select Caste</h4>
          <div className="form-group">
            <select
              className="form-select"
              name="caste"
              ref={casteRef}  // Attach the ref to caste input
              value={searchForm.caste}
              onChange={handleInputChange}
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
          </div>
        </div>

        <div className="filt-com lhs-cate">
          <h4><i className="fa fa-map-marker" aria-hidden="true"></i>State</h4>
          <div className="form-group">
            <select
              className="form-select"
              name="state"
              value={formData.state}
              onChange={fetchCities}
            >
              <option value="">Select a State</option>
              {states.map((state) => (
                <option key={state.state_code} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="filt-com lhs-cate">
          <h4><i className="fa fa-map-marker" aria-hidden="true"></i>City</h4>
          <div className="form-group">
            <select
              className="form-select"
              name="city"
              ref={cityRef}  // Attach the ref to city input
              value={searchForm.city}  // city value should be bound to searchForm.city
              onChange={handleInputChange}
              disabled={cities.length === 0}  // Disable the city dropdown if no cities are available
            >
              <option value="">Select a City</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>


        <div className="filt-com filt-send-query">
          <div className="send-query">
            <h5>What are you looking for?</h5>
            <p>We will help you to arrange the best match for you.</p>
            <a href="/contact" >Send your queries</a>
          </div>
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-primary" id="search_filter" onClick={handleSubmit}>
            Search
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchProfile;