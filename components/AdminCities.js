import React, { useState, useEffect } from "react";
import {
  getAllCountries,
  getAllCities,
  addManyCities
} from "../services/AdminServices";
const AdminCities = ({ token }) => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [message, setMessage] = useState("");

  const [manyCities, setManyCities] = useState("");
  const [manyCitiesCountry, setManyCitiesCountry] = useState("");

  useEffect(() => {
    getAllCountries(token)
      .then(res => {
        setCountries(res);
      })
      .catch(err => {
        console.log(err);
      });
    getAllCities(token)
      .then(res => setCities(res))
      .catch(err => console.log(err));
  }, [token]);
  const handleCountryChange = e => {
    setManyCitiesCountry(e.target.value);
  };
  useEffect(() => {
    setManyCities(
      cities
        .filter(city => city.country_id === manyCitiesCountry)
        .map(city => city.name)
        .join("\n")
    );
  }, [manyCitiesCountry, cities]);
  const handleAddMany = e => {
    e.preventDefault();
    if (manyCities === "") return setMessage("برجاء كتابة اسماء المدن");
    addManyCities(token, {
      names: manyCities.split("\n"),
      country_id: manyCitiesCountry
    })
      .then(res => {
        getAllCities(token)
          .then(res => setCities(res))
          .catch(err => console.log(err));
        setMessage("تمت الإضافة بنجاح");
      })
      .catch(err => console.log(err));
  };

  return (
    <main className="tap">
      <h2>المدن</h2>
      <div className="tap-box">
        <div className="tap-forms">
          <form onSubmit={handleAddMany}>
            <label htmlFor="addMany">قائمة المدن</label>
            <div className="addMany-form">
              <select onChange={handleCountryChange}>
                <option value="">اختر دولة</option>
                {countries.map(country => {
                  return (
                    <option key={country._id} value={country._id}>
                      {country.name}
                    </option>
                  );
                })}
              </select>
              <textarea
                value={manyCities}
                onChange={e => setManyCities(e.target.value)}
                readOnly={!manyCitiesCountry}
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

export default AdminCities;
