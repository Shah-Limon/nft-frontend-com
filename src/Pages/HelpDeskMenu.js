import React from "react";
import { Link } from "react-router-dom";

const HelpDeskMenu = () => {
  return (
   <>
  
    <div className="header__right container custom-orders">
      <nav id="main-nav" className="main-nav">
        <ul id="menu-primary-menu" className="menu custom-orders-ul">
          <li className="menu-item menu-item-has-children">
            <Link to="/admin/help-desk/open-ticket" class="action-btn">
              Open Ticket
            </Link>
          </li>

          <li className="menu-item menu-item-has-children">
            <Link to="/admin/help-desk/replied-ticket" class="action-btn ">
              Replied Ticket
            </Link>
          </li>

          <li className="menu-item">
            <Link to="/admin/help-desk/solved-ticket" class="action-btn ">
              Solved Ticket
            </Link>
          </li>
        </ul>
      </nav>
    </div>
   </>
  );
};

export default HelpDeskMenu;
