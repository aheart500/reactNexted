import React, { useState, useEffect } from "react";
import { getSettings, changeSettings } from "../services/AdminServices";
import CKEditor from "ckeditor4-react";

const AdminVip = ({ token }) => {
  const [settings, setSettings] = useState({ vip_message: "" });
  const [gotDate, setGotDate] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getSettings(token)
      .then(res => {
        setSettings(res);
        setGotDate(true);
      })
      .catch(err => console.log(err));
  }, [token]);

  const handleSubmit = e => {
    e.preventDefault();
    changeSettings(token, settings._id, settings)
      .then(res => setMessage("تم ضبط الرسالة بنجاح"))
      .catch(err => setMessage("حدث خطأ في السيرفر حاول مجدداً"));
  };

  return (
    <main className="tap">
      <h2>اشتراك الVIP</h2>
      <div className="tap-box">
        <div className="tap-forms">
          <form onSubmit={handleSubmit}>
            <label htmlFor="vip">رسالة الاشتراك</label>
            {gotDate && (
              <CKEditor
                id="vip"
                config={{
                  contentsLangDirection: "rtl"
                }}
                data={settings.vip_message}
                onChange={e =>
                  setSettings({ ...settings, vip_message: e.editor.getData() })
                }
                required
              />
            )}

            <br />
            <button type="submit">حفظ</button>
          </form>
          <br />
          {message}
          <hr />
        </div>
      </div>
    </main>
  );
};

export default AdminVip;
