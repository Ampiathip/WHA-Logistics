import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
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
  CircularProgress,
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";
import clsx from "clsx";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
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
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
// import io from "socket.io-client";

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
  inputWidth: {
    width: "100%",
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
    // width: "inherit",
    width: "150px",
    height: "150px",
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
    width: "90% !important",
    height: "90% !important",
    maxWidth: "none !important",
  },
  modalAdd: {
    width: "40% !important",
    height: "100% !important",
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
    backgroundColor: "#27963C !important",
    color: "#fff !important",
    "&:hover": {
      backgroundColor: "#27963C !important",
      boxShadow: `none`,
    },
  },
  width: {
    width: "100%",
  },
  input: {
    display: "none",
  },
  flexRowBtnModal: {
    display: "flex",
    justifyContent: "flex-end",
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
  widthRealtime: {
    width: "400px",
  },
  borderRealtime: {
    border: "1px solid #6c757d",
    padding: 5,
  },
  marginRealtime: {
    marginTop: 10,
  },
  justContentCenter: {
    justifyContent: "center",
  },
  marginTopBox: {
    marginTop: 50,
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
    label: "Device ID",
    width: 150,
  },
  {
    id: "calories",
    numeric: false,
    disablePadding: false,
    label: "Devices Name",
    width: 200,
  },
  {
    id: "fat",
    numeric: false,
    disablePadding: false,
    label: "Gateway",
    width: 200,
  },
  {
    id: "carbs",
    numeric: false,
    disablePadding: false,
    label: "Builidng",
    width: 200,
  },
  {
    id: "power",
    numeric: false,
    disablePadding: false,
    label: "Zone",
    width: 200,
  },
  {
    id: "protein",
    numeric: false,
    disablePadding: false,
    label: "Energy Total (kWh)",
    width: 220,
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "Action",
    width: 200,
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
            align={"center"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            className={classes.fontSixeHead}
            width={headCell.width}
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

const DeviceManagement = ({ t, login }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deviceId, setDeviceId] = useState("");
  const [model, setModel] = useState("");
  const [installation, setInstallation] = useState(null);
  const [deviceName, setDeviceName] = useState("");
  const [deviceBrand, setDeviceBrand] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [communicationType, setCommunicationType] = useState([]);
  const [communicationTypeSelect, setCommunicationTypeSelect] =
    useState("none");
  const [file, setFile] = useState("");
  const [billingType, setBillingType] = useState([]);
  const [billingTypeSelect, setBillingTypeSelect] = useState("none");
  const [communicationTypeView, setCommunicationTypeView] = useState("");
  const [billingTypeView, setBillingTypeView] = useState("");
  const [installationView, setInstallationView] = useState(null);

  const dispatch = useDispatch();
  const classes = useStyles();
  const sideBar = useSelector((state) => state.sidebar);
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const theme = useTheme();
  // modal //
  const [open, setOpen] = useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down("xl"));
  const fullScreenAdd = useMediaQuery(theme.breakpoints.down("lg"));
  const [openAdd, setOpenAdd] = useState(false);

  const [openView, setOpenView] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidate, setIsValidate] = useState(true);
  const [isIdEdit, setIsIdEdit] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const [rows, setRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  // const [sortedRows, setSortedRows] = useState(rows);
  const [isIdDevice, setIsIdDevice] = useState("");
  const [realtimeData, setRealtimeData] = useState();

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
      getDevice();
      getCommunicationData();
      getBillingTypeData();
    }
  }, [token]);

  useEffect(() => {
    if (openView) {
      const io = require("socket.io-client");
      // Replace with the URL of your Socket.io server
      const socket = io("http://119.59.105.226:3003/");
      // socket.emit("join chat", "hypetex/test01");
      socket.emit("join chat", isIdDevice);

      socket.on("connect", () => {
        console.log("Connected to Socket.io server");
      });

      socket.on("message recieved", (data) => {
        console.log("Received a message:", data);
        setRealtimeData(data.data);
      });
      // check close modal leave socket //
      if (!openView) {
        socket.emit("leaveRoom", isIdDevice);
        setRealtimeData("");
      }

      // Clean up the socket connection when the component unmounts
      return () => {
        socket.disconnect();
      };
    }
  }, [isIdDevice, openView, open]);

  const getDevice = async () => {
    setIsLoading(true);
    try {
      await API.connectTokenAPI(token);
      await API.myDevice().then((response) => {
        const dataPayload = response.data;
        console.log("dataPayloadmyDevice", dataPayload);
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
      // _.isEmpty(gatewayName) ||
      _.isEmpty(deviceBrand) ||
      _.isEmpty(model) ||
      _.isEmpty(serialNumber)
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
    if (file) {
      reader.readAsDataURL(file);
      try {
        reader.onload = async () => {
          const base64File = reader.result; // Extract the base64 data
          const body = {
            deviceName: deviceName,
            gatewayID: "",
            deviceBand: deviceBrand,
            model: model,
            serialNumber: serialNumber,
            installationDate: installation.format("DD-MM-YYYY"),
            communicationType: communicationTypeSelect,
            billingType_id: billingTypeSelect,
            description: "",
            file: base64File, // Include the Base64 encoded file
          };
          API.connectTokenAPI(token);
          await API.deviceRegister(body).then((response) => {
            const dataPayload = response.data;
            console.log("dataPayload", dataPayload, response);
            if (response.status === 200) {
              MySwal.fire({
                icon: "success",
                confirmButtonText: "ตกลง",
                text: dataPayload,
              });
              getDevice();
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
    } else {
      try {
        const body = {
          deviceName: deviceName,
          gatewayID: "",
          deviceBand: deviceBrand,
          model: model,
          serialNumber: serialNumber,
          installationDate: installation.format("DD-MM-YYYY"),
          communicationType: communicationTypeSelect,
          billingType_id: billingTypeSelect,
          description: "",
          file: "", // Include the Base64 encoded file
        };
        API.connectTokenAPI(token);
        await API.deviceRegister(body).then((response) => {
          const dataPayload = response.data;
          console.log("dataPayload", dataPayload, response);
          if (response.status === 200) {
            MySwal.fire({
              icon: "success",
              confirmButtonText: "ตกลง",
              text: dataPayload,
            });
            getDevice();
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
    }
  };

  const deviceUpdate = async (rowId) => {
    setIsLoading(true);
    let reader = new window.FileReader();
    if (file) {
      reader.readAsDataURL(file);
      try {
        reader.onload = async () => {
          const base64File = reader.result; // Extract the base64 data
          const body = {
            deviceName: deviceName,
            gatewayID: "",
            deviceBand: deviceBrand,
            model: model,
            serialNumber: serialNumber,
            installationDate: installation.format("DD-MM-YYYY"),
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
              getDevice();
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
    } else {
      try {
        const body = {
          deviceName: deviceName,
          gatewayID: "",
          deviceBand: deviceBrand,
          model: model,
          serialNumber: serialNumber,
          installationDate: installation.format("DD-MM-YYYY"),
          communicationType: communicationTypeSelect,
          billingType_id: billingTypeSelect,
          description: "",
          file: "", // Include the Base64 encoded file
        };
        API.connectTokenAPI(token);
        await API.deviceUpdate(rowId, body).then((response) => {
          const dataPayload = response.data;
          // console.log("dataPayload", dataPayload, response);
          if (response.status === 200) {
            MySwal.fire({
              icon: "success",
              confirmButtonText: "ตกลง",
              text: dataPayload,
            });
            getDevice();
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
            console.log("9999=======item", item);
            const dateMoment = moment(item.installation_date);
            setDeviceId(item.id);
            setInstallation(dateMoment);
            setInstallationView(item.installation_date);
            setModel(item.model);
            setDeviceName(item.name);
            setDeviceBrand(item.band);
            setSerialNumber(item.serial_number);
            setBillingTypeSelect(
              item.billing_type &&
                billingType.find((f) => f.type === item.billing_type).id
            );
            setBillingTypeView(item.billing_type);
            setCommunicationTypeSelect(
              item.communication &&
                communicationType.find(
                  (f) => f.communication === item.communication
                ).id
            );
            setCommunicationTypeView(item.communication);
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

  const deviceDelete = async (id) => {
    setIsLoading(true);
    try {
      await API.connectTokenAPI(token);
      await API.deviceDelete(id).then((response) => {
        const dataPayload = response.data;
        if (response.status === 200) {
          getDevice();
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

  const handleClickOpen = (e, id) => {
    setOpen(true);
    setIsIdEdit(id);
    deviceView(id);
  };

  const handleClickOpenView = (e, id) => {
    setOpenView(true);
    setIsIdDevice(id);
    deviceView(id);
  };

  const realtimeDataView = async (id) => {
    setIsLoading(true);
    try {
      API.connectTokenAPI(token);
      await API.realtimeData(id).then((response) => {
        const dataPayload = response.data;
        console.log("dataPayload", response, dataPayload);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
      const response = error.response;
      swalFire(response.data);
      setIsLoading(false);
    }
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

  const sortedRows = useMemo(
    () => stableSort(rows, getComparator(order, orderBy)),
    [order, orderBy, rows]
  );

  const visibleRows = useMemo(
    () =>
      sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage, sortedRows]
  );

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
    setIsValidate(true);
    setBillingTypeSelect("none");
    setCommunicationTypeSelect("none");
    setDeviceBrand("");
    setDeviceName("");
    // setGatewayName("");
    setModel("");
    setSerialNumber("");
    setInstallation(null);
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

  const handleDeviceBrand = (event) => {
    setDeviceBrand(event.target.value);
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

  const handleInstallation = (value) => {
    setInstallation(value);
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
      getDevice();
    }
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
      getDevice();
    }
  };

  return (
    <Box className={classes.marginRow}>
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
                // id="input-with-icon-textfield"
                size="small"
                placeholder={t("diveices:search")}
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
                // onClick={handleClickOpenAdd}
                autoFocus
                // fullWidth
                className={clsx(classes.backGroundConfrim, classes.width)}
                variant="outlined"
              >
                {t("diveices:add")}
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

                      console.log("=======row", row);

                      return (
                        <TableRow
                          hover
                          onClick={(event) =>
                            handleClick(event, row.device_name)
                          }
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.device_name}
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
                            {row.device_id}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classes.fontSixeCell}
                          >
                            {row.device_name}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classes.fontSixeCell}
                          >
                            {row.gateway_name}
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
                            {row.zone}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classes.fontSixeCell}
                          >
                            {row.data}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classes.fontSixeCell}
                          >
                            {/* <img
                              src={IconDocument}
                              alt="IconDocument"
                              onClick={(event) => {
                                openPageZoneDetail(event, row.id);
                                handleDetailZone(event, row);
                              }}
                            /> */}

                            <img
                              src={IconShow}
                              alt="IconShow"
                              onClick={(event) => {
                                handleClickOpenView(event, row.device_id);
                              }}
                            />

                            {/* <img
                              src={IconSetting}
                              alt="IconSetting"
                              onClick={(event) => {
                                handleClickOpen(event, row.device_id);
                              }}
                            /> */}
                            <img
                              src={IconDelete}
                              alt="IconDelete"
                              onClick={(event) => {
                                handleClickDeleteData(event, row.device_id);
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

      {/* Modal Edit */}
      <Dialog
        fullScreen={fullScreenAdd}
        // className={classes.modalWidth}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        classes={{
          paper: classes.modalAdd,
        }}
      >
        <DialogTitle id="responsive-dialog-title" className="mt-3">
          <Typography variant="h3">{t("gateway:EditDevice")}</Typography>
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
          {/* <Grid item md={12}>
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
              disabled={true}
              onChange={handleGatewayName}
              error={_.isEmpty(gatewayName) && !isValidate}
            />
            {_.isEmpty(gatewayName) && !isValidate && (
              <Validate errorText={"กรุณาระบุข้อมูล"} />
            )}
          </Grid> */}
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  className={classes.width}
                  value={installation}
                  onChange={(newValue) => handleInstallation(newValue)}
                  format="DD-MM-YYYY"
                  slotProps={{
                    textField: {
                      error: _.isEmpty(installation) && !isValidate,
                    },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            {_.isNull(installation) && !isValidate && (
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
                <MenuItem value="none" disabled>
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
                <MenuItem value="none" disabled>
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
            {/* {_.isEmpty(imagePreviewUrl) && !isValidate && (
              <Validate errorText={"กรุณาระบุข้อมูล"} />
            )} */}
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
                onClick={() => handleValidate("edit")}
              >
                {t("building:btnSave")}
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

      {/* Modal Add */}
      <Dialog
        fullScreen={fullScreenAdd}
        // className={classes.modalWidth}
        open={openAdd}
        onClose={handleCloseAdd}
        aria-labelledby="responsive-dialog-title"
        classes={{
          paper: classes.modalAdd,
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
          {/* <Grid item md={12}>
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
              disabled={true}
              onChange={handleGatewayName}
              error={_.isEmpty(gatewayName) && !isValidate}
            />
            {_.isEmpty(gatewayName) && !isValidate && (
              <Validate errorText={"กรุณาระบุข้อมูล"} />
            )}
          </Grid> */}
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  className={classes.width}
                  value={installation}
                  onChange={(newValue) => handleInstallation(newValue)}
                  format="DD-MM-YYYY"
                  slotProps={{
                    textField: {
                      error: _.isEmpty(installation) && !isValidate,
                    },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            {_.isNull(installation) && !isValidate && (
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
                <MenuItem value="none" disabled>
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
                <MenuItem value="none" disabled>
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
            {/* {_.isEmpty(imagePreviewUrl) && !isValidate && (
              <Validate errorText={"กรุณาระบุข้อมูล"} />
            )} */}
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

      {/* Modal View */}

      <Dialog
        fullScreen={fullScreen}
        // className={classes.modalWidth}
        open={openView}
        onClose={handleCloseView}
        aria-labelledby="responsive-dialog-title"
        classes={{
          paper: classes.modalWidth,
        }}
      >
        <DialogTitle
          id="responsive-dialog-title"
          className={clsx(
            classes.flexRow,
            classes.justContent,
            classes.borderBottom
          )}
        >
          <Typography variant="h5">
            <WestOutlinedIcon
              className={clsx(classes.marginIcon, classes.cursor)}
              onClick={handleCloseView}
            />
            {t("diveices:realtime")}
          </Typography>
          <CloseIcon
            onClick={handleCloseView}
            className={clsx(classes.cursor)}
          />
        </DialogTitle>
        <DialogContent
          className={clsx(
            classes.flexRow,
            classes.modalContent,
            classes.paddingContent
          )}
        >
          {isLoading ? (
            <Box mt={4} width={1} display="flex" justifyContent="center">
              <CircularProgress color="primary" />
            </Box>
          ) : (
            <>
              <Box className="mt-3">
                <Grid item md={12}>
                  <Grid item md={5} className={classes.marginIcon}>
                    <img
                      src={imagePreviewUrl}
                      alt="img-upload"
                      width={150}
                      className={classes.imgWidth}
                    />
                  </Grid>
                </Grid>
                <Grid item md={12} className={clsx(classes.marginRow)}>
                  <Typography variant="h6"> Device ID</Typography>
                  <Grid item className="mt-2">
                    <Typography variant="body1">
                      {deviceId ? deviceId : "-"}{" "}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item md={12} className={clsx(classes.marginRow)}>
                  <Typography variant="h6"> Device name</Typography>
                  <Grid item className="mt-2">
                    <Typography variant="body1">
                      {deviceName ? deviceName : "-"}{" "}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item md={12} className={clsx(classes.marginRow)}>
                  <Typography variant="h6"> Brand</Typography>
                  <Grid item className="mt-2">
                    <Typography variant="body1">
                      {deviceBrand ? deviceBrand : "-"}{" "}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item md={12} className={clsx(classes.marginRow)}>
                  <Typography variant="h6"> Model</Typography>
                  <Grid item className="mt-2">
                    <Typography variant="body1">
                      {model ? model : "-"}{" "}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item md={12} className={clsx(classes.marginRow)}>
                  <Typography variant="h6"> Communication Type</Typography>
                  <Grid item className="mt-2">
                    <Typography variant="body1">
                      {communicationTypeView ? communicationTypeView : "-"}{" "}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item md={12} className={clsx(classes.marginRow)}>
                  <Typography variant="h6"> Billing Type</Typography>
                  <Grid item className="mt-2">
                    <Typography variant="body1">
                      {billingTypeView ? billingTypeView : "-"}{" "}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item md={12} className={clsx(classes.marginRow)}>
                  <Typography variant="h6"> Installation Date</Typography>
                  <Grid item className="mt-2">
                    <Typography variant="body1">
                      {installationView ? installationView : "-"}{" "}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Box
                className={clsx(classes.backgroundBox, classes.widthRealtime)}
              >
                <Grid item md={12} className={classes.paddingRowHead}>
                  <Typography variant="h5">{t("diveices:realtime")}</Typography>
                </Grid>

                <Grid
                  item
                  md={12}
                  className={clsx(classes.paddingRow, classes.marginRow)}
                >
                  {realtimeData &&
                    realtimeData.length > 0 &&
                    realtimeData.map((item) => {
                      return (
                        <Grid
                          item
                          md={12}
                          className={clsx(
                            classes.flexRow,
                            classes.marginRealtime,
                            classes.alignItem
                          )}
                        >
                          <Grid
                            item
                            md={6}
                            className={clsx(
                              classes.borderRealtime,
                              classes.marginIcon
                            )}
                          >
                            {item.point}
                          </Grid>
                          <Grid
                            item
                            md={6}
                            className={clsx(
                              classes.borderRealtime,
                              classes.textCenter
                            )}
                          >
                            {item.data}
                          </Grid>
                        </Grid>
                      );
                    })}
                </Grid>
              </Box>
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

export default connect(mapStateToProps, mapDispatchToProps)(DeviceManagement);
