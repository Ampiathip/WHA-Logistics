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
  CircularProgress,
  FormControl,
  Select,
  MenuItem,
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
import IconDelete from "../images/icon/Delete.svg";
import IconDocument from "../images/icon/Document.svg";
import IconShow from "../images/icon/Show.svg";
import IconSetting from "../images/icon/Setting.svg";
import IconEdit from "../images/icon/Edit.svg";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";

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
    fontSize: "14px !important",
  },
  fontSixeCell: {
    fontSize: "12px !important",
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
  modalEditWidth: {
    width: "65% !important",
    height: "90% !important",
    maxWidth: "none !important",
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
    backgroundColor: "#27963C !important",
    color: "#fff !important",
    "&:hover": {
      backgroundColor: "#27963C !important",
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
  displayContents: {
    display: "contents",
  },
  borderBox: {
    borderRight: "1px solid #8f8a8a",
    padding: 10,
  },
  borderboxIcon: {
    border: "1px solid #000",
    // padding: 8,
    borderRadius: 10,
  },
  marginBoxIcon: {
    marginRight: 15,
  },
  backgroundMeasurement: {
    backgroundColor: "#D9D9D9",
  },
  borderBottomMeasurement: {
    borderBottom: "1px solid #000",
  },
  borderMeasurement: {
    border: "1px solid #000",
    padding: 10,
    borderRadius: 10,
  },
  marginBot: {
    marginBottom: "10px !important",
  },
  marginBillBox: {
    margin: 15,
  },
}));

