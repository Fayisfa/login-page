import React from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {
    return <div>Admin Page - Access Restricted to Admins
    <Link to={"/user"} className={`btn btn-primary`}>
            User
        </Link>
    </div>;
};

export default Admin;
