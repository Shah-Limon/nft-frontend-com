import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import DashboardMenu from "./DashboardMenu";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    fetch(`http://localhost:5000/users`)
      .then((res) => res.json())
      .then((info) => setUsers(info.reverse()));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/website`)
      .then((res) => res.json())
      .then((info) => setData(info.reverse()));
  }, []);

  return (
    <div>
      <div>
        <DashboardMenu></DashboardMenu>

        <div className="container">
          <h5 className="text-center mt-15">Audit Request</h5>
          <table className="rwd-table">
            <tbody>
              <tr>
                <th>SL No.</th>
                <th>Website Name</th>
                <th>Email</th>
                <th>Audit Status</th>
                <th>Edit</th>
                <th>-</th>
              </tr>
              {data.slice(0, 5).map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td data-th="Website Name">{item.website}</td>
                  <td data-th="Email">{item.email}</td>
                  <td data-th="Email">{item.auditStatus}</td>
                  <td data-th="Edit">
                    <Link to={`/admin/website-edit/${item._id}`}>Edit</Link>
                  </td>
                  <td>-</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
