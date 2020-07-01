import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { getSettings } from "../services/UserServices";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "../components/Footer";
import ThemeContext from "../ThemeContext";
function Subscription() {
  const [setting, setSetting] = useState(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useContext(ThemeContext);
  useEffect(() => {
    if (!setting) {
      getSettings().then((res) => {
        setSetting(res);
        setLoading(false);
      });
    }
  }, []);
  if (loading) return null;
  return (
    <div
      className={
        theme.themeName === "dark" ? "app-container dark" : "app-container"
      }
    >
      <div className="subscription">
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
                    <a>إضافة حساب </a>
                  </Link>
                </Col>
                <Col md={4}>
                  <Link href="/subscription">
                    <a className="active">إشتراك</a>
                  </Link>
                </Col>
              </Row>
            </nav>
            {/* End Nav */}
          </Container>
        </header>
        {/* End Header */}

        {/* Start Body */}
        <section className="subscription-body text-center">
          <Container>
            <div className="subscription-form">
              <div
                dangerouslySetInnerHTML={{ __html: setting.vip_message }}
              ></div>
            </div>
          </Container>
        </section>
        {/* End Body */}
      </div>
      <Footer page="subs" />
    </div>
  );
}

export default Subscription;
