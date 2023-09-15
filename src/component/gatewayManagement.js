import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { useNavigate } from "react-router-dom";
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
    fontSize: "17px !important",
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
    label: "Gateway ID",
  },
  {
    id: "calories",
    numeric: true,
    disablePadding: false,
    label: "Gateway Name",
  },
  {
    id: "fat",
    numeric: true,
    disablePadding: false,
    label: "Gateway Brand",
  },
  {
    id: "carbs",
    numeric: true,
    disablePadding: false,
    label: "Building Name",
  },
  {
    id: "power",
    numeric: true,
    disablePadding: false,
    label: "Type",
  },
  {
    id: "protein",
    numeric: true,
    disablePadding: false,
    label: "No. Of Device",
  },
  {
    id: "unit",
    numeric: true,
    disablePadding: false,
    label: "Installation Date",
  },
  {
    id: "action",
    numeric: false,
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

const GatewayManagement = ({ t, login }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [gatewayName, setGatewayName] = useState("");
  const [deviceBrand, setDeviceBrand] = useState("");

  const dispatch = useDispatch();
  const classes = useStyles();
  const sideBar = useSelector((state) => state.sidebar);
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const theme = useTheme();
  const navigate = useNavigate();
  // modal //
  const [open, setOpen] = useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [openAdd, setOpenAdd] = useState(false);
  const [file, setFile] = useState("");
  const [communicationType, setCommunicationType] = useState([]);
  const [communicationTypeSelect, setCommunicationTypeSelect] =
    useState("none");
  const [building, setBuilding] = useState([]);
  const [buildingSelect, setBuildingSelect] = useState("none");

  const [openView, setOpenView] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [isValidate, setIsValidate] = useState(true);
  const [isIdEdit, setIsIdEdit] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const swalFire = (msg) => {
    MySwal.fire({
      icon: "error",
      confirmButtonText: "ตกลง",
      text: msg,
    });
  };

  useEffect(() => {
    dispatch(checkToken());
    if (!_.isEmpty(token)) {
      getGateway();
      getCommunicationData();
    }
  }, [token]);

  useEffect(() => {
    if (user && user?.building) {
      setBuilding(user?.building);
    }
  }, [user, building]);

  const getGateway = async () => {
    setIsLoading(true);
    try {
      await API.connectTokenAPI(token);
      await API.getGatewayData().then((response) => {
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

  // get getCommunicationData //
  const getCommunicationData = async () => {
    setIsLoading(true);
    try {
      await API.connectTokenAPI(token);
      await API.getCommunicationData().then((response) => {
        const dataPayload = response.data;
        setCommunicationType(dataPayload);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
      const response = error.response;
      swalFire(response.data);
      setIsLoading(false);
    }
  };

  const handleValidate = (type) => {
    let isValidate = true;

    if (type === "edit") {
      if (
        _.isEmpty(gatewayName) ||
        _.isEmpty(buildingSelect) ||
        _.isEmpty(deviceBrand) ||
        _.isEmpty(communicationTypeSelect) ||
        _.isEmpty(file)
      ) {
        isValidate = false;
      }
      console.log("isValidateEdit", isValidate);
      setIsValidate(isValidate);
    } else {
      if (
        _.isEmpty(gatewayName) ||
        _.isEmpty(buildingSelect) ||
        _.isEmpty(deviceBrand) ||
        _.isEmpty(communicationTypeSelect) ||
        _.isNull(file)
      ) {
        isValidate = false;
      }
      console.log("isValidate", isValidate);
      setIsValidate(isValidate);
    }

    if (isValidate) {
      if (type === "edit") {
        gatewayUpdate(isIdEdit);
      } else {
        gatewayRegister();
      }
    }
  };

  const gatewayRegister = async () => {
    setIsLoading(true);
    let reader = new window.FileReader();
    reader.readAsDataURL(file);
    try {
      reader.onload = async () => {
        const base64File = reader.result; // Extract the base64 data
        const body = {
          name: gatewayName,
          band: deviceBrand,
          communication_id: communicationTypeSelect,
          installation_date: "",
          description: "",
          building_id: buildingSelect,
          file: base64File, // Include the Base64 encoded file
        };
        await API.connectTokenAPI(token);
        await API.gatewayRegister(body).then((response) => {
          const dataPayload = response.data;
          console.log("dataPayload", dataPayload, response);
          if (response.status === 200) {
            MySwal.fire({
              icon: "success",
              confirmButtonText: "ตกลง",
              text: dataPayload,
            });
            getGateway();
            handleCloseAdd();
          }
          setIsLoading(false);
        });
      };
    } catch (error) {
      console.log(error);
      const response = error.response;
      swalFire(response.data);
      handleCloseAdd();
      setIsLoading(false);
    }
  };

  const gatewayUpdate = async (id) => {
    setIsLoading(true);
    let reader = new window.FileReader();
    reader.readAsDataURL(file);
    try {
      reader.onload = async () => {
        const base64File = reader.result; // Extract the base64 data
        const body = {
          name: gatewayName,
          band: deviceBrand,
          communication_id: communicationTypeSelect,
          installation_date: "",
          description: "",
          building_id: buildingSelect,
          file: base64File, // Include the Base64 encoded file
          fileOld: "",
        };
        await API.connectTokenAPI(token);
        await API.gatewayUpdate(id, body).then((response) => {
          const dataPayload = response.data;
          // console.log("dataPayload", dataPayload, response);
          if (response.status === 200) {
            MySwal.fire({
              icon: "success",
              confirmButtonText: "ตกลง",
              text: dataPayload,
            });
            getGateway();
            handleClose();
          }
          setIsLoading(false);
        });
      };
    } catch (error) {
      console.log(error);
      const response = error.response;
      swalFire(response.data);
      handleClose();
      setIsLoading(false);
    }
  };

  const getGatewayView = async (id) => {
    setIsLoading(true);
    try {
      await API.connectTokenAPI(token);
      await API.getGatewayView(id).then((response) => {
        const dataPayload = response.data;
        // console.log("dataPayload", response, dataPayload);
        dataPayload.length > 0 &&
          dataPayload.map((item) => {
            console.log("9999=======item", item);
            setGatewayName(item.name);
            setBuildingSelect(
              building.find((f) => f.name === item.building_name).id
            );
            setCommunicationTypeSelect(
              communicationType.find(
                (f) => f.communication === item.communication
              ).id
            );
            setDeviceBrand(item.band);
            setFile(item.file);
          });
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
      const response = error.response;
      swalFire(response.data);
      setIsLoading(false);
    }
  };

  const gatewayDelete = async (id) => {
    setIsLoading(true);
    try {
      await API.connectTokenAPI(token);
      await API.gatewayDelete(id).then((response) => {
        const dataPayload = response.data;
        if (response.status === 200) {
          getGateway();
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
        gatewayDelete(id);
      } else if (result.isDismissed) {
        setIsLoading(false);
      }
    });
  };

  const handleClickOpen = (event, id) => {
    setOpen(true);
    getGatewayView(id);
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
    [order, orderBy, page, rowsPerPage, rows]
  );

  const handleDeviceBrand = (event) => {
    setDeviceBrand(event.target.value);
  };

  const handleGatewayName = (event) => {
    setGatewayName(event.target.value);
  };

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleOpenView = (event, id) => {
    setOpenView(true);
    getGatewayView(id);
  };

  const handleCloseView = () => {
    setOpenView(false);
  };

  const handleUploadFile = (e) => {
    // setFile(e.target.files[0]);
    e.preventDefault();
    const fileTypeArray = ["image/png", "image/jpg", "image/jpeg"];
    let reader = new window.FileReader();
    let file = e.target.files[0];

    if (fileTypeArray.includes(file.type)) {
      reader.onloadend = () => {
        setFile(file);
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCommunicationType = (event) => {
    setCommunicationTypeSelect(event.target.value);
  };

  const handleBuilding = (event) => {
    setBuildingSelect(event.target.value);
  };

  const openPageDeviceDetail = () => {
    navigate("/gatewayDeviceDetail");
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
            <HomeOutlinedIcon className={classes.alignSelf} />
            <Typography variant="h6"> / {sideBar}</Typography>
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
                placeholder={t("gateway:search")}
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
                {t("gateway:btnAdd")}
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

                      console.log("=====>>>>", row);

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
                            {row.id}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classes.fontSixeCell}
                          >
                            {row.name}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classes.fontSixeCell}
                          >
                            {row.band}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classes.fontSixeCell}
                          >
                            {row.building_name}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classes.fontSixeCell}
                          >
                            {row.communication}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classes.fontSixeCell}
                          >
                            {row.device_count}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classes.fontSixeCell}
                          >
                            {row.installation_date}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classes.fontSixeCell}
                          >
                            <FeedOutlinedIcon
                              className={classes.marginIcon}
                              onClick={openPageDeviceDetail}
                            />
                            <VisibilityOutlinedIcon
                              className={classes.marginIcon}
                              ฃ
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
        fullScreen={fullScreen}
        // className={classes.modalWidth}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        classes={{
          paper: classes.modalWidth,
        }}
      >
        <DialogTitle id="responsive-dialog-title" className="mt-3">
          <Typography variant="h3">{t("gateway:edit")}</Typography>
        </DialogTitle>
        <DialogContent>
          {isLoading ? (
            <Box mt={4} width={1} display="flex" justifyContent="center">
              <CircularProgress color="primary" />
            </Box>
          ) : (
            <>
              <Grid item md={12}>
                <Typography variant="subtitle2" className="pb-3">
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
                  {t("gateway:building")}
                </Typography>
                <FormControl variant="outlined" size="small" fullWidth>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={building.length > 0 ? buildingSelect : "none"}
                    placeholder={t("gateway:selectCommunication")}
                    onChange={handleBuilding}
                  >
                    <MenuItem value="none">{t("gateway:select")}</MenuItem>
                    {building.length > 0 &&
                      building.map((item) => {
                        return (
                          <MenuItem
                            id={"buildingNameSelect-" + item.id}
                            key={item.id}
                            value={item.id}
                          >
                            {item.name}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
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
                  {t("gateway:communicationType")}
                </Typography>
                <FormControl variant="outlined" size="small" fullWidth>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={
                      communicationType.length > 0
                        ? communicationTypeSelect
                        : "none"
                    }
                    placeholder={t("gateway:selectCommunication")}
                    onChange={handleCommunicationType}
                  >
                    <MenuItem value="none">
                      {t("gateway:selectCommunication")}
                    </MenuItem>
                    {communicationType.length > 0 &&
                      communicationType.map((item) => {
                        return (
                          <MenuItem
                            id={"selectCommunication-" + item.id}
                            key={item.id}
                            value={item.id}
                          >
                            {item.communication}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={12}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("gateway:upload")}
                </Typography>
                <Grid
                  item
                  md={12}
                  //   className={clsx(classes.flexRow, classes.justContentCenter)}
                >
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
              <Grid
                item
                md={12}
                className={clsx(classes.flexRowBtnModal, classes.marginRow)}
              >
                <Grid item md={3}>
                  <Button
                    onClick={handleClose}
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
                    onClick={() => handleValidate('edit')}
                  >
                    {t("building:btnAddModal")}
                  </Button>
                </Grid>
              </Grid>
            </>
          )}
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
          <Typography variant="h3">{t("gateway:add")}</Typography>
        </DialogTitle>
        <DialogContent>
          <Grid item md={12}>
            <Typography variant="subtitle2" className="pb-3">
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
              {t("gateway:building")}
            </Typography>
            <FormControl variant="outlined" size="small" fullWidth>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={building.length > 0 ? buildingSelect : "none"}
                placeholder={t("gateway:selectCommunication")}
                onChange={handleBuilding}
              >
                <MenuItem value="none">{t("gateway:select")}</MenuItem>
                {building.length > 0 &&
                  building.map((item) => {
                    return (
                      <MenuItem
                        id={"buildingNameSelect-" + item.id}
                        key={item.id}
                        value={item.id}
                      >
                        {item.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
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
              {t("gateway:communicationType")}
            </Typography>
            <FormControl variant="outlined" size="small" fullWidth>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={
                  communicationType.length > 0
                    ? communicationTypeSelect
                    : "none"
                }
                placeholder={t("gateway:selectCommunication")}
                onChange={handleCommunicationType}
              >
                <MenuItem value="none">
                  {t("gateway:selectCommunication")}
                </MenuItem>
                {communicationType.length > 0 &&
                  communicationType.map((item) => {
                    return (
                      <MenuItem
                        id={"selectCommunication-" + item.id}
                        key={item.id}
                        value={item.id}
                      >
                        {item.communication}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={12}>
            <Typography variant="subtitle2" className="mt-3 pb-3">
              {t("gateway:upload")}
            </Typography>
            <Grid
              item
              md={12}
              //   className={clsx(classes.flexRow, classes.justContentCenter)}
            >
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
                  {imagePreviewUrl ? (
                    <img
                      src={imagePreviewUrl}
                      alt="img-upload"
                      className={classes.imgWidth}
                    />
                  ) : (
                    <CardContent
                      className={clsx(classes.textCenter, classes.marginTopBox)}
                    >
                      <Typography> +</Typography>
                      <Typography> upload</Typography>
                    </CardContent>
                  )}
                </Card>
              </label>
            </Grid>
          </Grid>
          {/* <DialogContentText>
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText> */}
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
                onClick={handleValidate}
              >
                {t("building:btnAddModal")}
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

      {/* Modal View */}
      <Dialog
        fullScreen={fullScreen}
        // className={classes.modalWidth}
        open={openView}
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
          <Typography variant="h3">{gatewayName}</Typography>
          <CloseIcon onClick={handleCloseView} className={classes.cuserPoint} />
        </DialogTitle>
        <DialogContent>
          {isLoading ? (
            <Box mt={4} width={1} display="flex" justifyContent="center">
              <CircularProgress color="primary" />
            </Box>
          ) : (
            <>
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
                  <img src={file} alt="img-test" className={classes.imgWidth} />
                </Grid>
                <Grid item md={9}>
                  <Grid
                    item
                    className={clsx(classes.boxMargin, classes.marginRow)}
                  >
                    <Typography variant="h5">
                      {gatewayName ? gatewayName : "-"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item md={12} className={clsx(classes.marginRow)}>
                <Typography variant="h5">{t("gateway:building")}</Typography>
                <Grid item className="mt-2">
                  <Typography variant="body1">
                    {buildingSelect ? buildingSelect : "-"}
                  </Typography>
                </Grid>
              </Grid>

              <Grid item md={12} className={clsx(classes.marginRow)}>
                <Typography variant="h5">
                {t("gateway:deviceBrand")}
                </Typography>
                <Grid item className="mt-2">
                  <Typography variant="body1">
                    {deviceBrand ? deviceBrand : "-"}
                  </Typography>
                </Grid>
              </Grid>

              <Grid item md={12} className={clsx(classes.marginRow)}>
                <Typography variant="h5"> {t("gateway:communicationType")}</Typography>
                <Grid item className="mt-2">
                  <Typography variant="body1">
                    {communicationTypeSelect ? communicationTypeSelect : "-"}
                  </Typography>
                </Grid>
              </Grid>
            </>
          )}
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

export default connect(mapStateToProps, mapDispatchToProps)(GatewayManagement);