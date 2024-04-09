import AdminDashboardSide from "../Components/AdminDashboardSidebar/AdminDashboardSide.jsx";
import AdminDashboardNavbar from "../Components/AdminDashboardNavbar/AdminDashboardNavbar.jsx";
import AdminDashboardUser from "../Components/AdminDashboardUser/AdminDashboardUser.jsx";
import React from "react";

function AdminUserManagementPage () {
    return (
        <>
            <AdminDashboardNavbar />
            <AdminDashboardSide/>
            <AdminDashboardUser />
        </>

    )
}

export default AdminUserManagementPage