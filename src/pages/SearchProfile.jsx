import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../assets/utils/toastUtil';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';

const SearchProfile = () => {
  const [searchResult, setSearchResults] = useState('');
  const navigate = useNavigate();
  const { toast, showToast } = useToast();

  const [searchForm, setSearchForm] = useState({
    gender: '',
    age: '',
    religion: '',
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
    if (searchForm.city === '') {
      showToast("Location Required", 'error');
      cityRef.current.focus(); // Focus on the city select input
      return false;
    }
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Validate the form before submitting
    try {
      const response = await fetch('http://localhost:4000/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gender: searchForm.gender,
          age: searchForm.age,
          religion: searchForm.religion,
          city: searchForm.city
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setSearchResults(result.data);  // Assuming you have a setSearchResults function in context or state
        navigate('/allprofiles', { state: { searchResults: result.data } });
      } else {
        console.error('Failed');
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
              <option value="61 to 70">61 to 70</option>
              <option value="71 to 80">71 to 80</option>
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
          <h4><i className="fa fa-map-marker" aria-hidden="true"></i>Location</h4>
          <div className="form-group">
            <select
              className="form-select"
              required
              name="city"
              ref={cityRef}  // Attach the ref to city input
              value={searchForm.city}
              onChange={handleInputChange}
            >
              <option value="">Location</option>
              <option value="Any">Any location</option>
            </select>
          </div>
        </div>

        <div className="filt-com filt-send-query">
          <div className="send-query">
            <h5>What are you looking for?</h5>
            <p>We will help you to arrange the best match for you.</p>
            <a href="#!" data-bs-toggle="modal" data-bs-target="#expfrm">Send your queries</a>
          </div>
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
            Search
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchProfile;
