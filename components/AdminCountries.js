import React, { useState, useEffect } from "react";
import { getAllCountries, editManyCountries } from "../services/AdminServices";

const AdminCountries = ({ token }) => {
  const [countries, setCountries] = useState([]);

  const [message, setMessage] = useState("");

  useEffect(() => {
    getAllCountries(token)
      .then(res => {
        setCountries(res.map(country => `${country.name}`).join("\n"));
      })
      .catch(err => {
        console.log(err);
        setMessage("حدث خطأ في السرفر");
      });
  }, [token]);

  const handleAddMany = e => {
    e.preventDefault();
    editManyCountries(token, countries.split("\n"))
      .then(res => setMessage("تم الحفظ بنجاح"))
      .catch(err => setMessage("حدث خطأ في السيرفر حاول مجدداً"));
  };

  return (
    <main className="tap">
      <h2>الدول العربية</h2>
      <div className="tap-box">
        <div className="tap-forms">
          <form onSubmit={handleAddMany}>
            <label htmlFor="addMany"> قائمة الدول </label>
            <div className="addMany-form">
              <textarea
                value={countries}
                onChange={e => setCountries(e.target.value)}
              ></textarea>
              <button type="submit">حفظ</button>
            </div>
            <br />
            {message}
          </form>
          <hr />
        </div>
      </div>
    </main>
  );
};

export default AdminCountries;
