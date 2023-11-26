import React from "react";
import { Link } from "react-router-dom";
import BackToAdminDashboard from "./BackToAdminDashboard";

const OrderMenu = () => {
  return (

    <div className="custom-ordermenu mb-15">
      <BackToAdminDashboard></BackToAdminDashboard>
      <div className="header__right container custom-orders">
        
        <nav id="main-nav" className="main-nav">
          <ul id="menu-primary-menu" className="menu custom-orders-ul">
            
            <li className="menu-item menu-item-has-children">
              <Link to="/admin/orders/" class="action-btn">
              Total Orders
              </Link>
            </li>
            <li className="menu-item menu-item-has-children">
              <Link to="/admin/orders-pending" class="action-btn">
                Pending Orders
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/admin/orders/accepted" class="action-btn ">
                Accepted Orders
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/admin/orders/cancelled" class="action-btn ">
                Cancelled orders
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/admin/orders/delivered" class="action-btn ">
              Delivered orders
              </Link>
            </li>

            <li className="menu-item menu-item-has-children">
              <Link to="/admin/payments/pending" class="action-btn ">
                Pending Payments
              </Link>
            </li>

            
            <li className="menu-item">
              <Link to="/admin/payments/received" class="action-btn ">
                Recived Payments
              </Link>
            </li>

            
            <li className="menu-item">
              <Link to="/admin/payments/cancelled" class="action-btn ">
                Cancelled Payments
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/admin/payments/refunded" class="action-btn ">
                Refunded Payments
              </Link>
            </li>
            
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default OrderMenu;
