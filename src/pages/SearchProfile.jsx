import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useToast } from '../assets/utils/toastUtil';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import config from '../config';
import SEO from '../components/SEO';
import { religions, castes, ageRanges, educationLevels, occupations, incomeRanges, maritalStatus, bodyTypes, heights } from '../data/matrimonyOptions';
import SearchableSelect from '../components/SearchableSelect';

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
    // Update the form state
    setFormData({
      ...formData,
      state: selectedState,
      city: ""  // Reset the city value when state changes
    });

    // If no state is selected, reset the cities list and return early
    if (!selectedState) {

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
    fullApiUrl = apiUrl + 'search';
  } else {
    console.error('Invalid API url');
  }
  const [searchForm, setSearchForm] = useState({
    gender: '',
    age: '',
    religion: 'Hindu',
    caste: '',
    city: ''
  });

  // Handle form change
  const handleInputChange = (e) => {
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
    // Religion is always Hindu, no validation needed
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

  const baseUrl = process.env.NODE_ENV === 'production' ? 'https://pooluvagounder.com/' : 'http://localhost:3000';

  // Structured data for Search Profile page
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Search Matrimony Profiles - PooluvaGounderMatrimony",
    "description": "Search for your perfect life partner on PooluvaGounderMatrimony. Filter by age, religion, caste, location and find verified profiles from all communities across India.",
    "url": `${baseUrl}/search`,
    "mainEntity": {
      "@type": "Service",
      "name": "Matrimony Profile Search",
      "description": "Advanced search functionality to find compatible life partners",
      "provider": {
        "@type": "Organization",
        "name": "PooluvaGounderMatrimony"
      }
    }
  };

  return (
    <>
      <SEO
        title="Search Matrimony Profiles - Find Your Perfect Life Partner | PooluvaGounderMatrimony"
        description="Search for your perfect life partner on PooluvaGounderMatrimony. Filter by age, religion, caste, location and find verified profiles from all communities across India. Start your search today!"
        keywords="search matrimony profiles, find life partner, matrimony search, marriage bureau search, shaadi search, muslim matrimony search, hindu matrimony search, christian matrimony search, sikh matrimony search, gounder matrimony search, chettiar matrimony search, all community matrimony search, india matrimony search, inter caste marriage search, inter religion marriage search, matrimony profile search, marriage partner search, bride search, groom search, matrimonial search, wedding soul mates search, verified profiles search, matrimony filter, marriage bureau filter"
        image={`${baseUrl}/matrimo/images/og-image.png`}
        url={`${baseUrl}/search`}
        canonical={`${baseUrl}/search`}
        schema={schemaData}
        type="website"
      />
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
              {ageRanges.map((age) => (
                <option key={age.value} value={age.value}>
                  {age.label}
                </option>
              ))}
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
              {religions.map((religion) => (
                <option key={religion.value} value={religion.value}>
                  {religion.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="filt-com lhs-cate">
          <h4><i className="fa fa-bell-o" aria-hidden="true"></i>Select Caste</h4>
          <div className="form-group">
            <SearchableSelect
              options={castes}
              value={searchForm.caste}
              onChange={handleInputChange}
              name="caste"
              placeholder="Search and select caste..."
              className="caste-searchable-select"
            />
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