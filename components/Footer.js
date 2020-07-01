import react from "react";
import { Container } from "react-bootstrap";
import Link from "next/link";
const Footer = ({ page }) => {
  const handleClick = () => window.scrollTo({ top: 0 });
  return (
    <section className="pages-controls d-md-none">
      <Container>
        <Link href="/add-account">
          <a
            onClick={handleClick}
            className={page === "add-account" ? "active" : ""}
          >
            إضافة حساب{" "}
          </a>
        </Link>
        <Link href="/">
          <a onClick={handleClick} className={page === "home" ? "active" : ""}>
            الرئيسية{" "}
          </a>
        </Link>
        <Link href="/subscription">
          <a
            onClick={handleClick}
            className={page === "subs" ? "active premium" : "premium"}
          >
            إشتراك
          </a>
        </Link>
      </Container>
    </section>
  );
};

export default Footer;
