import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './PassengerInformationAdultMidddleTab.css';
import PropTypes from 'prop-types';
import searchIcon from "./SearchPassenger.svg"
import {useNavigate} from "react-router-dom";
import {useLocation} from "react-router-dom";


const PassengersInformationAdultMiddleTab = ( {searchDetails}) => {
    PassengersInformationAdultMiddleTab.propTypes = {
        searchDetails: PropTypes.object.isRequired,
    };
    const [departurePort, setDeparturePort] = useState('Lagos(LOS)');
    const [arrivalPort, setArrivalPort] = useState('Abuja(ABJ)');
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [tripType, setTripType] = useState('ONE_WAY');
    const [noOfAdult, setNoOfAdult] = useState(0); // Default to 1 adult
    const [noOfChildren, setNoOfChildren] = useState(0); // Default to 0 children
    const [noOfInfant, setNoOfInfant] = useState(0); // Default to 0 infants
    const navigate  = useNavigate();
    const storedSearchDetails = JSON.parse(localStorage.getItem("searchDetails"));
    // const totalPrice = JSON.parse(localStorage.getItem("totalPrice"));
    const location = useLocation();
    const { departingFlights, returningFlights, totalPrice } = location.state;



    if (!searchDetails) {
        return <div>Loading...</div>;
    }


    const handleAdultChange = (e) => {
        setNoOfAdult(parseInt(e.target.value));
    };

    const handleChildrenChange = (e) => {
        setNoOfChildren(parseInt(e.target.value));
    };
    const handleDeparturePortChange = (e) => {
        setDeparturePort(e.target.value);
    };
    const handleArrivalPortChange = (e) => {
        setArrivalPort(e.target.value);
    };
    const handleDepartureDateChange = (e) => {
        setDepartureDate(e.target.value);
    };
    const handleReturnDateChange = (e) => {
        setReturnDate(e.target.value);
    };
    const handleTripTypeChange = (e) => {
        setTripType(e.target.value);
    };

    const handleInfantChange = (e) => {
        setNoOfInfant(parseInt(e.target.value));
    };
    function getFormattedDate(dateString) {

        const date = new Date(dateString);
        const options = { weekday: 'short', day: '2-digit', month: 'short' };
        return date.toLocaleDateString('en-US', options);
    }

    return (
        <div>
            <div className="middletab-adultb">
                <div className='search-containerb'>
                    <Link to="/">
                        <button className="search-buttonb" type="submit" >
                            <img src={searchIcon} alt='ButtonSearchad' />
                        </button>
                    </Link>

                </div>
                <div className="flightdetails-adultb">
                    <h3>{departingFlights[0].departurePortCity}({departingFlights[0].departurePortName}) - {departingFlights[0].arrivalPortCity}({departingFlights[0]?.arrivalPortName})</h3>
                    <h4>{storedSearchDetails.departureDate?getFormattedDate(storedSearchDetails.departureDate):" "} {storedSearchDetails.returnDate?" - "+getFormattedDate(storedSearchDetails?.returnDate):" "}  | {storedSearchDetails?.noOfAdult} Adult, {storedSearchDetails?.noOfChildren} Child, {storedSearchDetails?.noOfInfant} Infant | {storedSearchDetails?.tripType}</h4>

                </div>


                <div className="total-price-container-adultb">
                    <h1>Total Price</h1>
                    <h4>NGN {totalPrice?totalPrice:0}</h4>
                </div>
            </div>
        </div>

     );
 };




export default PassengersInformationAdultMiddleTab;