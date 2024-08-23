import React, {useContext} from 'react';
import AuthContext from "../../context/AuthContext.jsx";

const Profile = () => {
    const { user } = useContext(AuthContext);
    console.log(user)
    return (
        <div className="bg-yellow-50 p-16 flex justify-center items-center h-[80vh]">
            <div className="p-6 shadow-2xl rounded-xl flex flex-col gap-4 justify-center items-center text-xl">
                <div className=""><b>Name: </b>{user.username}</div>
                <div className="mxs:text-center"><b className="">Email: </b>{user.email}</div>
                <div className=""><b>Number of events: </b>{user.events.length}</div>

            </div>

        </div>
    );
};

export default Profile;