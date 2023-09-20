import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
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
  Card,
  CardContent,
  FormControl,
  Select,
  MenuItem,
  CircularProgress,
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
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import _, { stubFalse } from "lodash";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import apis from "../js/apis";
import Validate from "./validate";
import {
  checkAuthen,
  checkLogin,
  loading,
  checkToken,
  logout,
} from "../js/actions";

const API = apis.getAPI();
const MySwal = withReactContent(Swal);

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
  fontSixeHead: {
    fontSize: "18px !important",
  },
  fontSixeCell: {
    fontSize: "16px !important",
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
  justContentCenter: {
    justifyContent: "center",
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
    width: "90% !important",
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
  backgroundBox: {
    backgroundColor: "#F9F9FA",
  },
  paddingRowHead: {
    padding: "15px 0px 0px 15px",
  },
  paddingRow: {
    padding: "0px 0px 0px 15px",
  },
  paddingCol: {
    padding: "0px 15px 0px 15px",
  },
  borderBottom: {
    borderBottom: "solid #F9F9FA",
  },
  cursor: {
    cursor: "pointer",
  },
  backGroundConfrim: {
    width: "100%",
    backgroundColor: "#03257D !important",
    color: "#fff !important",
    "&:hover": {
      backgroundColor: "#03257D !important",
      boxShadow: `none`,
    },
  },
  backGroundCancel: {
    width: "100%",
    backgroundColor: "#fff !important",
    color: "#000 !important",
    borderColor: "#000 !important",
    "&:hover": {
      backgroundColor: "#fff !important",
      boxShadow: `none`,
    },
  },
  width: {
    width: "100%",
  },
  input: {
    display: "none",
  },
  boxUpload: {
    border: "2px solid #F5F5F5",
    backgroundColor: "#FAFAFA",
    borderRadius: 10,
  },
  marginTopBox: {
    marginTop: 50,
  },
  flexRowBtnModal: {
    display: "flex",
    justifyContent: "flex-end",
  },
  activeColor: {
    color: "#3E6DC5",
  },
  colorText: {
    color: "#ef5350 !important",
  },
  borderBox: {
    borderRight: "1px solid #8f8a8a",
    padding: 10,
  },
}));

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
    label: "Unit ID",
  },
  {
    id: "calories",
    numeric: false,
    disablePadding: false,
    label: "Unit Number",
  },
  {
    id: "fat",
    numeric: false,
    disablePadding: false,
    label: "Unit Description",
  },
  {
    id: "carbs",
    numeric: true,
    disablePadding: false,
    label: "Unit Type",
  },
  {
    id: "power",
    numeric: true,
    disablePadding: false,
    label: "Building",
  },
  {
    id: "protein",
    numeric: true,
    disablePadding: false,
    label: "No of Point",
  },
  {
    id: "unit",
    numeric: false,
    disablePadding: false,
    label: "No of Point",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "Action",
  },
];

