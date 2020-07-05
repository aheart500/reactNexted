import React, { useState, useEffect, useContext } from "react";
import ThemeContext from "../../ThemeContext";
import ThemeButton from "../../components/ThemeButton";
import Footer from "../../components/Footer";
import { getVipUsers, getAds, getSettings } from "../../services/UserServices";
import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";
import Head from "next/head";
import PremiumCard from "../../components/PremiumCard";
import PersonsFilter from "../../components/PersonsFilter";
import LatestGhost from "../../components/LatestGhost";
import AD from "../../components/Ad";
import tagsModel from "../../server/models/tag";
import userModel from "../../server/models/user";
import countryModel from "../../server/models/country";
import cityModel from "../../server/models/city";
import Meta from "../../components/Meta";
function Home({ user }) {
  const { theme, changeTheme } = useContext(ThemeContext);
  const [vipUsers, setVipUsers] = useState([]);
  const [ads, setAds] = useState([]);
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
                  {user ? (
                    <LatestGhost persons={[user]} link={settings.link} />
                  ) : (
                    <>
                      <div className="empty-search">
                        <h3>لا توجد نتائج</h3>
                      </div>
                    </>
                  )}
                </Row>
              </Container>
            </section>
          </>

          {/* End Ghosts */}

          {/* End Body */}
        </div>
        <Footer page="home" />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  let tags = await tagsModel.find({}).lean();

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

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
      title: context.query.unique,
      desc: `${context.query.unique} - تعارف سناب شات اضافات سنابيسو لزيادة مشاهدات سناب شات`,
    },
  };
}
export default Home;
