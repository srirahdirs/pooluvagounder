import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../config';
const SearchSection = () => {
    const [searchResult, setSearchResults] = useState('');
    const navigate = useNavigate();

    const apiUrl = config?.apiUrl;
    let fullApiUrl;
    if (apiUrl) {
        fullApiUrl = apiUrl + 'search';
    } else {
        console.error('Invalid API url');
    }
    const [searchForm, setSearchForm] = useState({
        lookingFor: '',
        age: '',
        religion: '',
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

    // Submit handler (if you want to process the form submission)
    const handleSubmit = async (e) => {

        e.preventDefault(); // Ensure that the form doesn't refresh the page
        try {
            const response = await fetch(fullApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ gender: searchForm.gender, age: searchForm.age, religion: searchForm.religion, city: searchForm.city }),
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
                                                            <option value="61 to 70">61 to 70</option>
                                                            <option value="71 to 80">71 to 80</option>
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

                                                <li className="sr-cit">
                                                    <div className="form-group">
                                                        <label>City</label>
                                                        <select
                                                            className="form-select"
                                                            required
                                                            name="city"
                                                            value={searchForm.city}
                                                            onChange={(e) => {
                                                                handleInputChange(e);
                                                            }}
                                                        >
                                                            <option value="">Location</option>
                                                            <option value="Any">Any location</option>
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