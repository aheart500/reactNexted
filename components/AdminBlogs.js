import React, { useState, useEffect } from "react";
import Link from "next/link";
import CKEditor from "ckeditor4-react";
import {
  getAllBlogs,
  addBlog,
  editBlog,
  deleteBlog,
} from "../services/AdminServices";

const AdminBlogs = ({ token }) => {
  const [blogs, setBlogs] = useState([]);
  const [seacrh, setSearch] = useState("");
  const [newBlog, setNewBlog] = useState({ title: "", text: "", type: "news" });
  const [message, setMessage] = useState("");
  const [editBox, setEditBox] = useState(false);
  const [editBlogData, setEditBlogData] = useState({
    title: "",
    text: "",
    type: "news",
  });
  const [editMessage, setEditMessage] = useState("");

  useEffect(() => {
    getAllBlogs(token)
      .then((res) => {
        setBlogs(res);
      })
      .catch((err) => console.log(err));
  }, [token]);
  const handleAdd = (e) => {
    e.preventDefault();
    addBlog(token, newBlog)
      .then((res) => {
        if (res.error) {
          setMessage(res.error);
        } else {
          let blogsUpdated = [...blogs];
          blogsUpdated.unshift(res);
          setBlogs(blogsUpdated);
          setMessage("تم إضافة المدونة بنجاح");
          setNewBlog({ title: "", text: "", type: "news" });
        }
      })
      .catch((err) => {
        setMessage("حدث خطأ في السيرفر حاول مجدداً");
      });
  };
  const handleShowEdit = (blogData) => {
    setEditBox(true);
    setEditBlogData(blogData);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    editBlog(token, editBlogData._id, editBlogData)
      .then((res) => {
        if (res.error) {
          setMessage(res.error);
        } else {
          setBlogs(
            blogs.map((blog) => {
              if (blog._id === editBlogData._id) return res;
              return blog;
            })
          );

          setEditMessage("تم تعديل المدونة بنجاح");
        }
      })
      .catch((err) => setMessage("حدث خطأ في السيرفر حاول مجدداً"));
  };
  const handleDelete = (id) => {
    deleteBlog(token, id)
      .then((res) => {
        setBlogs(blogs.filter((blog) => blog._id !== id));
      })
      .catch((err) => console.log(err));
  };
  return (
    <main className="tap">
      <h2>المدونة</h2>
      <div className="tap-box">
        <div className="tap-forms">
          <form onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="search">البحث</label>
            <input
              type="text"
              value={seacrh}
              id="search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
          <hr />
          <form onSubmit={handleAdd}>
            <label htmlFor="add">إضافة مدونة</label>
            <label htmlFor="title"> العنوان</label>
            <input
              type="text"
              id="title"
              value={newBlog.title}
              className="title-box"
              onChange={(e) =>
                setNewBlog({ ...newBlog, title: e.target.value })
              }
              required={true}
            />
            <label htmlFor="text"> المدونة</label>

            <CKEditor
              id="text"
              className="text-box"
              config={{
                contentsLangDirection: "rtl",
              }}
              data={newBlog.text}
              onChange={(e) =>
                setNewBlog({ ...newBlog, text: e.editor.getData() })
              }
              required
            />
            <br />
            <label htmlFor="type"> نوع المدونة</label>
            <select
              onChange={(e) => setNewBlog({ ...newBlog, type: e.target.value })}
              id="type"
            >
              <option value="news">أخبار</option>
              <option value="articles">مقالة</option>
              <option value="favorite">مفضلة</option>
            </select>
            <br />
            <br />
            <button type="submit">إضافة المدونة</button>
          </form>
          <br />
          {message}
          <hr />
          {editBox && (
            <>
              <form onSubmit={handleEdit}>
                <label htmlFor="edit"> تعديل المدونة</label>
                <label htmlFor="edit-title"> العنوان</label>
                <input
                  type="text"
                  id="edit-title"
                  value={editBlogData.title}
                  className="title-box"
                  onChange={(e) =>
                    setEditBlogData({ ...editBlogData, title: e.target.value })
                  }
                  required={true}
                />
                <label htmlFor="edit-text"> المدونة</label>

                <CKEditor
                  id="edit-text"
                  className="text-box"
                  config={{
                    contentsLangDirection: "rtl",
                  }}
                  data={editBlogData.text}
                  onChange={(e) =>
                    setEditBlogData({
                      ...editBlogData,
                      text: e.editor.getData(),
                    })
                  }
                  required
                />
                <br />
                <label htmlFor="edit-type"> نوع المدونة</label>
                <select
                  onChange={(e) =>
                    setEditBlogData({ ...editBlogData, type: e.target.value })
                  }
                  defaultValue={editBlogData.type}
                  id="edit-type"
                >
                  <option value="news">أخبار</option>
                  <option value="articles">مقالة</option>
                  <option value="favorite">مفضلة</option>
                </select>
                <br />
                <br />
                <button
                  type="button"
                  style={{ marginLeft: "1rem" }}
                  onClick={() => setEditBox(false)}
                >
                  {" "}
                  إلغاء التعديل
                </button>
                <button type="submit">تعديل المدونة</button>
              </form>
              <br />
              {editMessage}
              <hr />
            </>
          )}
        </div>
      </div>
      <div className="blogs-container">
        <h2>المدونات</h2>
        {blogs
          .filter((blog) => {
            let regex = new RegExp(seacrh, "ig");
            return blog.title.match(regex);
          })
          .map((blog) => {
            return (
              <div className="blog" key={blog._id}>
                <div className="blog-header">
                  <div className="blog-header-right">
                    <h2>{blog.title}</h2>
                    <span>
                      {blog.type === "news"
                        ? "اخبار"
                        : blog.type === "favorite"
                        ? "مفضلة"
                        : "مقالة"}
                    </span>
                    <span>{blog.created_at.split(" ")[0]}</span> <br />
                    <Link
                      href={{
                        pathname: `blog/${blog.title.replace(/\s/g, "_")}`,
                      }}
                    >
                      <a target="_blank">اضغط هنا للذهاب إلى صفحة المدونة</a>
                    </Link>
                  </div>
                  <div className="blog-header-left">
                    <button
                      type="button"
                      onClick={() => handleShowEdit(blog)}
                      className="edit"
                    >
                      تعديل
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(blog._id)}
                      className="delete"
                    >
                      حذف
                    </button>
                  </div>
                </div>
                <hr />
                <div
                  className="blog-text blog-rendered"
                  dangerouslySetInnerHTML={{ __html: blog.text }}
                ></div>
              </div>
            );
          })}
      </div>
    </main>
  );
};

export default AdminBlogs;
