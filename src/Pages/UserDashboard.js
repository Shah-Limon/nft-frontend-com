import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import UserDashboardMenu from "./UserDashboardMenu";
import { signOut } from "firebase/auth";

const UserDashboard = () => {
  const [data, setData] = useState([]);
  const [orders, setOrders] = useState([]);
  const [user] = useAuthState(auth);

  const itemsPerPage = 10; // Number of items to display per page
  const [currentPageOrders, setCurrentPageOrders] = useState(1);
  const [currentPageData, setCurrentPageData] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:5000/website`)
      .then((res) => res.json())
      .then((info) => setData(info.reverse()));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/orders`)
      .then((res) => res.json())
      .then((info) => setOrders(info.reverse()));
  }, []);

  let rowNumberOrders = (currentPageOrders - 1) * itemsPerPage + 1;
  let rowNumberData = (currentPageData - 1) * itemsPerPage + 1;

  const totalPagesOrders = Math.ceil(
    orders.filter((order) => order.customerEmail === user?.email).length /
      itemsPerPage
  );

  const totalPagesData = Math.ceil(
    data.filter((list) => list.userMail === user?.email).length / itemsPerPage
  );

  const handlePageChangeOrders = (newPage) => {
    setCurrentPageOrders(newPage);
  };

  const handlePageChangeData = (newPage) => {
    setCurrentPageData(newPage);
  };

  const handleSignout = () => {
    signOut(auth);
  };

  return (
    <div data-aos="fade-up" data-aos-duration={2000}>
      <UserDashboardMenu></UserDashboardMenu>

      {orders.filter((order) => order.customerEmail === user?.email).length >=
        1 && (
        <div className="container">
          <h3 className="text-center">My Orders</h3>

          <table className="rwd-table">
            <tbody>
              <tr>
                <th>SL No.</th>
                <th>Date</th>
                <th>Order ID</th>
                <th>Package</th>
                <th>Price</th>
                <th>Payment Status</th>
                <th>Order Status</th>
                <th>-</th>
              </tr>

              {orders
                .filter((order) => order.customerEmail === user?.email)
                .slice(
                  (currentPageOrders - 1) * itemsPerPage,
                  currentPageOrders * itemsPerPage
                )
                .map((order) => (
                  <tr key={order._id}>
                    <td>{rowNumberOrders++}</td>
                    <td>{order.orderDate}</td>
                    <td>{order.orderId}</td>
                    <td>{order.packageName}</td>
                    <td>{order.packagePrice}$</td>
                    <td>{order.paymentStatus}</td>
                    <td>{order.orderStatus}</td>
                    <td>
                      {order.paymentStatus === "Pending" && (
                        <Link to={`/pay-now/${order._id}`}>Pay Now</Link>
                      )}
                      {order.paymentStatus === "Received" && (
                        <>Payment is Completed</>
                      )}
                      {order.paymentStatus === "Cancelled" && (
                        <>Payment is Cancelled</>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {/* Pagination for Orders */}
          <div className="pagination">
            <ul>
              {Array.from({ length: totalPagesOrders }, (_, index) => {
                return (
                  <li>
                    {" "}
                    <Link
                      key={index}
                      onClick={() => handlePageChangeOrders(index + 1)}
                      className={
                        currentPageOrders === index + 1 ? "active" : ""
                      }
                    >
                      {index + 1}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}

      {orders.filter((order) => order.customerEmail === user?.email).length ===
        0 && (
        <>
          <h4 className="text-center">You have not ordered any packages.</h4>
          <br></br>
        </>
      )}

      {data.filter((e) => e.userMail === user?.email).length >= 1 && (
        <div className="container">
          <h3 className="text-center">Your Submitted List</h3>
          <table className="rwd-table">
            <tbody>
              <tr>
                <th>SL No.</th>
                <th>Website Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Edit</th>
                <th>Report</th>
              </tr>

              {data
                .filter((list) => list.userMail === user?.email)
                .slice(
                  (currentPageData - 1) * itemsPerPage,
                  currentPageData * itemsPerPage
                )
                .map((list) => (
                  <tr key={list._id}>
                    <td>{rowNumberData++}</td>
                    <td data-th="Website Name">{list.website}</td>
                    <td data-th="Email">{list.email}</td>
                    <td data-th="Email">{list.auditStatus}</td>
                    <td data-th="Edit">
                      <Link to={`/admin/website-edit/${list._id}`}>Edit</Link>
                    </td>
                    <td data-th="View">
                      <Link to={`/report/${list._id}`} className="action-btn">
                        <span>View</span>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {/* Pagination for Data */}
          <div className="pagination">
            <ul>
              {(() => {
                const li = [];
                for (let index = 1; index <= totalPagesData; index++) {
                  li.push(
                    <li>
                      <Link
                        key={index}
                        onClick={() => handlePageChangeData(index)}
                        className={currentPageData === index ? "active" : ""}
                      >
                        {index}
                      </Link>
                    </li>
                  );
                }
                return li;
              })()}
            </ul>
          </div>
        </div>
      )}

      {data.filter((e) => e.userMail === user?.email).length === 0 && (
        <h4 className="text-center mb-15 payment-setting">
          You have not submitted any audit request.
        </h4>
      )}
    </div>
  );
};

export default UserDashboard;
