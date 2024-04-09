import { useEffect, useState } from 'react';
import './AdminDashboardNavbar.css';
import { useNavigate } from 'react-router-dom';
import ModalFilter from '../ModalFilter/ModalFilter';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminDashboardNavbar = () => {
  const [searchText, setSearchText] = useState('');
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const navigate = useNavigate();
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {

    fetchAllUsers();
  }, []);

  // const fetchAllUsers = async () => {
  //   try {
  //     const response = await fetch('/api/v1/passenger/get-passengers');
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch users');
  //     }
  //     const usersData = await response.json();
  //     setAllUsers(usersData);
  //   } catch (error) {
  //     console.error('Error fetching users:', error.message);
  //   }
  // };
  const fetchAllUsers = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/passenger/get-passengers');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const usersData = await response.json();
      setAllUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error.message);
      toast.error('Failed to fetch users. Please try again later.');
    }
  };



  const handleCheckboxChange = (filter) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter(item => item !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
      setFilterOpen(false);
      performSearch(searchText, filter);
    }
  };


  // const handleSearchChange = (e) => {
  //   const query = e.target.value;
  //   setSearchText(query);
  //   performSearch(query, selectedFilters);
  // };

  useEffect(() => {
    filterUsers();
  }, [searchText, allUsers]);

  // const filterUsers = () => {
  //   const filtered = allUsers.filter(user =>
  //       user.name(searchText.toLowerCase()) ||
  //       user.surname.includes(searchText.toLowerCase()) ||
  //       user.email.includes(searchText.toLowerCase()) ||
  //       user.phoneNumber.includes(searchText)
  //   );
  //   setFilteredUsers(filtered);
  // };

  const filterUsers = () => {
    const filtered = allUsers.filter(user =>
        (searchText &&
            ((user.firstName && user.firstName.toLowerCase().includes(searchText.toLowerCase())) ||
                (user.lastName && user.lastName.toLowerCase().includes(searchText.toLowerCase())) ||
                (user.passengerEmail && user.passengerEmail.toLowerCase().includes(searchText.toLowerCase())) ||
                (user.phoneNumber && user.phoneNumber.includes(searchText))))
    );
    setFilteredUsers(filtered);
  };


  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchText(query);
  };


  const logout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/logout');
      toast(`Logout successful`)
      localStorage.removeItem("user");
      localStorage.removeItem("userFirstName");
      localStorage.removeItem("userRole");
      localStorage.clear();
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  };



  const toggleFilterModal = () => {
    setFilterOpen(!isFilterOpen);
  };


  const closeFilterModal = () => {
    setFilterOpen(false);
  };


  return (
      <div className='admin-navbar-container'>
        <div className='admin-navbar-search'>
          <form >
            <input
                className='admin-navbar-search-text'
                type="text"
                name="text"
                value={searchText}
                onChange={handleSearchChange}
                placeholder="Search for Flight....."
                required
            />
          </form>
        </div>

        <div className='admin-navbar-filter' onClick={toggleFilterModal}>
          <img className='navbar-filter-icon' src="/src/assets/filter-icon.png" alt="filter" />
        </div>
        <div onClick={(e) => logout(e)} className='admin-navbar-logout'>
          <img className='navbar-logout-icon' src="/src/assets/navbar-logout-icon.png" alt="logout" />
          <div className='navbar-logout-text'>Log Out</div>
        </div>
        <ToastContainer/>
        <div>
          <ModalFilter isOpen={isFilterOpen} handleCheckboxChange={handleCheckboxChange} closeFilterModal={closeFilterModal} />
        </div>
      </div>

  )

}

export default AdminDashboardNavbar;
