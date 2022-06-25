import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allUsers, editStatus } from "../../../Redux/actions/usersActions";
import CardOrder from "../../customer/Purchases/cardOrder";

const Orders = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.UsersReducer.users);
  const isLoad = useSelector((state) => state.UsersReducer.isLoad);
  useEffect(() => {
    dispatch(allUsers());
  }, [dispatch]);
  return (
    <div className="orders-list container">
      <h1>Orders</h1>
      {isLoad ? (
        <div>
          <div className="loader"></div>
        </div>
      ) : (
        <div className="purchasesContainer">
          {users?.map((user) =>
            user.orders?.map((item) => {
              if (!item.status) {
                return (
                  <div className="purchasesDetail">
                    <div className="orderCode">
                      <h4>Order Code: {item._id}</h4>
                      <h4>Order Date: {item.createdAt.split("T")[0]}</h4>
                      <h4>Order Total: {item.sum.toFixed(3)} TND</h4>
                      <button
                        onClick={() =>
                          dispatch(editStatus({ id: user._id, _id: item._id }))
                        }
                      >
                        Validated
                      </button>
                    </div>
                    <CardOrder order={item.products} />
                  </div>
                );
              }
            })
          )}
          {/* return <h4>Noorders</h4>; */}
        </div>
      )}
    </div>
  );
};

export default Orders;
