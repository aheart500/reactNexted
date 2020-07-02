import React from "react";
import Link from "next/link";
import { Col } from "react-bootstrap";

const PremiumCard = React.memo((props) => {
  return (
    <Col xs={6} md={4} lg={3}>
      <div className="premium-card text-center">
        <div className="item">
          <div className="image-container">
            <img src={props.Image} alt="Profile" />
          </div>
          <Link href={`/user/نشر-سناب-${props.unique}-سنابيسو`}>
            <a className="user-link">
              <h3>{props.name}</h3>
            </a>
          </Link>
          <a
            className="add"
            href={`https://www.snapchat.com/add/${props.username}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={props.ImageIcon} alt="Icon" />
            <span>{props.nameLink}</span>
          </a>
        </div>
      </div>
    </Col>
  );
});

export default PremiumCard;
