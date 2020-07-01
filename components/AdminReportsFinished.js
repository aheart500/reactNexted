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
  handleConvertUndone,
  handleDeleteReports
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
    if (["controls", "controls1"].indexOf(e.target.id) !== -1) {
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
      case "undone":
        handleConvertUndone(list);
        return;
      case "deleteReport":
        handleDeleteReports(list);
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
            البلاغات المنتهية
          </Typography>
        )}
        {selected.length > 0 && (
          <>
            <Tooltip title="إعادة إلى  البلاغات">
              <IconButton onClick={() => handleAction("undone", selected)}>
                <RemoveCircleOutlineIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="حذف البلاغ">
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
                      <TableCell align="right" style={{ width: "25%" }}>
                        <button
                          className={classes.done}
                          type="button"
                          id="controls"
                          onClick={() => handleAction("undone", [report._id])}
                        >
                          إعادة إلى البلاغات
                        </button>

                        <button
                          className={classes.delete}
                          type="button"
                          id="controls1"
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
