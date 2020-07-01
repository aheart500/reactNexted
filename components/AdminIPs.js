import React, { useState, useEffect } from "react";
import { getAllUsers } from "../services/AdminServices";
const AdminIPs = ({ token }) => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getAllUsers(token)
      .then(res => setUsers(res))
      .catch(err => console.log(err));
  }, [token]);

  let allIPs = [...new Set(users.map(user => user.ip))];
  const ipsTable = allIPs.map(ip => {
    const usersWithIt = users.filter(user => user.ip === ip);
    return {
      ipAddress: ip,
      usersL: usersWithIt.length,
      usersNames: usersWithIt.map(user => user.name)
    };
  });

  return (
    <main className="tap">
      <h2>لوحة الIPs</h2>
      <div className="tap-box">
        <div className="tap-forms">
          <form onSubmit={e => e.preventDefault()}>
            <label htmlFor="search">البحث</label>
            <input
              type="text"
              id="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </form>
          <hr />
        </div>
        <div className="tap-table">
          <table>
            <thead>
              <tr>
                <td>IP</td>
                <td>عدد المستخدمين</td>
                <td>اسماء المستخدمين</td>
              </tr>
            </thead>
            <tbody>
              {ipsTable
                .filter(ip => {
                  let regex = new RegExp(search, "i");
                  return ip.ipAddress.match(regex);
                })
                .map(ip => {
                  return (
                    <tr key={ip.ipAddress}>
                      <td>{ip.ipAddress}</td>
                      <td>{ip.usersL}</td>
                      <td>{ip.usersNames.join(" - ")}</td>
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

export default AdminIPs;
