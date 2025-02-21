import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../config';
import { useRef } from 'react';


const SearchSection = () => {
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [searchResult, setSearchResults] = useState('');
    const navigate = useNavigate();

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
        if (selectedState) {
          setFormData({
            ...formData,
            state: selectedState // this will set formData.state to the selected value
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
        religion: '',
        state: '',
        city: ''
    });

    // Handle form change
    const handleInputChange = (e) => {
        console.log('Input Changed:', e.target.name, e.target.value);  // Log the name and value of the input
        setSearchForm({
            ...searchForm,
            [e.target.name]: e.target.value, // Update the specific field
        });
    };

      const cityRef = useRef(null);
    

    // Submit handler (if you want to process the form submission)
    const handleSubmit = async (e) => {

        e.preventDefault(); // Ensure that the form doesn't refresh the page
        console.log('Form Data:', searchForm);  // Log the form data
        
        try {
            const response = await fetch(fullApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    gender: searchForm.gender,
                    age: searchForm.age, 
                    religion: searchForm.religion, 
                    state: searchForm.state, 
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
            <section>
                <div className="str">
                    <div className="hom-head">
                        <div className="container">
                            <div className="row">
                                <div className="hom-ban">
                                    <div className="ban-tit">
                                        <span><i className="no1"> <em style={{ fontFamily: 'Cinzel Decorative', fontStyle: 'cursive' }}>Wedding Soul Mates</em></i> <br />Matrimony</span>
                                        <h1>Find your<br /><b>Right Match</b> here</h1>
                                        <p>The leading choice for finding lifelong partners.</p>
                                    </div>

                                    {/* Search Form */}
                                    <div className="ban-search chosenini">
                                        <form onSubmit={handleSubmit}>
                                            <ul>
                                                <li className="sr-look">
                                                    <div className="form-group">
                                                        <label>I'm looking for</label>
                                                        <select
                                                            className="form-select"
                                                            required
                                                            name="gender"
                                                            value={searchForm.gender}
                                                            onChange={(e) => {
                                                                handleInputChange(e);
                                                            }}
                                                        >
                                                            <option value="">Select your Gender</option>
                                                            <option value="Male">Male</option>
                                                            <option value="Female">Female</option>
                                                        </select>
                                                    </div>
                                                </li>

                                                <li className="sr-age">
                                                    <div className="form-group">
                                                        <label>Age</label>
                                                        <select
                                                            className="form-select"
                                                            required
                                                            name="age"
                                                            value={searchForm.age}
                                                            onChange={(e) => {
                                                                handleInputChange(e);
                                                            }}
                                                        >
                                                            <option value="">Select Age Range</option>
                                                            <option value="18 to 30">18 to 30</option>
                                                            <option value="31 to 40">31 to 40</option>
                                                            <option value="41 to 50">41 to 50</option>
                                                            <option value="51 to 60">51 to 60</option>
                                                            <option value="61 to 70">60 & above</option>
                                                        </select>
                                                    </div>
                                                </li>

                                                <li className="sr-reli">
                                                    <div className="form-group">
                                                        <label>Religion</label>
                                                        <select
                                                            className="form-select"
                                                            required
                                                            name="religion"
                                                            value={searchForm.religion}
                                                            onChange={(e) => {
                                                                handleInputChange(e);
                                                            }}
                                                        >
                                                            <option value="">Religion</option>
                                                            <option value="Any">Any</option>
                                                            <option value="Hindu">Hindu</option>
                                                            <option value="Muslim">Muslim</option>
                                                            <option value="Jain">Jain</option>
                                                            <option value="Christian">Christian</option>
                                                        </select>
                                                    </div>
                                                </li>

                                                <li className="sr-state">
                                                    <div className="form-group">
                                                        <label>State</label>
                                                        <select
                                                            className="form-select"
                                                            required
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
                                                </li>

                                                <li className="sr-cit">
                                                    <div className="form-group">
                                                        <label>City</label>
                                                        <select
                                                            className="form-select"
                                                            required
                                                            name="city"
                                                            ref={cityRef}  // Attach the ref to city input
                                                            value={searchForm.city}
                                                            onChange={handleInputChange}
                                                        >
                                                            <option value="">Select a City</option>
                                                                {cities.map((city) => (
                                                                  <option key={city} value={city}>
                                                                    {city}
                                                                  </option>
                                                                ))}
                                                        </select>
                                                    </div>
                                                </li>

                                                <li className="sr-btn">
                                                    <input type="submit" value="Search" />
                                                </li>
                                            </ul>
                                        </form>
                                    </div>
                                    {/* End of Search Form */}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}

export default SearchSection

//search section.jsx