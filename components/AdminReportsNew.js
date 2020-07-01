import React, { useState } from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Toolbar,
  Tooltip,
  Checkbox,
  TablePagination,
  IconButton
} from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles, lighten } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  tablePagination: {
    direction: "ltr"
  },
  highlight: {
    color: theme.palette.secondary.main,
    backgroundColor: lighten(theme.palette.secondary.light, 0.85)
  },
  title: {
    flex: "1 1 100%"
  },
  done: {
    backgroundColor: "#3f51b5",
    outline: "none",
    border: "none"
  },
  delete: {
    backgroundColor: "#f50057",
    outline: "none",
    border: "none"
  }
}));

const AdminReportsNew = ({
  heads,
  reports,
  handleConvertDone,
  handleDeleteReports,
  handleConvertBlock,
  handleDeleteUser
}) => {
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const classes = useStyles();

  const onSelectAllClick = e => {
    if (e.target.checked) {
      setSelected(reports.map(user => user._id));
      return;
    }
    setSelected([]);
  };
  const handleClick = (e, id) => {
    if (
      ["controls", "controls1", "controls2", "controls3"].indexOf(
        e.target.id
      ) !== -1
    ) {
      setSelected([]);
    } else {
      const newSelected =
        selected.indexOf(id) !== -1
          ? selected.filter(item => item !== id)
          : selected.concat(id);
      setSelected(newSelected);
    }
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const isSelected = id => selected.indexOf(id) !== -1;
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, reports.length - page * rowsPerPage);

  const handleAction = (action, list) => {
    setPage(0);
    setSelected([]);
    switch (action) {
      case "done":
        handleConvertDone(list);
        return;
      case "deleteReport":
        handleDeleteReports(list);
        return;
      case "block":
        handleConvertBlock(list);
        return;
      case "deleteUser":
        handleDeleteUser(list);
        return;
      default:
        return;
    }
  };

  const selectionBox = () => {
    return (
      <Toolbar className={selected.length > 0 ? classes.highlight : ""}>
        {selected.length > 0 ? (
          <Typography className={classes.title} variant="subtitle1">
            تم تحديد {selected.length} بلاغات
          </Typography>
        ) : (
          <Typography className={classes.title} variant="h5">
            البلاغات
          </Typography>
        )}
        {selected.length > 0 && (
          <>
            <Tooltip title="تم">
              <IconButton onClick={() => handleAction("done", selected)}>
                <CheckCircleOutlineIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="حظر">
              <IconButton onClick={() => handleAction("block", selected)}>
                <RemoveCircleOutlineIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="حذف الحساب">
              <IconButton onClick={() => handleAction("deleteUser", selected)}>
                <HighlightOffIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="حذف التقرير">
              <IconButton
                onClick={() => handleAction("deleteReport", selected)}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </>
        )}
      </Toolbar>
    );
  };

  return (
    <div className="report-table">
      <Paper>
        {selectionBox()}
        <TableContainer className="tap-table">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={
                      selected.length > 0 && selected.length < reports.length
                    }
                    checked={
                      reports.length > 0 && reports.length === selected.length
                    }
                    onChange={onSelectAllClick}
                  />
                </TableCell>
                {heads.map((cell, index) => {
                  return (
                    <TableCell key={index} align="right">
                      {cell}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {reports
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((report, i) => {
                  const isItemSelected = isSelected(report._id);
                  return (
                    <TableRow
                      key={i}
                      hover
                      onClick={e => handleClick(e, report._id)}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isItemSelected} />
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          width: "25%",
                          wordBreak: "break-word",
                          fontSize: "1.2rem"
                        }}
                      >
                        {report.text}
                      </TableCell>
                      <TableCell align="right" style={{ fontSize: "1.2rem" }}>
                        {report.name}
                      </TableCell>
                      <TableCell align="right" style={{ fontSize: "1.2rem" }}>
                        {report.phone}
                      </TableCell>
                      <TableCell align="right" style={{ fontSize: "1.2rem" }}>
                        {report.reportedName}
                      </TableCell>

                      <TableCell align="right">
                        <span
                          className={
                            report.reportedStatus === "vip"
                              ? "tag tag-vip"
                              : "tag tag-normal"
                          }
                        >
                          {report.reportedStatus}
                        </span>
                      </TableCell>
                      <TableCell align="right">
                        <span
                          className={
                            report.reportedBlock === "محظور"
                              ? "tag tag-blocked"
                              : "tag tag-good"
                          }
                        >
                          {report.reportedBlock}
                        </span>
                      </TableCell>
                      <TableCell align="right" style={{ width: "35%" }}>
                        <button
                          className={classes.done}
                          type="button"
                          id="controls"
                          onClick={() => handleAction("done", [report._id])}
                        >
                          تم
                        </button>
                        <button
                          type="button"
                          id="controls1"
                          className="edit"
                          onClick={() => handleAction("block", [report._id])}
                        >
                          حظر
                        </button>
                        <button
                          type="button"
                          id="controls2"
                          className="delete"
                          onClick={() =>
                            handleAction("deleteUser", [report._id])
                          }
                        >
                          حذف الحساب
                        </button>
                        <button
                          className={classes.delete}
                          id="controls3"
                          type="button"
                          onClick={() =>
                            handleAction("deleteReport", [report._id])
                          }
                        >
                          حذف البلاغ
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={8} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={reports.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          nextIconButtonText="الصفحة التالية"
          backIconButtonText="الصفحة السابقة"
          labelRowsPerPage={<span>عدد البلاغات في الصفحة</span>}
          className={classes.tablePagination}
        />
      </Paper>
    </div>
  );
};

export default AdminReportsNew;
