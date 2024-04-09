import { Link } from 'react-router-dom'
import './AdminDashboardSidebar.css'

const AdminDashboardSide = () => {
  return (
      <div className='admin-sidebar-container'>

        <Link to={"/"}><img className='airway-logo' src="/src/assets/airway_logo.svg" alt="logo" /></Link>
        <div className='sidebar-menu-container'>
          <Link to={"/flight-listing"}>
            <div className='sidebar-flight-listing'>
              <img className='sidebar-flight-listing-icon' src="/src/assets/airplanemode_active.png" alt="listing" />
              <div className='sidebar-flight-listing-text'>Flight Listing</div>
            </div>
          </Link>
          <Link to={"/flight-booking"}>
            <div className='sidebar-flight-booking'>
              <img className='sidebar-flight-booking-icon' src="/src/assets/booking-icon.png" alt="booking" />
              <div className='sidebar-flight-booking-text'>Booking</div>
            </div>
          </Link>
          <Link to={"/passenger"}>
            <div className='sidebar-flight-user'>
              <img className='sidebar-flight-user-icon' src="/src/assets/users-icon.png" alt="user" />
              <div className='sidebar-flight-user-text'>Users</div>
            </div>
          </Link>
        </div>
      </div>
  )
}

export default AdminDashboardSide