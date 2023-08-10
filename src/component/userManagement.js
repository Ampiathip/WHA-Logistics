import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import {
  makeStyles,
  Grid,
  Container,
  TextField,
  InputAdornment,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
import clsx from "clsx";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
import { Height } from "@mui/icons-material";
import Visibility from "@mui/icons-material/Visibility";
import ModalResetPassword from "./modalResetPassword";
import UserView from "./modalUserView";

const useStyles = makeStyles((theme) => ({
  flexRow: {
    display: "flex",
  },
  marginRow: {
    marginTop: 20,
  },
  alignSelf: {
    alignSelf: "center",
  },
  inputWidth: {
    width: "100%",
  },
  fontSixeHead: {
    fontSize: "16px !important",
  },
  fontSixeCell: {
    fontSize: "14px !important",
  },
  marginIcon: {
    marginRight: 5,
  },
  imgWidth: {
    width: "-webkit-fill-available",
  },
  justContent: {
    justifyContent: "space-between",
  },
  borderImg: {
    border: "1px solid #D9D9D9",
    borderRadius: 10,
    padding: 10,
  },
  alignItem: {
    alignItems: "center",
  },
  modalWidth: {
    width: "60% !important",
    height: "90% !important",
  },
  modalContent: {
    justifyContent: "space-around",
  },
  boxMargin: {
    marginLeft: 20,
  },
  textCenter: {
    textAlign: "center",
  },
  paddingContent: {
    padding: "0px 24px !important",
  },
  borderBottom: {
    borderBottom: "solid #F9F9FA",
  },
  backGroundConfrim: {
    backgroundColor: "#03257D !important",
    color: "#fff !important",
    "&:hover": {
      backgroundColor: "#03257D !important",
      boxShadow: `none`,
    },
  },
  paddingHead: {
    padding: "10px !important",
  },
  paddingFoot: {
    padding: "24px !important",
  },
  backGroundCancel: {
    backgroundColor: "#fff !important",
    color: "#1A1C1D !important",
    border: "1px solid #1A1C1D !important",
    "&:hover": {
      backgroundColor: "#fff !important",
      boxShadow: `none`,
    },
  },
  flexRowBtnModal: {
    display: "flex",
    justifyContent: "flex-end",
  },
  cuserPoint: {
    cursor: "pointer",
  },
  textColor: {
    color: "#3E6DC5",
  },
  paddingTop: {
    paddingTop: 15,
  },
  borderText: {
    border: "1px solid #D9D9D9",
    borderRadius: 25,
    padding: 5,
    textAlign: "center",
  },
}));

function createData(
  name,
  calories,
  fat,
  carbs,
  power,
  protein,
  phone,
  last,
  remark
) {
  return {
    name,
    calories,
    fat,
    carbs,
    power,
    protein,
    phone,
    last,
    remark,
  };
}

const rows = [
  createData(
    "Email",
    "Admin HypeTex",
    "Admin HypeTex",
    "Role",
    "Position",
    "Department",
    "Phone No.",
    "28/01/2023 09:09",
    "Remark"
  ),
  createData(
    "Email",
    "Admin HypeTex",
    "Admin HypeTex",
    "Role",
    "Position",
    "Department",
    "Phone No.",
    "28/01/2023 09:09",
    "Remark"
  ),
  createData(
    "Email",
    "Admin HypeTex",
    "Admin HypeTex",
    "Role",
    "Position",
    "Department",
    "Phone No.",
    "28/01/2023 09:09",
    "Remark"
  ),
  createData(
    "Email",
    "Admin HypeTex",
    "Admin HypeTex",
    "Role",
    "Position",
    "Department",
    "Phone No.",
    "28/01/2023 09:09",
    "Remark"
  ),
  createData(
    "Email",
    "Admin HypeTex",
    "Admin HypeTex",
    "Role",
    "Position",
    "Department",
    "Phone No.",
    "28/01/2023 09:09",
    "Remark"
  ),
  createData(
    "Email",
    "Admin HypeTex",
    "Admin HypeTex",
    "Role",
    "Position",
    "Department",
    "Phone No.",
    "28/01/2023 09:09",
    "Remark"
  ),
  createData(
    "Email",
    "Admin HypeTex",
    "Admin HypeTex",
    "Role",
    "Position",
    "Department",
    "Phone No.",
    "28/01/2023 09:09",
    "Remark"
  ),
  createData(
    "Email",
    "Admin HypeTex",
    "Admin HypeTex",
    "Role",
    "Position",
    "Department",
    "Phone No.",
    "28/01/2023 09:09",
    "Remark"
  ),
  createData(
    "Email",
    "Admin HypeTex",
    "Admin HypeTex",
    "Role",
    "Position",
    "Department",
    "Phone No.",
    "28/01/2023 09:09",
    "Remark"
  ),
  createData(
    "Email",
    "Admin HypeTex",
    "Admin HypeTex",
    "Role",
    "Position",
    "Department",
    "Phone No.",
    "28/01/2023 09:09",
    "Remark"
  ),
  createData(
    "Email",
    "Admin HypeTex",
    "Admin HypeTex",
    "Role",
    "Position",
    "Department",
    "Phone No.",
    "28/01/2023 09:09",
    "Remark"
  ),
  createData(
    "Email",
    "Admin HypeTex",
    "Admin HypeTex",
    "Role",
    "Position",
    "Department",
    "Phone No.",
    "28/01/2023 09:09",
    "Remark"
  ),
  createData(
    "Email",
    "Admin HypeTex",
    "Admin HypeTex",
    "Role",
    "Position",
    "Department",
    "Phone No.",
    "28/01/2023 09:09",
    "Remark"
  ),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Email",
  },
  {
    id: "calories",
    numeric: true,
    disablePadding: false,
    label: "First Name",
  },
  {
    id: "fat",
    numeric: true,
    disablePadding: false,
    label: "Last Name",
  },
  {
    id: "carbs",
    numeric: true,
    disablePadding: false,
    label: "Role",
  },
  {
    id: "power",
    numeric: true,
    disablePadding: false,
    label: "Position",
  },
  {
    id: "protein",
    numeric: true,
    disablePadding: false,
    label: "Department",
  },
  {
    id: "phone",
    numeric: true,
    disablePadding: false,
    label: "Phone No.",
  },
  {
    id: "last",
    numeric: true,
    disablePadding: false,
    label: "Last Login",
  },
  {
    id: "remark",
    numeric: true,
    disablePadding: false,
    label: "Remark",
  },
  {
    id: "enabel",
    numeric: true,
    disablePadding: false,
    label: "Enabel",
  },
  {
    id: "action",
    numeric: true,
    disablePadding: false,
    label: "Action",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    classes,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell> */}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "center"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            className={clsx(classes.fontSixeHead, classes.paddingHead)}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

// function EnhancedTableToolbar(props) {
//   const { numSelected } = props;

//   return (
//     <Toolbar
//       sx={{
//         pl: { sm: 2 },
//         pr: { xs: 1, sm: 1 },
//         ...(numSelected > 0 && {
//           bgcolor: (theme) =>
//             alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
//         }),
//       }}
//     >
//       {numSelected > 0 ? (
//         <Typography
//           sx={{ flex: '1 1 100%' }}
//           color="inherit"
//           variant="subtitle1"
//           component="div"
//         >
//           {numSelected} selected
//         </Typography>
//       ) : (
//         <Typography
//           sx={{ flex: '1 1 100%' }}
//           variant="h6"
//           id="tableTitle"
//           component="div"
//         >
//           Nutrition
//         </Typography>
//       )}

//       {numSelected > 0 ? (
//         <Tooltip title="Delete">
//           <IconButton>
//             <DeleteIcon />
//           </IconButton>
//         </Tooltip>
//       ) : (
//         <Tooltip title="Filter list">
//           <IconButton>
//             <FilterListIcon />
//           </IconButton>
//         </Tooltip>
//       )}
//     </Toolbar>
//   );
// }

// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };

export default function UserManagement({ t }) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [fitterSelect, setFitterSelect] = useState("none");
  const [userId, setUserId] = useState("1234");
  const [emailUser, setEmailUser] = useState("admin@hypetex.com");
  const [fristName, setFristName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("0899999999");
  const [role, setRole] = useState("Admin");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [active, setActive] = useState(false);
  const [selectInput, setSelectInput] = useState("none");
  const [activeEdit, setActiveEdit] = useState(false);

  // modal reset //
  const [openResetPass, setOpenResetPass] = useState(false);
  const [newPassWord, setNewPassWord] = useState("");
  const [confrimPassword, setConfrimPassword] = useState("");

  const classes = useStyles();
  const sideBar = useSelector((state) => state.sidebar);
  const user = useSelector((state) => state.user);
  const theme = useTheme();
  // modal //
  const [openAddUser, setOpenAddUser] = useState(false);
  const [openEditUser, setOpenEditUser] = useState(false);
  const [openViewUser, setOpenViewUser] = useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down("xl"));

  const handleClickOpenAddUser = () => {
    setOpenAddUser(true);
  };

  const handleCloseAddUser = () => {
    setOpenAddUser(false);
  };

  // Edit //
  const handleClickOpenEditUser = () => {
    setOpenEditUser(true);
  };

  const handleCloseEditUser = () => {
    setOpenEditUser(false);
  };

  // view user //
  const handleClickOpenView = () => {
    setOpenViewUser(true);
  };

  const handleCloseView = () => {
    setOpenViewUser(false);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  // modal add //
  const handleFitterSelectChange = (event) => {
    setFitterSelect(event.target.value);
  };

  const handleEmailUserChange = (event) => {
    setEmailUser(event.target.value);
  };

  const handleFristNameChange = (event) => {
    setFristName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRePasswordChange = (event) => {
    setRePassword(event.target.value);
  };

  const onSelectClickActive = (event) => {
    setActive(event.target.checked);
  };

  const onSelectClickActiveEdit = (event) => {
    setActiveEdit(event.target.checked);
  };

  const handleSelectInputChange = (event) => {
    setSelectInput(event.target.value);
  };
  // close modal add //
  // modal reset //
  const handleClickOpenResetPass = () => {
    setOpenResetPass(true);
    setOpenEditUser(false);
  };

  const handleCloseResetPass = () => {
    setOpenResetPass(false);
  };

  const handleNewPassChange = (event) => {
    setNewPassWord(event.target.value);
  };

  const handleConfrimChange = (event) => {
    setConfrimPassword(event.target.value);
  };
  // close modal reset //

  return (
    <Container className={classes.marginRow}>
      <Grid item className={classes.flexRow}>
        <HomeOutlinedIcon className={classes.alignSelf} />
        <Typography variant="h6"> / {sideBar}</Typography>
      </Grid>
      <Grid item md={12} className={clsx(classes.flexRow, classes.justContent)}>
        <Grid item md={5} className={classes.marginRow}>
          <TextField
            id="input-with-icon-textfield"
            size="small"
            placeholder={t("user:search")}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlinedIcon />
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />
        </Grid>
        <Grid item md={3} className={classes.marginRow}>
          <FormControl variant="outlined" size="small" fullWidth>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={fitterSelect}
              placeholder={t("user:filter")}
              onChange={handleFitterSelectChange}
            >
              <MenuItem value="none">{t("user:filter")}</MenuItem>
              {/* <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem> */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={2} className={clsx(classes.marginRow)}>
          <Button
            onClick={handleClickOpenAddUser}
            autoFocus
            fullWidth
            className={clsx(classes.backGroundConfrim)}
            variant="outlined"
          >
            {t("user:addUser")}
          </Button>
        </Grid>
      </Grid>

      <Box sx={{ width: "100%" }} className={classes.marginRow}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                //   onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                classes={classes}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      {/* <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell> */}
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        className={clsx(
                          classes.fontSixeCell
                          //   classes.paddingHead
                        )}
                        align="center"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell
                        align="center"
                        className={classes.fontSixeCell}
                      >
                        {row.calories}
                      </TableCell>
                      <TableCell
                        align="center"
                        className={classes.fontSixeCell}
                      >
                        {row.fat}
                      </TableCell>
                      <TableCell
                        align="center"
                        className={classes.fontSixeCell}
                      >
                        {row.carbs}
                      </TableCell>
                      <TableCell
                        align="center"
                        className={classes.fontSixeCell}
                      >
                        {row.power}
                      </TableCell>
                      <TableCell
                        align="center"
                        className={classes.fontSixeCell}
                      >
                        {row.protein}
                      </TableCell>
                      <TableCell
                        align="center"
                        className={classes.fontSixeCell}
                      >
                        {row.phone}
                      </TableCell>
                      <TableCell
                        align="center"
                        className={classes.fontSixeCell}
                      >
                        {row.last}
                      </TableCell>
                      <TableCell
                        align="center"
                        className={classes.fontSixeCell}
                      >
                        {row.remark}
                      </TableCell>
                      <TableCell
                        align="center"
                        className={classes.fontSixeCell}
                      >
                        <FormControlLabel
                          control={
                            <Switch
                              checked={dense}
                              onChange={handleChangeDense}
                            />
                          }
                        />
                      </TableCell>
                      <TableCell
                        align="center"
                        className={classes.fontSixeCell}
                      >
                        <BorderColorOutlinedIcon
                          className={classes.marginIcon}
                          onClick={handleClickOpenEditUser}
                        />
                        <Visibility onClick={handleClickOpenView} />
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
      </Box>

      {/* Modal Add User */}
      <Dialog
        fullScreen={fullScreen}
        // className={classes.modalWidth}
        open={openAddUser}
        onClose={handleCloseAddUser}
        aria-labelledby="responsive-dialog-title-add"
        classes={{
          paper: classes.modalWidth,
        }}
      >
        <DialogTitle
          id="responsive-dialog-title-add"
          className={clsx(
            classes.flexRow,
            classes.justContent,
            classes.borderBottom
          )}
        >
          <Typography variant="h3">{t("user:addUser")}</Typography>
          <CloseIcon
            onClick={handleCloseAddUser}
            className={classes.cuserPoint}
          />
        </DialogTitle>
        <DialogContent>
          <Grid
            item
            md={12}
            className={clsx(
              classes.flexRow,
              classes.alignItem,
              classes.marginRow
            )}
          >
            <Grid item md={3} className={classes.borderImg}>
              <img
                src={process.env.PUBLIC_URL + "/img/Group.png"}
                alt="img-test"
                className={classes.imgWidth}
              />
            </Grid>
            <Grid item md={9}>
              <Grid item className={classes.boxMargin}>
                <Typography variant="subtitle2" className="pb-3">
                  {t("user:user")}
                </Typography>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  fullWidth
                  variant="outlined"
                  value={userId}
                  disabled
                />
              </Grid>
              <Grid item className={clsx(classes.boxMargin, classes.marginRow)}>
                <Typography variant="subtitle2" className="pb-3">
                  {t("user:email")}
                </Typography>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("user:placeholderEmail")}
                  fullWidth
                  variant="outlined"
                  value={emailUser}
                  onChange={handleEmailUserChange}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            md={12}
            className={clsx(classes.flexRow, classes.marginRow)}
          >
            <Grid item md={6}>
              <Typography variant="subtitle2" className="pb-3">
                {t("user:firstName")}
              </Typography>
              <TextField
                id="input-with-icon-textfield"
                size="small"
                placeholder={t("user:placeholderFrist")}
                fullWidth
                variant="outlined"
                value={fristName}
                onChange={handleFristNameChange}
              />
            </Grid>
            <Grid item md={6} className={classes.boxMargin}>
              <Typography variant="subtitle2" className="pb-3">
                {t("user:lastName")}
              </Typography>
              <TextField
                id="input-with-icon-textfield"
                size="small"
                placeholder={t("user:placeholderLast")}
                fullWidth
                variant="outlined"
                value={lastName}
                onChange={handleLastNameChange}
              />
            </Grid>
          </Grid>

          <Grid
            item
            md={12}
            className={clsx(classes.flexRow, classes.marginRow)}
          >
            <Grid item md={6}>
              <Typography variant="subtitle2" className="pb-3">
                {t("user:phone")}
              </Typography>
              <TextField
                id="input-with-icon-textfield"
                size="small"
                type="number"
                placeholder={t("user:placeholderPhone")}
                fullWidth
                variant="outlined"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
              />
            </Grid>
            <Grid item md={6} className={classes.boxMargin}>
              <Typography variant="subtitle2" className="pb-3">
                {t("user:role")}
              </Typography>
              <FormControl variant="outlined" size="small" fullWidth>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={role}
                  placeholder={t("user:selectRole")}
                  onChange={handleRoleChange}
                >
                  <MenuItem value="Admin">{t("user:selectRole")}</MenuItem>
                  {/* <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem> */}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid
            item
            md={12}
            className={clsx(classes.flexRow, classes.marginRow)}
          >
            <Grid item md={6}>
              <Typography variant="subtitle2" className="pb-3">
                {t("user:pass")}
              </Typography>
              <TextField
                id="input-with-icon-textfield"
                size="small"
                placeholder={t("user:placeholderPass")}
                fullWidth
                variant="outlined"
                value={password}
                onChange={handlePasswordChange}
              />
            </Grid>
            <Grid item md={6} className={classes.boxMargin}>
              <Typography variant="subtitle2" className="pb-3">
                {t("user:rePass")}
              </Typography>
              <TextField
                id="input-with-icon-textfield"
                size="small"
                placeholder={t("user:placeholderPass")}
                fullWidth
                variant="outlined"
                value={rePassword}
                onChange={handleRePasswordChange}
              />
            </Grid>
          </Grid>

          <Grid
            item
            md={12}
            className={clsx(classes.flexRow, classes.marginRow)}
          >
            <Grid item md={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    color="warning"
                    checked={active}
                    onChange={onSelectClickActive}
                    inputProps={{
                      "aria-label": "select active add",
                    }}
                    l
                  />
                }
                label={t("user:active")}
              />
            </Grid>
            <Grid item md={9} className={clsx(classes.flexRowBtnModal)}>
              <Grid item md={3}>
                <Button
                  autoFocus
                  onClick={handleCloseAddUser}
                  fullWidth
                  className={clsx(classes.backGroundCancel)}
                >
                  {t("user:cancel")}
                </Button>
              </Grid>
              <Grid item md={3} className={classes.boxMargin}>
                <Button
                  autoFocus
                  fullWidth
                  className={clsx(classes.backGroundConfrim)}
                  variant="outlined"
                >
                  {t("user:confrim")}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        {/* <DialogActions className={classes.paddingFoot}></DialogActions> */}
      </Dialog>

      {/* Modal Edit User */}
      <Dialog
        fullScreen={fullScreen}
        // className={classes.modalWidth}
        open={openEditUser}
        onClose={handleCloseEditUser}
        aria-labelledby="responsive-dialog-title-edit"
        classes={{
          paper: classes.modalWidth,
        }}
      >
        <DialogTitle
          id="responsive-dialog-title-edit"
          className={clsx(
            classes.flexRow,
            classes.justContent,
            classes.borderBottom
          )}
        >
          <Typography variant="h3">{t("user:edit")}</Typography>
          <CloseIcon
            onClick={handleCloseEditUser}
            className={classes.cuserPoint}
          />
        </DialogTitle>
        <DialogContent>
          <Grid
            item
            md={12}
            className={clsx(
              classes.flexRow,
              classes.justContent,
              classes.alignItem,
              classes.marginRow
            )}
          >
            <Grid item md={3} className={classes.borderImg}>
              <img
                src={process.env.PUBLIC_URL + "/img/Group.png"}
                alt="img-test"
                className={classes.imgWidth}
              />
            </Grid>
            <Grid item md={9}>
              <Grid item className={classes.boxMargin}>
                <Typography variant="subtitle2" className="pb-3">
                  {t("user:user")}
                </Typography>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  fullWidth
                  variant="outlined"
                  value={userId}
                  disabled
                />
              </Grid>
              <Grid item className={clsx(classes.boxMargin, classes.marginRow)}>
                <Typography variant="subtitle2" className="pb-3">
                  {t("user:email")}
                </Typography>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("user:placeholderEmail")}
                  fullWidth
                  variant="outlined"
                  value={emailUser}
                  onChange={handleEmailUserChange}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            md={12}
            className={clsx(classes.flexRow, classes.marginRow)}
          >
            <Grid item md={6}>
              <Typography variant="subtitle2" className="pb-3">
                {t("user:firstName")}
              </Typography>
              <TextField
                id="input-with-icon-textfield"
                size="small"
                placeholder={t("user:placeholderFrist")}
                fullWidth
                variant="outlined"
                value={fristName}
                onChange={handleFristNameChange}
              />
            </Grid>
            <Grid item md={6} className={classes.boxMargin}>
              <Typography variant="subtitle2" className="pb-3">
                {t("user:lastName")}
              </Typography>
              <TextField
                id="input-with-icon-textfield"
                size="small"
                placeholder={t("user:placeholderLast")}
                fullWidth
                variant="outlined"
                value={lastName}
                onChange={handleLastNameChange}
              />
            </Grid>
          </Grid>

          <Grid
            item
            md={12}
            className={clsx(classes.flexRow, classes.marginRow)}
          >
            <Grid item md={6}>
              <Typography variant="subtitle2" className="pb-3">
                {t("user:phone")}
              </Typography>
              <TextField
                id="input-with-icon-textfield"
                size="small"
                type="number"
                placeholder={t("user:placeholderPhone")}
                fullWidth
                variant="outlined"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
              />
            </Grid>
            <Grid item md={6} className={classes.boxMargin}>
              <Typography variant="subtitle2" className="pb-3">
                {t("user:label")}
              </Typography>
              <FormControl variant="outlined" size="small" fullWidth>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={selectInput}
                  placeholder={t("user:selectInput")}
                  onChange={handleSelectInputChange}
                >
                  <MenuItem value="none">{t("user:selectInput")}</MenuItem>
                  {/* <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem> */}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid item md={12} className={classes.marginRow}>
            <Typography
              variant="body1"
              className={clsx(
                classes.cuserPoint,
                classes.textColor,
                classes.paddingTop
              )}
              onClick={handleClickOpenResetPass}
            >
              {t("login:forgot")}
            </Typography>
          </Grid>

          <Grid
            item
            md={12}
            className={clsx(classes.flexRow, classes.marginRow)}
          >
            <Grid item md={3} className={classes.marginRow}>
              <FormControlLabel
                control={
                  <Checkbox
                    color="warning"
                    checked={activeEdit}
                    onChange={onSelectClickActiveEdit}
                    inputProps={{
                      "aria-label": "select active edit",
                    }}
                    l
                  />
                }
                label={t("user:active")}
              />
            </Grid>
            <Grid
              item
              md={9}
              className={clsx(classes.flexRowBtnModal, classes.marginRow)}
            >
              <Grid item md={3}>
                <Button
                  autoFocus
                  onClick={handleCloseAddUser}
                  fullWidth
                  className={clsx(classes.backGroundCancel)}
                >
                  {t("user:cancel")}
                </Button>
              </Grid>
              <Grid item md={3} className={classes.boxMargin}>
                <Button
                  autoFocus
                  fullWidth
                  className={clsx(classes.backGroundConfrim)}
                  variant="outlined"
                >
                  {t("user:confrim")}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        {/* <DialogActions className={classes.paddingFoot}></DialogActions> */}
      </Dialog>

      {/* Modal Reset Pass */}

      <ModalResetPassword
        open={openResetPass}
        close={handleCloseResetPass}
        handleNewPassChange={handleNewPassChange}
        newPassWord={newPassWord}
        confrimPassword={confrimPassword}
        handleConfrimChange={handleConfrimChange}
        handleReset={handleCloseResetPass}
      />

      {/* Modal View */}
      {/* <Dialog
        fullScreen={fullScreen}
        // className={classes.modalWidth}
        open={openViewUser}
        onClose={handleCloseView}
        aria-labelledby="responsive-dialog-title-view"
        classes={{
          paper: classes.modalWidth,
        }}
      >
        <DialogTitle
          id="responsive-dialog-title-view"
          className={clsx(
            classes.flexRow,
            classes.justContent,
            classes.borderBottom
          )}
        >
          <Typography variant="h3">{user}</Typography>
          <CloseIcon onClick={handleCloseView} className={classes.cuserPoint} />
        </DialogTitle>
        <DialogContent>
          <Grid
            item
            md={12}
            className={clsx(
              classes.alignItem,
              classes.marginRow,
              classes.flexRow
            )}
          >
            <Grid item md={3} className={classes.borderImg}>
              <img
                src={process.env.PUBLIC_URL + "/img/Group.png"}
                alt="img-test"
                className={classes.imgWidth}
              />
            </Grid>
            <Grid item md={9}>
              <Grid item className={classes.boxMargin}>
                <Typography variant="h3">{userId}</Typography>
              </Grid>
              <Grid item className={clsx(classes.boxMargin, classes.marginRow)}>
                <Typography variant="h5">{user}</Typography>
              </Grid>
              <Grid item className={clsx(classes.boxMargin, classes.marginRow)}>
                <Typography variant="h6">{t("user:mock")}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={12} className={clsx(classes.marginRow)}>
            <Typography variant="h5">{t("user:email")}</Typography>
            <Grid item className="mt-2">
              <Typography variant="body1">{emailUser}</Typography>
            </Grid>
          </Grid>

          <Grid item md={12} className={clsx(classes.marginRow)}>
            <Typography variant="h5">{t("user:phone")}</Typography>
            <Grid item className="mt-2">
              <Typography variant="body1">{phoneNumber}</Typography>
            </Grid>
          </Grid>

          <Grid item md={12} className={clsx(classes.marginRow)}>
            <Typography variant="h5">{t("user:role")}</Typography>
            <Grid item className="mt-2">
              <Typography variant="body1">{role}</Typography>
            </Grid>
          </Grid>

          <Grid item md={12} className={clsx(classes.marginRow)}>
            <Typography variant="h5">{t("user:position")}</Typography>
            <Grid item className="mt-2">
              <Typography variant="body1">{t("user:system")}</Typography>
            </Grid>
          </Grid>

          <Grid item md={12} className={clsx(classes.marginRow)}>
            <Typography variant="h5">{t("user:department")}</Typography>
            <Grid item md={2} className={clsx("mt-2", classes.borderText)}>
              <Typography variant="body1">{t(`user:department`) +`${' 1'}`}</Typography>
            </Grid>
          </Grid>

        </DialogContent>
      </Dialog> */}

      <UserView
        open={openViewUser}
        close={handleCloseView}
        userId={userId}
        user={user}
        t={t}
        emailUser={emailUser}
        phoneNumber={phoneNumber}
        role={role}
      />
    </Container>
  );
}
