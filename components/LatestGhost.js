import React, { useState } from "react";
import { addReport } from "../services/UserServices";
import { Row, Col } from "react-bootstrap";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

import { makeStyles } from "@material-ui/core/styles";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyle = makeStyles({
  root: {
    textAlign: "right",
    "& .MuiDialogContentText-root": {
      color: "black",
    },
  },
  textField: {
    marginTop: "1rem",

    "& .MuiInputLabel-formControl": {
      right: "0",
      left: "unset",
    },
  },
  buttons: {
    margin: "1rem",
  },
});

const LatestGhost = React.memo(({ persons, link }) => {
  const classes = useStyle();
  const [reportDialog, setReportDialog] = useState(false);
  const [reportSent, setReportSent] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState({
    reportedName: "",
    reportedId: "",
  });
  const [report, setReport] = useState({ name: "", text: "", phone: "" });
  const handleOpendialoge = (reportedName, reportedId) => {
    setReportSent(false);
    setSelectedUser({
      reportedName,
      reportedId,
    });
    setReportDialog(true);
  };
  const handleDialogeClose = () => {
    setSelectedUser({
      reportedName: "",
      reportedId: "",
    });
    setReport({ name: "", text: "", phone: "" });
    setReportDialog(false);
  };
  const handleReport = () => {
    if (report.name === "" || report.text === "" || report.phone === "") {
      setMessage("برجاء إدخال كامل البيانات");
    } else {
      addReport({ ...selectedUser, ...report })
        .then((res) => setReportSent(true))
        .catch((err) => console.log(err));
    }
  };

  if (persons.length === 0) {
    return (
      <div className="empty-search">
        <h3>لا توجد نتائج</h3>
      </div>
    );
  }

  return (
    <>
      {persons.map((person, index) => {
        return (
          <Col lg={4} key={person._id}>
            <div
              className={`ghost-item ${
                index === persons.length - 1 ? "marginaway" : ""
              }`}
            >
              <div className="heading-item">
                <Link href={`/user/نشر-سناب-${person.unique}-سنابيسو`}>
                  <a onClick={() => window.scrollTo({ top: 0 })}>
                    <h2>{person.name}</h2>
                  </a>
                </Link>
              </div>
              <div className="content-item">
                <Row>
                  <Col xs={4}>
                    <h4>
                      {" "}
                      <img
                        src="/assets/images/home/icons/country.svg"
                        alt="icon"
                      />
                      &nbsp; الدولة
                    </h4>
                  </Col>
                  <Col xs={4}>
                    <h4>
                      {" "}
                      <img
                        src="/assets/images/home/icons/city.svg"
                        alt="icon"
                      />
                      &nbsp; المدينة
                    </h4>
                  </Col>
                  <Col xs={4}>
                    <h4>
                      {" "}
                      <img src="/assets/images/home/icons/age.svg" alt="icon" />
                      &nbsp; العمر
                    </h4>
                  </Col>
                  <Col xs={4}>
                    <h5>{person.country_name}</h5>
                  </Col>
                  <Col xs={4}>
                    <h5>{person.city_name}</h5>
                  </Col>
                  <Col xs={4}>
                    <h5>{person.age}</h5>
                  </Col>
                </Row>
                <Row>
                  <Col xs={4}>
                    <h4>
                      {" "}
                      <img
                        src="/assets/images/home/icons/sex.svg"
                        alt="icon"
                        width="20px"
                        height="15px"
                      />
                      &nbsp; النوع
                    </h4>
                  </Col>
                  <Col xs={4}>
                    <h4>
                      {" "}
                      <img src="/assets/images/home/icons/cal.svg" alt="icon" />
                      &nbsp; التاريخ
                    </h4>
                  </Col>
                  <Col xs={4}>
                    <h4>
                      {" "}
                      <img
                        src="/assets/images/home/icons/clock.svg"
                        alt="icon"
                        width="20px"
                        height="15px"
                      />
                      &nbsp; الوقت
                    </h4>
                  </Col>
                  <Col xs={4}>
                    <h5>{person.sex === 0 ? "ذكر" : "انثى"}</h5>
                  </Col>
                  <Col xs={4}>
                    <h5>{person.date}</h5>
                  </Col>
                  <Col xs={4}>
                    <h5>{person.time}</h5>
                  </Col>
                </Row>
                <Row className="d-flex justify-content-center">
                  <Col xs={12}>
                    <Button
                      style={{ outline: "none", fontSize: "1.2rem" }}
                      variant="outlined"
                      color="primary"
                    >
                      {person.message}
                    </Button>
                    <br />
                  </Col>
                  <Col xs={4}>
                    <Button
                      onClick={() =>
                        handleOpendialoge(
                          person.name,
                          person._id,
                          person.status,
                          person.block
                        )
                      }
                      className="button-sm text-danger"
                      style={{ outline: "none" }}
                    >
                      التبليغ
                    </Button>
                  </Col>
                  <Col xs={4}>
                    <a
                      className="button-sm"
                      href={`https://www.snapchat.com/add/${person.username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      الإضافة
                    </a>
                  </Col>
                </Row>
              </div>
              <div className="footer-item">
                <ul className="list-unstyled">
                  <li>
                    {person.tags.map((tag, index) => {
                      return (
                        <span key={index} style={{ color: "#fff" }}>
                          <a
                            href={link}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            {tag}
                          </a>
                          {index !== 2 ? " - " : ""}
                        </span>
                      );
                    })}
                  </li>
                </ul>
              </div>
            </div>
          </Col>
        );
      })}
      <Dialog
        open={reportDialog}
        onClose={handleDialogeClose}
        className={classes.root}
        PaperProps={{
          style: {
            background: reportSent
              ? ""
              : `url('/assets/images/add-account/logotype.svg') no-repeat center`,
            backgroundColor: reportSent ? "" : "#fff",
          },
        }}
        TransitionComponent={Transition}
      >
        <DialogTitle>تبليغ</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {reportSent
              ? `تم تقديم البلاغ في ${selectedUser.reportedName}`
              : `إذا كنت تريد تقديم بلاغ عن "${selectedUser.reportedName}" برجاء إكمال
            البيانات التالية`}
          </DialogContentText>
          {!reportSent && (
            <>
              {" "}
              <TextField
                autoFocus
                label="الأسم"
                type="text"
                value={report.name}
                onChange={(e) => setReport({ ...report, name: e.target.value })}
                required
                fullWidth
                className={classes.textField}
              />
              <TextField
                label="الهاتف الجوال"
                type="text"
                value={report.phone}
                onChange={(e) =>
                  setReport({ ...report, phone: e.target.value })
                }
                required
                fullWidth
                className={classes.textField}
              />
              <TextField
                label="البلاغ"
                type="text"
                value={report.text}
                onChange={(e) => setReport({ ...report, text: e.target.value })}
                required
                fullWidth
                multiline
                rows={5}
                className={classes.textField}
              />
              {message}
            </>
          )}
        </DialogContent>
        <DialogActions>
          {!reportSent && (
            <Button
              onClick={handleReport}
              variant="contained"
              color="secondary"
              className={classes.buttons}
            >
              إرسال البلاغ
            </Button>
          )}
          <Button
            onClick={handleDialogeClose}
            variant="contained"
            color="primary"
            className={classes.buttons}
          >
            {reportSent ? "خروج" : "إلغاء البلاغ"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});

export default LatestGhost;
