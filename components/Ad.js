import React from "react";

const AD = ({ content }) => {
  return (
    <div
      className="ad-embed"
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  );
};
export default AD;
