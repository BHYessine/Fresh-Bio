import React from "react";

function ModalUser({ user, show, setShow }) {
  return (
    show && (
      <div className="modal">
        <div className="user-detail">
          <div className="btn-close" onClick={() => setShow(false)}>
            &times;
          </div>
          <h3>User Detail</h3>
          <div className="user">
            <h4>FullName: {user.name}</h4>
            <h4>Address: {user.address}</h4>
            <h4>Email: {user.email}</h4>
            <h4>Phone Number: {user.phone}</h4>
            <h4>Register: {user.createdAt.split("T")[0]}</h4>
            <h4>Recent Order: {user.updatedAt.split("T")[0]}</h4>
            <h4>Orders: {user.orders.length.toFixed(2)}</h4>
          </div>
        </div>
      </div>
    )
  );
}

export default ModalUser;
