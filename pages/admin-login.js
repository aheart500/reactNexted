import React, { useState, useEffect } from "react";
import { login, logged } from "../services/AdminServices";
import Router from "next/router";
import Loader from "../components/Loader";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let loggedAdmin = JSON.parse(window.localStorage.getItem("admin"));
    if (loggedAdmin) {
      logged(loggedAdmin.token)
        .then((res) => {
          if (res.username) {
            Router.replace("/admin");
          }
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  });

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password).then((response) => {
      if (response.token) {
        window.localStorage.setItem("admin", JSON.stringify(response));
        Router.replace("/admin");
      } else {
        setError("خطأ في البريد او كلمة المرور");
      }
    });
  };
  if (loading) return <Loader />;
  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h1>دخول لوحة التحكم</h1>
        <input
          type="text"
          name="password"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="البريد الإلكتروني"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="كلمة السر"
        />
        <p>{error}</p>
        <button type="submit"> تسجيل الدخول </button>
      </form>
    </div>
  );
};

export default AdminLogin;
