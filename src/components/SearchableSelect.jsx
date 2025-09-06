import React, { useState, useRef, useEffect } from 'react';
import './SearchableSelect.css';

const SearchableSelect = ({
    options = [],
    value = '',
    onChange = () => { },
    placeholder = 'Select an option',
    name = '',
    className = '',
    error = '',
    label = '',
    required = false,
    disabled = false
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);

    // Filter options based on search term
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredOptions(options);
        } else {
            const filtered = options.filter(option =>
                option.label.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredOptions(filtered);
        }
        setHighlightedIndex(-1);
    }, [searchTerm, options]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
                setSearchTerm('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Handle keyboard navigation
    const handleKeyDown = (e) => {
        if (!isOpen) {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
                e.preventDefault();
                setIsOpen(true);
                inputRef.current?.focus();
            }
            return;
        }

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setHighlightedIndex(prev =>
                    prev < filteredOptions.length - 1 ? prev + 1 : prev
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1);
                break;
            case 'Enter':
                e.preventDefault();
                if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
                    handleOptionSelect(filteredOptions[highlightedIndex]);
                }
                break;
            case 'Escape':
                e.preventDefault();
                setIsOpen(false);
                setSearchTerm('');
                inputRef.current?.blur();
                break;
        }
    };

    const handleOptionSelect = (option) => {
        onChange({
            target: {
                name: name,
                value: option.value
            }
        });
        setIsOpen(false);
        setSearchTerm('');
        setHighlightedIndex(-1);
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
        if (!isOpen) {
            setIsOpen(true);
        }
    };

    const handleInputFocus = () => {
        setIsOpen(true);
        setSearchTerm('');
    };

    const getDisplayValue = () => {
        const selectedOption = options.find(option => option.value === value);
        return selectedOption ? selectedOption.label : '';
    };

    return (
        <div className={`searchable-select-container ${className}`} ref={dropdownRef}>
            {label && (
                <label className="searchable-select-label">
                    {label}
                    {required && <span className="required-asterisk">*</span>}
                </label>
            )}

            <div className="searchable-select-wrapper">
                <input
                    ref={inputRef}
                    type="text"
                    className={`searchable-select-input ${error ? 'error' : ''}`}
                    value={isOpen ? searchTerm : getDisplayValue()}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    disabled={disabled}
                    autoComplete="off"
                />

                <button
                    type="button"
                    className={`searchable-select-arrow ${isOpen ? 'open' : ''}`}
                    onClick={() => setIsOpen(!isOpen)}
                    disabled={disabled}
                >
                    ▼
                </button>
            </div>

            {isOpen && (
                <div className="searchable-select-dropdown">
                    {filteredOptions.length === 0 ? (
                        <div className="searchable-select-no-results">
                            No options found
                        </div>
                    ) : (
                        <ul className="searchable-select-options">
                            {filteredOptions.map((option, index) => (
                                <li
                                    key={option.value}
                                    className={`searchable-select-option ${index === highlightedIndex ? 'highlighted' : ''
                                        } ${option.value === value ? 'selected' : ''}`}
                                    onClick={() => handleOptionSelect(option)}
                                    onMouseEnter={() => setHighlightedIndex(index)}
                                >
                                    {option.label}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {error && <div className="searchable-select-error">{error}</div>}
        </div>
    );
};

export default SearchableSelect;
