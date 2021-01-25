import React from "react";

const User = ({ user }) => {
    const { username } = user;

    return (
        <div className="card mt-1">
            <div className="card-body">
                <h6>{username}</h6>
            </div>
        </div>
    );
};

export default User;