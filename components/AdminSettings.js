import React, { useState, useEffect } from "react";
import { getSettings, changeSettings } from "../services/AdminServices";
const AdminSettings = ({ token }) => {
  const [settings, setSettings] = useState({
    site_name: "",
    site_description: "",
    vip_per_page: 0,
    normal_per_page: 0
  });
  const [message, setMessage] = useState("");
  useEffect(() => {
    getSettings(token)
      .then(res => setSettings(res))
      .catch(err => console.log(err));
  }, [token]);
  const handleSubmit = e => {
    e.preventDefault();
    changeSettings(token, settings._id, settings)
      .then(res => {
        setMessage("تم حفظ التعديلات بنجاح");
      })
      .catch(err => setMessage("حدث خطأ اثناء حفظ التعديلات"));
  };
  return (
    <main className="tap">
      <h2>إعدادات الموقع</h2>
      <div className="tap-box">
        <div className="tap-forms">
          <form onSubmit={handleSubmit}>
            <label htmlFor="settings">الضبط</label>
            <label htmlFor="name">اسم الموقع</label>
            <input
              type="text"
              id="name"
              value={settings.site_name}
              onChange={e =>
                setSettings({ ...settings, site_name: e.target.value })
              }
            />
            <label htmlFor="description">وصف الموقع</label>
            <textarea
              id="description"
              value={settings.site_description}
              onChange={e =>
                setSettings({ ...settings, site_description: e.target.value })
              }
            />
            <label htmlFor="vipPpage">
              عدد حسابات الVIP التي تظهر في الصفحة الرئيسية
            </label>
            <input
              type="number"
              id="vipPpage"
              value={settings.vip_per_page}
              onChange={e =>
                setSettings({ ...settings, vip_per_page: e.target.value })
              }
            />
            <label htmlFor="normalPpage">
              {" "}
              عدد الحسابات العادية التي تظهر في الصفحة
            </label>
            <input
              type="number"
              id="normalPpage"
              value={settings.normal_per_page}
              onChange={e =>
                setSettings({ ...settings, normal_per_page: e.target.value })
              }
            />
            <br />
            <br />
            <button type="submit">حفظ</button>
          </form>
          {message}
          <hr />
        </div>
      </div>
    </main>
  );
};

export default AdminSettings;
