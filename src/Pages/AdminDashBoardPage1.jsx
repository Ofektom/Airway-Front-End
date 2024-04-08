import AdminDashboardNavbar from '../Components/AdminDashboardNavbar/AdminDashboardNavbar'
import AdminDashboardSide from '../Components/AdminDashboardSidebar/AdminDashboardSide'
import FlightListing from "../Components/FlightListingPage/FlightListing.jsx";

const AdminDashBoardPage1 = () => {
  return (
      <>
        <AdminDashboardSide/>
        <AdminDashboardNavbar />
        <FlightListing/>
      </>
  )
}

export default AdminDashBoardPage1