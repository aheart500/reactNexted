import React from "react";
import { Col, Row } from "react-bootstrap";
import Link from "next/link";

function NewsCard({ blog }) {
  let title = blog.title.replace(/\s/g, "_");
  return (
    <Col xs={12} lg={6}>
      <div className="news-card">
        <Row className="main-row">
          <Col xs={4}>
            <div className="card-image">
              <img src="/assets/images/blog/logotype.svg" alt="LogoType" />
            </div>
          </Col>
          <Col xs={8}>
            <div className="card-info">
              <div className="info-header">
                <span className="history">
                  <a href="/#">
                    <img
                      src="/assets/images/blog/icons/arrow.svg"
                      alt="Arrow"
                    />
                  </a>
                  {blog.created_at.split(" ")[0]}
                </span>
                <span className="news">
                  {blog.type === "news"
                    ? "اخبار"
                    : blog.type === "favorite"
                    ? "مفضلة"
                    : "مقالة"}
                </span>
              </div>
              <div className="info-desc">
                <h5>{blog.title}</h5>
                <p dangerouslySetInnerHTML={{ __html: blog.text }}></p>
              </div>
              <div className="info-footer">
                <Link href={`/blog/${title}`}>
                  <a className="reading"> إقرا المزيد</a>
                </Link>

                <ul className="list-unstyled">
                  <li className="share">
                    <span>مشاركة : </span>
                  </li>
                  <li>
                    <a href="/#">
                      <img
                        src="/assets/images/blog/icons/facebook.svg"
                        alt="Facebook"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="/#">
                      <img
                        src="/assets/images/blog/icons/twitter.svg"
                        alt="Twitter"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="/#">
                      <img
                        src="/assets/images/blog/icons/instagram.svg"
                        alt="Instagram"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="/#">
                      <img
                        src="/assets/images/blog/icons/linkedin.svg"
                        alt="Linkedin"
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
          <img
            className="save"
            src="/assets/images/blog/icons/save.svg"
            alt="save"
          />
        </Row>
      </div>
    </Col>
  );
}

export default NewsCard;
