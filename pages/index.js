import React, { useState, useEffect, useContext } from "react";
import ThemeContext from "../ThemeContext";
import {
  getNormalUsers,
  getSearchUsers,
  getSingleUser,
} from "../services/UserServices";
import tagsModel from "../server/models/tag";
import userModel from "../server/models/user";
import countryModel from "../server/models/country";
import cityModel from "../server/models/city";
import adModel from "../server/models/ad";
import settingsModel from "../server/models/settings";
import Footer from "../components/Footer";
import { Container, Row, Col } from "react-bootstrap";
import ThemeButton from "../components/ThemeButton";
import PremiumCard from "../components/PremiumCard";
import PersonsFilter from "../components/PersonsFilter";
import LatestGhost from "../components/LatestGhost";
import AD from "../components/Ad";
import Link from "next/link";

function Home({ user, settings, queryParams, vipUsers, ads, normal }) {
  const [normalUsers, setNormalUsers] = useState(normal);
  const [ghostsLoading, setGhostsLoading] = useState(true);
  const [nSearch, setnSearch] = useState(0);
  const [page, setPage] = useState(1);
  const { theme, changeTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (!user) {
      setGhostsLoading(true);
      if (queryParams === {}) {
        getNormalUsers(page, settings.normal_per_page)
          .then((res) => setNormalUsers(res))
          .catch((err) => console.log(err))
          .finally(() => setGhostsLoading(false));
      } else {
        if (queryParams.city) {
          let cityName = queryParams.city;
          document.title = `${settings.site_name} ${cityName}`;
        } else if (queryParams.country) {
          let countryName = queryParams.country;
          document.title = `${settings.site_name} ${countryName}`;
        }
        getSearchUsers(queryParams, page, settings.normal_per_page)
          .then((res) => {
            setNormalUsers(res.users);
            setnSearch(res.nFound);
          })
          .catch((err) => console.log(err))
          .finally(() => setGhostsLoading(false));
      }
    } else {
      getSingleUser(queryParams.unique)
        .then((res) => {
          if (res.username) {
            setNormalUsers([res]);
          }
        })
        .catch((err) => console.log(err))
        .finally(() => setGhostsLoading(false));
    }
  }, [queryParams, settings, page, user]);
  const paginator = () => {
    let l = queryParams !== {} ? nSearch : settings.nUsers;

    let nPages = Math.ceil(l / settings.normal_per_page);
    if (nPages <= 1) return null;
    let buttons = [];
    for (let i = 1; i <= nPages; i++) buttons.push(i);
    return (
      <div className="paginator">
        {buttons.map((button, index) => {
          return (
            <button type="button" key={index} onClick={() => setPage(button)}>
              {button}
            </button>
          );
        })}
      </div>
    );
  };
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
            <PersonsFilter persons={normalUsers} setPage={setPage} />
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
        {ghostsLoading ? (
          <div className="special-loader-container">
            <div className="special-loader"></div>
          </div>
        ) : (
          <>
            <section className={`latest-ghosts ${theme.themeName}`}>
              <Container>
                <div className="main-heading">
                  <h4>آخر الأشباح</h4>
                </div>
                <Row
                  style={{
                    justifyContent: normalUsers.length === 1 ? "center" : "",
                  }}
                >
                  <LatestGhost persons={normalUsers} link={settings.link} />
                </Row>
              </Container>
            </section>

            {user ? null : paginator()}
          </>
        )}
        {/* End Ghosts */}

        {/* End Body */}
      </div>
      <Footer page="home" />
    </div>
  );
}
export default Home;

export async function getServerSideProps(context) {
  let settings = await settingsModel.findOne({}).lean();
  let link = await tagsModel.findOne({}).select({ link: 1 }).lean();
  let nUsers = await userModel.estimatedDocumentCount();
  if (settings) {
    settings = {
      ...settings,
      link: link ? link.link : "",
      nUsers: nUsers ? nUsers : 0,
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
  const user = context.query.unique ? true : false;
  let noUsers = await userModel
    .find({ status: 0 })
    .sort("-_id")
    .limit(settings.normal_per_page)
    .lean();
  for (let i = 0; i < noUsers.length; i++) {
    let country, city;
    country = await countryModel
      .findOne({ _id: noUsers[i].country })
      .select({ name: 1 })
      .lean();
    city = await cityModel
      .findOne({ _id: noUsers[i].city })
      .select({ name: 1 })
      .lean();
    if (noUsers[i].time.indexOf("PM"))
      noUsers[i].time = noUsers[i].time.replace("PM", "م");
    if (noUsers[i].time.indexOf("AM"))
      noUsers[i].time = noUsers[i].time.replace("AM", "ص");
    let tags = await tagsModel.find({}).select({ name: 1 }).lean();
    tags = tags
      .map((tag) => tag.name)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    noUsers[i] = {
      ...noUsers[i],
      country_name: country ? country.name : "",
      city_name: city ? city.name : "",
      tags,
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
    let tags = await tagsModel.find({}).select({ name: 1 }).lean();
    tags = tags
      .map((tag) => tag.name)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    viUsers[i] = {
      ...viUsers[i],
      country_name: country ? country.name : "",
      city_name: city ? city.name : "",
      tags,
    };
  }
  const ads = await adModel.find({ shown: true }).sort("-_id").lean();
  return {
    props: {
      settings: JSON.parse(JSON.stringify(settings)),
      user,
      queryParams: context.query,
      normal: JSON.parse(JSON.stringify(noUsers)),
      vipUsers: JSON.parse(JSON.stringify(viUsers)),
      ads: JSON.parse(JSON.stringify(ads)),
    },
  };
}
