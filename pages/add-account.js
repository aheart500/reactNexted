import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import {
  getAllCities,
  getAllCountries,
  addPerson,
  getIP,
  getAllMessages,
} from "../services/UserServices";
import ThemeContext from "../ThemeContext";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "../components/Footer";
let numbers = [];
for (let i = 0; i < 36; i++) {
  numbers.push(15 + i);
}
function AddAccount() {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [ip, setIP] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    age: "",
    message: "",
    country: "",
    city: "",
    sex: "",
  });
  const [nameRequired, setNameRequired] = useState("");
  const [usernameRequired, setUserNameRequired] = useState("");
  const [ageRequired, setAgeRequired] = useState("");
  const [sexRequired, setSexRequired] = useState("");
  const [messageRequired, setMessageRequired] = useState("");
  const [countryRequired, setCountryRequired] = useState("");
  const [cityRequired, setCityRequired] = useState("");
  const [buttonDisabled, setButtonDisables] = useState(false);
  const { theme } = useContext(ThemeContext);
  useEffect(() => {
    getAllCountries()
      .then((res) => setCountries(res))
      .catch((err) => console.log(err));
    getAllCities()
      .then((res) => setCities(res))
      .catch((err) => console.log(err));
    getIP()
      .then((res) => setIP(res))
      .catch((err) => console.log(err));
    getAllMessages()
      .then((res) => setMessages(res))
      .catch((err) => console.log(err));
  }, []);
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setButtonDisables(true);
    setNameRequired("");
    setUserNameRequired("");
    setCountryRequired("");
    setCityRequired("");
    setAgeRequired("");
    setMessageRequired("");
    setSexRequired("");
    if (userData.name === "") {
      setButtonDisables(false);
      return setNameRequired("برجاء إدخال الأسم");
    }
    if (userData.username === "") {
      setButtonDisables(false);
      return setUserNameRequired("برجاء إدخال اسم المستخدم");
    }
    if (userData.age === "") {
      setButtonDisables(false);
      return setAgeRequired("برجاء إدخال العمر");
    }
    if (userData.sex === "") {
      setButtonDisables(false);
      return setSexRequired("برجاء إدخال النوع");
    }
    if (userData.country === "") {
      setButtonDisables(false);
      return setCountryRequired("برجاء إدخال الدولة");
    }
    if (userData.city === "") {
      setButtonDisables(false);
      return setCityRequired("برجاء إدخال المدينة");
    }

    if (userData.message === "") {
      setButtonDisables(false);
      return setMessageRequired("برجاء إدخال الرسالة");
    }

    addPerson({ ...userData, ip })
      .then((res) => {
        setMessage("تم التسجيل بنجاح");
        setShowForm(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      className={
        theme.themeName === "dark" ? "app-container dark" : "app-container"
      }
    >
      <div className="add-account">
        {/* Start Header */}
        <header>
          <Container>
            {/* Start Heading */}
            <div className="heading-page">
              <Link href="/">
                <a>
                  <img src="/assets/images/blog/icons/arrow.svg" alt="Back" />
                </a>
              </Link>
              <h2 className="text-align">أضف بياناتك</h2>
            </div>
            {/* End Heading */}
            {/* Start Nav */}
            <nav className="d-none d-md-block text-center">
              <Row>
                <Col md={4}>
                  <Link href="/">
                    <a>الرئيسية </a>
                  </Link>
                </Col>
                <Col md={4}>
                  <Link href="/add-account">
                    <a className="active">إضافة حساب </a>
                  </Link>
                </Col>
                <Col md={4}>
                  <Link href="/subscription">
                    <a>إشتراك</a>
                  </Link>
                </Col>
              </Row>
            </nav>
            {/* End Nav */}
          </Container>
        </header>
        {/* End Header */}

        {/* Start Body */}
        <section className="add-body text-center">
          {message && <div className="user-form">{message}</div>}
          {showForm && (
            <>
              <form className="user-form" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="name">الأسم</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                />
                <span className="required-message">{nameRequired}</span>
                <label htmlFor="username" className="username-label">
                  اسم المستخدم
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={userData.username}
                  onChange={handleChange}
                />
                <span className="required-message">{usernameRequired}</span>
                <label htmlFor="age">العمر</label>
                <select
                  id="age"
                  name="age"
                  onChange={handleChange}
                  required={true}
                >
                  <option value=""></option>
                  {numbers.map((n) => {
                    return (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    );
                  })}
                </select>
                <span className="required-message">{ageRequired}</span>
                <label htmlFor="sex">النوع</label>
                <select id="sex" name="sex" onChange={handleChange}>
                  <option value=""></option>
                  <option value="0">ذكر</option>
                  <option value="1">أنثى</option>
                </select>
                <span className="required-message">{sexRequired}</span>
                <label htmlFor="country">الدولة</label>
                <select
                  id="country"
                  name="country"
                  onChange={handleChange}
                  required={true}
                >
                  <option value=""></option>
                  {countries.map((country) => {
                    return (
                      <option key={country._id} value={country._id}>
                        {country.name}
                      </option>
                    );
                  })}
                </select>
                <span className="required-message">{countryRequired}</span>
                <label htmlFor="city">المدينة</label>
                <select
                  id="city"
                  name="city"
                  onChange={handleChange}
                  required={true}
                >
                  <option value=""></option>
                  {cities
                    .filter((city) => city.country_id === userData.country)
                    .map((city) => {
                      return (
                        <option key={city._id} value={city._id}>
                          {city.name}
                        </option>
                      );
                    })}
                </select>
                <span className="required-message">{cityRequired}</span>
                <label htmlFor="message">الرسالة</label>
                <select id="message" name="message" onChange={handleChange}>
                  <option value=""></option>
                  {messages.map((message) => {
                    return (
                      <option key={message._id} value={message.text}>
                        {message.text}
                      </option>
                    );
                  })}
                </select>
                <span className="required-message">{messageRequired}</span>
              </form>
              <button
                type="button"
                onClick={handleSubmit}
                className="special-button"
                disabled={buttonDisabled}
              >
                أضف حسابك
              </button>
            </>
          )}
        </section>
        {/* End Body */}
      </div>
      <Footer page="add-account" />
    </div>
  );
}

export default AddAccount;
