import React, { useState, useEffect, useContext } from "react";

import ThemeContext from "../ThemeContext";
import {
  getNormalUsers,
  getSearchUsers,
  getVipUsers,
  getAds,
  getSettings,
} from "../services/UserServices";

import Footer from "../components/Footer";
import { Container, Row, Col } from "react-bootstrap";
import ThemeButton from "../components/ThemeButton";
import PremiumCard from "../components/PremiumCard";
import PersonsFilter from "../components/PersonsFilter";
import LatestGhost from "../components/LatestGhost";
import AD from "../components/Ad";
import Link from "next/link";
import Meta from "../components/Meta";

function Home({ queryParams }) {
  const [normalUsers, setNormalUsers] = useState([]);
  const [ghostsLoading, setGhostsLoading] = useState(true);
  const [nSearch, setnSearch] = useState(0);
  const [page, setPage] = useState(1);
  const [vipUsers, setVipUsers] = useState([]);
  const [ads, setAds] = useState([]);

  const { theme, changeTheme } = useContext(ThemeContext);
  const [settings, setSettings] = useState({ link: "" });
  useEffect(() => {
    getSettings()
      .then((res) => {
        setSettings(res);
        getVipUsers(1, res.vip_per_page).then((u) => setVipUsers(u));
      })
      .catch((err) => console.log(err));

    getAds()
      .then((res) => setAds(res))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setGhostsLoading(true);
    if (queryParams === {}) {
      getNormalUsers(page, settings.normal_per_page)
        .then((res) => setNormalUsers(res))
        .catch((err) => console.log(err))
        .finally(() => setGhostsLoading(false));
    } else {
      getSearchUsers(queryParams, page, settings.normal_per_page)
        .then((res) => {
          setNormalUsers(res.users);
          setnSearch(res.nFound);
        })
        .catch((err) => console.log(err))
        .finally(() => setGhostsLoading(false));
    }
  }, [queryParams, settings, page]);
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
    <>
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
                {vipUsers.map((user) => {
                  let arr = user.img ? user.img.split("/") : null;

                  return (
                    <PremiumCard
                      key={user._id}
                      nameLink={"إضافة"}
                      Image={
                        user.img
                          ? "/" +
                            arr.slice(arr.length - 2, arr.length).join("/")
                          : "/assets/images/home/profile-image.svg"
                      }
                      ImageIcon="/assets/images/home/icons/add.svg"
                      name={user.name}
                      username={user.username}
                      unique={user.unique}
                    />
                  );
                })}

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
            </>
          )}
          {/* End Ghosts */}

          {/* End Body */}
        </div>
        <Footer page="home" />
      </div>
    </>
  );
}
export default Home;

export async function getServerSideProps({ query }) {
  let queryParams = { ...query };
  let desc = "نشر سناب اضافات سناب شات أقوى موقع تعارف سناب شات سنابيسو";
  let title = " نشر سناب - اضافات سناب - سنابيسو";
  let keys = [
    "تعارف سناب",
    "نشر سناب",
    "تعارف سناب شات",
    "دليل السناب",
    "دليل سناب",
    "دليل سناب شات",
    "حسابات سناب شات بنات",
    "سناب بنات",
    "سناب بنات فله",
    "سناب شات بنات",
    "سناب شات بنات الامارات",
    "سناب شات بنات جده",
    "سناب شات بنات سعوديات",
    "سنابات بنات",
    "سنابات بنات فله",
    "تعارف سناب شات ",
    "سناب مزز",
    "تعارف سناب",
  ];
  if (queryParams.city) {
    let cityName = queryParams.city;

    title = "نشر سناب اضافات سناب سنابيسو" + " " + cityName;
    desc = "نشر سناب اضافات سناب سنابيسو" + " " + cityName;
    keys = ["نشر سناب", `نشر سناب ${cityName}`];
  } else if (queryParams.country) {
    let countryName = queryParams.country;

    title = "نشر سناب اضافات سناب سنابيسو" + " " + countryName;
    desc = "نشر سناب اضافات سناب سنابيسو" + " " + countryName;
    keys = ["نشر سناب", `نشر سناب ${countryName}`];
  }
  if (queryParams.age) {
    desc += " " + queryParams.age;
  }
  if (queryParams.name) {
    desc += " " + queryParams.name;
  }

  return {
    props: {
      queryParams,
      title,
      desc,
      keys,
    },
  };
}