function descendingComparator(a, b, orderBy) {
  if (b.id < a.id) {
    return -1;
  }
  if (b.id > a.id) {
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
    label: "Device Number",
  },
  {
    id: "calories",
    numeric: false,
    disablePadding: false,
    label: "Gateway Name",
  },
  {
    id: "fat",
    numeric: false,
    disablePadding: false,
    label: "Band",
  },
  {
    id: "carbs",
    numeric: false,
    disablePadding: false,
    label: "Model",
  },
  {
    id: "power",
    numeric: false,
    disablePadding: false,
    label: "Communication Type",
  },
  {
    id: "protein",
    numeric: false,
    disablePadding: false,
    label: "No of Point",
  },
  {
    id: "unit",
    numeric: false,
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

const DeviceManagementView = ({ t, login }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const dispatch = useDispatch();
  const classes = useStyles();
  const sideBar = useSelector((state) => state.sidebar);
  const token = useSelector((state) => state.token);
  const theme = useTheme();
  const navigate = useNavigate();
  // modal //
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [openView, setOpenView] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isIdEdit, setIsIdEdit] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const [rows, setRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  // const [sortedRows, setSortedRows] = useState(rows);
  const [fitterSelectGateway, setFitterSelectGateway] = useState("none");
  const [fitterSelectDevice, setFitterSelectDevice] = useState("none");
  const [gatewayList, setGatewayList] = useState([]);
  const [deviceList, setDeviceList] = useState([]);
  const [gatewayNameSearch, setGatewayNameSearch] = useState("");
  const [communicationType, setCommunicationType] = useState([]);
  const [communicationTypeSelect, setCommunicationTypeSelect] =
    useState("none");
  const [deviceId, setDeviceId] = useState("");
  const [deviceBrand, setDeviceBrand] = useState("");
  const [deviceName, setDeviceName] = useState("");
  const [model, setModel] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [installation, setInstallation] = useState(null);

  const swalFire = (msg) => {
    MySwal.fire({
      icon: "error",
      confirmButtonText: "ตกลง",
      text: msg,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout(false));
      } else if (result.isDismissed) {
        setIsLoading(false);
      }
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
    dispatch(checkToken());
    if (!_.isEmpty(token)) {
      getDeviceUserList();
    }
    console.log("token", token, login);
  }, [token]);

  const getDeviceUserList = async () => {
    setIsLoading(true);
    try {
      await API.connectTokenAPI(token);
      await API.getDeviceUserList().then((response) => {
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

  const getGateway = async () => {
    setIsLoading(true);
    try {
      await API.connectTokenAPI(token);
      await API.getGatewayData().then((response) => {
        const dataPayload = response.data;
        setGatewayList(dataPayload);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
      const response = error.response;
      swalFire(response.data);
      setIsLoading(false);
    }
  };

  const getDeviceList = async (id) => {
    setIsLoading(true);
    try {
      await API.connectTokenAPI(token);
      await API.getDeviceData(id).then((response) => {
        const dataPayload = response.data;
        setDeviceList(dataPayload);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
      const response = error.response;
      swalFire(response.data);
      setIsLoading(false);
    }
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

  // const sortedRows = useMemo(
  //   () => stableSort(rows, getComparator(order, orderBy)),
  //   [order, orderBy, rows]
  // );

  const sortedRows = useMemo(() => {
    if (fitterSelectGateway !== "none" && fitterSelectDevice !== "none") {
      const sorted = stableSort(rows, getComparator(order, orderBy));
      return sorted.filter(
        (item) =>
          item.gatewayname === gatewayNameSearch &&
          item.id === fitterSelectDevice
      );
    } else if (fitterSelectGateway !== "none") {
      const sorted = stableSort(rows, getComparator(order, orderBy));
      return sorted.filter((item) => item.gatewayname === gatewayNameSearch);
    } else {
      return stableSort(rows, getComparator(order, orderBy));
    }
  }, [order, orderBy, rows, fitterSelectGateway, fitterSelectDevice]);

  const visibleRows = useMemo(
    () =>
      sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage, sortedRows]
  );

  const handleOpenView = (event, id) => {
    setOpenView(true);
    deviceView(id);
    setIsIdEdit(id);
  };

  const handleCloseView = () => {
    setOpenView(false);
  };

  const deviceView = async (id) => {
    setIsLoading(true);
    try {
      await API.connectTokenAPI(token);
      await API.getDeviceView(id).then((response) => {
        const dataPayload = response.data;
        // console.log("dataPayload", response, dataPayload);
        dataPayload.length > 0 &&
          dataPayload.map((item) => {
            setDeviceId(item.id);
            setInstallation(item.installation_date);
            setModel(item.model);
            setDeviceName(item.name);
            setDeviceBrand(item.band);
            setSerialNumber(item.serial_number);
            setCommunicationTypeSelect(
              item.communication &&
                communicationType.find(
                  (f) => f.communication === item.communication
                ).id
            );
            setImagePreviewUrl(item.file);
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

  // Update visibleRows based on the searchQuery
  const updateVisibleRows = (query) => {
    if (query) {
      const filteredRows = rows.filter((row) =>
        Object.values(row).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(query.toLowerCase())
        )
      );
      console.log("filteredRows", filteredRows);
      setRows(filteredRows);
    } else {
      getDeviceUserList();
    }
    // const filteredAndSortedRows = rows
    //   .filter((row) => row.name.toLowerCase().includes(query.toLowerCase()))
    //   .sort((a, b) => {
    //     // Use the current sorting configuration
    //     a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    //   });
    // console.log("filteredRows", filteredRows);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    // updateVisibleRows(query);

    if (query) {
      // Use the filter method to find items based on the search condition
      const filteredResults = rows.filter((item) =>
        Object.values(item).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(query.toLowerCase())
        )
      );

      console.log("filteredRows", filteredResults);
      setRows(filteredResults);
    } else {
      getDeviceUserList();
    }
  };

  const handleFitterSelectGateWay = (event) => {
    const gatewayId = event.target.value;
    const gatewayName = gatewayList.find((f) => f.id == gatewayId).name;
    setGatewayNameSearch(gatewayName);
    setFitterSelectGateway(gatewayId);
    getDeviceList(gatewayId);
    setFitterSelectDevice("none");
  };

  const handleFitterSelectDevice = (event) => {
    setFitterSelectDevice(event.target.value);
  };

  return (
    <Box className={classes.marginRow}>
      {isLoading ? (
        <Box mt={4} width={1} display="flex" justifyContent="center">
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <>
          <Grid
            item
            md={12}
            className={clsx(classes.flexRow, classes.justContent)}
          >
            <Grid item md={5} className={classes.marginRow}>
              <TextField
                // id="input-with-icon-textfield"
                size="small"
                placeholder={t("gateway:searchDevice")}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </Grid>
            <Grid item md={3} className={clsx(classes.marginRow)}>
              <FormControl variant="outlined" size="small" fullWidth>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={fitterSelectGateway}
                  placeholder={t("floor:filterGateway")}
                  onChange={handleFitterSelectGateWay}
                >
                  <MenuItem value="none" disabled>
                    {t("floor:filterGateway")}
                  </MenuItem>
                  {gatewayList.length > 0 &&
                    gatewayList.map((item) => {
                      return (
                        <MenuItem
                          id={"selectbillingType-" + item.id}
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
            <Grid item md={3} className={clsx(classes.marginRow)}>
              <FormControl variant="outlined" size="small" fullWidth>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={fitterSelectDevice}
                  placeholder={t("floor:filterDevice")}
                  onChange={handleFitterSelectDevice}
                >
                  <MenuItem value="none" disabled>
                    {t("floor:filterDevice")}
                  </MenuItem>
                  {deviceList.length > 0 &&
                    deviceList.map((item) => {
                      return (
                        <MenuItem
                          id={"selectbillingType-" + item.id}
                          key={item.id}
                          value={item.id}
                        >
                          {item.devicename}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
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
                    onSelectAllClick={handleSelectAllClick}
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
                          // aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.name}
                          // selected={isItemSelected}
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
                            {row.devicename}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classes.fontSixeCell}
                          >
                            {row.gatewayname}
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
                            {row.model}
                          </TableCell>

                          <TableCell
                            align="center"
                            className={classes.fontSixeCell}
                          >
                            {row.communication_type}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classes.fontSixeCell}
                          >
                            {row.no_of_point}
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
                            <img
                              src={IconShow}
                              alt="IconShow"
                              onClick={(event) => {
                                handleOpenView(event, row.id);
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
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
          </Box>
        </>
      )}

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
          <Typography variant="h3">{deviceName}</Typography>
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
                  <img
                    src={imagePreviewUrl}
                    alt="img-test"
                    className={classes.imgWidth}
                  />
                </Grid>
                <Grid item md={7}>
                  <Grid
                    item
                    className={clsx(classes.boxMargin, classes.marginRow)}
                  >
                    <Typography variant="h5">
                      {deviceName ? deviceName : "-"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item md={12} className={clsx(classes.marginRow)}>
                <Typography variant="h5">{t("gateway:deviceId")}</Typography>
                <Grid item className="mt-2">
                  <Typography variant="body1">
                    {deviceId ? deviceId : "-"}
                  </Typography>
                </Grid>
              </Grid>

              <Grid item md={12} className={clsx(classes.marginRow)}>
                <Typography variant="h5"> {t("gateway:deviceName")}</Typography>
                <Grid item className="mt-2">
                  <Typography variant="body1">
                    {deviceName ? deviceName : "-"}
                  </Typography>
                </Grid>
              </Grid>

              <Grid item md={12} className={clsx(classes.marginRow)}>
                <Typography variant="h5">
                  {" "}
                  {t("gateway:deviceBrand")}
                </Typography>
                <Grid item className="mt-2">
                  <Typography variant="body1">
                    {deviceBrand ? deviceBrand : "-"}
                  </Typography>
                </Grid>
              </Grid>

              <Grid item md={12} className={clsx(classes.marginRow)}>
                <Typography variant="h5">
                  {t("gateway:serialNumber")}
                </Typography>
                <Grid item className="mt-2">
                  <Typography variant="body1">
                    {serialNumber ? serialNumber : "-"}
                  </Typography>
                </Grid>
              </Grid>

              <Grid item md={12} className={clsx(classes.marginRow)}>
                <Typography variant="h5"> {t("gateway:model")}</Typography>
                <Grid item className="mt-2">
                  <Typography variant="body1">{model ? model : "-"}</Typography>
                </Grid>
              </Grid>

              <Grid item md={12} className={clsx(classes.marginRow)}>
                <Typography variant="h5">
                  {" "}
                  {t("gateway:communicationType")}
                </Typography>
                <Grid item className="mt-2">
                  <Typography variant="body1">
                    {communicationTypeSelect ? communicationTypeSelect : "-"}
                  </Typography>
                </Grid>
              </Grid>

              <Grid item md={12} className={clsx(classes.marginRow)}>
                <Typography variant="h5">
                  {t("gateway:Installation")}
                </Typography>
                <Grid item className="mt-2">
                  <Typography variant="body1">
                    {installation ? installation : "-"}
                  </Typography>
                </Grid>
              </Grid>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Box>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceManagementView);
