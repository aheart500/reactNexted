import React, { useState, useEffect } from "react";
import { getAllTags, editTags } from "../services/AdminServices";
const AdminTags = ({ token }) => {
  const [tags, setTags] = useState("");
  const [link, setLink] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    getAllTags(token)
      .then(res => {
        setTags(res.tags.join("\n"));
        setLink(res.link);
      })
      .catch(err => setMessage("حدث خطأ في السيرفر حاول مجدداً"));
  }, [token]);

  const handleSubmit = e => {
    e.preventDefault();
    editTags(token, tags.split("\n"), link)
      .then(res => setMessage("تم الحفظ بنجاح"))
      .catch(err => setMessage("حدث خطأ في السيرفر حاول مجدداً"));
  };
  return (
    <main className="tap">
      <h2>الروابط النصية</h2>
      <div className="tap-box">
        <div className="tap-forms">
          <form onSubmit={handleSubmit}>
            <label htmlFor="addMany"> قائمة الروابط </label>
            <div className="addMany-form">
              <textarea
                value={tags}
                onChange={e => setTags(e.target.value)}
              ></textarea>
              <input
                type="text"
                placeholder="الرابط"
                value={link}
                onChange={e => setLink(e.target.value)}
                style={{
                  padding: "0 0.5rem",
                  textAlign: "left"
                }}
              />
              <button type="submit">حفظ</button>
            </div>
            <br />
            {message}
          </form>
          <hr />
        </div>
      </div>
    </main>
  );
};

export default AdminTags;
