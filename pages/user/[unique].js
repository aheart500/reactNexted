import React, { useState, useEffect, useContext } from "react";
import ThemeContext from "../../ThemeContext";

import ThemeButton from "../../components/ThemeButton";
import Footer from "../../components/Footer";

import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";
import PremiumCard from "../../components/PremiumCard";
import PersonsFilter from "../../components/PersonsFilter";
import LatestGhost from "../../components/LatestGhost";
import AD from "../../components/Ad";
import tagsModel from "../../server/models/tag";
import userModel from "../../server/models/user";
import settingsModel from "../../server/models/settings";
import countryModel from "../../server/models/country";
import cityModel from "../../server/models/city";
import adModel from "../../server/models/ad";
function Home({ user, settings, vipUsers, ads }) {
  const { theme, changeTheme } = useContext(ThemeContext);

  return (
    <div
      className={
        theme.themeName === "dark" ? "app-container dark" : "app-container"
      }
    >
      <ThemeButton themeName={theme.themeName} changeTheme={changeTheme} />
      <div className="home-page text-center">
        {/* Start Header */}
        <header>
          <Container>
            {/* Start Heading */}
            <div className="heading-page">
              <img src="/assets/images/home/logotype.svg" alt="heading" />
              <h2 className={theme.themeName}>سنابيسو</h2>
            </div>
            {/* End Heading */}
            <br />
            <br />

            {ads
              .filter((ad) => ad.position === "beforBar")
              .map((ad) => (
                <AD key={ad._id} content={ad.content} />
              ))}
            {/* Start Nav */}
            <nav className="d-none d-md-block">
              <Row>
                <Col md={4}>
                  <Link href="/">
                    <a className="active">الرئيسية </a>
                  </Link>
                </Col>
                <Col md={4}>
                  <Link href="/add-account">
                    <a>إضافة حساب </a>
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
            <br />
            {ads
              .filter((ad) => ad.position === "afterBar")
              .map((ad) => (
                <AD content={ad.content} key={ad._id} />
              ))}
          </Container>
        </header>
        {/* End Header */}

        {/* Start Body */}

        {/* Start Premium Ghosts */}
        <section className="premium-ghosts">
          <Container>
            <div className="main-heading">
              <h4>أشباحنا المميزين</h4>
            </div>

            <Row className="premium-container">
              {vipUsers.map((user) => (
                <PremiumCard
                  key={user._id}
                  nameLink={"إضافة"}
                  Image={
                    user.img
                      ? user.img
                      : "/assets/images/home/profile-image.svg"
                  }
                  ImageIcon="/assets/images/home/icons/add.svg"
                  name={user.name}
                  username={user.username}
                  unique={user.unique}
                />
              ))}

              <Col xs={6} md={4} lg={3}>
                <div className="premium-card text-center">
                  <div className="item last">
                    <div className={`image-container ${theme.themeName}`}>
                      <img
                        src="/assets/images/home/ghost-icon.svg"
                        alt="Profile"
                      />
                    </div>
                    <br />
                    <br />
                    <br />

                    <Link href="/subscription">
                      <a className="add">
                        <span>متاح للإشتراك</span>
                      </a>
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
            <br />
            {ads
              .filter((ad) => ad.position === "afterVip")
              .map((ad) => (
                <AD content={ad.content} key={ad._id} />
              ))}
          </Container>
        </section>
        {/* End Premium Ghosts */}

        {/* Start Search */}
        <section className="search">
          <Container>
            <div className="main-heading">
              <h4>إبحث عن الأشباح</h4>
            </div>
            <PersonsFilter />
            <br />

            {ads
              .filter((ad) => ad.position === "afterFilter")
              .map((ad) => (
                <AD content={ad.content} key={ad._id} />
              ))}
          </Container>
        </section>
        {/* End Search */}

        {/* Latest Ghosts */}

        <>
          <section className={`latest-ghosts ${theme.themeName}`}>
            <Container>
              <div className="main-heading">
                <h4>آخر الأشباح</h4>
              </div>
              <Row
                style={{
                  justifyContent: "center",
                }}
              >
                <LatestGhost persons={[user]} link={settings.link} />
              </Row>
            </Container>
          </section>
        </>

        {/* End Ghosts */}

        {/* End Body */}
      </div>
      <Footer page="home" />
    </div>
  );
}

export async function getServerSideProps(context) {
  let settings = await settingsModel.findOne({}).lean();
  let tags = await tagsModel.find({}).lean();
  if (settings) {
    settings = {
      ...settings,
      link: tags ? tags[0].link : "",
    };
  } else {
    settings = {
      site_name: "",
      site_description: "",
      vip_per_page: 3,
      normal_per_page: 5,
      vip_message: "اشتراك",
    };
  }
  let user = await userModel.findOne({
    unique: context.query.unique.replace(/\D/g, ""),
  });
  if (user) {
    let country, city;
    country = await countryModel
      .findOne({ _id: user.country })
      .select({ name: 1 })
      .lean();
    city = await cityModel
      .findOne({ _id: user.city })
      .select({ name: 1 })
      .lean();

    tags = tags.map((tag) => tag.name);

    if (user.time.indexOf("PM")) user.time = user.time.replace("PM", "م");
    if (user.time.indexOf("AM")) user.time = user.time.replace("AM", "ص");

    user = {
      ...user._doc,
      country_name: country ? country.name : "",
      city_name: city ? city.name : "",
      tags: tags.sort(() => 0.5 - Math.random()).slice(0, 3),
    };
  }
  let viUsers = await userModel
    .find({ status: 1 })
    .sort("-_id")
    .limit(settings.vip)
    .lean();
  for (let i = 0; i < viUsers.length; i++) {
    let country, city;
    country = await countryModel
      .findOne({ _id: viUsers[i].country })
      .select({ name: 1 })
      .lean();
    city = await cityModel
      .findOne({ _id: viUsers[i].city })
      .select({ name: 1 })
      .lean();
    if (viUsers[i].time.indexOf("PM"))
      viUsers[i].time = viUsers[i].time.replace("PM", "م");
    if (viUsers[i].time.indexOf("AM"))
      viUsers[i].time = viUsers[i].time.replace("AM", "ص");
    viUsers[i] = {
      ...viUsers[i],
      country_name: country ? country.name : "",
      city_name: city ? city.name : "",
    };
  }
  const ads = await adModel.find({ shown: true }).sort("-_id").lean();

  return {
    props: {
      settings: JSON.parse(JSON.stringify(settings)),
      user: JSON.parse(JSON.stringify(user)),
      vipUsers: JSON.parse(JSON.stringify(viUsers)),
      ads: JSON.parse(JSON.stringify(ads)),
    },
  };
}
export default Home;
