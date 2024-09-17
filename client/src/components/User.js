import React from 'react';
import { Link } from 'react-router-dom';

const User = () => {
    return <div>User Page - Access Restricted to Users and Admins  
    <Link to={"/admin"} className={`btn btn-primary`}>
            admin
        </Link>
    </div>;
};

export default User;
