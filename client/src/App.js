import "./App.css";
import { Route, Routes } from "react-router";
import DashboardAdmin from "./components/admin/Dashboard/DashboardAdmin";
import Navbar from "./components/admin/Navbar/NavbarUser";
import AllProducts from "./components/admin/Products/allProducts";
import AddProduct from "./components/admin/Products/addProduct";
import EditProduct from "./components/admin/Products/editProduct";
import Orders from "./components/admin/Orders/ordersPage";
import Customers from "./components/admin/Customers/CustomersPage";
import Newsletter from "./components/admin/Newsletter/NewsletterPage";
import NavigationNavbar from "./components/navigation/NavBar/NavbarPage";
import HomePage from "./components/navigation/Home/HomePage";
import ProductList from "./components/navigation/ProductList/ProductList";
import Contact from "./components/navigation/Contact/contactPage";
import Account from "./components/customer/Account/AccountPage";
import Purchases from "./components/customer/Purchases/purchasesPage";
import Cart from "./components/navigation/Cart/CartPage";
import Order from "./components/navigation/Order/OrderPage";
import Forgot from "./components/navigation/Sigin/forgot";
import NewPsw from "./components/navigation/Sigin/NewPsw";
import Login from "./components/navigation/Sigin/login";
import Register from "./components/navigation/Sigin/register";
// import { useEffect } from "react";
// import { current } from "./Redux/actions/usersActions";
import { useDispatch, useSelector } from "react-redux";
import { ReactNotifications, Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
function App() {
  // const dispatch = useDispatch();
  const message = useSelector((state) => state.UsersReducer.message);
  const status = useSelector((state) => state.UsersReducer.status);
  message &&
    Store.addNotification({
      title: status === 200 ? "Success" : "Error",
      message: message,
      type: status === 200 ? "success" : "danger",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    });
  return (
    <div className="App">
      <ReactNotifications />
      <Routes>
        <Route exact path="/" element={<NavigationNavbar />}>
          <Route index element={<HomePage />} />
          <Route path="products/:category" element={<ProductList />} />
          <Route path="contact" element={<Contact />} />
          <Route path="cart" element={<Cart />} />
          <Route path="order" element={<Order />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot" element={<Forgot />} />
          <Route path="newpsw/:token" element={<NewPsw />} />
        </Route>
        <Route path="admin" element={<Navbar />}>
          <Route index path="dashboard" element={<DashboardAdmin />} />
          <Route path="products">
            <Route path="" element={<AllProducts />} />
            <Route path="add" element={<AddProduct />} />
            <Route path="edit/:id" element={<EditProduct />} />
          </Route>
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="newsletter" element={<Newsletter />} />
          <Route path="account" element={<Account />} />
        </Route>
        <Route path="customer" element={<Navbar />}>
          <Route path="purchases" element={<Purchases />} />
          <Route path="dashboard" element={<Account />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
