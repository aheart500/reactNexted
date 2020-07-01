import React, { useState, useEffect } from "react";
import { getAllMessages, addMessage } from "../services/AdminServices";
const AdminMessages = ({ token }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getAllMessages(token)
      .then(res => {
        setMessages(res.map(message => `${message.text}`).join("\n"));
      })
      .catch(err => {
        console.log(err);
        setMessage("حدث خطأ في السرفر");
      });
  }, [token]);

  const handleAddMany = e => {
    e.preventDefault();
    addMessage(token, messages.split("\n"))
      .then(res => setMessage("تم الحفظ بنجاح"))
      .catch(err => setMessage("حدث خطأ في السيرفر حاول مجدداً"));
  };

  return (
    <main className="tap">
      <h2>الرسائل</h2>
      <div className="tap-box">
        <div className="tap-forms">
          <form onSubmit={handleAddMany}>
            <label htmlFor="add">قائمة الرسائل</label>
            <div className="message-div">
              <textarea
                className="message-text-area"
                type="text"
                id="add"
                value={messages}
                onChange={e => setMessages(e.target.value)}
              ></textarea>
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

export default AdminMessages;
