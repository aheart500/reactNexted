import React, { useState, useEffect } from "react";
import { getAllMessages } from "../services/AdminServices";
import {
  FaUsers,
  FaDollarSign,
  FaRegTimesCircle,
  FaCommentAlt
} from "react-icons/fa";
const AdminMain = ({ token, users }) => {
  const [messagesLength, setMessagesLength] = useState(0);
  useEffect(() => {
    getAllMessages(token)
      .then(res => setMessagesLength(res.length))
      .catch(err => console.log(err));
  }, [token]);
  return (
    <main className="tap admin-tap">
      <h2>لوحة التحكم</h2>
      <div className="admin-cards-container">
        <div className="card">
          <div className="card-right">
            <h2>المستخدمون</h2>
            <h4>{users.length}</h4>
          </div>
          <FaUsers className="admin-icon" />
        </div>
        <div className="card">
          <div className="card-right">
            <h2>الحسابات المدفوعة</h2>
            <h4>{users.filter(user => user.status === 1).length}</h4>
          </div>
          <FaDollarSign className="admin-icon" />
        </div>
        <div className="card">
          <div className="card-right">
            <h2>الحسابات المحظورة</h2>
            <h4>{users.filter(user => user.block === 1).length}</h4>
          </div>
          <FaRegTimesCircle className="admin-icon" />
        </div>
        <div className="card">
          <div className="card-right">
            <h2>الرسائل</h2>
            <h4>{messagesLength}</h4>
          </div>
          <FaCommentAlt className="admin-icon" />
        </div>
      </div>
      <div className="admin-tables">
        <div className="tap-table first-table">
          <h1>حسابات VIP</h1>
          <table>
            <thead>
              <tr>
                <th>الأسم</th>
                <th>اسم المستخدم</th>
                <th>الدولة</th>
                <th>المدينة</th>
                <th>العمر</th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter(user => user.status === 1)
                .map(user => {
                  return (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.username}</td>
                      <td>{user.country_name}</td>
                      <td>{user.city_name}</td>
                      <td>{user.age}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className="tap-table second-table">
          <h1>حسابات محظورة</h1>
          <table>
            <thead>
              <tr>
                <th>الأسم</th>
                <th>اسم المستخدم</th>
                <th>النوع</th>
                <th>الحالة</th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter(user => user.block === 1)
                .map(user => {
                  let { status, block } = user;
                  block = block === 1 ? "محظور" : "جيد";
                  status = status === 1 ? "vip" : "عادي";
                  return (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.username}</td>
                      <td>
                        <span
                          className={
                            status === "vip" ? "tag tag-vip" : "tag tag-normal"
                          }
                        >
                          {status}
                        </span>
                      </td>
                      <td>
                        <span
                          className={
                            block === "محظور"
                              ? "tag tag-blocked"
                              : "tag tag-good"
                          }
                        >
                          {block}
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default AdminMain;
