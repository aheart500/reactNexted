import React, { useState, useEffect, useRef } from "react";
import Loader from "../components/Loader";
import { logged, getAllUsers } from "../services/AdminServices";
import Router from "next/router";
import AdminNav from "../components/AdminNav";
import AdminMain from "../components/AdminMain";
import AdminEmails from "../components/AdminEmails";
import AdminMessages from "../components/AdminMessages";
import AdminCountries from "../components/AdminCountries";
import AdminCities from "../components/AdminCities";
import AdminIPs from "../components/AdminIPs";
import AdminCreateUser from "../components/AdminCreateUser";
import AdminEditUser from "../components/AdminEditUser";
import AdminBlogs from "../components/AdminBlogs";
import AdminTags from "../components/AdminTags";
import AdminSettings from "../components/AdminSettings";
import AdminVip from "../components/AdminVip";
import AdminReports from "../components/AdminReports";
import AdminAds from "../components/AdminAds";
const Admin = () => {
  const [loading, setLoading] = useState(true);
  const [tap, setTap] = useState("main");
  const [users, setUsers] = useState([]);
  const [usersToShow, setUsersToShow] = useState("all");
  const [editUserData, setEditUserData] = useState({});

  const loggedAdmin = useRef("");

  useEffect(() => {
    loggedAdmin.current = JSON.parse(window.localStorage.getItem("admin"));
    if (loggedAdmin.current) {
      logged(loggedAdmin.current.token)
        .then((res) => {
          if (!res.username) {
            Router.replace("/admin-login");
          }
        })
        .catch((err) => {
          Router.replace("/admin-login");
        });
    } else {
      Router.replace("/admin-login");
    }
  }, []);
  useEffect(() => {
    if (loggedAdmin.current) {
      getAllUsers(loggedAdmin.current.token)
        .then((res) => {
          setLoading(false);
          setUsers(res);
        })
        .catch((err) => console.log(err));
    } else {
      Router.replace("/admin-login");
    }
  }, []);

  if (loading) return <Loader />;

  const TapToRender = () => {
    if (!loggedAdmin) return null;
    switch (tap) {
      case "main":
        return <AdminMain token={loggedAdmin.current.token} users={users} />;
      case "emails":
        return (
          <AdminEmails
            token={loggedAdmin.current.token}
            setEditUserData={setEditUserData}
            changeTap={setTap}
            users={users}
            setUsers={setUsers}
            kind={usersToShow}
          />
        );
      case "create-user":
        return (
          <AdminCreateUser
            token={loggedAdmin.current.token}
            users={users}
            setUsers={setUsers}
            changeTap={setTap}
            kind={usersToShow}
          />
        );
      case "edit-user":
        return (
          <AdminEditUser
            token={loggedAdmin.current.token}
            givenData={editUserData}
            changeTap={setTap}
            users={users}
            setUsers={setUsers}
            kind={usersToShow}
          />
        );
      case "messages":
        return <AdminMessages token={loggedAdmin.current.token} />;
      case "countries":
        return <AdminCountries token={loggedAdmin.current.token} />;
      case "cities":
        return <AdminCities token={loggedAdmin.current.token} />;
      case "ips":
        return <AdminIPs token={loggedAdmin.current.token} />;
      case "blogs":
        return <AdminBlogs token={loggedAdmin.current.token} />;
      case "tags":
        return <AdminTags token={loggedAdmin.current.token} />;
      case "reports":
        return (
          <AdminReports
            token={loggedAdmin.current.token}
            users={users}
            setUsers={setUsers}
          />
        );
      case "ads":
        return <AdminAds token={loggedAdmin.current.token} />;
      case "settings":
        return <AdminSettings token={loggedAdmin.current.token} />;
      case "vip":
        return <AdminVip token={loggedAdmin.current.token} />;
      default:
        return <AdminMain token={loggedAdmin.current.token} />;
    }
  };
  return (
    <div className="admin">
      <AdminNav changeTap={setTap} setUsersToShow={setUsersToShow} />
      <div className="taps-header"></div>
      {TapToRender()}
    </div>
  );
};

export default Admin;
