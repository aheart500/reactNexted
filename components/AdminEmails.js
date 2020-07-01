import React, { useState, useEffect } from "react";
import {
  deleteUser,
  convertVIP,
  convertNormal,
  block,
  unblock,
  deleteAll
} from "../services/AdminServices";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Paper,
  Checkbox,
  Toolbar,
  IconButton,
  Tooltip,
  Typography
} from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles, lighten } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    fontSize: "1.2rem"
  },
  tablePagination: {
    direction: "ltr"
  },
  highlight: {
    color: theme.palette.secondary.main,
    backgroundColor: lighten(theme.palette.secondary.light, 0.85)
  },
  title: {
    flex: "1 1 100%"
  }
}));

const AdminEmails = ({
  token,
  setEditUserData,
  changeTap,
  users,
  setUsers,
  kind
}) => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const classes = useStyles();
  useEffect(() => {
    setSelected([]);
  }, [kind]);
  const handleDelete = id => {
    deleteUser(token, id)
      .then(res => {
        setUsers(users.filter(user => user._id !== id));
      })
      .catch(err => console.log(err));
  };
  const headCells = [
    "الأسم",
    "اسم المستخدم",
    "الIP",
    "الدولة",
    "المدينة",
    "العمر",
    "الجنس",
    "النوع",
    "الحالة",
    ""
  ];
  const onSelectAllClick = e => {
    if (e.target.checked) {
      setSelected(users.map(user => user._id));
      return;
    }
    setSelected([]);
  };
  const handleClick = (e, id) => {
    if (e.target.id === "controls") {
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
  const handleConvertVIP = () => {
    setPage(0);
    convertVIP(token, selected)
      .then(res => {
        let newUsers = users.map(user =>
          isSelected(user._id) ? { ...user, status: 1 } : { ...user }
        );
        setUsers(newUsers);
      })
      .catch(err => console.log(err));
    setSelected([]);
  };
  const handleConvertNormal = () => {
    setPage(0);
    convertNormal(token, selected)
      .then(res => {
        let newUsers = users.map(user =>
          isSelected(user._id) ? { ...user, status: 0 } : { ...user }
        );
        setUsers(newUsers);
      })
      .catch(err => console.log(err));
    setSelected([]);
  };
  const handleBlock = () => {
    setPage(0);
    block(token, selected)
      .then(res => {
        let newUsers = users.map(user =>
          isSelected(user._id) ? { ...user, block: 1 } : { ...user }
        );
        setUsers(newUsers);
      })
      .catch(err => console.log(err));
    setSelected([]);
  };
  const handleUnblock = () => {
    setPage(0);
    unblock(token, selected)
      .then(res => {
        let newUsers = users.map(user =>
          isSelected(user._id) ? { ...user, block: 0 } : { ...user }
        );
        setUsers(newUsers);
      })
      .catch(err => console.log(err));
    setSelected([]);
  };
  const handleDeleteAll = () => {
    setPage(0);
    deleteAll(token, selected)
      .then(res => {
        let newUsers = users.filter(user => !isSelected(user._id));
        setUsers(newUsers);
      })
      .catch(err => console.log(err));
    setSelected([]);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);

  const selectionBox = () => {
    return (
      <Toolbar className={selected.length > 0 ? classes.highlight : ""}>
        {selected.length > 0 ? (
          <Typography className={classes.title} variant="subtitle1">
            تم تحديد {selected.length} حسابات
          </Typography>
        ) : (
          <Typography className={classes.title} variant="h5">
            الحسابات{" "}
            {kind === "normal"
              ? "العادية"
              : kind === "vip"
              ? "المدفوعة"
              : kind === "block"
              ? "المحظورة"
              : " "}
          </Typography>
        )}
        {selected.length > 0 && (
          <>
            <Tooltip title="أضف إلى الVIP">
              <IconButton onClick={handleConvertVIP}>
                <AddCircleOutlineIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="اخرج من قائمة الVIP">
              <IconButton onClick={handleConvertNormal}>
                <RemoveCircleOutlineIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="اخرج من قائمة الحظر">
              <IconButton onClick={handleUnblock}>
                <CheckCircleOutlineIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="تحويل إلى حساب محظور">
              <IconButton onClick={handleBlock}>
                <HighlightOffIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="حذف الحساب">
              <IconButton onClick={handleDeleteAll}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </>
        )}
      </Toolbar>
    );
  };
  const usersToPass =
    kind === "block"
      ? users.filter(user => user.block === 1)
      : kind === "normal"
      ? users.filter(user => user.status === 0)
      : kind === "vip"
      ? users.filter(user => user.status === 1)
      : users;
  const usersToRender = usersToPass
    .filter(user => {
      let regex = new RegExp(search, "i");
      return user.name.match(regex);
    })
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((user, i) => {
      const isItemSelected = isSelected(user._id);
      const labelId = `enhanced-table-checkbox-${i}`;
      let {
        name,
        username,
        ip,
        country_name,
        city_name,
        age,
        sex,
        block,
        status
      } = user;
      block = block === 1 ? "محظور" : "جيد";
      status = status === 1 ? "vip" : "عادي";
      sex = sex === 1 ? "انثي" : "ذكر";
      return (
        <TableRow
          key={i}
          hover
          onClick={e => handleClick(e, user._id)}
          role="checkbox"
          aria-checked={isItemSelected}
          tabIndex={-1}
          selected={isItemSelected}
        >
          <TableCell padding="checkbox">
            <Checkbox
              checked={isItemSelected}
              inputProps={{ "aria-labelledby": labelId }}
            />
          </TableCell>
          <TableCell align="right" className={classes.root}>
            {name}
          </TableCell>
          <TableCell align="right" className={classes.root}>
            {username}
          </TableCell>
          <TableCell
            align="right"
            style={{ maxWidth: "9rem", wordBreak: "break-word" }}
          >
            {ip}
          </TableCell>
          <TableCell align="right" className={classes.root}>
            {country_name}
          </TableCell>
          <TableCell align="right" className={classes.root}>
            {city_name}
          </TableCell>
          <TableCell align="right">{age}</TableCell>
          <TableCell align="right">
            <span className={sex === "ذكر" ? "tag tag-male" : "tag tag-female"}>
              {sex}
            </span>
          </TableCell>
          <TableCell align="right">
            <span
              className={status === "vip" ? "tag tag-vip" : "tag tag-normal"}
            >
              {status}
            </span>
          </TableCell>
          <TableCell align="right">
            <span
              className={block === "محظور" ? "tag tag-blocked" : "tag tag-good"}
            >
              {block}
            </span>
          </TableCell>
          <TableCell align="right">
            <button
              type="button"
              className="edit"
              id="controls"
              onClick={() => {
                setEditUserData(user);
                changeTap("edit-user");
              }}
            >
              تعديل
            </button>
            <button
              type="button"
              id="controls"
              onClick={() => {
                handleDelete(user._id);
              }}
              className="delete"
            >
              حذف
            </button>
          </TableCell>
        </TableRow>
      );
    });
  return (
    <main className="tap">
      <h2>الحسابات</h2>
      <div className="tap-box">
        <div className="tap-forms">
          <form>
            <label htmlFor="search">البحث</label>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />

            <span
              className="span-link"
              onClick={() => changeTap("create-user")}
            >
              + أضف حساب جديد
            </span>
          </form>
          <hr />
        </div>
        <Paper>
          {selectionBox()}
          <TableContainer className="tap-table">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={
                        selected.length > 0 && selected.length < users.length
                      }
                      checked={
                        users.length > 0 && users.length === selected.length
                      }
                      onChange={onSelectAllClick}
                      inputProps={{ "aria-label": "select all desserts" }}
                    />
                  </TableCell>
                  {headCells.map((cell, index) => {
                    return (
                      <TableCell key={index} align="right">
                        {cell}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {usersToRender}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={11} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={usersToPass.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            nextIconButtonText="الصفحة التالية"
            backIconButtonText="الصفحة السابقة"
            labelRowsPerPage={<span>عدد الحسابات في الصفحة</span>}
            className={classes.tablePagination}
          />
        </Paper>
      </div>
    </main>
  );
};

export default AdminEmails;
