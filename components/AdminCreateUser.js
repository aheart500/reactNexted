import React, { useState, useEffect } from "react";
import {
  getAllCities,
  getAllCountries,
  getAllMessages,
  addUser
} from "../services/AdminServices";

const AdminCreateUser = ({ token, changeTap, setUsers, users, kind }) => {
  const [countries, setCoutries] = useState([]);
  const [cities, setCities] = useState([]);
  const [messages, setMessages] = useState([]);

  const [message, setMessage] = useState("");
  const [imageU, setImageU] = useState(null);
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    ip: "",
    age: 0,
    country: "",
    city: "",
    status: 1,
    message: ""
  });
  const { name, username, ip } = userData;
  useEffect(() => {
    getAllCountries(token)
      .then(res => setCoutries(res))
      .catch(err => console.log(err));
    getAllCities(token)
      .then(res => setCities(res))
      .catch(err => console.log(err));
    getAllMessages(token)
      .then(res => setMessages(res))
      .catch(err => console.log(err));
  }, [token]);
  const handleInputChange = e => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleImageChange = e => {
    setUserData({ ...userData, img: e.target.files[0] });
    const reader = new FileReader();
    reader.onload = e => {
      setImageU(e.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (userData.name === "") {
      return setMessage("برجاء إضافة الأسم");
    }
    let form = new FormData();
    form.append("img", userData.img);
    form.append("userData", JSON.stringify(userData));
    addUser(token, form)
      .then(res => {
        setUserData({
          name: "",
          username: "",
          ip: "",
          age: 0,
          country: "",
          city: "",
          message: ""
        });
        changeTap("emails");
        let newUsers = [...users];
        newUsers.unshift(res);
        setUsers(newUsers);
      })
      .catch(err =>
        setMessage(
          "حدثت مشكلة أثناء إضافة المستخدم برجاء التأكد من كل المدخلات وحاول مجدداً"
        )
      );
  };
  return (
    <main className="tap">
      <h2>إضافة حساب</h2>
      <div className="tap-box">
        <div className="tap-forms create-user-form">
          <form onSubmit={handleSubmit}>
            {kind === "vip" ? (
              <div>
                <h2>الصورة</h2>
                <label
                  htmlFor="img"
                  className="img-label"
                  style={{
                    background: imageU ? `url('${imageU}') center/cover` : ""
                  }}
                ></label>
                <input type="file" id="img" onChange={handleImageChange} />
              </div>
            ) : null}
            <span className="message"> {message}</span>
            <div>
              <label htmlFor="name">الأسم</label>
              <input
                type="text"
                value={name}
                name="name"
                onChange={handleInputChange}
                id="name"
                required={true}
              />
            </div>
            <div>
              <label htmlFor="username">اسم المستخدم</label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={handleInputChange}
                id="username"
                required={true}
              />
            </div>
            <div>
              <label htmlFor="ip">IP</label>
              <input
                type="text"
                name="ip"
                value={ip}
                onChange={handleInputChange}
                id="ip"
                required={true}
              />
            </div>
            <div>
              <label htmlFor="country">الدولة</label>
              <select id="country" name="country" onChange={handleInputChange}>
                <option value="">اختر دولة</option>
                {countries.map(country => {
                  return (
                    <option key={country._id} value={country._id}>
                      {country.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label htmlFor="city">المدينة</label>
              <select id="city" name="city" onChange={handleInputChange}>
                <option value="">اختر المدينة</option>
                {cities
                  .filter(city => city.country_id === userData.country)
                  .map(city => {
                    return (
                      <option key={city._id} value={city._id}>
                        {city.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div>
              <label htmlFor="message">الرسالة</label>
              <select id="message" name="message" onChange={handleInputChange}>
                <option value="">اختر رسالة</option>
                {messages.map((message, i) => {
                  return (
                    <option key={i} value={message.text}>
                      {message.text}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label htmlFor="age">العمر</label>
              <input
                type="number"
                id="age"
                name="age"
                onChange={handleInputChange}
                required={true}
              />
            </div>
            <div className="radio-box">
              <span>الجنس</span>
              <input
                type="radio"
                name="sex"
                onChange={handleInputChange}
                value="0"
                id="male"
              />{" "}
              <label htmlFor="male" className="special-label">
                ذكر
              </label>
              <input
                type="radio"
                name="sex"
                onChange={handleInputChange}
                value="1"
                id="female"
              />{" "}
              <label htmlFor="female" className="special-label">
                انثى
              </label>
            </div>
            <div className="radio-box">
              <span>النوع</span>
              <input
                type="radio"
                name="status"
                onChange={handleInputChange}
                value="0"
                id="normal"
              />{" "}
              <label htmlFor="normal" className="special-label">
                عادي
              </label>
              <input
                type="radio"
                name="status"
                onChange={handleInputChange}
                value="1"
                id="vip"
                defaultChecked={kind === "vip" ? true : false}
              />{" "}
              <label htmlFor="vip" className="special-label">
                VIP
              </label>
            </div>
            <div className="radio-box">
              <span>الحالة</span>
              <input
                type="radio"
                name="block"
                onChange={handleInputChange}
                value="0"
                id="good"
              />{" "}
              <label htmlFor="good" className="special-label">
                جيد
              </label>
              <input
                type="radio"
                name="block"
                value="1"
                onChange={handleInputChange}
                id="blocked"
              />{" "}
              <label htmlFor="blocked" className="special-label">
                محظور
              </label>
            </div>
            <button type="submit">إضافة حساب جديد</button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AdminCreateUser;
