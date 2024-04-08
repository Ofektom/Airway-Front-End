import "./BookingCancelModal.css"
import React, {useEffect, useState} from 'react';
import modalIcon from "/src/assets/Icon.png"

const BookingCancelModal = ({cancelBooking, onCancel, bookingId, bookingRef}) => {
    const [loading, setLoading] = useState(false);

    const handleCancelBooking = async () => {
        setLoading(true);
        try {
            await cancelBooking(bookingId, bookingRef);
            console.log('Booking cancelled successfully');
            onCancel();
        } catch (error) {
            console.error('Error cancelling booking:', error.message);
        }
        setLoading(false);
    };

    return (
        <div className="modal-cancel">
            <div className="cancel-modal-content">
                {/*<span className="close">&times;</span>*/}
                <h2 className="message-cancel">Cancel Booking</h2>
                <div className="cancel-modal-icon">
                    <img src={modalIcon}/>
                </div>
                <br/>
                <br/>
                <p className="cancel-description">Are you sure you want to CANCEL this booking with reference: {bookingRef} ?</p>
                <div className="cancel-button-container">
                    <button className="confirmBtn-cancel" onClick={handleCancelBooking}>            {loading ? 'Cancelling...' : 'Yes'}
                    </button>
                    <button className="cancelBtn-cancel" onClick={onCancel}>No</button>
                </div>
            </div>
        </div>
    );
};

export default BookingCancelModal;