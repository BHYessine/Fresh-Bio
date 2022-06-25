import React from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../../Redux/actions/usersActions";
const CustomerCard = ({ user }) => {
  const dispatch = useDispatch();

  return (
    <div className="verticalCard">
      <div className="col-1">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/fresh-bio.appspot.com/o/user.png?alt=media&token=85b6d45f-a994-47fe-a71c-31b6b5ba13c5"
          alt=""
        />
        <h5 style={{ textAlign: "center" }}>{user.name}</h5>
      </div>
      <div className="col-2">
        <h5>Email: {user.email}</h5>
        <h5>Address: {user.address}</h5>
        <h5>Phone: {user.phone}</h5>
        <h4>{user.orders.length} Orders</h4>
        <div className="card-btn">
          <MdDelete
            className="icon"
            title="Delete"
            onClick={() => dispatch(deleteUser(user._id))}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerCard;
