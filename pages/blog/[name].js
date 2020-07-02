import React, { useState, useContext } from "react";
import Link from "next/link";
import Head from "next/head";
import { Container } from "react-bootstrap";
import ThemeContext from "../../ThemeContext";
import BlogsModel from "../../server/models/blog";

const SingleBlog = ({ blog }) => {
  const { theme } = useContext(ThemeContext);
  const blogSection = () => {
    return (
      <section className="single-blog">
        <span>تاريخ: {blog.created_at.split(" ")[0]}</span>
        <br />
        <span>
          تصنيف:{" "}
          {blog.type === "news"
            ? "اخبار"
            : blog.type === "favorite"
            ? "مفضلة"
            : "مقالة"}
        </span>
        <h2>{blog.title}</h2>
        <div
          dangerouslySetInnerHTML={{ __html: blog.text }}
          className="blog-rendered"
        ></div>
      </section>
    );
  };
  const NotFoundSection = () => {
    return (
      <div>
        <h2>المدونة غير موجودة</h2>
      </div>
    );
  };

  return (
    <>
      <Head>
        <meta
          name="description"
          content={`تعارف سناب شات اضافات سنابيسو لزيادة مشاهدات سناب شات ${blog.title}`}
        />

        <meta
          name="google-site-verification"
          content="YuD3YwsOTJk9v9zC9HGz3UMPy5xt8VNrCDxPznahAZY"
        />
        <meta name="robots" content="index,follow" />

        <title>{blog.title}</title>
      </Head>
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
                <Link href="/blog">
                  <img src="/assets/images/blog/icons/arrow.svg" alt="Back" />
                </Link>
                <h2 className="text-align">المدونة</h2>
              </div>
              {/* End Heading */}
            </Container>
          </header>
          {/* End Header */}
          {!blog ? NotFoundSection() : blogSection()}
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
    </>
  );
};
export async function getServerSideProps(context) {
  const blog = await BlogsModel.findOne({
    title: context.query.name.replace(/_/g, " "),
  }).lean();
  return {
    props: {
      blog: JSON.parse(JSON.stringify(blog)),
    },
  };
}

export default SingleBlog;