function EnhancedTableUnitHead(props) {
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
            className={classes.fontSixeHead}
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

EnhancedTableUnitHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

// function EnhancedTableUnitToolbar(props) {
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

// EnhancedTableUnitToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };

const UnitManagement = ({
  t,
  pageName,
  subPageName,
  login,
  // zoneData,
}) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [floorName, setFloorName] = useState("");
  const [gatewayName, setGatewayName] = useState("");
  const [deviceBrand, setDeviceBrand] = useState("");
  const [deviceName, setDeviceName] = useState("");
  const [model, setModel] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [installation, setInstallation] = useState("");
  const [communicationType, setCommunicationType] = useState("none");
  const [gatewayMeter, setGatewayMeter] = useState("none");
  const [gatewayMeterTwo, setGatewayMeterTwo] = useState("none");
  const [gatewayMeterThree, setGatewayMeterThree] = useState("none");
  const [billingType, setBillingType] = useState("none");
  const [unitNumber, setUnitNumber] = useState("");
  const [unitName, setUnitName] = useState("");
  const [unitType, setUnitType] = useState("");
  const [description, setDescription] = useState("");
  const [building, setBuilding] = useState("");
  const [zone, setZone] = useState("");

  const dispatch = useDispatch();
  const classes = useStyles();
  const sideBar = useSelector((state) => state.sidebar);
  const token = useSelector((state) => state.token);
  const theme = useTheme();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = state;
  // modal //
  const [open, setOpen] = useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const fullScreenEdit = useMediaQuery(theme.breakpoints.down("xl"));
  const [openAdd, setOpenAdd] = useState(false);
  const [file, setFile] = useState(null);
  const [openView, setOpenView] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [isValidate, setIsValidate] = useState(true);
  const [isIdEdit, setIsIdEdit] = useState("");

  const [rowsPointEdit, setRowsPointEdit] = useState([
    {
      name: 1,
      code: "",
      population: "",
      size: "",
      density: "",
      unit: "",
      action: "",
    },
  ]);

  // console.log("ididid====", state, id);
  const swalFire = (msg) => {
    MySwal.fire({
      icon: "error",
      confirmButtonText: "ตกลง",
      text: msg,
    });
  };

  useEffect(() => {
    dispatch(checkToken());
    if (!_.isEmpty(token) && id !== null) {
      getUnitList(id);
    }
    console.log("token", token, login);
  }, [token]);

  const getUnitList = async (id) => {
    setIsLoading(true);
    try {
      await API.connectTokenAPI(token);
      await API.getUnitList(id).then((response) => {
        const dataPayload = response.data;
        setRows(dataPayload);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
      const response = error.response;
      if (response.status >= 500) {
        swalFire(response.data);
      } else {
        MySwal.fire({
          icon: "error",
          confirmButtonText: "ตกลง",
          cancelButtonText: "ยกเลิก",
          showCancelButton: true,
          text: response.data,
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(logout(false));
          } else if (result.isDismissed) {
            setIsLoading(false);
          }
        });
      }
      setIsLoading(false);
    }
  };

  const unitRegister = async () => {
    setIsLoading(true);
    try {
      const body = {
        unit: unitName,
        floor_id: id,
        description: description,
        type_id: "",
        file: "",
      };
      await API.connectTokenAPI(token);
      await API.UnitRegister(body).then((response) => {
        const dataPayload = response.data;
        console.log("dataPayload", dataPayload, response);
        if (response.status === 200) {
          MySwal.fire({
            icon: "success",
            confirmButtonText: "ตกลง",
            text: dataPayload,
          });
          getUnitList(id);
          handleCloseAdd();
        }
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
      const response = error.response;
      swalFire(response.data);
      handleCloseAdd();
      setIsLoading(false);
    }
  };

  const unitUpdate = async (rowId) => {
    setIsLoading(true);
    try {
      const body = {
        name: floorName,
      };
      await API.connectTokenAPI(token);
      await API.unitUpdate(rowId, body).then((response) => {
        const dataPayload = response.data;
        console.log("dataPayload", dataPayload, response);
        if (response.status === 200) {
          MySwal.fire({
            icon: "success",
            confirmButtonText: "ตกลง",
            text: dataPayload,
          });
          getUnitList(id);
          handleClose();
        }
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
      const response = error.response;
      swalFire(response.data);
      handleClose();
      setIsLoading(false);
    }
  };

  const getUnitView = async (id) => {
    setIsLoading(true);
    try {
      await API.connectTokenAPI(token);
      await API.getUnitView(id).then((response) => {
        const dataPayload = response.data;
        // console.log("dataPayload", response, dataPayload);
        dataPayload.length > 0 && dataPayload.map((item) => {});
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
      const response = error.response;
      swalFire(response.data);
      setIsLoading(false);
    }
  };

  const unitDelete = async (rowId) => {
    setIsLoading(true);
    try {
      await API.connectTokenAPI(token);
      await API.unitDelete(rowId).then((response) => {
        const dataPayload = response.data;
        if (response.status === 200) {
          getUnitList(id);
          MySwal.fire({
            icon: "success",
            confirmButtonText: "ตกลง",
            text: dataPayload,
          });
        }
        // console.log("dataPayload", response);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
      const response = error.response;
      swalFire(response.data);
      setIsLoading(false);
    }
  };

  // delete Data //
  const handleClickDeleteData = (event, id) => {
    MySwal.fire({
      icon: "warning",
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
      showCancelButton: true,
      text: "คุณต้องการลบข้อมูลหรือไม่",
    }).then((result) => {
      if (result.isConfirmed) {
        unitDelete(id);
      } else if (result.isDismissed) {
        setIsLoading(false);
      }
    });
  };

  const handleClickOpen = (event, id) => {
    setOpen(true);
    getUnitView(id);
    setIsIdEdit(id);
  };

  const handleClose = () => {
    setOpen(false);
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
    [order, orderBy, page, rowsPerPage, rows]
  );

  const handleDeviceBrand = (event) => {
    setDeviceBrand(event.target.value);
  };

  const handleGatewayName = (event) => {
    setGatewayName(event.target.value);
  };

  const handleCommunicationType = (event) => {
    setCommunicationType(event.target.value);
  };

  const handleBillingType = (event) => {
    setBillingType(event.target.value);
  };

  const handleDeviceName = (event) => {
    setDeviceName(event.target.value);
  };

  const handleModel = (event) => {
    setModel(event.target.value);
  };

  const handleSerialNumber = (event) => {
    setSerialNumber(event.target.value);
  };

  const handleInstallation = (event) => {
    setInstallation(event.target.value);
  };

  const handleFloorName = (event) => {
    setFloorName(event.target.value);
  };

  const handleUnitNumber = (event) => {
    setUnitNumber(event.target.value);
  };

  const handleUnitName = (event) => {
    setUnitName(event.target.value);
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleUnitType = (event) => {
    setUnitType(event.target.value);
  };

  const handleZone = (event) => {
    setZone(event.target.value);
  };

  const handleBuilding = (event) => {
    setBuilding(event.target.value);
  };

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleOpenView = (event, id) => {
    setOpenView(true);
    getUnitView(id);
  };

  const handleUploadFile = (e) => {
    // setFile(e.target.files[0]);
    if (e.target.files.length > 0) {
      setFile(URL.createObjectURL(e.target.files[0]));
    }
  };

  // add row Edit //
  const addNewRow = () => {
    let newRow;
    rowsPointEdit.forEach((item) => {
      newRow = {
        // Construct the new row object here
        // For example: id: someValue, name: someValue, ...
        name: item.name + 1,
        code: "",
        population: "",
        size: "",
        density: "",
        unit: "",
        action: "",
      };
    });
    // Add the new row to the existing rowsPoint array
    setRowsPointEdit([...rowsPointEdit, newRow]);
  };

  const handleGatewayMeterThree = (event) => {
    setGatewayMeterThree(event.target.value);
  };

  const handleGatewayMeterTwo = (event) => {
    setGatewayMeterTwo(event.target.value);
  };

  const handleGatewayMeter = (event) => {
    setGatewayMeter(event.target.value);
  };

  const openPageFloorDetail = (event, id) => {
    // navigate("/buildingFloorDetail");
    navigate("/buildingFloorDetail", { state: { id: id } });
  };

  return (
    <Container className={classes.marginRow}>
      {isLoading ? (
        <Box mt={4} width={1} display="flex" justifyContent="center">
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <>
          <Grid item className={classes.flexRow}>
            <HomeOutlinedIcon
              className={clsx(
                pageName ? classes.activeColor : classes.alignSelf
              )}
            />
            <Typography
              variant="h6"
              className={clsx(
                pageName ? classes.activeColor : "",
                classes.cursor
              )}
              onClick={(event) => openPageFloorDetail(event, id)}
            >
              {" "}
              / {sideBar} / {pageName}
            </Typography>
            <Typography variant="h6">
              {subPageName ? " / " + subPageName : ""}{" "}
            </Typography>
          </Grid>
          <Grid
            item
            md={12}
            className={clsx(classes.flexRow, classes.justContent)}
          >
            <Grid item md={5} className={classes.marginRow}>
              <TextField
                id="input-with-icon-textfield"
                size="small"
                placeholder={t("floor:searchUnit")}
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
            <Grid item md={2} className={clsx(classes.marginRow)}>
              <Button
                onClick={handleClickOpenAdd}
                autoFocus
                // fullWidth
                className={clsx(classes.backGroundConfrim, classes.width)}
                variant="outlined"
              >
                {t("floor:btnAddUnit")}
              </Button>
            </Grid>
          </Grid>

          <Box sx={{ width: "100%" }} className={classes.marginRow}>
            <Paper sx={{ width: "100%", mb: 2 }}>
              {/* <EnhancedTableUnitToolbar numSelected={selected.length} /> */}
              <TableContainer>
                <Table
                  sx={{ minWidth: 750 }}
                  aria-labelledby="tableTitle"
                  size={dense ? "small" : "medium"}
                >
                  <EnhancedTableUnitHead
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

                      console.log("========>>>>?", row);

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
                            className={classes.fontSixeCell}
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
                            {row.unit}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classes.fontSixeCell}
                          >
                            <FeedOutlinedIcon className={classes.marginIcon} />
                            <VisibilityOutlinedIcon
                              className={classes.marginIcon}
                              onClick={(event) => handleOpenView(event, row.id)}
                            />
                            <SettingsOutlinedIcon
                              onClick={(event) =>
                                handleClickOpen(event, row.id)
                              }
                            />
                            <DeleteOutlineOutlinedIcon
                              onClick={(event) => {
                                handleClickDeleteData(event, row.id);
                              }}
                            />
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
        </>
      )}

      {/* Modal Edit*/}
      <Dialog
        fullScreen={fullScreenEdit}
        // className={classes.modalWidth}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        classes={{
          paper: classes.modalWidth,
        }}
      >
        <DialogTitle id="responsive-dialog-title" className="mt-3">
          <Grid item md={12} className={clsx(classes.flexRow)}>
            <Grid item md={6}>
              <Typography variant="h3">{t("floor:description")}</Typography>
            </Grid>
            <Grid item md={6}>
              <Typography variant="h3">{t("floor:measurement")}</Typography>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid
            item
            md={12}
            className={clsx(classes.flexRow, classes.modalContent)}
          >
            <Grid item md={5}>
              <Grid
                item
                md={12}
                className={clsx(classes.flexRow, classes.alignItem)}
              >
                <Grid item md={6}>
                  <Typography variant="body2">{t("floor:shopLogo")}</Typography>
                </Grid>
                <Grid item md={6}>
                  <input
                    className={classes.input}
                    id={"contained-button-file"}
                    type="file"
                    accept="image/jpeg,image/png,application/pdf,image/tiff"
                    // multiple={isMultiple}
                    onChange={handleUploadFile}
                    onClick={(e) => {
                      console.log("aaaaa");
                    }}
                  />
                  <label
                    htmlFor={"contained-button-file"}
                    className={clsx(
                      classes.flexRow,
                      classes.justContentCenter,
                      classes.width
                    )}
                  >
                    <Card
                      variant="outlined"
                      style={{ width: 200, height: 200 }}
                      className={clsx(classes.boxUpload)}
                    >
                      {file ? (
                        <img
                          src={file}
                          alt="img-upload"
                          className={classes.imgWidth}
                        />
                      ) : (
                        <CardContent
                          className={clsx(
                            classes.textCenter,
                            classes.marginTopBox
                          )}
                        >
                          <Typography> +</Typography>
                          <Typography> upload</Typography>
                        </CardContent>
                      )}
                    </Card>
                  </label>
                </Grid>
              </Grid>
              <Grid item md={12}>
                <Typography variant="subtitle2" className="pb-3">
                  {t("floor:unitNumber")}
                </Typography>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("floor:unitNumber")}
                  fullWidth
                  variant="outlined"
                  value={unitNumber}
                  onChange={handleUnitNumber}
                />
              </Grid>
              <Grid item md={12}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("floor:unitName")}
                </Typography>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("floor:unitName")}
                  fullWidth
                  variant="outlined"
                  value={unitName}
                  onChange={handleUnitName}
                />
              </Grid>
              <Grid item md={12}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("floor:description")}
                </Typography>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("floor:description")}
                  fullWidth
                  variant="outlined"
                  value={description}
                  onChange={handleDescription}
                />
              </Grid>
              <Grid item md={12}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("floor:unitType")}
                </Typography>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("floor:unitType")}
                  fullWidth
                  variant="outlined"
                  value={unitType}
                  onChange={handleUnitType}
                />
              </Grid>
              <Grid item md={12}>
                <Typography variant="h3" className="mt-3 pb-3">
                  {t("floor:building")}
                </Typography>
              </Grid>
              <Grid item md={12}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("floor:building")}
                </Typography>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("floor:building")}
                  fullWidth
                  variant="outlined"
                  value={building}
                  onChange={handleBuilding}
                />
              </Grid>
              <Grid item md={12}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("floor:floor")}
                </Typography>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("floor:floor")}
                  fullWidth
                  variant="outlined"
                  value={floorName}
                  onChange={handleFloorName}
                />
              </Grid>
              <Grid item md={12}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("floor:zone")}
                </Typography>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("floor:zone")}
                  fullWidth
                  variant="outlined"
                  value={zone}
                  onChange={handleZone}
                />
              </Grid>
              <Grid
                item
                md={12}
                className={clsx(classes.flexRowBtnModal, classes.marginRow)}
              >
                <Grid item md={3}>
                  <Button
                    // onClick={handleCloseAdd}
                    className={clsx(classes.backGroundCancel)}
                    variant="outlined"
                  >
                    {t("gateway:btnRefresh")}
                  </Button>
                </Grid>
                <Grid item md={3} className={classes.boxMargin}>
                  <Button
                    className={clsx(classes.backGroundConfrim)}
                    variant="outlined"
                  >
                    {t("gateway:btnSave")}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item className={classes.borderBox}></Grid>
            <Grid item md={6} className={classes.boxMargin}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        align="center"
                        className={classes.fontSixeHead}
                      >
                        #
                      </TableCell>
                      <TableCell
                        align="center"
                        className={clsx(
                          classes.colorText,
                          classes.fontSixeHead
                        )}
                      >
                        {t("floor:gateway")}
                      </TableCell>
                      <TableCell
                        align="center"
                        className={clsx(
                          classes.colorText,
                          classes.fontSixeHead
                        )}
                      >
                        {t("floor:gateway")}
                      </TableCell>
                      <TableCell
                        align="center"
                        className={clsx(
                          classes.colorText,
                          classes.fontSixeHead
                        )}
                      >
                        {t("floor:gateway")}
                      </TableCell>
                      <TableCell
                        align="center"
                        className={classes.fontSixeHead}
                      >
                        {t("floor:action")}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rowsPointEdit.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          className={classes.fontSixeCell}
                        >
                          {row.name}
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes.fontSixeCell}
                        >
                          {row.code ? (
                            row.code
                          ) : (
                            <Grid item className={classes.marginDataTable}>
                              <FormControl
                                variant="outlined"
                                size="small"
                                fullWidth
                              >
                                <Select
                                  labelId="demo-select-small-label"
                                  id="demo-select-small"
                                  value={gatewayMeter}
                                  placeholder={"Energy Meter"}
                                  onChange={handleGatewayMeter}
                                >
                                  <MenuItem value="none">Energy Meter</MenuItem>
                                  {/* <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem> */}
                                </Select>
                              </FormControl>
                            </Grid>
                          )}
                        </TableCell>
                        <TableCell
                          align="right"
                          className={classes.fontSixeCell}
                        >
                          {row.population ? (
                            row.population
                          ) : (
                            <Grid item className={classes.marginDataTable}>
                              <FormControl
                                variant="outlined"
                                size="small"
                                fullWidth
                              >
                                <Select
                                  labelId="demo-select-small-label"
                                  id="demo-select-small"
                                  value={gatewayMeterTwo}
                                  placeholder={"Energy Meter"}
                                  onChange={handleGatewayMeterTwo}
                                >
                                  <MenuItem value="none">Energy Meter</MenuItem>
                                  {/* <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem> */}
                                </Select>
                              </FormControl>
                            </Grid>
                          )}
                        </TableCell>
                        <TableCell
                          align="right"
                          className={classes.fontSixeCell}
                        >
                          {row.size ? (
                            row.size
                          ) : (
                            <Grid item className={classes.marginDataTable}>
                              <FormControl
                                variant="outlined"
                                size="small"
                                fullWidth
                              >
                                <Select
                                  labelId="demo-select-small-label"
                                  id="demo-select-small"
                                  value={gatewayMeterThree}
                                  placeholder={"Energy Meter"}
                                  onChange={handleGatewayMeterThree}
                                >
                                  <MenuItem value="none">Energy Meter</MenuItem>
                                  {/* <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem> */}
                                </Select>
                              </FormControl>
                            </Grid>
                          )}
                        </TableCell>
                        <TableCell
                          align="right"
                          className={classes.fontSixeCell}
                        >
                          {row.action ? (
                            <>
                              <Typography
                                className={clsx(
                                  classes.fontSixeCell,
                                  classes.activeColor
                                )}
                              >
                                {t("floor:delete")}
                              </Typography>
                            </>
                          ) : (
                            <Typography
                              className={clsx(
                                classes.fontSixeCell,
                                classes.activeColor
                              )}
                            >
                              {t("floor:delete")}
                            </Typography>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Grid
                item
                md={12}
                className={clsx(
                  classes.marginRow,
                  classes.flexRow,
                  classes.justContentCenter
                )}
              >
                <Grid item md={6}>
                  <Button
                    variant="outlined"
                    onClick={addNewRow}
                    className={clsx(classes.backGroundCancel)}
                  >
                    {t("floor:addMeasurement")}
                  </Button>
                </Grid>
              </Grid>

              <Grid
                item
                md={12}
                className={clsx(classes.flexRowBtnModal, classes.marginRow)}
              >
                <Grid item md={3}>
                  <Button
                    // onClick={handleCloseAdd}
                    className={clsx(classes.backGroundCancel)}
                    variant="outlined"
                  >
                    {t("gateway:btnRefresh")}
                  </Button>
                </Grid>
                <Grid item md={3} className={classes.boxMargin}>
                  <Button
                    className={clsx(classes.backGroundConfrim)}
                    variant="outlined"
                  >
                    {t("gateway:btnSave")}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

      {/* Modal Add */}

      <Dialog
        fullScreen={fullScreen}
        // className={classes.modalWidth}
        open={openAdd}
        onClose={handleCloseAdd}
        aria-labelledby="responsive-dialog-title"
        classes={{
          paper: classes.modalWidth,
        }}
      >
        <DialogTitle id="responsive-dialog-title" className="mt-3">
          <Typography variant="h3">{t("floor:addUnit")}</Typography>
        </DialogTitle>
        <DialogContent>
          <Grid item md={12}>
            <Typography variant="subtitle2" className="pb-3">
              {t("gateway:deviceName")}
            </Typography>
            <TextField
              id="input-with-icon-textfield"
              size="small"
              placeholder={t("gateway:deviceName")}
              fullWidth
              variant="outlined"
              value={deviceName}
              onChange={handleDeviceName}
            />
          </Grid>
          <Grid item md={12}>
            <Typography variant="subtitle2" className="mt-3 pb-3">
              {t("gateway:gatewayName")}
            </Typography>
            <TextField
              id="input-with-icon-textfield"
              size="small"
              placeholder={t("gateway:gatewayName")}
              fullWidth
              variant="outlined"
              value={gatewayName}
              onChange={handleGatewayName}
            />
          </Grid>
          <Grid item md={12}>
            <Typography variant="subtitle2" className="mt-3 pb-3">
              {t("gateway:deviceBrand")}
            </Typography>
            <TextField
              id="input-with-icon-textfield"
              size="small"
              placeholder={t("gateway:deviceBrand")}
              fullWidth
              variant="outlined"
              value={deviceBrand}
              onChange={handleDeviceBrand}
            />
          </Grid>
          <Grid item md={12}>
            <Typography variant="subtitle2" className="mt-3 pb-3">
              {t("gateway:model")}
            </Typography>
            <TextField
              id="input-with-icon-textfield"
              size="small"
              placeholder={t("gateway:model")}
              fullWidth
              variant="outlined"
              value={model}
              onChange={handleModel}
            />
          </Grid>
          <Grid item md={12}>
            <Typography variant="subtitle2" className="mt-3 pb-3">
              {t("gateway:serialNumber")}
            </Typography>
            <TextField
              id="input-with-icon-textfield"
              size="small"
              placeholder={t("gateway:serialNumber")}
              fullWidth
              variant="outlined"
              value={serialNumber}
              onChange={handleSerialNumber}
            />
          </Grid>
          <Grid item md={12}>
            <Typography variant="subtitle2" className="mt-3 pb-3">
              {t("gateway:Installation")}
            </Typography>
            <TextField
              id="input-with-icon-textfield"
              size="small"
              placeholder={t("gateway:Installation")}
              fullWidth
              variant="outlined"
              value={installation}
              onChange={handleInstallation}
            />
          </Grid>
          <Grid item md={12}>
            <Typography variant="subtitle2" className="mt-3 pb-3">
              {t("gateway:communicationType")}
            </Typography>
            <FormControl variant="outlined" size="small" fullWidth>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={communicationType}
                placeholder={t("gateway:selectCommunication")}
                onChange={handleCommunicationType}
              >
                <MenuItem value="none">
                  {t("gateway:selectCommunication")}
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={12}>
            <Typography variant="subtitle2" className="mt-3 pb-3">
              {t("gateway:billingType")}
            </Typography>
            <FormControl variant="outlined" size="small" fullWidth>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={billingType}
                placeholder={t("gateway:billingType")}
                onChange={handleBillingType}
              >
                <MenuItem value="none">{t("gateway:billingType")}</MenuItem>
                {/* <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem> */}
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            md={12}
            className={clsx(classes.flexRowBtnModal, classes.marginRow)}
          >
            <Grid item md={3}>
              <Button
                onClick={handleCloseAdd}
                className={clsx(classes.backGroundCancel)}
                variant="outlined"
              >
                {t("building:btnCancel")}
              </Button>
            </Grid>
            <Grid item md={3} className={classes.boxMargin}>
              <Button
                className={clsx(classes.backGroundConfrim)}
                variant="outlined"
              >
                {t("building:btnAddModal")}
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    login: state.login,
    token: state.token,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    loading: (value) => dispatch(loading(value)),
    checkAuthen: () => dispatch(checkAuthen()),
    checkLogin: () => dispatch(checkLogin()),
    // checkToken: () => dispatch(checkToken()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UnitManagement);
