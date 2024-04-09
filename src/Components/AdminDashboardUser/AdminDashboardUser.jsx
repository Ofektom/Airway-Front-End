import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserDetailscc.css';
import './AdminDashboardUser.css';
import airwayAnim from "../ManageBookingPage/airwayanimB.gif";



const AdminDashboardUser = () => {
    const [userData, setUserData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [loading, setLoading] = useState(true);





    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            setTimeout(async () => {

            try {

                const userResponse = await fetch("http://localhost:8080/api/v1/passenger/get-passengers");
                const userInfo = await userResponse.json();
                setLoading(false);
                setUserData(userInfo);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            }, 1500);
        };

        fetchUserData();
    }, []);

    const totalPages = Math.ceil(userData.length / itemsPerPage);

    // Calculate index of the first and last items to display on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = userData.slice(indexOfFirstItem, indexOfLastItem);

    // Function to handle page navigation
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    return (
        <div>
        {loading && (
            <img className="Booking-loading-text" src={airwayAnim} alt="Loading animation"/>
        )}
    {loading || (
        <div className='pagebackground'>
            <div className="headerr">

                <h2>Users</h2>


            </div>


            <table className="styled-table">
                <thead>
                <tr>
                    <th>Date Created</th>
                    <th>User ID</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Membership Status</th>
                    <th>Email</th>
                    <th>Phone number</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {currentItems.map((user, index) => (
                    <tr key={user.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                        <td>{user.created}</td>
                        <td>{user.passengerCode}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.membership}</td>
                        <td>{user.passengerEmail}</td>
                        <td>{user.phoneNumber}</td>
                        <td><button className="vertical-dots">&#8942;</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="Booking-pagination">
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                <span>{currentPage} of {totalPages}</span>
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
            </div>
        </div>
        )}
        </div>
    );
};

export default AdminDashboardUser;