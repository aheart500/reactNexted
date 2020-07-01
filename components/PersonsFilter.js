import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getAllCities, getAllCountries } from "../services/UserServices";

const PersonsFilter = React.memo(({ setPage }) => {
  const [search, setSearch] = useState({
    username: "",
    age: "",
    country: "",
    city: "",
  });
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [countriesData, setCountries] = useState([]);
  const [citiesData, setCities] = useState([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getAllCountries()
      .then((res) => {
        setCountries(res);
        getAllCities()
          .then((cii) => setCities(cii))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);
  useEffect(() => {
    if (search.country !== "") {
      setSelectedCountry(
        countriesData.find((c) => c._id === search.country).name
      );
    }
    if (search.city !== "") {
      setSelectedCity(citiesData.find((c) => c._id === search.city).name);
    }
  }, [search.country, search.city, citiesData, countriesData]);
  const { username, age, country, city } = search;
  const handleChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  // get unique countries

  // map to jsx
  let countries = countriesData.map((item, index) => {
    return (
      <option value={item._id} key={index}>
        {item.name}
      </option>
    );
  });
  // get unique cities

  // map to jsx
  let cities = search.country
    ? citiesData.filter((city) => city.country_id === search.country)
    : [];
  cities = cities.map((item, index) => {
    return (
      <option value={item._id} key={index}>
        {item.name}
      </option>
    );
  });

  // get ages

  let ages = [
    {
      value: "<10",
      name: "أقل من 10 سنين",
    },
    {
      value: "<20",
      name: "من 10 إلى 20 سنة",
    },
    {
      value: "<30",
      name: "من 21 إلى 30 سنة",
    },
    {
      value: "<40",
      name: "من 31 إلى 40 سنة",
    },
    {
      value: ">40",
      name: "اكبر من 40 سنة",
    },
  ];
  // map to jsx
  ages = ages.map((item, index) => {
    return (
      <option key={index} value={item.value}>
        {item.name}
      </option>
    );
  });

  let query = `?${username ? `name=${username}&` : ""}${
    age ? `age=${age}&` : ""
  }${country ? `country=${selectedCountry}&` : ""}${
    city ? `city=${selectedCity}&` : ""
  }`;

  if (query.endsWith("&")) query = query.replace(/&$/, "");

  return (
    <>
      <div className="persons-filter">
        <div className="search-form">
          <form className="filter-form">
            {/* name */}
            <div>
              <input
                name="username"
                id="username"
                value={username}
                placeholder="الأسم"
                className="form-control"
                onChange={handleChange}
              />
            </div>
            {/* end name */}
            {/* ages */}
            <div>
              <select
                name="age"
                id="age"
                value={age}
                className="form-control"
                onChange={handleChange}
              >
                <option value="">العمر</option>
                {ages}
              </select>
            </div>
            {/* end ages */}
            {/* select Country */}
            <div>
              <select
                name="country"
                id="country"
                defaultValue={country}
                className="form-control"
                onChange={handleChange}
              >
                <option value="">الدولة</option>
                {countries}
              </select>
            </div>
            {/* end select country */}
            {/* select city */}
            <div>
              <select
                name="city"
                id="city"
                value={city}
                className="form-control"
                onChange={handleChange}
              >
                <option value="">المدينة</option>
                {cities}
              </select>
            </div>
            {/* end select city */}
          </form>
        </div>
        {!loading && (
          <Link
            href={{
              pathname: "/",
              search: query,
            }}
          >
            <a onClick={() => setPage(1)}>البحث</a>
          </Link>
        )}
      </div>
    </>
  );
});

export default PersonsFilter;
