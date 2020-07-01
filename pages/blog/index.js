import React, { useState, useContext } from "react";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import ThemeContext from "../../ThemeContext";
// components
import NewsCard from "../../components/NewsCard";

import BlogsModel from "../../server/models/blog";

function Blog({ blogs }) {
  const [classification, setClassification] = useState("all");
  const { theme } = useContext(ThemeContext);
  const blogsToRender = () => {
    switch (classification) {
      case "all":
        return blogs;
      case "news":
        return blogs.filter((blog) => blog.type === "news");
      case "articles":
        return blogs.filter((blog) => blog.type === "articles");
      case "favorite":
        return blogs.filter((blog) => blog.type === "favorite");
      default:
        return blogs;
    }
  };

  return (
    <div
      className={
        theme.themeName === "dark" ? "app-container dark" : "app-container"
      }
    >
      <div className="blog-page">
        {/* Start Header */}
        <header>
          <Container>
            {/* Start Heading */}
            <div className="heading-page">
              <a href="/#">
                <img src="/assets/images/blog/icons/arrow.svg" alt="Back" />
              </a>
              <h2 className="text-align">المدونة</h2>
            </div>
            {/* End Heading */}

            {/* Start Nav */}
            <nav>
              <Row>
                <Col xs={6} md={3}>
                  <button
                    type="button"
                    className={classification === "all" ? "active" : ""}
                    onClick={() => setClassification("all")}
                  >
                    الكل
                  </button>
                </Col>
                <Col xs={6} md={3}>
                  <button
                    type="button"
                    className={classification === "news" ? "active" : ""}
                    onClick={() => setClassification("news")}
                  >
                    الأخبار
                  </button>
                </Col>
                <Col xs={6} md={3}>
                  <button
                    type="button"
                    className={classification === "articles" ? "active" : ""}
                    onClick={() => setClassification("articles")}
                  >
                    المقالات
                  </button>
                </Col>
                <Col xs={6} md={3}>
                  <button
                    type="button"
                    className={classification === "favorite" ? "active" : ""}
                    onClick={() => setClassification("favorite")}
                  >
                    المفضلة
                  </button>
                </Col>
              </Row>
            </nav>
            {/* End Nav */}
          </Container>
        </header>
        {/* End Header */}

        {/* Start Body */}

        {/* Start News cards */}
        <section className="news-cards">
          <Container>
            <Row>
              {blogsToRender().length > 0 ? (
                blogsToRender().map((blog) => (
                  <NewsCard key={blog._id} blog={blog} />
                ))
              ) : (
                <h2>لا توجد مدونات</h2>
              )}
            </Row>
          </Container>
        </section>
        {/* End News cards */}

        {/* Start Read more button */}
        <section className="read-more text-center">
          <Container>
            <a href="/#">إقرا المزيد</a>
          </Container>
        </section>
        {/* End Read more button */}

        {/* End Body */}

        <section className="pages-controls d-md-none">
          <Container>
            <Link href="/add-account">
              <a className="active">إضافة حساب </a>
            </Link>
            <Link href="/">
              <a className="hover">الرئيسية </a>
            </Link>
            <Link href="/subscription">
              <a className="premium">إشتراك</a>
            </Link>
          </Container>
        </section>
      </div>
    </div>
  );
}
export async function getServerSideProps() {
  const blogs = await BlogsModel.find({}).lean();
  return {
    props: {
      blogs: JSON.parse(JSON.stringify(blogs)),
    },
  };
}
export default Blog;
