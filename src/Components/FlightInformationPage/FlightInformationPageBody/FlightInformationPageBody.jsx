import React, { useEffect, useState } from "react";
import "./FlightInformationPageBody.css";

function FlightInformationPageBody(props) {
    const { departingFlights, returningFlights } = props;
    const [departingFlight, setDepartingFlight] = useState(null);
    const [returningFlight, setReturningFlight] = useState(null);

    useEffect(() => {
        if (departingFlights && departingFlights.length > 0) {
            setDepartingFlight(departingFlights[0]);
        }
        if (returningFlights && returningFlights.length > 0) {
            setReturningFlight(returningFlights[0]);
        }
    }, [departingFlights, returningFlights]);

    return (
        <div className="FlightInfoBody">
            <div className="bodyheader">
                {departingFlight && returningFlight ? (
                    <p>{`${returningFlight.arrivalPortCity}(${returningFlight.arrivalPortName}) - ${departingFlight.arrivalPortCity}(${departingFlight.arrivalPortName})`}</p>
                ) : (
                    departingFlight ? (
                        <p>{`${departingFlight.departurePortCity}(${departingFlight.departurePortName}) - ${departingFlight.arrivalPortCity}(${departingFlight.arrivalPortName})`}</p>
                    ) : (
                        <p>No flight information available</p>
                    )
                )}
            </div>

            {departingFlight && (

                <>
                    <div className="formRow">
                        <label htmlFor="departure">From</label>
                        <p>{`${departingFlight.departurePortCity}(${departingFlight.departurePortName})`}</p>
                    </div>
                    <hr />

                    <div className="formRow">
                        <label htmlFor="departureDate">Departing Date</label>
                        <p>{departingFlight.departureDate}</p>
                    </div>
                    <hr />

                    <div className="formRow">
                        <label htmlFor="arrival">To</label>
                        <p>{departingFlight.arrivalPortCity}</p>
                    </div>
                    <hr />

                    <div className="formRow">
                        <label htmlFor="arrivalDate">Arrival Date</label>
                        <p>{departingFlight.arrivalDate}</p>
                    </div>
                    <hr />

                    {returningFlight && (
                        <>
                            <div className="formRow">
                                <label htmlFor="duration">Flight Duration</label>
                                <p>{returningFlight.duration}</p>
                            </div>
                            <hr />

                            <div className="formRow">
                                <label htmlFor="flightNumber">Flight Number</label>
                                <p>{returningFlight.flightNo}</p>
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default FlightInformationPageBody;