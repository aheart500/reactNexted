import React, { useState, useEffect } from "react";
import {
  getReports,
  doReports,
  undoReports,
  deleteReports,
  block,
  deleteAll
} from "../services/AdminServices";
import AdminReportsNew from "./AdminReportsNew";
import AdminReportsFinished from "./AdminReportsFinished";
const AdminReports = ({ token, users, setUsers }) => {
  const [reports, setReports] = useState([]);
  const heads = [
    "البلاغ",
    "اسم المبلغ",
    "رقم الجوال",
    "المبلغ عنه",
    "حالة المستخدم",
    "نوع المستخدم",
    ""
  ];
  useEffect(() => {
    getReports(token)
      .then(res => {
        let formatted = res.map(report => {
          const user = users.find(user => user._id === report.reportedId);
          let status, block;
          if (user) {
            status = user.status === 0 ? "عادي" : "vip";
            block = user.block === 0 ? "جيد" : "محظور";
          }
          return {
            ...report,
            reportedStatus: user ? status : "محذوف",
            reportedBlock: user ? block : "محذوف"
          };
        });
        setReports(formatted);
      })
      .catch(err => console.log(err));
  }, [token, users]);
  const isPresent = (list, id) => list.indexOf(id) !== -1;

  const handleConvertDone = list => {
    doReports(token, list)
      .then(res => {
        let updatedReports = reports.map(report =>
          isPresent(list, report._id)
            ? { ...report, done: true }
            : { ...report }
        );
        setReports(updatedReports);
      })
      .catch(err => console.log(err));
  };
  const handleConvertUndone = list => {
    undoReports(token, list)
      .then(res => {
        let updatedReports = reports.map(report =>
          isPresent(list, report._id)
            ? { ...report, done: false }
            : { ...report }
        );
        setReports(updatedReports);
      })
      .catch(err => console.log(err));
  };
  const handleDeleteReports = list => {
    deleteReports(token, list)
      .then(res => {
        setReports(reports.filter(report => !isPresent(list, report._id)));
      })
      .catch(err => console.log(err));
  };
  const handleConvertBlock = selectedReports => {
    let list = reports
      .filter(report => selectedReports.indexOf(report._id) !== -1)
      .map(report => report.reportedId);
    block(token, list)
      .then(res => {
        let updatedUsers = users.map(user =>
          isPresent(list, user._id) ? { ...user, block: 1 } : { ...user }
        );
        setUsers(updatedUsers);
      })
      .catch(err => console.log(err));
    doReports(token, selectedReports)
      .then(res => {
        let updatedReports = reports.map(report =>
          isPresent(selectedReports, report._id)
            ? { ...report, done: true }
            : { ...report }
        );
        setReports(updatedReports);
      })
      .catch(err => console.log(err));
  };
  const handleDeleteUser = list => {
    let usersT = reports
      .filter(report => list.indexOf(report._id) !== -1)
      .map(report => report.reportedId);
    deleteAll(token, usersT)
      .then(res => {
        setUsers(users.filter(user => !isPresent(usersT, user._id)));
      })
      .catch(err => console.log(err));
    doReports(token, list)
      .then(res => {
        let updatedReports = reports.map(report =>
          isPresent(list, report._id)
            ? { ...report, done: true }
            : { ...report }
        );
        setReports(updatedReports);
      })
      .catch(err => console.log(err));
  };
  return (
    <main className="tap">
      <h2>البلاغات</h2>
      <div className="tap-box">
        <div className="tap-tables">
          <AdminReportsFinished
            heads={heads}
            reports={reports.filter(report => report.done)}
            handleConvertUndone={handleConvertUndone}
            handleDeleteReports={handleDeleteReports}
          />

          <AdminReportsNew
            heads={heads}
            reports={reports.filter(report => !report.done)}
            handleConvertDone={handleConvertDone}
            handleDeleteReports={handleDeleteReports}
            handleConvertBlock={handleConvertBlock}
            handleDeleteUser={handleDeleteUser}
          />
        </div>
      </div>
    </main>
  );
};

export default AdminReports;
