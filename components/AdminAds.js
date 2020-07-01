import React, { useState, useEffect } from "react";
import { addAd, editAd, deleteAd, getAds } from "../services/AdminServices";
import CKEditor from "ckeditor4-react";
const AdminAds = ({ token }) => {
  const [adData, setAdData] = useState({
    content: "",
    position: "",
    shown: false
  });
  const [reRender, setRerender] = useState(1);
  const [ads, setAds] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getAds(token)
      .then(res => setAds(res))
      .catch(err => console.log(err));
  }, [token, reRender]);
  const handleSumbit = e => {
    e.preventDefault();
    if (adData.content === "" || adData.position === "") {
      setMessage("برجاء إدخال كامل البيانات");
    } else {
      addAd(token, adData)
        .then(res => {
          let newAds = [...ads];
          newAds.unshift(res);
          setAds(newAds);
          setAdData({
            content: "",
            position: "",
            shown: false
          });
          setMessage("تم إضافة الإعلان بنجاح");
        })
        .catch(err => console.log(err));
    }
  };
  return (
    <main className="tap">
      <h2>الإعلانات</h2>
      <div className="tap-box">
        <div className="tap-forms">
          <form onSubmit={handleSumbit}>
            <div>
              <br />
              <label htmlFor="ad">المحتوى</label>
              <CKEditor
                id="ad"
                config={{
                  contentsLangDirection: "rtl"
                }}
                data={adData.content}
                onChange={e =>
                  setAdData({ ...adData, content: e.editor.getData() })
                }
                required
              />
            </div>
            <div>
              <br />
              <label htmlFor="position">موضع الإعلان</label>
              <select
                id="position"
                value={adData.position}
                onChange={e =>
                  setAdData({ ...adData, position: e.target.value })
                }
              >
                <option value="">اختر موضع الإعلان</option>
                <option value="beforBar"> البداية</option>
                <option value="afterBar">قبل الأشباح المميزين</option>
                <option value="afterVip">بعد الأشباح المميزين</option>
                <option value="afterFilter">بعد البحث</option>
              </select>
            </div>
            <div>
              <br />
              <h5>العرض</h5>
              <input
                style={{ height: "unset" }}
                type="radio"
                id="shown"
                name="shown"
                checked={adData.shown}
                onChange={e =>
                  setAdData({ ...adData, shown: e.target.checked })
                }
              />
              <label style={{ display: "inline" }} htmlFor="shown">
                معروض
              </label>
              <input
                style={{ height: "unset" }}
                type="radio"
                id="hidden"
                name="shown"
                checked={!adData.shown}
                onChange={e =>
                  setAdData({ ...adData, shown: !e.target.checked })
                }
              />
              <label htmlFor="hidden" style={{ display: "inline" }}>
                مخفي
              </label>
            </div>
            <button type="submit">نشر</button>
            <span
              style={{ display: "block", color: "red", fontSize: "1.2rem" }}
            >
              {message}
            </span>
          </form>
          <br />
          <hr />
        </div>
        <div>
          {ads.map((ad, i) => {
            return (
              <div key={i} className="ad-box">
                <div dangerouslySetInnerHTML={{ __html: ad.content }}></div>
                <div className="ad-controls">
                  <input
                    style={{ height: "unset" }}
                    type="radio"
                    id={`${ad._id}1`}
                    name={`${ad._id}`}
                    checked={ad.shown}
                    onChange={e =>
                      editAd(token, ad._id, { shown: e.target.checked })
                        .then(() => setRerender(reRender + 1))
                        .catch(err => console.log(err))
                    }
                  />
                  <label style={{ display: "inline" }} htmlFor={`${ad._id}1`}>
                    معروض
                  </label>
                  <input
                    style={{ height: "unset" }}
                    type="radio"
                    id={`${ad._id}2`}
                    name={`${ad._id}`}
                    checked={!ad.shown}
                    onChange={e =>
                      editAd(token, ad._id, { shown: !e.target.checked })
                        .then(() => setRerender(reRender + 1))
                        .catch(err => console.log(err))
                    }
                  />
                  <label htmlFor={`${ad._id}2`} style={{ display: "inline" }}>
                    مخفي
                  </label>
                  <select
                    id="position"
                    value={ad.position}
                    onChange={e =>
                      editAd(token, ad._id, { position: e.target.value })
                        .then(() => setRerender(reRender + 1))
                        .catch(err => console.log(err))
                    }
                  >
                    <option value="beforBar"> البداية</option>
                    <option value="afterBar">قبل الأشباح المميزين</option>
                    <option value="afterVip">بعد الأشباح المميزين</option>
                    <option value="afterFilter">بعد البحث</option>
                  </select>
                  <button
                    type="button"
                    className="delete"
                    onClick={() =>
                      deleteAd(token, ad._id)
                        .then(() => setRerender(reRender + 1))
                        .catch(err => console.log(err))
                    }
                  >
                    حذف
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default AdminAds;
