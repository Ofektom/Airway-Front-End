import React, { useState, useEffect } from "react";
import "./FlightSelectionOne.css";
import { useLocation } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FlightInformationPageBody from "../FlightInformationPage/FlightInformationPageBody/FlightInformationPageBody";
import "../FlightInformationPage/FlightInformationPageBody/FlightInformationPageBody.css";
import {Link} from "react-router-dom";
import  PlaneImage from "../../assets/planeInMotion.svg";
import flightImage from "../../assets/Flight-Icon.svg";
import flightImg from "../../assets/Flight-Icon.svg";
import smallDepart from "../../assets/smalldep.svg";
import bigDepart from "../../assets/bigdep.svg";
import smallReturn from "../../assets/smallreturnplan.svg";
import returnPlane from "../../assets/returningplane.svg";



const SliderWrapper = styled.div`
  margin-top: 20px;

  & > div {
    color: black;
    background-color: white;
  }

  .departureslider {
    border: 1px solid #ccc;
    background-color: #001f3f;
    color: white;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    height: 8em
  }

  .departureslider .day {
    font-weight: bold;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .departureslider .date {
    font-weight: bold;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .returnslider {
    border: 1px solid #ccc;
    height: 8em;
    margin-bottom: 10px;
    background-color: #001f3f;
    color: white;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
  }

  .returnslider .day {
    font-weight: bold;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .returnslider .date {
    font-weight: bold;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
`;

