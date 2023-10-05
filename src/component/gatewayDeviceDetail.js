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
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import { Topic } from "@mui/icons-material";
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
import IconSave from "../images/icon/TickSquare.svg";

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
  btnSecret: {
    width: "100%",
    backgroundColor: "#fff !important",
    color: "#112D4E !important",
    borderColor: "#112D4E !important",
    "&:hover": {
      backgroundColor: "#fff !important",
      boxShadow: `none`,
    },
  },
  textAlignEnd: {
    textAlign: "end",
  },
  cardBox: {
    width: 500,
    height: 300,
  },
  cardBoxGeteway: {
    width: 500,
    height: 200,
  },
  borderPoint: {
    marginLeft: 10,
    border: "1px solid #F5F5F5",
    backgroundColor: "#F5F5F5",
    borderRadius: 22,
    padding: 8,
  },
  marginDataTable: {
    margin: 10,
  },
  borderBox: {
    borderRight: "1px solid #8f8a8a",
    paddingRight: 10,
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
    label: "Device ID",
  },
  {
    id: "calories",
    numeric: true,
    disablePadding: false,
    label: "Device Name",
  },
  {
    id: "fat",
    numeric: true,
    disablePadding: false,
    label: "Device Brand",
  },
  {
    id: "device",
    numeric: true,
    disablePadding: false,
    label: "Device Model",
  },
  {
    id: "carbs",
    numeric: true,
    disablePadding: false,
    label: "Gateway Name",
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
    label: "No. Of Point",
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

const GatewayDeviceManagement = ({ t, pageName }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [gatewayName, setGatewayName] = useState("");
  const [deviceBrand, setDeviceBrand] = useState("");
  const [deviceName, setDeviceName] = useState("");
  const [model, setModel] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [installation, setInstallation] = useState("");

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
  const [openAdd, setOpenAdd] = useState(false);
  const [file, setFile] = useState(null);
  const [communicationType, setCommunicationType] = useState([]);
  const [communicationTypeSelect, setCommunicationTypeSelect] =
    useState("none");
  const [billingType, setBillingType] = useState([]);
  const [billingTypeSelect, setBillingTypeSelect] = useState("none");

  const [openView, setOpenView] = useState(false);
  const fullScreenView = useMediaQuery(theme.breakpoints.down("xl"));
  // view //
  const [rowsPerPageView, setRowsPerPageView] = useState(5);
  const [pageView, setPageView] = useState(0);
  const columnsPoint = [
    { id: "name", label: "Device ID" },
    { id: "code", label: "Point name" },
    {
      id: "population",
      label: "Topic",
      // minWidth: 170,
      align: "center",
      // format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: "density",
      label: "Data Unit",
      // minWidth: 170,
      align: "center",
      // format: (value) => value.toFixed(2),
    },
    {
      id: "unit",
      label: "Unit Binding",
      // minWidth: 170,
      align: "center",
      // format: (value) => value.toFixed(2),
    },
  ];
  // edit //
  const [deviceId, setDeviceId] = useState("");
  const [deviceIdPoint, setDeviceIdPoint] = useState("");
  const [pointName, setPointName] = useState("");
  const [topic, setTopic] = useState("");
  const [data, setData] = useState("");
  const [dataUnit, setDataUnit] = useState("");
  const [unitBinding, setUnitBinding] = useState("");
  const [rowsPerPageEdit, setRowsPerPageEdit] = useState(5);
  const [pageEdit, setPageEdit] = useState(0);
  const [rowsPointEdit, setRowsPointEdit] = useState([]);

  const columnsPointEdit = [
    { id: "name", label: "Device ID", minWidth: 120 },
    { id: "code", label: "Point name" },
    {
      id: "population",
      label: "Topic",
      // minWidth: 170,
      align: "center",
      // format: (value) => value.toLocaleString('en-US'),
    },
    // {
    //   id: "size",
    //   label: "Data",
    //   minWidth: 170,
    //   align: "center",
    //   format: (value) => value.toLocaleString('en-US'),
    // },
    {
      id: "density",
      label: "Data Unit",
      // minWidth: 170,
      align: "center",
      // format: (value) => value.toFixed(2),
    },
    {
      id: "unit",
      label: "Unit Binding",
      // minWidth: 170,
      align: "center",
      // format: (value) => value.toFixed(2),
    },
    {
      id: "action",
      label: "Action",
      align: "center",
    },
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [isValidate, setIsValidate] = useState(true);
  const [isIdEdit, setIsIdEdit] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [sortedRows, setSortedRows] = useState(rows);
  const [editPoint, setEditPoint] = useState(null);
  const [disabledFild, setDisabledFild] = useState(null);

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
      getDevice(id);
      getCommunicationData();
      getBillingTypeData();
    }
  }, [token]);

  const getDevice = async (id) => {
    setIsLoading(true);
    try {
      await API.connectTokenAPI(token);
      await API.getDeviceData(id).then((response) => {
        const dataPayload = response.data;
        console.log("dataPayload", dataPayload);
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

  // get getBillingTypeData //
  const getBillingTypeData = async () => {
    setIsLoading(true);
    try {
      await API.connectTokenAPI(token);
      await API.getBillingTypeData().then((response) => {
        const dataPayload = response.data;
        setBillingType(dataPayload);
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
    if (
      _.isEmpty(deviceName) ||
      _.isEmpty(gatewayName) ||
      _.isEmpty(deviceBrand) ||
      !communicationTypeSelect ||
      !billingTypeSelect ||
      _.isEmpty(model) ||
      _.isEmpty(serialNumber) ||
      _.isEmpty(installation) ||
      _.isEmpty(imagePreviewUrl)
    ) {
      isValidate = false;
    }
    console.log("isValidate", isValidate);
    setIsValidate(isValidate);

    if (isValidate) {
      if (type === "edit") {
        deviceUpdate(isIdEdit);
      } else {
        deviceRegister();
      }
    }
  };

  const deviceRegister = async () => {
    setIsLoading(true);
    let reader = new window.FileReader();
    reader.readAsDataURL(file);
    try {
      reader.onload = async () => {
        const base64File = reader.result; // Extract the base64 data
        const body = {
          deviceName: deviceName,
          gatewayID: id,
          deviceBand: deviceBrand,
          model: model,
          serialNumber: serialNumber,
          installationDate: installation,
          communicationType: communicationTypeSelect,
          billingType_id: billingTypeSelect,
          description: "",
          file: base64File, // Include the Base64 encoded file
        };
        await API.connectTokenAPI(token);
        await API.deviceRegister(body).then((response) => {
          const dataPayload = response.data;
          console.log("dataPayload", dataPayload, response);
          if (response.status === 200) {
            MySwal.fire({
              icon: "success",
              confirmButtonText: "ตกลง",
              text: dataPayload,
            });
            getDevice(id);
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

  const deviceUpdate = async (rowId) => {
    setIsLoading(true);
    let reader = new window.FileReader();
    reader.readAsDataURL(file);
    try {
      reader.onload = async () => {
        const base64File = reader.result; // Extract the base64 data
        const body = {
          deviceName: deviceName,
          gatewayID: id,
          deviceBand: deviceBrand,
          model: model,
          serialNumber: serialNumber,
          installationDate: installation,
          communicationType: communicationTypeSelect,
          billingType_id: billingTypeSelect,
          description: "",
          file: base64File, // Include the Base64 encoded file
        };
        await API.connectTokenAPI(token);
        await API.deviceUpdate(rowId, body).then((response) => {
          const dataPayload = response.data;
          // console.log("dataPayload", dataPayload, response);
          if (response.status === 200) {
            MySwal.fire({
              icon: "success",
              confirmButtonText: "ตกลง",
              text: dataPayload,
            });
            getDevice(id);
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

  const deviceView = async (id) => {
    setIsLoading(true);
    try {
      await API.connectTokenAPI(token);
      await API.getDeviceView(id).then((response) => {
        const dataPayload = response.data;
        console.log("dataPayload", response, dataPayload);
        dataPayload.length > 0 &&
          dataPayload.map((item) => {
            // console.log("9999=======item", item);
            setDeviceId(item.id);
            setInstallation(item.installation_date);
            setModel(item.model);
            setDeviceName(item.name);
            setDeviceBrand(item.band);
            setSerialNumber(item.serial_number);
            // setBillingTypeSelect(
            //   item.billing_type &&
            //     billingType.find((f) => f.name === item.billing_type).id
            // );
            setCommunicationTypeSelect(
              item.communication &&
                communicationType.find(
                  (f) => f.communication === item.communication
                ).id
            );
            // setFile(item.file);
            setImagePreviewUrl(item.file);
            getPointData(item.id);
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

  const deviceDelete = async (rowId) => {
    setIsLoading(true);
    try {
      await API.connectTokenAPI(token);
      await API.deviceDelete(rowId).then((response) => {
        const dataPayload = response.data;
        if (response.status === 200) {
          getDevice(id);
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
        deviceDelete(id);
      } else if (result.isDismissed) {
        setIsLoading(false);
      }
    });
  };

  // get Points //
  const getPointData = async (id) => {
    setIsLoading(true);
    try {
      await API.connectTokenAPI(token);
      await API.getPointData(id).then((response) => {
        const dataPayload = response.data;
        console.log("dataPayload====Point", dataPayload);
        setRowsPointEdit(dataPayload);
        setDisabledFild(true);
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

  const handleClickOpen = (event, id) => {
    setOpen(true);
    setIsIdEdit(id);
    deviceView(id);
    setDisabledFild(true);
    setEditPoint(null);
  };

  const handleClickOpenView = async (event, id) => {
    setOpenView(true);
    deviceView(id);
    await getPointData(id);
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

  const handleChangePageView = (event, newPage) => {
    setPageView(newPage);
  };

  const handleChangeRowsPerPageView = (event) => {
    setRowsPerPageView(parseInt(+event.target.value));
    setPageView(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
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
    setIsValidate(true);
    setBillingTypeSelect("none");
    setCommunicationTypeSelect("none");
    setDeviceBrand("");
    setDeviceName("");
    setGatewayName("");
    setModel("");
    setSerialNumber("");
    setInstallation("");
    setImagePreviewUrl("");
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
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

  const handleBillingType = (event) => {
    setBillingTypeSelect(event.target.value);
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

  // add row Edit //
  const addNewRow = () => {
    const newRow = {
      id: null,
      // name: "New Name",
      // rowsId: null,
      name: "",
      topic: "",
      data: "",
      unit: "",
      binding: "",
      device_id: "",
      action: "",
    };
    // Create a copy of the existing rowsPointEdit array
    const updatedRows = [...rowsPointEdit];

    // Add the new row to the array
    updatedRows.push(newRow);

    // Update the state with the new array
    setRowsPointEdit(updatedRows);
    setDisabledFild(false);
    setEditPoint(null);
  };

  console.log("rowsPointEdit", rowsPointEdit);

  const handleChangePageEdit = (event, newPage) => {
    setPageEdit(newPage);
  };

  const handleChangeRowsPerPageEdit = (event) => {
    setRowsPerPageEdit(parseInt(event.target.value));
    setPageEdit(0);
  };

  const handleDeviceId = (e, row, index) => {
    const newValue = e.target.value;
    // Create a copy of the existing rowsPointEdit array
    const updatedRows = [...rowsPointEdit];
    // Update the device_id of the specific row at the given index
    updatedRows[index].id = newValue;
    // Update the state with the new array
    setRowsPointEdit(updatedRows);
    // setDeviceIdPoint(newValue);
  };

  const handlePointName = (e, row, index) => {
    const newValue = e.target.value;
    const updatedRows = [...rowsPointEdit];
    updatedRows[index].name = newValue;
    setRowsPointEdit(updatedRows);
    // setPointName(newValue);
  };

  const handleTopic = (e, row, index) => {
    const newValue = e.target.value;
    const updatedRows = [...rowsPointEdit];
    updatedRows[index].topic = newValue;
    setRowsPointEdit(updatedRows);
    // setTopic(newValue);
  };

  const handleData = (e, row, index) => {
    const newValue = e.target.value;
    const updatedRows = [...rowsPointEdit];
    updatedRows[index].data = newValue;
    setRowsPointEdit(updatedRows);
    // setData(newValue);
  };

  const handleDataUnit = (e, row, index) => {
    const newValue = e.target.value;
    const updatedRows = [...rowsPointEdit];
    updatedRows[index].unit = newValue;
    setRowsPointEdit(updatedRows);
    // setDataUnit(newValue);
  };

  const handleUnitBinding = (e, row, index) => {
    const newValue = e.target.value;
    const updatedRows = [...rowsPointEdit];
    updatedRows[index].binding = newValue;
    setRowsPointEdit(updatedRows);
    // setUnitBinding(newValue);
  };

  const openPageGateway = () => {
    navigate("/gateway");
  };

  // save Point //
  const handleAddPoint = async () => {
    setIsLoading(true);
    setOpen(false);
    try {
      let body = [];
      let bodyRow = [];

      rowsPointEdit.length > 0
        ? (body = rowsPointEdit.filter((row) => {
            return row.id == null || row.id == "";
          }))
        : (body = []);

        body.length > 0 && body.forEach((row) => {
          const data = {
            point_name: row.name,
            topic: row.topic,
            data_unit: row.unit,
            unit_binding: row.binding,
            device_id: deviceId,
          };
          bodyRow.push(data);
        });
      console.log("body", body, bodyRow);
      await API.connectTokenAPI(token);
      await API.pointRegister(bodyRow).then((response) => {
        const dataPayload = response.data;
        if (response.status === 200) {
          MySwal.fire({
            icon: "success",
            confirmButtonText: "ตกลง",
            text: dataPayload,
          }).then((result) => {
            if (result.isConfirmed) {
              getPointData(deviceId);
              setOpen(true);
            } else if (result.isDismissed) {
              setIsLoading(false);
            }
          });
          // getPointData(deviceId);
          // setOpen(false);
        }
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

  // delete Point //

  const pointDelete = async (rowId) => {
    setIsLoading(true);
    try {
      await API.connectTokenAPI(token);
      await API.pointDelete(rowId).then((response) => {
        const dataPayload = response.data;
        if (response.status === 200) {
          MySwal.fire({
            icon: "success",
            confirmButtonText: "ตกลง",
            text: dataPayload,
          }).then((result) => {
            if (result.isConfirmed) {
              getPointData(deviceId);
              setOpen(true);
            } else if (result.isDismissed) {
              setIsLoading(false);
            }
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

  const handleDeletePoint = async (event, id) => {
    setOpen(false);
    MySwal.fire({
      icon: "warning",
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
      showCancelButton: true,
      text: "คุณต้องการลบข้อมูลหรือไม่",
    }).then((result) => {
      if (result.isConfirmed) {
        pointDelete(id);
      } else if (result.isDismissed) {
        setIsLoading(false);
      }
    });
  };

  // Edit Point //
  const handleEditPoint = async (event, id) => {
    setEditPoint(id);
    setDisabledFild(false);
  };

  const handleUpdatePoint = async (event, id) => {
    setIsLoading(true);
    setOpen(false);
    try {
      let body = [];
      const idToMatch = id; // Replace with the actual ID you want to match
      const updatedRow = rowsPointEdit.find((row) => row.id === idToMatch);
      const data = {
        id: updatedRow.id,
        point_name: updatedRow.name,
        topic: updatedRow.topic,
        data_unit: updatedRow.unit,
        unit_binding: updatedRow.binding,
      };
      body.push(data);
      // console.log("rowsPointEdit", rowsPointEdit, id, updatedRow);
      // console.log("body", body);
      await API.connectTokenAPI(token);
      await API.pointUpdate(body).then((response) => {
        const dataPayload = response.data;
        if (response.status === 200) {
          MySwal.fire({
            icon: "success",
            confirmButtonText: "ตกลง",
            text: dataPayload,
          }).then((result) => {
            if (result.isConfirmed) {
              getPointData(deviceId);
              setOpen(true);
              setEditPoint(null);
              setDisabledFild(true);
            } else if (result.isDismissed) {
              setIsLoading(false);
            }
          });
        }
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
      getDevice(id);
    }
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    updateVisibleRows(query);
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
              onClick={openPageGateway}
            >
              {" "}
              / {sideBar}{" "}
            </Typography>
            <Typography variant="h6"> / {pageName} </Typography>
          </Grid>
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
            <Grid item md={2} className={clsx(classes.marginRow)}>
              <Button
                onClick={handleClickOpenAdd}
                autoFocus
                // fullWidth
                className={clsx(classes.backGroundConfrim, classes.width)}
                variant="outlined"
              >
                {t("gateway:btnAddDevice")}
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
                            {row.id}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classes.fontSixeCell}
                          >
                            {row.devicename}
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
                            {row.name}
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
                            {row.no_of_device}
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
                              src={IconDocument}
                              alt="IconDocument"
                              // onClick={(event) => {
                              //   openPageDeviceDetail(event, row.id);
                              // }}
                            />

                            <img
                              src={IconShow}
                              alt="IconShow"
                              onClick={(event) => {
                                handleClickOpenView(event, row.id);
                              }}
                            />

                            <img
                              src={IconSetting}
                              alt="IconSetting"
                              onClick={(event) => {
                                handleClickOpen(event, row.id);
                              }}
                            />
                            <img
                              src={IconDelete}
                              alt="IconDelete"
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
        fullScreen={fullScreenView}
        // className={classes.modalWidth}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        classes={{
          paper: classes.modalWidth,
        }}
      >
        <DialogTitle id="responsive-dialog-title">
          <Grid
            item
            md={12}
            className={clsx(
              classes.flexRow,
              classes.alignItem,
              classes.justContentCenter
            )}
          >
            <Typography variant="h4">{t("gateway:DeviceInfo")}</Typography>
          </Grid>
        </DialogTitle>
        <DialogContent className={clsx(classes.flexRow, classes.modalContent)}>
          {isLoading ? (
            <Box mt={4} width={1} display="flex" justifyContent="center">
              <CircularProgress color="primary" />
            </Box>
          ) : (
            <>
              <Box className={classes.borderBox}>
                <Card className={clsx(classes.cardBoxGeteway)}>
                  <CardContent>
                    <Typography variant="h5">
                      {t("gateway:gatewayInfo")}
                    </Typography>
                    <Grid
                      item
                      md={12}
                      className={clsx(classes.flexRow, classes.alignItem)}
                    >
                      <Grid item md={6} className={classes.marginIcon}>
                        {file ? (
                          <img
                            src={file}
                            alt="img-upload"
                            // className={classes.imgWidth}
                            width={150}
                          />
                        ) : (
                          <img
                            src={process.env.PUBLIC_URL + "/img/Group.png"}
                            alt="img-upload"
                            // className={classes.imgWidth}
                            width={150}
                          />
                        )}
                      </Grid>
                      <Grid item md={6} className={classes.textAlignEnd}>
                        <Typography variant="h6">Gateway1</Typography>
                        <Typography variant="body1">JCA GATEWAY</Typography>
                        <Typography variant="subtitle2">Building 1</Typography>
                        <Button
                          variant="outlined"
                          className={classes.btnSecret}
                        >
                          <KeyOutlinedIcon />
                          <Typography variant="body1">View Secret</Typography>
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
                <Card className={clsx("mt-3", classes.cardBox)}>
                  <CardContent>
                    <Typography variant="h5">
                      {t("gateway:DeviceInfo")}
                    </Typography>
                    <Grid item md={12} className={clsx(classes.flexRow)}>
                      <Grid item md={6} className={classes.marginIcon}>
                        {imagePreviewUrl ? (
                          <img
                            src={imagePreviewUrl}
                            alt="img-upload"
                            width={150}
                            // className={classes.imgWidth}
                          />
                        ) : (
                          <img
                            src={process.env.PUBLIC_URL + "/img/Group.png"}
                            alt="img-upload"
                            width={150}
                            // className={classes.imgWidth}
                          />
                        )}
                      </Grid>
                      <Grid item md={6}>
                        <Grid
                          item
                          className={clsx(classes.flexRow, classes.justContent)}
                        >
                          <Typography variant="h6"> Device ID</Typography>
                          <Typography variant="h6">
                            {" "}
                            {deviceId ? deviceId : "-"}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          className={clsx(classes.flexRow, classes.justContent)}
                        >
                          <Typography variant="h6"> Device name</Typography>
                          <Typography variant="h6">
                            {" "}
                            {deviceName ? deviceName : "-"}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          className={clsx(classes.flexRow, classes.justContent)}
                        >
                          <Typography variant="h6"> Brand</Typography>
                          <Typography variant="h6">
                            {" "}
                            {deviceBrand ? deviceBrand : "-"}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          className={clsx(classes.flexRow, classes.justContent)}
                        >
                          <Typography variant="h6"> Model</Typography>
                          <Typography variant="h6">
                            {" "}
                            {model ? model : "-"}e
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          className={clsx(classes.flexRow, classes.justContent)}
                        >
                          <Typography variant="h6"> Type</Typography>
                          <Typography variant="h6">
                            {" "}
                            {communicationTypeSelect
                              ? communicationTypeSelect
                              : "-"}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          className={clsx(classes.flexRow, classes.justContent)}
                        >
                          <Typography variant="h6">
                            {" "}
                            Installation Date
                          </Typography>
                          <Typography variant="h6">
                            {" "}
                            {installation ? installation : "-"}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
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
              </Box>
              <Box className={classes.boxMargin}>
                <Grid item md={12} className={classes.flexRowBtnModal}>
                  <Grid
                    item
                    className={clsx(
                      classes.flexRow,
                      classes.alignItem,
                      classes.justContentCenter
                    )}
                  >
                    <Typography variant="h5">Point</Typography>
                    <Grid item className={classes.borderPoint}>
                      <Typography variant="body2">20/100</Typography>
                    </Grid>
                  </Grid>

                  <Grid item md={3} className={classes.boxMargin}>
                    <Button
                      variant="outlined"
                      onClick={addNewRow}
                      className={clsx(classes.backGroundConfrim)}
                    >
                      {t("gateway:btnAddPoint")}
                    </Button>
                  </Grid>
                </Grid>

                {isLoading ? (
                  <Box mt={4} width={1} display="flex" justifyContent="center">
                    <CircularProgress color="primary" />
                  </Box>
                ) : (
                  <>
                    <Paper sx={{ width: "100%", overflow: "hidden" }}>
                      <TableContainer sx={{ maxHeight: 640 }}>
                        <Table stickyHeader aria-label="sticky table">
                          <TableHead>
                            <TableRow>
                              {columnsPointEdit.map((column) => (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  style={{
                                    minWidth: column.minWidth,
                                    fontSize: 16,
                                  }}
                                >
                                  {column.label}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rowsPointEdit
                              .slice(
                                pageEdit * rowsPerPageEdit,
                                pageEdit * rowsPerPageEdit + rowsPerPageEdit
                              )
                              .map((row, index) => {
                                console.log("row=======", row, index);
                                return (
                                  <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={row.id}
                                  >
                                    <TableCell
                                      component="th"
                                      id={row.id}
                                      scope="row"
                                      padding="none"
                                      style={{ fontSize: 14 }}
                                      align="center"
                                    >
                                      <Grid
                                        item
                                        className={classes.marginDataTable}
                                      >
                                        <TextField
                                          value={
                                            row.id ? row.id : deviceIdPoint
                                          }
                                          variant="outlined"
                                          // disabled={
                                          //   !disabledFild &&
                                          //   editPoint === row.id
                                          //     ? false
                                          //     : true
                                          // }
                                          disabled={true}
                                          size="small"
                                          fullWidth
                                          // onChange={(e) =>
                                          //   handleDeviceId(e, row, index)
                                          // }
                                        />
                                      </Grid>
                                    </TableCell>
                                    <TableCell
                                      component="th"
                                      id={row.name}
                                      scope="row"
                                      padding="none"
                                      style={{ fontSize: 14 }}
                                      align="center"
                                    >
                                      <Grid
                                        item
                                        className={classes.marginDataTable}
                                      >
                                        <TextField
                                          value={
                                            row.name ? row.name : pointName
                                          }
                                          disabled={
                                            !disabledFild &&
                                            editPoint === row.id
                                              ? false
                                              : true
                                          }
                                          variant="outlined"
                                          size="small"
                                          fullWidth
                                          onChange={(e) =>
                                            handlePointName(e, row, index)
                                          }
                                        />
                                      </Grid>
                                    </TableCell>
                                    <TableCell
                                      component="th"
                                      id={row.topic}
                                      scope="row"
                                      padding="none"
                                      style={{ fontSize: 14 }}
                                      align="center"
                                    >
                                      <Grid
                                        item
                                        className={clsx(
                                          classes.marginDataTable,
                                          classes.flexRow
                                        )}
                                      >
                                        <Typography
                                          style={{
                                            fontSize: 14,
                                            alignSelf: "center",
                                          }}
                                        >
                                          {deviceName && deviceName + "/ "}
                                        </Typography>
                                        <TextField
                                          value={row.topic ? row.topic : topic}
                                          disabled={
                                            !disabledFild &&
                                            editPoint === row.id
                                              ? false
                                              : true
                                          }
                                          variant="outlined"
                                          size="small"
                                          fullWidth
                                          style={{
                                            fontSize: 14,
                                            paddingLeft: 3,
                                          }}
                                          onChange={(e) =>
                                            handleTopic(e, row, index)
                                          }
                                        />
                                      </Grid>
                                    </TableCell>
                                    {/* <TableCell
                                      component="th"
                                      id={row.name}
                                      scope="row"
                                      padding="none"
                                      style={{ fontSize: 14 }}
                                      align="center"
                                    >
                                      <Grid
                                        item
                                        className={classes.marginDataTable}
                                      >
                                        <TextField
                                          value={row.data ? row.data : data}
                                          variant="outlined"
                                          size="small"
                                          fullWidth
                                          onChange={(e) =>
                                            handleData(e, row, index)
                                          }
                                        />
                                      </Grid>
                                    </TableCell> */}
                                    <TableCell
                                      component="th"
                                      id={row.unit}
                                      scope="row"
                                      padding="none"
                                      style={{ fontSize: 14 }}
                                      align="center"
                                    >
                                      <Grid
                                        item
                                        className={classes.marginDataTable}
                                      >
                                        <TextField
                                          value={row.unit ? row.unit : dataUnit}
                                          disabled={
                                            !disabledFild &&
                                            editPoint === row.id
                                              ? false
                                              : true
                                          }
                                          variant="outlined"
                                          size="small"
                                          fullWidth
                                          onChange={(e) =>
                                            handleDataUnit(e, row, index)
                                          }
                                        />
                                      </Grid>
                                    </TableCell>
                                    <TableCell
                                      component="th"
                                      id={row.binding}
                                      scope="row"
                                      padding="none"
                                      style={{ fontSize: 14 }}
                                      align="center"
                                    >
                                      <Grid
                                        item
                                        className={classes.marginDataTable}
                                      >
                                        <TextField
                                          value={
                                            row.binding
                                              ? row.binding
                                              : unitBinding
                                          }
                                          disabled={
                                            !disabledFild &&
                                            editPoint === row.id
                                              ? false
                                              : true
                                          }
                                          variant="outlined"
                                          size="small"
                                          fullWidth
                                          onChange={(e) =>
                                            handleUnitBinding(e, row, index)
                                          }
                                        />
                                      </Grid>
                                    </TableCell>
                                    <TableCell
                                      component="th"
                                      id={row.name}
                                      scope="row"
                                      padding="none"
                                      align="center"
                                    >
                                      {row.id ? (
                                        <>
                                          {editPoint === row.id ? (
                                            <>
                                              <img
                                                src={IconSave}
                                                alt="IconSave"
                                                onClick={(event) =>
                                                  handleUpdatePoint(
                                                    event,
                                                    row.id
                                                  )
                                                }
                                              />
                                            </>
                                          ) : (
                                            <>
                                              <img
                                                src={IconEdit}
                                                alt="IconEdit"
                                                onClick={(event) =>
                                                  handleEditPoint(event, row.id)
                                                }
                                              />
                                            </>
                                          )}

                                          <img
                                            src={IconDelete}
                                            alt="IconDelete"
                                            onClick={(event) =>
                                              handleDeletePoint(event, row.id)
                                            }
                                          />
                                        </>
                                      ) : (
                                        <img
                                          src={IconDelete}
                                          alt="IconDelete"
                                          onClick={(event) =>
                                            handleDeletePoint(event, row.id)
                                          }
                                        />
                                      )}
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
                        count={rowsPointEdit.length}
                        rowsPerPage={rowsPerPageEdit}
                        page={pageEdit}
                        onPageChange={handleChangePageEdit}
                        onRowsPerPageChange={handleChangeRowsPerPageEdit}
                      />
                    </Paper>
                  </>
                )}

                <Grid
                  item
                  md={12}
                  className={clsx(classes.flexRowBtnModal, classes.marginRow)}
                >
                  <Grid item md={3}>
                    <Button
                      onClick={(event) => {
                        handleClickOpen(event, isIdEdit);
                      }}
                      className={clsx(classes.backGroundCancel)}
                      variant="outlined"
                    >
                      {t("gateway:btnRefresh")}
                    </Button>
                  </Grid>
                  <Grid item md={3} className={classes.boxMargin}>
                    <Button
                      onClick={handleAddPoint}
                      className={clsx(classes.backGroundConfrim)}
                      variant="outlined"
                    >
                      {t("gateway:btnSave")}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
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
          <Typography variant="h3">{t("gateway:addDevice")}</Typography>
        </DialogTitle>
        <DialogContent>
          <Grid item md={12}>
            <Typography variant="subtitle2" className="pb-3">
              {t("gateway:deviceName")}
            </Typography>
            <TextField
              // id="input-with-icon-textfield"
              size="small"
              placeholder={t("gateway:deviceName")}
              fullWidth
              variant="outlined"
              value={deviceName}
              onChange={handleDeviceName}
              error={_.isEmpty(deviceName) && !isValidate}
            />
            {_.isEmpty(deviceName) && !isValidate && (
              <Validate errorText={"กรุณาระบุข้อมูล"} />
            )}
          </Grid>
          <Grid item md={12}>
            <Typography variant="subtitle2" className="mt-3 pb-3">
              {t("gateway:gatewayName")}
            </Typography>
            <TextField
              // id="input-with-icon-textfield"
              size="small"
              placeholder={t("gateway:gatewayName")}
              fullWidth
              variant="outlined"
              value={gatewayName}
              onChange={handleGatewayName}
              error={_.isEmpty(gatewayName) && !isValidate}
            />
            {_.isEmpty(gatewayName) && !isValidate && (
              <Validate errorText={"กรุณาระบุข้อมูล"} />
            )}
          </Grid>
          <Grid item md={12}>
            <Typography variant="subtitle2" className="mt-3 pb-3">
              {t("gateway:deviceBrand")}
            </Typography>
            <TextField
              // id="input-with-icon-textfield"
              size="small"
              placeholder={t("gateway:deviceBrand")}
              fullWidth
              variant="outlined"
              value={deviceBrand}
              onChange={handleDeviceBrand}
              error={_.isEmpty(model) && !isValidate}
            />
            {_.isEmpty(deviceBrand) && !isValidate && (
              <Validate errorText={"กรุณาระบุข้อมูล"} />
            )}
          </Grid>
          <Grid item md={12}>
            <Typography variant="subtitle2" className="mt-3 pb-3">
              {t("gateway:model")}
            </Typography>
            <TextField
              // id="input-with-icon-textfield"
              size="small"
              placeholder={t("gateway:model")}
              fullWidth
              variant="outlined"
              value={model}
              onChange={handleModel}
              error={_.isEmpty(model) && !isValidate}
            />
            {_.isEmpty(model) && !isValidate && (
              <Validate errorText={"กรุณาระบุข้อมูล"} />
            )}
          </Grid>
          <Grid item md={12}>
            <Typography variant="subtitle2" className="mt-3 pb-3">
              {t("gateway:serialNumber")}
            </Typography>
            <TextField
              // id="input-with-icon-textfield"
              size="small"
              placeholder={t("gateway:serialNumber")}
              fullWidth
              variant="outlined"
              value={serialNumber}
              onChange={handleSerialNumber}
              error={_.isEmpty(serialNumber) && !isValidate}
            />
            {_.isEmpty(serialNumber) && !isValidate && (
              <Validate errorText={"กรุณาระบุข้อมูล"} />
            )}
          </Grid>
          <Grid item md={12}>
            <Typography variant="subtitle2" className="mt-3 pb-3">
              {t("gateway:Installation")}
            </Typography>
            <TextField
              // id="input-with-icon-textfield"
              size="small"
              placeholder={t("gateway:Installation")}
              fullWidth
              variant="outlined"
              value={installation}
              onChange={handleInstallation}
              error={_.isEmpty(installation) && !isValidate}
            />
            {_.isEmpty(installation) && !isValidate && (
              <Validate errorText={"กรุณาระบุข้อมูล"} />
            )}
          </Grid>
          <Grid item md={12}>
            <Typography variant="subtitle2" className="mt-3 pb-3">
              {t("gateway:communicationType")}
            </Typography>
            <FormControl variant="outlined" size="small" fullWidth>
              <Select
                labelId="demo-select-small-label"
                // id="demo-select-small"
                value={
                  communicationType.length > 0
                    ? communicationTypeSelect
                    : "none"
                }
                placeholder={t("gateway:selectCommunication")}
                onChange={handleCommunicationType}
                error={communicationTypeSelect === "none" && !isValidate}
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
            {communicationTypeSelect === "none" && !isValidate && (
              <Validate errorText={"กรุณาระบุข้อมูล"} />
            )}
          </Grid>
          <Grid item md={12}>
            <Typography variant="subtitle2" className="mt-3 pb-3">
              {t("gateway:billingType")}
            </Typography>
            <FormControl variant="outlined" size="small" fullWidth>
              <Select
                labelId="demo-select-small-label"
                // id="demo-select-small"
                value={billingType.length > 0 ? billingTypeSelect : "none"}
                placeholder={t("gateway:billingType")}
                onChange={handleBillingType}
                error={billingTypeSelect === "none" && !isValidate}
              >
                <MenuItem value="none">
                  {t("gateway:selectBillingType")}
                </MenuItem>
                {billingType.length > 0 &&
                  billingType.map((item) => {
                    return (
                      <MenuItem
                        id={"selectbillingType-" + item.id}
                        key={item.id}
                        value={item.id}
                      >
                        {item.type}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
            {billingTypeSelect === "none" && !isValidate && (
              <Validate errorText={"กรุณาระบุข้อมูล"} />
            )}
          </Grid>
          <Grid item md={12}>
            <Typography variant="subtitle2" className="mt-3 pb-3">
              {t("gateway:uploadDevice")}
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
            {_.isEmpty(imagePreviewUrl) && !isValidate && (
              <Validate errorText={"กรุณาระบุข้อมูล"} />
            )}
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
                onClick={handleValidate}
              >
                {t("building:btnAddModal")}
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

      {/* Modal ViewData */}
      <Dialog
        fullScreen={fullScreenView}
        className={classes.modalWidth}
        open={openView}
        onClose={handleCloseView}
        aria-labelledby="responsive-dialog-title"
        classes={{
          paper: classes.modalWidth,
        }}
      >
        <DialogTitle id="responsive-dialog-title">
          <Grid
            item
            md={12}
            className={clsx(
              classes.flexRow,
              classes.alignItem,
              classes.justContentCenter
            )}
          >
            <Typography variant="h5">Point</Typography>
            <Grid item className={classes.borderPoint}>
              <Typography variant="body2">20/100</Typography>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent className={clsx(classes.flexRow, classes.modalContent)}>
          {isLoading ? (
            <Box mt={4} width={1} display="flex" justifyContent="center">
              <CircularProgress color="primary" />
            </Box>
          ) : (
            <>
              <Box className={classes.paddingCol}>
                <Card className={clsx(classes.cardBoxGeteway)}>
                  <CardContent>
                    <Typography variant="h5">
                      {t("gateway:gatewayInfo")}
                    </Typography>
                    <Grid
                      item
                      md={12}
                      className={clsx(classes.flexRow, classes.alignItem)}
                    >
                      <Grid item md={6} className={classes.marginIcon}>
                        {file ? (
                          <img
                            src={file}
                            alt="img-upload"
                            // className={classes.imgWidth}
                            width={150}
                          />
                        ) : (
                          <img
                            src={process.env.PUBLIC_URL + "/img/Group.png"}
                            alt="img-upload"
                            // className={classes.imgWidth}
                            width={150}
                          />
                        )}
                      </Grid>
                      <Grid item md={6} className={classes.textAlignEnd}>
                        <Typography variant="h6">Gateway1</Typography>
                        <Typography variant="body1">JCA GATEWAY</Typography>
                        <Typography variant="subtitle2">Building 1</Typography>
                        <Button
                          variant="outlined"
                          className={classes.btnSecret}
                        >
                          <KeyOutlinedIcon />
                          <Typography variant="body1">View Secret</Typography>
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
                <Card className={clsx("mt-3", classes.cardBox)}>
                  <CardContent>
                    <Typography variant="h5">
                      {t("gateway:DeviceInfo")}
                    </Typography>
                    <Grid item md={12} className={clsx(classes.flexRow)}>
                      <Grid item md={6} className={classes.marginIcon}>
                        {imagePreviewUrl ? (
                          <img
                            src={imagePreviewUrl}
                            alt="img-upload"
                            width={150}
                            // className={classes.imgWidth}
                          />
                        ) : (
                          <img
                            src={process.env.PUBLIC_URL + "/img/Group.png"}
                            alt="img-upload"
                            width={150}
                            // className={classes.imgWidth}
                          />
                        )}
                      </Grid>
                      <Grid item md={6}>
                        <Grid
                          item
                          className={clsx(classes.flexRow, classes.justContent)}
                        >
                          <Typography variant="h6"> Device ID</Typography>
                          <Typography variant="h6">
                            {" "}
                            {deviceId ? deviceId : "-"}{" "}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          className={clsx(classes.flexRow, classes.justContent)}
                        >
                          <Typography variant="h6"> Device name</Typography>
                          <Typography variant="h6">
                            {" "}
                            {deviceName ? deviceName : "-"}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          className={clsx(classes.flexRow, classes.justContent)}
                        >
                          <Typography variant="h6"> Brand</Typography>
                          <Typography variant="h6">
                            {" "}
                            {deviceBrand ? deviceBrand : "-"}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          className={clsx(classes.flexRow, classes.justContent)}
                        >
                          <Typography variant="h6"> Model</Typography>
                          <Typography variant="h6">
                            {" "}
                            {model ? model : "-"}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          className={clsx(classes.flexRow, classes.justContent)}
                        >
                          <Typography variant="h6"> Type</Typography>
                          <Typography variant="h6">
                            {" "}
                            {communicationTypeSelect
                              ? communicationTypeSelect
                              : "-"}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          className={clsx(classes.flexRow, classes.justContent)}
                        >
                          <Typography variant="h6">
                            {" "}
                            Installation Date
                          </Typography>
                          <Typography variant="h6">
                            {" "}
                            {installation ? installation : "-"}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Box>
              {isLoading ? (
                <Box mt={4} width={1} display="flex" justifyContent="center">
                  <CircularProgress color="primary" />
                </Box>
              ) : (
                <>
                  <Box>
                    <Paper sx={{ width: "100%", overflow: "hidden" }}>
                      <TableContainer sx={{ maxHeight: 640 }}>
                        <Table stickyHeader aria-label="sticky table">
                          <TableHead>
                            <TableRow>
                              {columnsPoint.map((column) => (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  style={{
                                    minWidth: column.minWidth,
                                    fontSize: 18,
                                  }}
                                >
                                  {column.label}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rowsPointEdit
                              .slice(
                                pageView * rowsPerPageView,
                                pageView * rowsPerPageView + rowsPerPageView
                              )
                              .map((row) => {
                                return (
                                  <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={row.code}
                                  >
                                    <TableCell
                                      key={row.id}
                                      align="center"
                                      style={{ fontSize: 12 }}
                                    >
                                      {row.id}
                                    </TableCell>
                                    <TableCell
                                      key={row.id}
                                      align="left"
                                      style={{ fontSize: 14 }}
                                    >
                                      {row.name}
                                    </TableCell>
                                    <TableCell
                                      key={row.id}
                                      align="center"
                                      style={{ fontSize: 14 }}
                                    >
                                      {row.topic}
                                    </TableCell>
                                    <TableCell
                                      key={row.id}
                                      align="center"
                                      style={{ fontSize: 14 }}
                                    >
                                      {row.unit}
                                    </TableCell>
                                    <TableCell
                                      key={row.id}
                                      align="center"
                                      style={{ fontSize: 14 }}
                                    >
                                      {row.binding}
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      {/* <TablePagination
                        rowsPerPageOptions={[5, 10, 20]}
                        component="div"
                        count={rowsPointEdit.length}
                        rowsPerPage={rowsPerPageView}
                        page={pageView}
                        onPageChange={handleChangePageView}
                        onRowsPerPageChange={handleChangeRowsPerPageView}
                      /> */}
                    </Paper>
                  </Box>
                </>
              )}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GatewayDeviceManagement);