function FlightSelectionOne(props) {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  let [data, setData] = useState([]);
  const [departingFlights, setDepartingFlights] = useState([]);
  const [returningFlights, setReturningFlights] = useState([]);
  const [departureTotalFlights, setDepartureTotalFlights] = useState(0);
  const [returningTotalFlights, setReturningTotalFlights] = useState(0);
  const [allDeparture, setAllDeparture] = useState([]);
  const [allReturning, setAllReturning] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedDepartingClasses, setSelectedDepartingClasses] = useState("");
  const [selectedReturningSelectedClasses, setReturningSelectedClasses] = useState("");
  const [departingFlightDate, setDepartingFlightDate] = useState("");
  const [returningFlightDate, setReturningFlightDate] = useState("");
  const [selectedDepartingFlightInfo, setSelectedDepartingFlightInfo] = useState(0);
  const [selectedDepartingFlight, setSelectedDepartingFlight] = useState(0);
  const [selectedReturningFlightInfo, setSelectedReturningFlightInfo] = useState(0);
  const [selectedReturningFlight, setSelectedReturningFlight] = useState(0);
  const [departingFlightPrice, setDepartingFlightPrice] = useState(0);
  const [returningFlightPrice, setReturningFlightPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [returnClickedSlider, setReturnClickedSlider] = useState(null);
  const [departClickedSlider, setDepartClickedSlider] = useState(null);






  function getAllDaysInYear(year) {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);

    const days = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return days;
  }

  const year = 2024;
  const daysInYear = getAllDaysInYear(year);
  console.log(daysInYear)



  const handleReturnSliderClick = (index) => {
    setReturnClickedSlider(index);
  };

  const handleDepartSliderClick = (index) => {
    setDepartClickedSlider(index);
  };

  const filteredDepartingFlights = allDeparture.filter((flight) => {
    return flight.departureDate === departingFlightDate;
  });

  const filteredReturningFlights = allReturning.filter((flight) => {
    return flight.departureDate === returningFlightDate;
  });

  const filteredDepartingFlightInfo = filteredDepartingFlights.filter ((_,index)=> index + 1===Number(selectedDepartingFlightInfo));
  const departingFlightsInfo = ( filteredDepartingFlightInfo?.length?filteredDepartingFlightInfo : filteredDepartingFlights);

  const searchedDepartingFlight = departingFlights.filter((_,index) => index + 1 ===Number (selectedDepartingFlight));
  const searchedDepartingFlightInfo = (searchedDepartingFlight?.length?searchedDepartingFlight : departingFlights);

  const filteredReturningFlightInfo = filteredReturningFlights.filter ((_,index)=> index + 1===Number(selectedReturningFlightInfo))
  const returningFlightsInfo = (filteredReturningFlightInfo?.length?filteredReturningFlightInfo : filteredReturningFlights)

  const searchedReturningFlight = returningFlights.filter((_,index) => index + 1 ===Number (selectedReturningFlight));
  const searchedReturningFlightInfo = (searchedReturningFlight?.length?searchedReturningFlight : returningFlights);

  const showModal = () => {
    setModal(true);
  };

  const cancel =()=>{
    setModal(false);
  }

  const getUsernameFromLocalStorage = () => {
    return localStorage.getItem("username") || "";
  };

  function getFormattedDate(dateString) {
    console.log(dateString)
    const date = new Date(dateString);
    const options = { weekday: 'short', day: '2-digit', month: 'short' };
    return date.toLocaleDateString('en-US', options);
  }

  function getDepartingFlightDate(dateString) {
    setDepartingFlightDate(dateString);
    console.log(dateString);
    setSelectedDepartingFlightInfo(0);
  }

  function getReturningFlightDate(dateString) {
    setReturningFlightDate(dateString);
    console.log(dateString);
    setSelectedReturningFlightInfo(0);
  }

  useEffect(() => {
    const authenticatedUsername = getUsernameFromLocalStorage();
    if (authenticatedUsername) {
      setUsername(authenticatedUsername);
      setIsAuthenticated(true);
    }
  }, []);

  function getDayOfWeek(dateString) {
    const date = new Date(dateString);
    const dayOfWeek = date.getDay();
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return dayNames[dayOfWeek];
  }
  console.log(getDayOfWeek("2024-03-02"));
  console.log(location);

  const firstName = JSON.parse(localStorage.getItem('userFirstName'));

  const routeSearch = (e) => {
    navigate(`/`);
  };

  const routePassengerInformation = (e) => {
    navigate(`/passenger-information`);
  };

  const handleDepartingSelectFlight = (classId) => {
    localStorage.setItem("selectedDepartingFlightId", classId);
    setSelectedDepartingClasses(classId);
    setDepartingFlightPrice(departingFlightPrice);
  };

  const handleReturningSelectFlight = (classId) => {
    localStorage.setItem("selectedReturningFlightId", classId);
    console.log(classId);
    setReturningSelectedClasses(classId);
    setReturningFlightPrice(returningFlightPrice);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 100,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
    nextArrow: <MdChevronRight color="black" size={8} />,
    prevArrow: <MdChevronLeft color="black" size={8} />,
  };

  const storedSearchDetails = JSON.parse(localStorage.getItem("searchDetails"));

  console.log("ss", storedSearchDetails);

  useEffect(() => {
    const fetchData = async () => {
      try {
        data = location.state || {};
        if (data && data["Departing Flights"]) {
          setDepartingFlights(data["Departing Flights"]?.flights || []);
          setDepartureTotalFlights(
              data["Departing Flights"]?.totalFlights || 0
          );
          departingFlights.forEach((flight) => {
            const classes = flight?.classes;
            classes.forEach((classItem) => {
            });
          });
        }
        if (data && data["Returning Flights"]) {
          setReturningFlights(data["Returning Flights"]?.flights || []);
          setReturningTotalFlights(
              data["Returning Flights"]?.totalFlights || 0
          );

          returningFlights.forEach((flight) => {
            const classes = flight.classes;
            console.log("classes for flight" + flight?.flightNo);
            classes.forEach((classItem) => {
              console.log(
                  classItem.className,
                  classItem.baseFare,
                  classItem.availableSeat,
                  classItem.id
              );
            });
          });
        }
      } catch (error) {
        console.error("Error fetching flight data:".error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log("sott", storedSearchDetails);
    if (!storedSearchDetails) return;
    const fetchDepartingFlights = async () => {
      try {
        const response = await axios.get(
            `http://localhost:8080/api/v1/flights/all-departing-flights?departurePort=${storedSearchDetails?.departurePort}&arrivalPort=${storedSearchDetails?.arrivalPort}&departureDate=${storedSearchDetails?.departureDate}`
        );

        if (response && response.status === 200) setAllDeparture(response.data);
        else {
          console.log("departures", response);
        }
      } catch (error) {
        console.log("Error fetching departing flights:", error);
      }
    };
    fetchDepartingFlights();
  }, []);

  useEffect(() => {
    if (!storedSearchDetails) return;
    console.log(storedSearchDetails);
    const fetchReturningFlights = async () => {
      try {
        const response = await axios.get(
            `http://localhost:8080/api/v1/flights/all-returning-flights?departurePort=${storedSearchDetails?.arrivalPort}&arrivalPort=${storedSearchDetails?.departurePort}&arrivalDate=${storedSearchDetails?.returnDate}`
        );
        console.log(response);
        if (response && response.status === 200) {
          setAllReturning(response.data);
        } else {
          console.log("Error fetching returning flights:", response);
        }
      } catch (error) {
        console.log("Error fetching returning flights:", error);
      }
    };
    fetchReturningFlights();
  }, []);

  useEffect(() => {
    setTotalPrice(returningFlightPrice + departingFlightPrice);
  }, [returningFlightPrice, departingFlightPrice]);


  useEffect(() => {
    setTotalPrice(returningFlightPrice + departingFlightPrice);
    localStorage.setItem('totalPrice', totalPrice.toString());
  }, [returningFlightPrice, departingFlightPrice, totalPrice]);


  function convertTo12HourFormat(departureTime) {
    console.log("Input departure time:", departureTime);
    const [hours, minutes] = departureTime.split(":");
    const time = new Date(0, 0, 0, hours, minutes);
    console.log("Date object:", time);

    const formattedTime = time.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });
    console.log("Formatted time:", formattedTime);
    return formattedTime;
  }

  function convertTo12HourFormat(arrivalTime) {
    console.log("Input departure time:", arrivalTime);
    const [hours, minutes] = arrivalTime.split(":");
    const time = new Date(0, 0, 0, hours, minutes);
    console.log("Date object:", time);

    const formattedTime = time.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });
    console.log("Formatted time:", formattedTime);
    return formattedTime;
  }

  const [departureCalenderValue, setDepartureCalenderValue] = useState(
      storedSearchDetails?.departureDate
  );
  const filterDepatureCalender = allDeparture.filter((flight) => {
    return (
        new Date(flight.departureDate)?.toLocaleDateString() ===
        new Date(departureCalenderValue)?.toLocaleDateString()
    );
  });

  const [returnCalenderValue, setReturnCalenderValue] = useState(
      storedSearchDetails?.departureDate
  );
  const filterReturnCalender = allDeparture.filter((flight) => {
    return (
        new Date(flight.departureDate)?.toLocaleDateString() ===
        new Date(returnCalenderValue)?.toLocaleDateString()
    );
  });

  const searchedDepartureDateIndex = daysInYear.findIndex(day => day.toLocaleDateString() === new Date(departureCalenderValue).toLocaleDateString());
  const searchedReturningDateIndex = daysInYear.findIndex(day => day.toLocaleDateString() === new Date(returnCalenderValue).toLocaleDateString());
  const departureDates = allDeparture.map(flight => flight.departureDate);
  const allDepartureJSON = JSON.stringify(departureDates);
  localStorage.setItem('allDeparture', allDepartureJSON);









  return (
      <div className="parent">
        <div className="headercontainer">
          <div className="flightImgAndAirway">
            <img src={PlaneImage} alt="Plane" />{" "}
            <span className="airwayText">Airway</span>
          </div>
          <div className="infoflight">
            <div className="imgflightinfo">
              <img src="src/assets/Group 5.svg" alt="Group" />{" "}
            </div>
            <div className="statusPassengerPaymentConfirmation">
              <div className="flightSel">Flight Selection</div>
              <div className="passenger">Passenger Info</div>
              <div className="passenger">Payment</div>
              <div className="confirm">Confirmation</div>
            </div>
          </div>
          <div className="homeAboutSign">
            <div className="homeAbout">
              <ul className="menuu">
                <li><Link to={"/"} className="menuu-item">Home</Link></li>
                <li><Link to={"/about"} className="menuu-item">About us</Link></li>
                <li>
                  {firstName ? (
                      <div className="uFirstName">
                        {firstName}
                      </div>
                  ) : (
                      <Link to={"/signup"}><button className="buttonn">Sign Up</button></Link>
                  )}
                </li>
              </ul>
              </div>
            </div>
        </div>

        {/*hero */}
        <div className="inner">
          <div className="airwayherobody">
            <div className="routesearch">
              <button
                  className="searchAirway"
                  type="button"
                  onClick={routeSearch}
              >
                <img src="src/assets/searchIcon.svg" />
                <span>Search</span>
              </button>
              <div className="routeDatePassTrip">
                {searchResults && (
                    <div>
                      <div className="#">
                        {departingFlights.length && (
                            <div>
                              <div>
                                {departingFlights[0]?.departurePortCity}(
                                {departingFlights[0]?.departurePortName})-{" "}
                                {departingFlights[0]?.arrivalPortCity} (
                                {departingFlights[0]?.arrivalPortName})
                              </div>
                            </div>
                        )}
                      </div>
                      <div className="#">
                        {getFormattedDate(storedSearchDetails?.departureDate)}
                        {storedSearchDetails && storedSearchDetails.returnDate && (
                            <span>-{" "}{getFormattedDate(storedSearchDetails.returnDate)}</span>
                        )} {" "}| {" "}
                        {storedSearchDetails?.noOfAdult} Adult
                        {storedSearchDetails?.noOfAdult > 1 ? "s" : ""},{" "}
                        {storedSearchDetails?.noOfChildren} Child
                        {storedSearchDetails?.noOfChildren > 1 ? "ren" : ""},{" "}
                        {storedSearchDetails?.noOfInfant} Infant
                        {storedSearchDetails?.noOfInfant > 1 ? "s" : ""} |
                        {storedSearchDetails?.tripType}
                      </div>
                    </div>
                )}
              </div>
            </div>
            <div className="priceairway">
              <div className="totalPrice">TotalPrice</div>
              <div className="price">
                <span>{totalPrice} NGN</span>
              </div>
            </div>
          </div>

          {allDeparture?.length > 0 && departureTotalFlights !== 0 && (
              <div className="departurebody">
                <div className="depart-div">
                  <img src="src/assets/smallflight.svg" alt="Flight" />
                  <span>Departing Flights</span>
                </div>
                <SliderWrapper>
                  <Slider
                      {...settings}
                      className="container grid justify-between pt-[20px] slider-width"
                      initialSlide={searchedDepartureDateIndex}
                  >
                    {daysInYear.map((day, index) => {
                      const flight = allDeparture.find(flight => new Date(flight.departureDate).toLocaleDateString() === day.toLocaleDateString());
                      const leastBaseFareClass = flight ? flight.classes.reduce(
                          (minClass, currentClass) => {
                            return currentClass.baseFare < minClass.baseFare ? currentClass : minClass;
                          },
                          flight.classes[0]
                      ) : null;


                      return (
                          <div
                              key={index}
                              className={index === departClickedSlider ? "boxy" : "departureslider"}
                              onClick={(e) => {
                                getDepartingFlightDate(flight?.departureDate || day.toLocaleString());
                                handleDepartSliderClick(index);
                              }}
                          >
                            <div className="date">
                              { day.toLocaleDateString()}
                            </div>
                            {flight && (
                                <>
                                  <div className="day" type="date">
                                    {getDayOfWeek(flight.departureDate)}

                                  </div>
                                  <div className="baseFare">
                                    {leastBaseFareClass.baseFare}
                                  </div>
                                  <div className="naira">NGN</div>
                                </>
                            )}
                          </div>
                      );
                    })}
                  </Slider>
                </SliderWrapper>

                {departClickedSlider === null ? (
                    <div className="departureflight">
                      <div className="nodepflight">
                        {"Number of Flights: " + departingFlights.length}
                      </div>
                      {searchedDepartingFlightInfo.map((flight, index) => (
                          <div
                              key={index}
                              className= "depinnerbody"
                              onClick={() => {
                                getDepartingFlightDate(flight?.departureDate);
                                setDepartSlider(departClickedSlider ? "boxy" : "departureslider");
                                handleDepartSliderClick(index);
                                setCurrentSearchedSlide(flight.departureDate);
                              }}
                          >

                            <div className="depflyrouteinfo">
                              <div className="depflightinfo">Flight Information</div>
                              <div className="depandarrivetime">
                                <div className="deptime">
                                  <div className="departtime">
                                    {convertTo12HourFormat(flight?.departureTime)}
                                  </div>
                                  <div className="deproute">
                                    {flight?.departurePortCity}
                                  </div>
                                </div>
                                <img src= {bigDepart} />
                                <div className="arrivaltime">
                                  <div className="departtime">
                                    {convertTo12HourFormat(flight?.arrivalTime)}
                                  </div>
                                  <div className="arriveroute">
                                    {flight?.arrivalPortCity}
                                  </div>
                                </div>
                              </div>

                              <div className="summary">
                                <div className="departing">
                                  <img src= {smallDepart} />
                                  <div className="dep">Departure</div>
                                </div>

                                <div className="depflyinfo">
                                  <img src= {flightImg} />
                                  <button
                                      onClick={showModal}
                                      className="flyinfo"
                                      type="button"
                                  >
                                    Flight Information
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className="flyclassesandprices">
                              <div className="flight-classes">
                                <div className="class">Economy</div>
                                <div className="class">Premium</div>
                                <div className="class">Business</div>
                              </div>

                              <div className="flightprices">
                                <div className="economyclass">
                                  <div className="price">
                                    {flight?.classes[0]?.baseFare}
                                  </div>
                                  <div className="naira">NGN</div>
                                  <button
                                      style={{
                                        background: flight?.classes[0]?.id === selectedDepartingClasses ? "blue" : "transparent",
                                        color: flight?.classes[0]?.id === selectedDepartingClasses ? "white" : "#2D9CDB",
                                      }}
                                      onClick={() => {
                                        handleDepartingSelectFlight(flight?.classes[0]?.id);
                                        setSelectedDepartingFlight(index + 1);
                                        setDepartingFlightPrice(flight?.classes[0]?.baseFare);
                                        console.log(departingFlightPrice);
                                      }}
                                  >
                                    SELECT
                                  </button>
                                </div>
                                <div className="premiumclass">
                                  <div className="price">
                                    {flight?.classes[1]?.baseFare}
                                  </div>
                                  <div className="naira">NGN</div>
                                  <button
                                      style={{
                                        background:
                                            flight?.classes[1]?.id === selectedDepartingClasses ? "blue" : "transparent",
                                        color: flight?.classes[1]?.id === selectedDepartingClasses ? "white" : "#2D9CDB",

                                      }}
                                      onClick={() =>
                                      {handleDepartingSelectFlight(flight?.classes[1]?.id);
                                        setSelectedDepartingFlight(index+1);
                                        setDepartingFlightPrice(flight?.classes[1]?.baseFare);
                                      }
                                      }
                                  >
                                    SELECT
                                  </button>
                                </div>
                                <div className="businessclass">
                                  <div className="price">
                                    {flight?.classes[2].baseFare}
                                  </div>
                                  <div className="naira">NGN</div>
                                  <button
                                      style={{
                                        background:
                                            flight?.classes[2]?.id === selectedDepartingClasses ? "blue" : "transparent",
                                        color: flight?.classes[2]?.id === selectedDepartingClasses ? "white" : "#2D9CDB",

                                      }}
                                      onClick={() =>
                                      {handleDepartingSelectFlight(flight?.classes[2].id);
                                        setSelectedDepartingFlight(index+1);
                                        setDepartingFlightPrice(flight?.classes[2]?.baseFare);
                                      }
                                      }
                                  >
                                    SELECT
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                      ))}
                    </div>
                ) : (
                    <div className="departureflight">
                      <div className="nodepflight">
                        {"Number of Flights: " + filteredDepartingFlights?.length}
                      </div>
                      {departingFlightsInfo?.map((flight, index) => (
                          <div className="depinnerbody" key={index}>
                            <div className="depflyrouteinfo">
                              <div className="depflightinfo">Flight Information</div>
                              <div className="depandarrivetime">
                                <div className="deptime">
                                  <div className="departtime">
                                    {convertTo12HourFormat(flight?.departureTime)}
                                  </div>
                                  <div className="deproute">
                                    {flight?.departurePortCity}
                                  </div>
                                </div>

                                <img src={bigDepart} />

                                <div className="arrivaltime">
                                  <div className="departtime">
                                    {convertTo12HourFormat(flight?.arrivalTime)}
                                  </div>
                                  <div className="arriveroute">
                                    {flight?.arrivalPortCity}
                                  </div>
                                </div>
                              </div>

                              <div className="summary">
                                <div className="departing">
                                  <img src={smallDepart} />
                                  <div className="dep">Departure</div>
                                </div>

                                <div className="depflyinfo">
                                  <img src= {flightImage}/>
                                  <button
                                      onClick={showModal}
                                      className="flyinfo"
                                      type="button"
                                  >
                                    Flight Information
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className="flyclassesandprices">
                              <div className="flight-classes">
                                <div className="class">Economy</div>
                                <div className="class">Premium</div>
                                <div className="class">Business</div>
                              </div>

                              <div className="flightprices">
                                <div className="economyclass">
                                  <div className="price">
                                    {flight?.classes[0]?.baseFare}
                                  </div>
                                  <div className="naira">NGN</div>
                                  <button
                                      style={{
                                        background: flight?.classes[0]?.id === selectedDepartingClasses ? "blue" : "transparent",
                                        color: flight?.classes[0]?.id === selectedDepartingClasses ? "white" : "#2D9CDB",
                                      }}
                                      onClick={() => {
                                        handleDepartingSelectFlight(flight?.classes[0]?.id);
                                        setSelectedDepartingFlightInfo(index + 1);
                                        setDepartingFlightPrice(flight?.classes[0]?.baseFare);
                                        console.log(departingFlightPrice);
                                      }}
                                  >
                                    SELECT
                                  </button>
                                </div>
                                <div className="premiumclass">
                                  <div className="price">
                                    {flight?.classes[1]?.baseFare}
                                  </div>
                                  <div className="naira">NGN</div>
                                  <button
                                      style={{
                                        background:
                                            flight?.classes[1]?.id === selectedDepartingClasses ? "blue" : "transparent",
                                        color: flight?.classes[1]?.id === selectedDepartingClasses ? "white" : "#2D9CDB",

                                      }}
                                      onClick={() =>
                                      {handleDepartingSelectFlight(flight?.classes[1]?.id);
                                        setSelectedDepartingFlightInfo(index+1);
                                        setDepartingFlightPrice(flight?.classes[1]?.baseFare);
                                      }
                                      }
                                  >
                                    SELECT
                                  </button>
                                </div>
                                <div className="businessclass">
                                  <div className="price">
                                    {flight?.classes[2].baseFare}
                                  </div>
                                  <div className="naira">NGN</div>
                                  <button
                                      style={{
                                        background:
                                            flight?.classes[2]?.id === selectedDepartingClasses ? "blue" : "transparent",
                                        color: flight?.classes[2]?.id === selectedDepartingClasses ? "white" : "#2D9CDB",

                                      }}
                                      onClick={() =>
                                      {handleDepartingSelectFlight(flight?.classes[2].id);
                                        setSelectedDepartingFlightInfo(index+1);
                                        setDepartingFlightPrice(flight?.classes[2]?.baseFare);
                                      }
                                      }
                                  >
                                    SELECT
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                      ))}
                    </div>
                )}
              </div>
          )}




          {allReturning?.length > 0 && returningTotalFlights !== 0 && (
              <div className="arrivalbody">
                <div className="depart-div">
                  <img src="src/assets/smallflight.svg" alt="Flight" />
                  <span>Returning Flights</span>
                </div>

                <SliderWrapper>
                  <Slider
                      {...settings}
                      className="container grid justify-between pt-[20px] slider-width"
                      initialSlide={searchedReturningDateIndex}
                  >
                    {daysInYear.map((day, index) => {
                      const flight = allReturning.find(flight => new Date(flight.departureDate).toLocaleDateString() === day.toLocaleDateString());
                      const leastBaseFareClass = flight ? flight.classes.reduce(
                          (minClass, currentClass) => {
                            return currentClass.baseFare < minClass.baseFare ? currentClass : minClass;
                          },
                          flight.classes[0]
                      ) : null;

                      return (
                          <div key={index} className={index === returnClickedSlider ? "boxy" : "returnslider"}
                               onClick={(e) => {
                                 getReturningFlightDate(flight?.departureDate || day.toLocaleString());
                                 handleReturnSliderClick(index);
                               }}
                          >
                            <div className="date">{ day.toLocaleDateString()}</div>

                            {flight && (
                                <>
                                  <div className="day" type="date">{getDayOfWeek(flight.arrivalDate)}</div>
                                  <div className="baseFare">{leastBaseFareClass.baseFare}</div>
                                  <div className="naira">NGN</div>
                                </>
                            )}
                          </div>
                      );
                    })}
                  </Slider>
                </SliderWrapper>

                {returnClickedSlider === null ? (
                    <div className="arrivalflight">
                      <div className="nodepflight">
                        {"Number of Flights: " + returningFlights?.length}
                      </div>
                      {searchedReturningFlightInfo?.map((flight, index) => (
                          <div className="arrivedepinnerbody" key={index}>
                            <div className="depflyrouteinfo">
                              <div className="depflightinfo">Flight Information</div>

                              <div className="depandarrivetime">
                                <div className="deptime">
                                  <div className="departtime">
                                    {convertTo12HourFormat(flight?.departureTime)}
                                  </div>
                                  <div className="deproute">
                                    {flight?.departurePortCity}
                                  </div>
                                </div>

                                <img src= {returnPlane} />

                                <div className="arrivaltime">
                                  <div className="arrivetime">
                                    {convertTo12HourFormat(flight?.arrivalTime)}
                                  </div>
                                  <div className="arriveroute">
                                    {flight?.arrivalPortCity}
                                  </div>
                                </div>
                              </div>

                              <div className="summary">
                                <div className="departing">
                                  <img src= {smallReturn}/>
                                  <div className="dep">Arrival</div>
                                </div>

                                <div className="depflyinfo">
                                  <img src= {flightImage} />
                                  <button
                                      onClick={showModal}

                                      className="flyinfo" type="button">

                                    Flight Information
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="flyclassesandprices">
                              <div className="flight-classes">
                                <div className="class">Economy</div>
                                <div className="class">Premium</div>
                                <div className="class">Business</div>
                              </div>

                              <div className="flightprices">
                                <div className="economyclass">
                                  <div className="price">
                                    {flight?.classes[0].baseFare}
                                  </div>

                                  <div className="naira" value={flight?.classes[0].id}>NGN</div>
                                  <button
                                      style={{
                                        background:
                                            flight?.classes[0]?.id === selectedReturningSelectedClasses ? "blue" : "transparent",
                                        color: flight?.classes[0]?.id === selectedReturningSelectedClasses ? "white" : "#2D9CDB",

                                      }}
                                      onClick={() =>
                                      {handleReturningSelectFlight(flight?.classes[0].id);
                                        setSelectedReturningFlight(index + 1);
                                        setReturningFlightPrice(flight?.classes[0]?.baseFare);
                                        setTotalPrice(returningFlightPrice + departingFlightPrice)
                                        console.log(returningFlightPrice);
                                        console.log(totalPrice);
                                      }
                                      }
                                  >
                                    SELECT
                                  </button>
                                </div>
                                <div className="premiumclass">
                                  <div className="price">
                                    {flight?.classes[1].baseFare}
                                  </div>
                                  <div className="naira">NGN</div>
                                  <button
                                      style={{
                                        background:
                                            flight?.classes[1]?.id === selectedReturningSelectedClasses ? "blue" : "transparent",
                                        color: flight?.classes[1]?.id === selectedReturningSelectedClasses ? "white" : "#2D9CDB",

                                      }}
                                      onClick={() =>
                                      {handleReturningSelectFlight(flight?.classes[1].id);
                                        setSelectedReturningFlight(index + 1);
                                        setReturningFlightPrice(flight?.classes[1]?.baseFare);
                                      }
                                      }
                                  >
                                    SELECT
                                  </button>
                                </div>
                                <div className="businessclass">
                                  <div className="price">
                                    {flight?.classes[2].baseFare}
                                  </div>
                                  <div className="naira">NGN</div>
                                  <button
                                      style={{
                                        background:
                                            flight?.classes[2]?.id === selectedReturningSelectedClasses ? "blue" : "transparent",
                                        color: flight?.classes[2]?.id === selectedReturningSelectedClasses ? "white" : "#2D9CDB",

                                      }}
                                      onClick={() =>
                                      {handleReturningSelectFlight(flight?.classes[2].id);
                                        setSelectedReturningFlight(index + 1);
                                        setReturningFlightPrice(flight?.classes[2]?.baseFare);
                                      }
                                      }
                                  >
                                    SELECT
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                      ))}
                    </div>
                ) : (
                    <div className="arrivalflight">
                      <div className="nodepflight">
                        {"Number of Flights: " + filteredReturningFlights?.length}
                      </div>
                      {returningFlightsInfo?.map((flight, index) => (
                          <div className="arrivedepinnerbody" key={index}>
                            <div className="depflyrouteinfo">
                              <div className="depflightinfo">Flight Information</div>

                              <div className="depandarrivetime">
                                <div className="deptime">
                                  <div className="departtime">
                                    {convertTo12HourFormat(flight?.departureTime)}
                                  </div>
                                  <div className="deproute">
                                    {flight?.departurePortCity}
                                  </div>
                                </div>

                                <img src={returnPlane} />

                                <div className="arrivaltime">
                                  <div className="arrivetime">
                                    {convertTo12HourFormat(flight?.arrivalTime)}
                                  </div>
                                  <div className="arriveroute">
                                    {flight?.arrivalPortCity}
                                  </div>
                                </div>
                              </div>

                              <div className="summary">
                                <div className="departing">
                                  <img src={smallReturn} />
                                  <div className="dep">Arrival</div>
                                </div>

                                <div className="depflyinfo">
                                  <img src={flightImg} />
                                  <button
                                      onClick={showModal}

                                      className="flyinfo" type="button">

                                    Flight Information
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="flyclassesandprices">
                              <div className="flight-classes">
                                <div className="class">Economy</div>
                                <div className="class">Premium</div>
                                <div className="class">Business</div>
                              </div>

                              <div className="flightprices">
                                <div className="economyclass">
                                  <div className="price">
                                    {flight?.classes[0].baseFare}
                                  </div>

                                  <div className="naira" value={flight?.classes[0].id}>NGN</div>
                                  <button
                                      style={{
                                        background:
                                            flight?.classes[0]?.id === selectedReturningSelectedClasses ? "blue" : "transparent",
                                        color: flight?.classes[0]?.id === selectedReturningSelectedClasses ? "white" : "#2D9CDB",

                                      }}
                                      onClick={() =>
                                      {handleReturningSelectFlight(flight?.classes[0].id);
                                        setSelectedReturningFlightInfo(index+1);
                                        setReturningFlightPrice(flight?.classes[0]?.baseFare);
                                        setTotalPrice(returningFlightPrice + departingFlightPrice)
                                        console.log(returningFlightPrice);
                                        console.log(totalPrice);
                                      }
                                      }
                                  >
                                    SELECT
                                  </button>


                                </div>
                                <div className="premiumclass">
                                  <div className="price">
                                    {flight?.classes[1].baseFare}
                                  </div>
                                  <div className="naira">NGN</div>
                                  <button
                                      style={{
                                        background:
                                            flight?.classes[1]?.id === selectedReturningSelectedClasses ? "blue" : "transparent",
                                        color: flight?.classes[1]?.id === selectedReturningSelectedClasses ? "white" : "#2D9CDB",

                                      }}
                                      onClick={() =>
                                      {handleReturningSelectFlight(flight?.classes[1].id);
                                        setSelectedReturningFlightInfo(index+1);
                                        setReturningFlightPrice(flight?.classes[1]?.baseFare);
                                      }
                                      }
                                  >
                                    SELECT
                                  </button>
                                </div>
                                <div className="businessclass">
                                  <div className="price">
                                    {flight?.classes[2].baseFare}
                                  </div>
                                  <div className="naira">NGN</div>
                                  <button
                                      style={{
                                        background:
                                            flight?.classes[2]?.id === selectedReturningSelectedClasses ? "blue" : "transparent",
                                        color: flight?.classes[2]?.id === selectedReturningSelectedClasses ? "white" : "#2D9CDB",

                                      }}
                                      onClick={() =>
                                      {handleReturningSelectFlight(flight?.classes[2].id);
                                        setSelectedReturningFlightInfo(index+1);
                                        setReturningFlightPrice(flight?.classes[2]?.baseFare);
                                      }
                                      }
                                  >
                                    SELECT
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                      ))}
                    </div>
                )}
              </div>
          )}

          <div className="continue">
            <button
                className="continuebutton"
                type="button"
                onClick={routePassengerInformation}
            >
              Continue
            </button>
          </div>
        </div>


        {modal ? (
            <>
              <div className="bg-modal">
                <div className="modal-content">
                  <div className="flyheadercontainer">
                    <div className="headertext">
                      <h2>Flight Information</h2>
                    </div>
                    <div className="cancelbutton" onClick={cancel} >

                      <button className="cancelbutton" type="button">
                        <img src="src/Components/FlightInformationPage/FlightInformationPageBody/Vector.svg" alt="cancelIcon" />
                      </button>
                    </div>
                  </div>
                  <FlightInformationPageBody  departingFlights={departingFlights} returningFlights = {returningFlights}  />
                </div>
              </div>
            </>
        ) : (
            <>
            </>
        )}
      </div>
  );
}

export default FlightSelectionOne;