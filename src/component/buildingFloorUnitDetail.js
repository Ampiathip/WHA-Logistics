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
  RadioGroup,
  Radio,
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
  displayBlock: {
    display: "block",
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
    label: "Unit Number",
  },
  {
    id: "calories",
    numeric: false,
    disablePadding: false,
    label: "Unit Name",
  },
  {
    id: "fat",
    numeric: false,
    disablePadding: false,
    label: "Unit Description",
  },
  {
    id: "carbs",
    numeric: false,
    disablePadding: false,
    label: "Unit Type",
  },
  {
    id: "power",
    numeric: false,
    disablePadding: false,
    label: "Building",
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
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [floorName, setFloorName] = useState("");
  const [descriptionUnit, setDescriptionUnit] = useState("");
  const [price, setPrice] = useState("");
  const [gatewayMeter, setGatewayMeter] = useState("none");
  const [gatewayMeterTwo, setGatewayMeterTwo] = useState("none");
  const [gatewayMeterThree, setGatewayMeterThree] = useState("none");
  const [billingType, setBillingType] = useState([]);
  const [billingTypeSelect, setBillingTypeSelect] = useState("none");
  const [unitNumber, setUnitNumber] = useState("");
  const [unitName, setUnitName] = useState("");
  const [unitTypeSelect, setUnitTypeSelect] = useState("none");
  const [description, setDescription] = useState("");
  const [building, setBuilding] = useState("");
  const [zone, setZone] = useState("");
  const [unitType, setUnitType] = useState([]);
  const [unitPrice, setUnitPrice] = useState("");
  const [bahtType, setBahtType] = useState([
    {
      id: 1,
      name: "Baht",
    },
    {
      id: 2,
      name: "Dollar",
    },
  ]);
  const [bahtTypeSelect, setBahtTypeSelect] = useState("none");
  const [generalSelect, setGeneralSelect] = useState("none");

  const dispatch = useDispatch();
  const classes = useStyles();
  const sideBar = useSelector((state) => state.sidebar);
  const token = useSelector((state) => state.token);
  const theme = useTheme();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { buildingId, id } = state;
  // modal //
  const [open, setOpen] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const fullScreenEdit = useMediaQuery(theme.breakpoints.down("xl"));
  const [openAdd, setOpenAdd] = useState(false);
  const [file, setFile] = useState(null);
  const [openView, setOpenView] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [isValidate, setIsValidate] = useState(true);
  const [isIdEdit, setIsIdEdit] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const [rowsPointEdit, setRowsPointEdit] = useState([]);
  const [gatewayData, setGatewayData] = useState([]);
  const [deviceData, setDeviceData] = useState([]);
  const [pointData, setPointData] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  // const [sortedRows, setSortedRows] = useState(rows);
  const [gatewayDataSelect, setGatewayDataSelect] = useState("");
  const [deviceDataSelect, setDeviceDataSelect] = useState("");
  const [pointDataSelect, setPointDataSelect] = useState("");
  // const [editMeasurement, setEditMeasurement] = useState(null);
  // const [disabledFild, setDisabledFild] = useState(null);

  const [nameBox, setNameBox] = useState("");
  const [rowsUnitPriceEdit, setRowsUnitPriceEdit] = useState([]);
  const [measurementList, setMeasurementList] = useState([]);
  const [measurementSelect, setMeasurementSelect] = useState("");

  const [bllingTypeList, setBllingTypeList] = useState([]);
  const [bllingTypeSelect, setBllingTypeSelect] = useState("none");
  const [bllingTypeSelectName, setBllingTypeSelectName] = useState("none");
  const [bllingCost, setBllingCost] = useState(0);
  const [bllingOnPeak, setBllingOnPeak] = useState(0);
  const [bllingOffPeak, setBllingOffPeak] = useState(0);
  const [bllingServiceCharge, setBllingServiceCharge] = useState("");
  const [bllingTypeId, setBllingTypeSelectId] = useState("none");
  const [unitBillingType, setUnitBillingType] = useState("");
  const [unitBillingTypeList, setUnitBillingTypeList] = useState([]);
  const [unitBillingTypeName, setUnitBillingTypeName] = useState("");

  // console.log("ididid====", state, id);
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
    if (!_.isEmpty(token) && id !== null) {
      getUnitList(id);
      getUnitTypeList();
    }
    console.log("token", token, login);
  }, [token]);

  useEffect(() => {
    dispatch(checkToken());
    if (!_.isEmpty(token)) {
      getGateway();
      getBillingTypeData();
      getMeasurementTypeData();
      getUnitBillingTypeData();
    }
  }, [token]);

  const getGateway = async () => {
    setIsLoading(true);
    try {
      await API.connectTokenAPI(token);
      await API.getGatewayData().then((response) => {
        const dataPayload = response.data;
        setGatewayData(dataPayload);
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

  // get getBillingTypeData //
  const getBillingTypeData = async () => {
    setIsLoading(true);
    try {
      await API.connectTokenAPI(token);
      await API.getBillingTypeData().then((response) => {
        const dataPayload = response.data;
        console.log("#Nan vvvvvv", dataPayload);
        setBllingTypeList(dataPayload);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
      const response = error.response;
      swalFire(response.data);
      setIsLoading(false);
    }
  };

  // get getMeasurementTypeData //
  const getMeasurementTypeData = async () => {
    setIsLoading(true);
    try {
      await API.connectTokenAPI(token);
      await API.getMeasurementTypeData().then((response) => {
        const dataPayload = response.data;
        // console.log("#Nan vvvvvv", dataPayload);
        setMeasurementList(dataPayload);
        dataPayload.map((item, index) => {
          if (index === 0) {
            setMeasurementSelect(item.id);
          }
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

  // get getUnitBillingTypeData //
  const getUnitBillingTypeData = async () => {
    setIsLoading(true);
    try {
      await API.connectTokenAPI(token);
      await API.getUnitBillingTypeData().then((response) => {
        const dataPayload = response.data;
        console.log("#Nan dataPayload", dataPayload);
        setUnitBillingTypeList(dataPayload);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
      const response = error.response;
      swalFire(response.data);
      setIsLoading(false);
    }
  };

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

  // get Unit Type //
  const getUnitTypeList = async () => {
    setIsLoading(true);
    try {
      await API.connectTokenAPI(token);
      await API.getUnitTypeList().then((response) => {
        const dataPayload = response.data;
        setUnitType(dataPayload);
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
        // _.isEmpty(unitNumber) ||
        _.isEmpty(unitName) ||
        _.isEmpty(description) ||
        !unitTypeSelect
      ) {
        isValidate = false;
      }
      setIsValidate(isValidate);
    } else {
      if (
        _.isEmpty(unitNumber) ||
        _.isEmpty(unitName) ||
        _.isEmpty(description) ||
        !unitTypeSelect
      ) {
        isValidate = false;
      }
      console.log("isValidate", isValidate);
      setIsValidate(isValidate);
    }

    if (isValidate) {
      if (type === "edit") {
        unitUpdate(isIdEdit);
      } else {
        unitRegister();
      }
    }
  };

  const unitRegister = async () => {
    setIsLoading(true);
    let reader = new window.FileReader();
    if (file) {
      reader.readAsDataURL(file);
      try {
        reader.onload = async () => {
          const base64File = reader.result;
          const body = {
            unit: unitName,
            floor_id: id,
            description: description,
            type_id: unitTypeSelect,
            file: base64File,
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
          unit: unitName,
          floor_id: id,
          description: description,
          type_id: unitTypeSelect,
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
    }
  };

  const unitUpdate = async (rowId) => {
    setIsLoading(true);
    let reader = new window.FileReader();
    if (file) {
      reader.readAsDataURL(file);
      try {
        reader.onload = async () => {
          const base64File = reader.result;
          const body = {
            unit: unitName,
            description: description,
            type_id: unitTypeSelect,
            file: base64File,
            fileOld: "",
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
              handleCloseModalEdit();
            }
            setIsLoading(false);
          });
        };
      } catch (error) {
        console.log(error);
        const response = error.response;
        swalFire(response.data);
        handleCloseModalEdit();
        setIsLoading(false);
      }
    } else {
      try {
        const body = {
          unit: unitName,
          description: description,
          type_id: unitTypeSelect,
          file: "",
          fileOld: "",
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
            handleCloseModalEdit();
          }
          setIsLoading(false);
        });
      } catch (error) {
        console.log(error);
        const response = error.response;
        swalFire(response.data);
        handleCloseModalEdit();
        setIsLoading(false);
      }
    }
  };

  const getUnitView = async (id) => {
    setIsLoading(true);
    try {
      await API.connectTokenAPI(token);
      await API.getUnitView(id).then((response) => {
        const dataPayload = response.data;
        // console.log("dataPayload", response, dataPayload);
        dataPayload.length > 0 &&
          dataPayload.map((item) => {
            console.log("==========View", item);
            setUnitName(item.unit);
            setUnitNumber(item.id);
            setDescription(item.description);
            setUnitTypeSelect(
              item.type_id ? unitType.find((f) => f.id === item.type_id).id : ""
            );
            setImagePreviewUrl(item.file);
            setBuilding(item.name);
            setZone(item.zone);
            setFloorName(item.floor);
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

  // const getUnitPointData = async (id) => {
  //   setIsLoading(true);
  //   try {
  //     await API.connectTokenAPI(token);
  //     await API.getUnitPointData(id).then(async (response) => {
  //       let dataPayload = response?.data;
  //       dataPayload.forEach(async (item) => {
  //         item.device_list = await getDevice(item.gateway_id);
  //         item.point_list = await getPointData(item.device_id);
  //         // setDeviceData(await getDevice(item.gateway_id));
  //         // setPointData(await getPointData(item.device_id));
  //       });
  //       // dataPayload.length > 0
  //       //   ? (dataPayload = await dataPayload.map(async (item) => {
  //       //       console.log("==========UnitPoint", item);
  //       //       // let device = [];
  //       //       item.device_list = await getDevice(item.gateway_id);
  //       //       // item.device_list = [1,2,3];
  //       //       return item;
  //       //       // getPointData(item.device_id);
  //       //       // setGatewayDataSelect(item.gateway_id);
  //       //       // setDeviceDataSelect(item.device_id);
  //       //       // setPointDataSelect(item.point_id);
  //       //       // console.log("deviceDataSelect", deviceDataSelect);
  //       //     }))
  //       //   : (dataPayload = []);
  //       console.log("dataPayload", response, dataPayload);
  //       setRowsPointEdit(dataPayload);
  //       setIsLoading(false);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     const response = error.response;
  //     swalFire(response?.data);
  //     setIsLoading(false);
  //   }
  // };

  const getUnitPointData = async (id, measurementSelect) => {
    // setIsLoading(true);
    let list = [];
    try {
      API.connectTokenAPI(token);
      await API.getUnitPointData(id, measurementSelect).then(
        async (response) => {
          let dataPayload = response?.data;
          dataPayload.forEach(async (item) => {
            item.device_list = await getDevice(item.gateway_id);
            item.point_list = await getPointData(item.device_id);
            // setDeviceData(await getDevice(item.gateway_id));
            // setPointData(await getPointData(item.device_id));
          });
          console.log("dataPayload", response, dataPayload);
          // setRowsPointEdit(dataPayload);
          // setIsLoading(false);
          list = dataPayload;
        }
      );
    } catch (error) {
      console.log(error);
      return error.response;
      // const response = error.response;
      // swalFire(response?.data);
      // setIsLoading(false);
    }
    return list;
  };

  const getGeneralExpensesUnitData = async (unitId, measurementId) => {
    // setIsLoading(true);
    let list = [];
    try {
      API.connectTokenAPI(token);
      await API.getGeneralExpensesUnitData(unitId, measurementId).then(
        async (response) => {
          let dataPayload = response?.data;
          console.log("#Nan dataPayload", response, dataPayload);
          list = dataPayload;
        }
      );
    } catch (error) {
      console.log(error);
      return error.response;
      // const response = error.response;
      // swalFire(response?.data);
      // setIsLoading(false);
    }
    return list;
  };

  const getUpdateData = async (id) => {
    const data = await getUnitPointData(id, measurementSelect);
    setRowsPointEdit(data);
  };

  const getUpdateDataGeneralExpensesUnit = async (id) => {
    const data = await getGeneralExpensesUnitData(id, measurementSelect);
    setRowsUnitPriceEdit(data);
  };

  const getUpdateRow = async (id, index, rowId) => {
    const data = await getUnitPointData(id, measurementSelect);
    const foundData = data.find((f) => f.id === rowId);
    const updatedRows = [...rowsPointEdit];
    updatedRows[index] = foundData;
    console.log("foundData", foundData);
    // Update the state with the new array
    setRowsPointEdit(updatedRows);
  };

  const getUpdateRowGeneralExpensesUnit = async (id, index, rowId) => {
    const data = await getGeneralExpensesUnitData(id, measurementSelect);
    const foundData = data.find((f) => f.id === rowId);
    const updatedRows = [...rowsUnitPriceEdit];
    updatedRows[index] = foundData;
    console.log("#Nan ==foundData", foundData, data, id);
    // Update the state with the new array
    setRowsUnitPriceEdit(updatedRows);
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

  const sortedRows = useMemo(
    () => stableSort(rows, getComparator(order, orderBy)),
    [order, orderBy, rows]
  );

  const visibleRows = useMemo(
    () =>
      sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage, sortedRows]
  );

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
    setUnitTypeSelect(event.target.value);
  };

  const handleBathGeneral = (event) => {
    setGeneralSelect(event.target.value);
  };

  const handleBath = (event) => {
    setBahtTypeSelect(event.target.value);
  };

  const getBillingBillingView = async (buildingId, measurementSelect) => {
    setIsLoading(true);
    try {
      API.connectTokenAPI(token);
      await API.getBillingUnit(buildingId, measurementSelect).then(
        (response) => {
          const dataPayload = response.data;
          // console.log("#Nan dataPayload", response, dataPayload);
          dataPayload.length > 0 &&
            dataPayload.map((item) => {
              console.log("#Nan 9999=======item", item);
              setBllingTypeSelectId(item.id);
              setBllingTypeSelect(item.billing_type_id);
              setBllingTypeSelectName(item.billing_type);
              setBllingOnPeak(item.on_peak);
              setBllingOffPeak(item.off_peak);
              setBllingServiceCharge(item.service_charge);
              setBllingCost(item.cost);
              setUnitBillingType(item.unit_billing_type_id);
              setUnitBillingTypeName(item.unit_billing_type);
            });
          setIsLoading(false);
        }
      );
    } catch (error) {
      console.log(error);
      const response = error.response;
      swalFire(response.data);
      setIsLoading(false);
    }
  };

  const handleClickOpen = async (event, id) => {
    setOpen(true);
    getUnitView(id);
    setIsIdEdit(id);
    setIsValidate(true);
    const data = await getUnitPointData(id, measurementSelect);
    setRowsPointEdit(data);

    getBillingBillingView(id, measurementSelect);

    const dataGeneralUnit = await getGeneralExpensesUnitData(
      id,
      measurementSelect
    );

    console.log("#Nan dataGeneralUnit", dataGeneralUnit, isIdEdit);
    setRowsUnitPriceEdit(dataGeneralUnit);
    // setDisabledFild(true);
    // setEditMeasurement(null);
  };

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
    setIsValidate(true);
    setUnitName("");
    setUnitNumber("");
    setDescription("");
    setUnitTypeSelect("none");
    setImagePreviewUrl("");
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleOpenView = (event, id) => {
    setOpenView(true);
    getUnitView(id);
    setIsIdEdit(id);
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

  // add row Edit //
  const addNewRow = () => {
    const newRow = {
      id: null,
      unit_id: "",
      gateway_id: null,
      device_id: null,
      point_id: null,
      device_list: [],
      point_list: [],
      isEdit: true,
    };
    // Create a copy of the existing rowsPointEdit array
    const updatedRows = [...rowsPointEdit];

    // Add the new row to the array
    updatedRows.push(newRow);

    // Update the state with the new array
    setRowsPointEdit(updatedRows);
    // setDisabledFild(false);
    // setEditMeasurement();
  };

  // addNewRowUnitPrice //
  const addNewRowUnitPrice = () => {
    const newRow = {
      id: null,
      description: "",
      cost: "",
      generalSelect: null,
      isEdit: true,
    };

    const updatedRows = [...rowsUnitPriceEdit];
    updatedRows.push(newRow);
    setRowsUnitPriceEdit(updatedRows);
  };

  const handleGatewayMeterThree = (e, row, index) => {
    const newValue = e.target.value;
    const updatedRows = [...rowsPointEdit];
    updatedRows[index].point_id = newValue;
    // Update the state with the new array
    setRowsPointEdit(updatedRows);
    setGatewayMeterThree(newValue);
  };

  const handleGatewayMeterTwo = async (e, row, index) => {
    const newValue = e.target.value;
    // Create a copy of the existing rowsPointEdit array
    const updatedRows = [...rowsPointEdit];
    // Update the device_id of the specific row at the given index
    updatedRows[index].device_id = newValue;
    // Update the state with the new array
    updatedRows[index].point_list = await getPointData(newValue);
    setRowsPointEdit(updatedRows);
    // getPointData(newValue);
    setGatewayMeterTwo(newValue);
  };

  const handleGatewayMeter = async (e, row, index) => {
    const newValue = e.target.value;
    // Create a copy of the existing rowsPointEdit array
    const updatedRows = [...rowsPointEdit];
    // Update the device_id of the specific row at the given index
    updatedRows[index].gateway_id = newValue;
    // Update the state with the new array
    updatedRows[index].device_list = await getDevice(newValue);
    setRowsPointEdit(updatedRows);
    // getDevice(newValue);
    setGatewayMeter(newValue);
  };

  const handleDescriptionUnit = (event, item, index) => {
    setDescriptionUnit(event.target.value);
    const newValue = event.target.value;
    // Create a copy of the existing rowsPointEdit array
    const updatedRows = [...rowsUnitPriceEdit];
    // Update the device_id of the specific row at the given index
    updatedRows[index].description = newValue;
    // Update the state with the new array
    setRowsUnitPriceEdit(updatedRows);
  };

  const handlePrice = (event, item, index) => {
    setPrice(event.target.value);
    const newValue = event.target.value;
    const updatedRows = [...rowsUnitPriceEdit];
    updatedRows[index].cost = newValue;
    // Update the state with the new array
    setRowsUnitPriceEdit(updatedRows);
  };

  const getDevice = async (id) => {
    // setIsLoading(true);
    try {
      await API.connectTokenAPI(token);
      return await API.getDeviceData(id).then((response) => {
        const dataPayload = response.data;
        console.log("dataPayload====device", dataPayload);
        // setDeviceData(dataPayload);
        return dataPayload;
        // setDeviceData(dataPayload);
        // setIsLoading(false);
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

  // get Points //
  const getPointData = async (id, type) => {
    // setIsLoading(true);
    try {
      await API.connectTokenAPI(token);
      return await API.getPointData(id).then((response) => {
        const dataPayload = response.data;
        console.log("dataPayload====Point", dataPayload);
        // setPointData(dataPayload);
        return dataPayload;
        // setIsLoading(false);
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

  // add unit point //
  const addUnitPoint = async () => {
    setIsLoading(true);
    setOpen(false);
    try {
      let body = [];
      rowsPointEdit.length > 0 &&
        rowsPointEdit.forEach((row) => {
          // ตรวจสอบว่า row.new_point_id ไม่ซ้ำกับค่าใน body
          // const isUnique = !body.some(
          //   (data) => row.id === null
          // );

          if (!row.id) {
            const data = {
              unit_id: isIdEdit,
              gateway_id: row.gateway_id,
              device_id: row.device_id,
              point_id: row.point_id,
              measurement_type_id: measurementSelect,
            };
            body.push(data);
          }
        });
      console.log("body====", body);
      API.connectTokenAPI(token);
      await API.unitPointRegister(body).then((response) => {
        const dataPayload = response.data;
        console.log("dataPayload====Point", dataPayload, response);
        if (response.status === 200) {
          MySwal.fire({
            icon: "success",
            confirmButtonText: "ตกลง",
            text: dataPayload,
          }).then((result) => {
            if (result.isConfirmed) {
              getUpdateData(isIdEdit);
              setOpen(true);
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

  // addGeneralExpensesUnit //
  const addGeneralExpensesUnit = async () => {
    setIsLoading(true);
    setOpen(false);
    try {
      let body = [];
      rowsUnitPriceEdit.length > 0 &&
        rowsUnitPriceEdit.forEach((row) => {
          // ตรวจสอบว่า row.new_point_id ไม่ซ้ำกับค่าใน body
          // const isUnique = !body.some(
          //   (data) => row.id === null
          // );

          if (!row.id) {
            const data = {
              unit_id: isIdEdit,
              measurement_type_id: measurementSelect,
              description: row.description,
              cost: row.cost,
            };
            body.push(data);
          }
        });
      console.log("body====", body);
      API.connectTokenAPI(token);
      await API.generalExpensesUnitRegister(body).then((response) => {
        const dataPayload = response.data;
        console.log("dataPayload====Point", dataPayload, response);
        if (response.status === 200) {
          MySwal.fire({
            icon: "success",
            confirmButtonText: "ตกลง",
            text: dataPayload,
          }).then((result) => {
            if (result.isConfirmed) {
              getUpdateDataGeneralExpensesUnit(isIdEdit);
              setOpen(true);
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

  const addBillingBillingUpdate = async (bllingId) => {
    setIsLoading(true);
    setOpen(false);
    try {
      const body = {
        billingTypeID: bllingTypeSelect,
        unitBillingTypeID: unitBillingType,
        cost: bllingCost,
        onPeak: bllingOnPeak,
        offPeak: bllingOffPeak,
        serviceCharge: bllingServiceCharge,
      };
      console.log("body====", body);
      API.connectTokenAPI(token);
      await API.billingUnitUpdate(bllingId, body).then((response) => {
        const dataPayload = response.data;
        console.log("dataPayload====Point", dataPayload, response);
        if (response.status === 200) {
          MySwal.fire({
            icon: "success",
            confirmButtonText: "ตกลง",
            text: dataPayload,
          }).then((result) => {
            if (result.isConfirmed) {
              getBillingBillingView(isIdEdit, measurementSelect);
              setOpen(true);
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

  // delete row Edit //

  const unitPointDelete = async (rowId) => {
    setIsLoading(true);
    setOpen(false);
    try {
      await API.connectTokenAPI(token);
      await API.unitPointDelete(rowId).then((response) => {
        const dataPayload = response.data;
        if (response.status === 200) {
          MySwal.fire({
            icon: "success",
            confirmButtonText: "ตกลง",
            text: dataPayload,
          }).then((result) => {
            if (result.isConfirmed) {
              getUpdateData(isIdEdit);
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

  const handleDeleteMeasurement = (event, id) => {
    setOpen(false);
    MySwal.fire({
      icon: "warning",
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
      showCancelButton: true,
      text: "คุณต้องการลบข้อมูลหรือไม่",
    }).then((result) => {
      if (result.isConfirmed) {
        unitPointDelete(id);
      } else if (result.isDismissed) {
        setIsLoading(false);
      }
    });
  };

  // delete row generalExpensesUnitDelete //
  const generalExpensesUnitDelete = async (rowId) => {
    setIsLoading(true);
    setOpen(false);
    try {
      await API.connectTokenAPI(token);
      await API.generalExpensesUnitDelete(rowId).then((response) => {
        const dataPayload = response.data;
        if (response.status === 200) {
          MySwal.fire({
            icon: "success",
            confirmButtonText: "ตกลง",
            text: dataPayload,
          }).then((result) => {
            if (result.isConfirmed) {
              getUpdateDataGeneralExpensesUnit(isIdEdit);
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

  const handleDeleteGeneralExpensesUnit = (event, id) => {
    setOpen(false);
    MySwal.fire({
      icon: "warning",
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
      showCancelButton: true,
      text: "คุณต้องการลบข้อมูลหรือไม่",
    }).then((result) => {
      if (result.isConfirmed) {
        generalExpensesUnitDelete(id);
      } else if (result.isDismissed) {
        setIsLoading(false);
      }
    });
  };

  const handleGeneralExpensesUnitUpdate = async (event, row, index) => {
    setIsLoading(true);
    setOpen(false);
    try {
      // let body = [];
      // const idToMatch = row.id; // Replace with the actual ID you want to match
      // const updatedRow = rowsPointEdit.find((item) => item.id === idToMatch);
      const data = {
        description: row.description,
        cost: row.cost,
      };
      // body.push(data);
      console.log("rowsPointEdit", row);
      // console.log("body", body);
      await API.connectTokenAPI(token);
      await API.generalExpensesUnitUpdate(row.id, data).then((response) => {
        const dataPayload = response.data;
        if (response.status === 200) {
          MySwal.fire({
            icon: "success",
            confirmButtonText: "ตกลง",
            text: dataPayload,
          }).then((result) => {
            if (result.isConfirmed) {
              getUpdateRowGeneralExpensesUnit(isIdEdit, index, row.id);
              setOpen(true);
              handleEditMeasurementUnit(row, index, false);
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

  // edit row Edit //

  const handleUpdateMeasurement = async (event, row, index) => {
    setIsLoading(true);
    setOpen(false);
    try {
      let body = [];
      // const idToMatch = row.id; // Replace with the actual ID you want to match
      // const updatedRow = rowsPointEdit.find((item) => item.id === idToMatch);
      const data = {
        gateway_id: row.gateway_id,
        device_id: row.device_id,
        point_id: row.point_id,
      };
      body.push(data);
      console.log("rowsPointEdit", row);
      console.log("body", body);
      await API.connectTokenAPI(token);
      await API.unitPointUpdate(row.id, body).then((response) => {
        const dataPayload = response.data;
        if (response.status === 200) {
          MySwal.fire({
            icon: "success",
            confirmButtonText: "ตกลง",
            text: dataPayload,
          }).then((result) => {
            if (result.isConfirmed) {
              getUpdateRow(isIdEdit, index, row.id);
              setOpen(true);
              handleEditMeasurement(row, index, false);
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

  const handleEditMeasurement = async (row, index, isEdit = true) => {
    const updatedRows = [...rowsPointEdit];
    // Update the device_id of the specific row at the given index
    updatedRows[index].isEdit = isEdit;
    // Update the state with the new array
    setRowsPointEdit(updatedRows);
  };

  const handleEditMeasurementUnit = async (row, index, isEdit = true) => {
    const updatedRows = [...rowsUnitPriceEdit];
    // Update the device_id of the specific row at the given index
    updatedRows[index].isEdit = isEdit;
    // Update the state with the new array
    setRowsUnitPriceEdit(updatedRows);
  };

  const openPageFloorDetail = (event, id) => {
    // navigate("/buildingFloorDetail");
    navigate("/buildingFloorDetail", { state: { buildingId: id } });
  };

  const handleCloseView = () => {
    setOpenView(false);
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
      getUnitList(id);
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
      getUnitList(id);
    }
  };

  const handleBoxIcon = async (event, name, index) => {
    console.log("#Nan 888888888", name, index);
    setMeasurementSelect(name.id);
    getBillingBillingView(isIdEdit, name.id);
    const data = await getUnitPointData(isIdEdit, name.id);
    setRowsPointEdit(data);
    const dataGeneralUnit = await getGeneralExpensesUnitData(isIdEdit, name.id);

    console.log("#Nan dataGeneralUnit", dataGeneralUnit, isIdEdit);
    setRowsUnitPriceEdit(dataGeneralUnit);
  };

  const renderViewBox = (item, index) => {
    const listImg = [
      {
        id: 0,
        name: "Vector.png",
      },
      {
        id: 1,
        name: "VectorNum.png",
      },
      {
        id: 2,
        name: "VectorIcon.png",
      },
      {
        id: 3,
        name: "VectorCool.png",
      },
    ];
    return (
      <Grid
        item
        className={clsx(
          item.id == measurementSelect ? classes.borderboxIcon : "",
          classes.marginBoxIcon
        )}
        onClick={(e) => handleBoxIcon(e, item, index)}
      >
        {listImg.map((img) => {
          if (index === img.id) {
            return (
              <img
                src={process.env.PUBLIC_URL + `img/${img.name}`}
                alt="Icon"
              />
            );
          }
        })}
      </Grid>
    );
  };

  const handleBillingType = (event) => {
    setBllingTypeSelect(event.target.value);
    setBllingTypeSelectName(
      bllingTypeList.find((f) => f.id === event.target.value).billing_type
    );
  };

  const handleBillCost = (event) => {
    setBllingCost(event.target.value);
  };

  const handleBllingonPeak = (event) => {
    setBllingOnPeak(event.target.value);
  };

  const handleBllingoffPeak = (event) => {
    setBllingOffPeak(event.target.value);
  };

  const handleBllingServiceCharge = (event) => {
    setBllingServiceCharge(event.target.value);
  };

  const renderBillType = () => {
    // console.log("bllingTypeSelectName", bllingTypeSelectName);
    if (bllingTypeSelect !== "none" && unitBillingTypeName !== "Default") {
      if (bllingTypeSelectName.includes("Normal (Flat Rate)")) {
        return (
          <Grid
            item
            md={12}
            className={clsx(
              classes.marginRow,
              classes.flexRow,
              classes.modalContent
            )}
          >
            <Grid item>
              <Typography variant="h5">{t("floor:unitPrice")}</Typography>
            </Grid>

            <Grid item md={5}>
              <TextField
                // id="input-with-icon-textfield"
                size="small"
                fullWidth
                variant="outlined"
                value={bllingCost}
                onChange={handleBillCost}
              />
            </Grid>
            {/* <Grid item md={3}>
              <FormControl variant="outlined" size="small" fullWidth>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={bahtType.length > 0 ? bahtTypeSelect : "none"}
                  placeholder={t("gateway:billingType")}
                  onChange={handleBath}
                  error={billingTypeSelect === "none" && !isValidate}
                >
                  <MenuItem value="none" disabled>
                    {t("floor:baht")}
                  </MenuItem>
                  {bahtType.length > 0 &&
                  bahtType.map((item) => {
                    return (
                      <MenuItem
                        id={"selectbathType-" + item.id}
                        key={item.id}
                        value={item.id}
                      >
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid> */}
            <Grid item>
              <Typography variant="h5">{t("floor:kWh")}</Typography>
            </Grid>
          </Grid>
        );
      } else {
        return (
          <Grid item md={12} className={clsx(classes.marginRow)}>
            <Grid
              item
              md={12}
              className={clsx(
                classes.marginRow,
                classes.flexRow,
                classes.justContentCenter
              )}
            >
              <Typography variant="h5">{t("billType:priceHead")}</Typography>
            </Grid>
            <Grid
              item
              md={12}
              className={clsx(
                classes.marginRow,
                classes.flexRow,
                classes.modalContent
              )}
            >
              <Grid item md={3}>
                <Typography variant="h6" className={classes.marginBot}>
                  {t("billType:onPeak")}
                </Typography>
                <TextField
                  // id="input-with-icon-textfield"
                  size="small"
                  fullWidth
                  variant="outlined"
                  value={bllingOnPeak}
                  onChange={handleBllingonPeak}
                />
              </Grid>
              <Grid item md={3}>
                <Typography variant="h6" className={classes.marginBot}>
                  {t("billType:offPeak")}
                </Typography>
                <TextField
                  // id="input-with-icon-textfield"
                  size="small"
                  fullWidth
                  variant="outlined"
                  value={bllingOffPeak}
                  onChange={handleBllingoffPeak}
                />
              </Grid>
              <Grid item md={3}>
                <Typography variant="h6" className={classes.marginBot}>
                  {t("billType:priceMount")}
                </Typography>
                <TextField
                  // id="input-with-icon-textfield"
                  size="small"
                  fullWidth
                  variant="outlined"
                  value={bllingServiceCharge}
                  onChange={handleBllingServiceCharge}
                />
              </Grid>
            </Grid>
            <Grid item md={12} className={classes.marginBillBox}>
              <Typography variant="h5">{t("billType:onPeak")}</Typography>
              <Typography variant="h6">{t("billType:onPeakDate")}</Typography>
              <Typography variant="h5">{t("billType:offPeak")}</Typography>
              <Typography variant="h6">{t("billType:offPeakDate")}</Typography>
              <Typography variant="h6">
                {t("billType:offPeakDateTwo")}
              </Typography>
            </Grid>
          </Grid>
        );
      }
    }
  };

  const handleOpenModalEdit = () => {
    setOpenModalEdit(true);
    setOpenView(false);
  };

  const handleCloseModalEdit = () => {
    setOpenModalEdit(false);
  };

  const handleSelectOptionChange = (event) => {
    setUnitBillingType(event.target.value);
    setUnitBillingTypeName(
      unitBillingTypeList.find((f) => f.id === event.target.value).unit_billing_type
    );
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
              onClick={(event) => openPageFloorDetail(event, buildingId)}
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
                // id="input-with-icon-textfield"
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
                    {visibleRows.map((rowItem, index) => {
                      const isItemSelected = isSelected(rowItem.name);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      // console.log('===========rowItem', rowItem);

                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, rowItem.name)}
                          role="checkbox"
                          // aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={rowItem.id}
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
                            {rowItem.id}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classes.fontSixeCell}
                          >
                            {rowItem.unit}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classes.fontSixeCell}
                          >
                            {rowItem.description}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classes.fontSixeCell}
                          >
                            {/* {row.type_id
                              ? unitType.find((f) => f.id === row.type_id).type
                              : ""} */}
                            {rowItem.type}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classes.fontSixeCell}
                          >
                            {rowItem.building_name}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classes.fontSixeCell}
                          >
                            {rowItem.no_of_point}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classes.fontSixeCell}
                          >
                            {rowItem.no_of_point}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classes.fontSixeCell}
                          >
                            {/* <img
                              src={IconDocument}
                              alt="IconDocument"
                              onClick={(event) => {
                                openPageFlooreUnitDetail(event, row.id);
                              }}
                            /> */}

                            <img
                              src={IconShow}
                              alt="IconShow"
                              onClick={(event) => {
                                handleOpenView(event, rowItem.id);
                              }}
                            />

                            <img
                              src={IconSetting}
                              alt="IconSetting"
                              onClick={(event) => {
                                handleClickOpen(event, rowItem.id);
                              }}
                            />
                            <img
                              src={IconDelete}
                              alt="IconDelete"
                              onClick={(event) => {
                                handleClickDeleteData(event, rowItem.id);
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
        open={openModalEdit}
        onClose={handleCloseModalEdit}
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
          </Grid>
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
                className={clsx(classes.flexRow, classes.modalContent)}
              >
                <Grid item md={12}>
                  <Grid
                    item
                    md={12}
                    className={clsx(classes.flexRow, classes.alignItem)}
                  >
                    <Grid item md={6}>
                      <Typography variant="body2">
                        {t("floor:shopLogo")}
                      </Typography>
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
                          {imagePreviewUrl ? (
                            <img
                              src={imagePreviewUrl}
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
                    {/* {_.isEmpty(imagePreviewUrl) && !isValidate && (
                      <Validate errorText={"กรุณาระบุข้อมูล"} />
                    )} */}
                  </Grid>
                  <Grid item md={12}>
                    <Typography variant="subtitle2" className="pb-3">
                      {t("floor:unitNumber")}
                    </Typography>
                    <TextField
                      // id="input-with-icon-textfield"
                      size="small"
                      placeholder={t("floor:unitNumber")}
                      fullWidth
                      variant="outlined"
                      value={unitNumber}
                      onChange={handleUnitNumber}
                      error={_.isEmpty(unitNumber) && !isValidate}
                    />
                    {_.isEmpty(unitNumber) && !isValidate && (
                      <Validate errorText={"กรุณาระบุข้อมูล"} />
                    )}
                  </Grid>
                  <Grid item md={12}>
                    <Typography variant="subtitle2" className="mt-3 pb-3">
                      {t("floor:unitName")}
                    </Typography>
                    <TextField
                      // id="input-with-icon-textfield"
                      size="small"
                      placeholder={t("floor:unitName")}
                      fullWidth
                      variant="outlined"
                      value={unitName}
                      onChange={handleUnitName}
                      error={_.isEmpty(unitName) && !isValidate}
                    />
                    {_.isEmpty(unitName) && !isValidate && (
                      <Validate errorText={"กรุณาระบุข้อมูล"} />
                    )}
                  </Grid>
                  <Grid item md={12}>
                    <Typography variant="subtitle2" className="mt-3 pb-3">
                      {t("floor:description")}
                    </Typography>
                    <TextField
                      // id="input-with-icon-textfield"
                      size="small"
                      placeholder={t("floor:description")}
                      fullWidth
                      variant="outlined"
                      value={description}
                      onChange={handleDescription}
                      error={_.isEmpty(unitName) && !isValidate}
                    />
                    {_.isEmpty(unitName) && !isValidate && (
                      <Validate errorText={"กรุณาระบุข้อมูล"} />
                    )}
                  </Grid>
                  <Grid item md={12}>
                    <Typography variant="subtitle2" className="mt-3 pb-3">
                      {t("floor:unitType")}
                    </Typography>
                    <FormControl variant="outlined" size="small" fullWidth>
                      <Select
                        labelId="demo-select-small-label"
                        // id="demo-select-small"
                        value={unitType.length > 0 ? unitTypeSelect : "none"}
                        placeholder={t("floor:unitType")}
                        onChange={handleUnitType}
                        error={unitTypeSelect === "none" && !isValidate}
                      >
                        <MenuItem value="none" disabled>
                          {t("floor:unitType")}
                        </MenuItem>
                        {unitType.length > 0 &&
                          unitType.map((item) => {
                            return (
                              <MenuItem
                                id={"selectCommunication-" + item.id}
                                key={item.id}
                                value={item.id}
                              >
                                {item.type}
                              </MenuItem>
                            );
                          })}
                      </Select>
                    </FormControl>
                    {unitTypeSelect === "none" && !isValidate && (
                      <Validate errorText={"กรุณาระบุข้อมูล"} />
                    )}
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
                      // id="input-with-icon-textfield"
                      size="small"
                      placeholder={t("floor:building")}
                      fullWidth
                      variant="outlined"
                      value={building}
                      // onChange={handleBuilding}
                      disabled
                    />
                  </Grid>
                  <Grid item md={12}>
                    <Typography variant="subtitle2" className="mt-3 pb-3">
                      {t("floor:floor")}
                    </Typography>
                    <TextField
                      // id="input-with-icon-textfield"
                      size="small"
                      placeholder={t("floor:floor")}
                      fullWidth
                      variant="outlined"
                      value={floorName}
                      // onChange={handleFloorName}
                      disabled
                    />
                  </Grid>
                  <Grid item md={12}>
                    <Typography variant="subtitle2" className="mt-3 pb-3">
                      {t("floor:zone")}
                    </Typography>
                    <TextField
                      // id="input-with-icon-textfield"
                      size="small"
                      placeholder={t("floor:zone")}
                      fullWidth
                      variant="outlined"
                      value={zone}
                      // onChange={handleZone}
                      disabled
                    />
                  </Grid>
                  <Grid
                    item
                    md={12}
                    className={clsx(classes.flexRowBtnModal, classes.marginRow)}
                  >
                    <Grid item md={3}>
                      <Button
                        onClick={() => getUnitView(isIdEdit)}
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
                        onClick={() => handleValidate("edit")}
                      >
                        {t("gateway:btnSave")}
                      </Button>
                    </Grid>
                  </Grid>
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
          <Typography variant="h3">{t("floor:addUnit")}</Typography>
        </DialogTitle>
        <DialogContent>
          <Grid item md={12}>
            <Typography variant="subtitle2" className="mt-3 pb-3">
              {t("floor:unitLogo")}
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
          <Grid item md={12}>
            <Typography variant="subtitle2" className="pb-3">
              {t("floor:unitNumber")}
            </Typography>
            <TextField
              // id="input-with-icon-textfield"
              size="small"
              placeholder={t("floor:unitNumber")}
              fullWidth
              variant="outlined"
              value={unitNumber}
              onChange={handleUnitNumber}
              error={_.isEmpty(unitNumber) && !isValidate}
            />
            {_.isEmpty(unitNumber) && !isValidate && (
              <Validate errorText={"กรุณาระบุข้อมูล"} />
            )}
          </Grid>
          <Grid item md={12}>
            <Typography variant="subtitle2" className="mt-3 pb-3">
              {t("floor:unitName")}
            </Typography>
            <TextField
              // id="input-with-icon-textfield"
              size="small"
              placeholder={t("floor:unitName")}
              fullWidth
              variant="outlined"
              value={unitName}
              onChange={handleUnitName}
              error={_.isEmpty(unitName) && !isValidate}
            />
            {_.isEmpty(unitName) && !isValidate && (
              <Validate errorText={"กรุณาระบุข้อมูล"} />
            )}
          </Grid>
          <Grid item md={12}>
            <Typography variant="subtitle2" className="mt-3 pb-3">
              {t("floor:description")}
            </Typography>
            <TextField
              // id="input-with-icon-textfield"
              size="small"
              placeholder={t("floor:description")}
              fullWidth
              variant="outlined"
              value={description}
              onChange={handleDescription}
              error={_.isEmpty(unitName) && !isValidate}
            />
            {_.isEmpty(unitName) && !isValidate && (
              <Validate errorText={"กรุณาระบุข้อมูล"} />
            )}
          </Grid>
          <Grid item md={12}>
            <Typography variant="subtitle2" className="mt-3 pb-3">
              {t("floor:unitType")}
            </Typography>
            <FormControl variant="outlined" size="small" fullWidth>
              <Select
                labelId="demo-select-small-label"
                // id="demo-select-small"
                value={unitType.length > 0 ? unitTypeSelect : "none"}
                placeholder={t("floor:unitType")}
                onChange={handleUnitType}
                error={unitTypeSelect === "none" && !isValidate}
              >
                <MenuItem value="none" disabled>
                  {t("floor:unitType")}
                </MenuItem>
                {unitType.length > 0 &&
                  unitType.map((item) => {
                    return (
                      <MenuItem
                        id={"selectCommunication-" + item.id}
                        key={item.id}
                        value={item.id}
                      >
                        {item.type}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
            {unitTypeSelect === "none" && !isValidate && (
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
          <Typography variant="h3">{unitName}</Typography>
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
                      {unitName ? unitName : "-"}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item md={2}>
                  <img
                    src={IconEdit}
                    alt="IconEdit"
                    className={clsx(classes.cursor)}
                    onClick={() => handleOpenModalEdit()}
                  />
                </Grid>
              </Grid>

              <Grid item md={12} className={clsx(classes.marginRow)}>
                <Typography variant="h5"> {t("floor:unitNumber")}</Typography>
                <Grid item className="mt-2">
                  <Typography variant="body1">
                    {unitNumber ? unitNumber : "-"}
                  </Typography>
                </Grid>
              </Grid>

              <Grid item md={12} className={clsx(classes.marginRow)}>
                <Typography variant="h5"> {t("floor:description")}</Typography>
                <Grid item className="mt-2">
                  <Typography variant="body1">
                    {description ? description : "-"}
                  </Typography>
                </Grid>
              </Grid>

              <Grid item md={12} className={clsx(classes.marginRow)}>
                <Typography variant="h5"> {t("floor:unitType")}</Typography>
                <Grid item className="mt-2">
                  <Typography variant="body1">
                    {unitTypeSelect ? unitTypeSelect : "-"}
                  </Typography>
                </Grid>
              </Grid>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal Edit Measurement*/}
      <Dialog
        fullScreen={fullScreenEdit}
        // className={classes.modalWidth}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        classes={{
          paper: classes.modalEditWidth,
        }}
      >
        <DialogTitle id="responsive-dialog-title" className="mt-3">
          <Grid item md={12} className={clsx(classes.flexRow)}>
            <Grid item md={6}>
              <Typography variant="h3">{t("floor:measurement")}</Typography>
              <Grid
                item
                className={clsx(classes.flexRow, classes.justContentCenter)}
              >
                {measurementList.length > 0 &&
                  measurementList.map((item, index) => {
                    return renderViewBox(item, index);
                  })}
              </Grid>
            </Grid>
          </Grid>
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
                className={clsx(classes.flexRow, classes.modalContent)}
              >
                <Grid
                  item
                  md={12}
                  className={clsx(classes.boxMargin, classes.borderMeasurement)}
                >
                  <Grid item md={12}>
                    <Typography variant="h4">Electrical Measurement</Typography>
                  </Grid>
                  <TableContainer
                    component={Paper}
                    className={classes.marginRow}
                  >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead className={classes.backgroundMeasurement}>
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
                              // classes.colorText,
                              classes.fontSixeHead
                            )}
                          >
                            {t("floor:gateway")}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={clsx(
                              // classes.colorText,
                              classes.fontSixeHead
                            )}
                          >
                            {t("floor:device")}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={clsx(
                              // classes.colorText,
                              classes.fontSixeHead
                            )}
                          >
                            {t("floor:point")}
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
                        {rowsPointEdit.map((row, index) => (
                          <TableRow
                            key={row.name}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            {console.log("row=======", row, index)}
                            <TableCell
                              component="th"
                              scope="row"
                              className={classes.fontSixeCell}
                            >
                              {row.id}
                            </TableCell>
                            <TableCell
                              align="center"
                              className={classes.fontSixeCell}
                            >
                              <Grid item className={classes.marginDataTable}>
                                <FormControl
                                  variant="outlined"
                                  size="small"
                                  fullWidth
                                >
                                  {row.isEdit ? (
                                    <Select
                                      labelId="demo-select-small-label"
                                      id="demo-select-small"
                                      value={
                                        row.gateway_id
                                        // ? row.gateway_id
                                        // : gatewayMeter
                                      }
                                      placeholder={"Energy Meter"}
                                      // disabled={
                                      //   !disabledFild &&
                                      //   editMeasurement === row.id
                                      //     ? false
                                      //     : true
                                      // }
                                      onChange={(e) => {
                                        handleGatewayMeter(e, row, index);
                                      }}
                                    >
                                      <MenuItem value="none" disabled>
                                        Gateway
                                      </MenuItem>
                                      {gatewayData.length > 0 &&
                                        gatewayData.map((item) => {
                                          return (
                                            <MenuItem
                                              key={item.id}
                                              value={item.id}
                                            >
                                              {item.name}
                                            </MenuItem>
                                          );
                                        })}
                                    </Select>
                                  ) : (
                                    <TextField
                                      // id="input-with-icon-textfield"
                                      size="small"
                                      fullWidth
                                      variant="outlined"
                                      value={row.gateway_name}
                                      disabled={true}
                                    />
                                  )}
                                </FormControl>
                              </Grid>
                            </TableCell>
                            <TableCell
                              align="right"
                              className={classes.fontSixeCell}
                            >
                              <Grid item className={classes.marginDataTable}>
                                <FormControl
                                  variant="outlined"
                                  size="small"
                                  fullWidth
                                >
                                  {row.isEdit ? (
                                    <Select
                                      labelId="demo-select-small-label"
                                      id="demo-select-small"
                                      value={
                                        row.device_id
                                        // ? row.device_id
                                        // : gatewayMeterTwo
                                      }
                                      placeholder={"Energy Meter"}
                                      // disabled={
                                      //   !disabledFild &&
                                      //   editMeasurement === row.id
                                      //     ? false
                                      //     : true
                                      // }
                                      onChange={(e) => {
                                        handleGatewayMeterTwo(e, row, index);
                                      }}
                                    >
                                      <MenuItem value="none" disabled>
                                        Device
                                      </MenuItem>
                                      {row?.device_list.length > 0 &&
                                        row?.device_list.map((item) => {
                                          console.log("item", item);
                                          return (
                                            <MenuItem
                                              key={item.id}
                                              value={item.id}
                                            >
                                              {item.devicename}
                                            </MenuItem>
                                          );
                                        })}
                                    </Select>
                                  ) : (
                                    <TextField
                                      // id="input-with-icon-textfield"
                                      size="small"
                                      fullWidth
                                      variant="outlined"
                                      value={row.device_name}
                                      disabled={true}
                                    />
                                  )}
                                </FormControl>
                              </Grid>
                            </TableCell>
                            <TableCell
                              align="right"
                              className={classes.fontSixeCell}
                            >
                              <Grid item className={classes.marginDataTable}>
                                <FormControl
                                  variant="outlined"
                                  size="small"
                                  fullWidth
                                >
                                  {row.isEdit ? (
                                    <Select
                                      labelId="demo-select-small-label"
                                      id="demo-select-small"
                                      value={
                                        row.point_id
                                        // ? row.point_id
                                        // : gatewayMeterThree
                                      }
                                      placeholder={"Energy Meter"}
                                      // disabled={
                                      //   !disabledFild &&
                                      //   editMeasurement === row.id
                                      //     ? false
                                      //     : true
                                      // }
                                      onChange={(e) =>
                                        handleGatewayMeterThree(e, row, index)
                                      }
                                    >
                                      <MenuItem value="none" disabled>
                                        Point
                                      </MenuItem>
                                      {row?.point_list.length > 0 &&
                                        row?.point_list.map((item) => {
                                          return (
                                            <MenuItem
                                              key={item.id}
                                              value={item.id}
                                            >
                                              {item.name}
                                            </MenuItem>
                                          );
                                        })}
                                    </Select>
                                  ) : (
                                    <TextField
                                      // id="input-with-icon-textfield"
                                      size="small"
                                      fullWidth
                                      variant="outlined"
                                      value={row.point_name}
                                      disabled={true}
                                    />
                                  )}
                                </FormControl>
                              </Grid>
                            </TableCell>
                            <TableCell
                              align="right"
                              className={classes.fontSixeCell}
                            >
                              {row.gateway_id && row.id ? (
                                <Grid item className={classes.flexRow}>
                                  {row.isEdit && row.id ? (
                                    <>
                                      <Typography
                                        className={clsx(
                                          // classes.fontSixeCell,
                                          classes.paddingCol,
                                          classes.cursor
                                        )}
                                        onClick={(event) =>
                                          handleUpdateMeasurement(
                                            event,
                                            row,
                                            index
                                          )
                                        }
                                      >
                                        {"save"}
                                      </Typography>
                                    </>
                                  ) : (
                                    <>
                                      <Typography
                                        className={clsx(
                                          // classes.fontSixeCell,
                                          classes.paddingCol,
                                          classes.cursor
                                        )}
                                        onClick={() =>
                                          handleEditMeasurement(row, index)
                                        }
                                      >
                                        {"edit"}
                                      </Typography>
                                    </>
                                  )}

                                  <Typography
                                    className={clsx(
                                      // classes.fontSixeCell,
                                      classes.activeColor,
                                      classes.cursor
                                    )}
                                    onClick={(event) =>
                                      handleDeleteMeasurement(event, row.id)
                                    }
                                  >
                                    {t("floor:delete")}
                                  </Typography>
                                </Grid>
                              ) : (
                                <Typography
                                  className={clsx(
                                    // classes.fontSixeCell,
                                    classes.activeColor
                                  )}
                                  onClick={(event) =>
                                    handleDeleteMeasurement(event, row.id)
                                  }
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
                        className={clsx(classes.backGroundConfrim)}
                        variant="outlined"
                        onClick={addUnitPoint}
                      >
                        {t("gateway:btnSave")}
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    md={12}
                    className={clsx(
                      classes.borderBottomMeasurement,
                      classes.marginRow
                    )}
                  ></Grid>

                  {/* Billing type */}
                  <Grid item md={12} className={classes.marginRow}>
                    <Typography variant="h4">Billing type</Typography>
                  </Grid>
                  <Grid item md={12} className={classes.marginRow}>
                    <FormControl variant="outlined" size="small" fullWidth>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={
                          bllingTypeList.length > 0 ? bllingTypeSelect : "none"
                        }
                        placeholder={t("gateway:billingType")}
                        onChange={handleBillingType}
                        // error={billingTypeSelect === "none" && !isValidate}
                      >
                        <MenuItem value="none" disabled>
                          {t("gateway:selectBillingType")}
                        </MenuItem>
                        {bllingTypeList.length > 0 &&
                          bllingTypeList.map((item) => {
                            return (
                              <MenuItem
                                id={"selectbillingType-" + item.id}
                                key={item.id}
                                value={item.id}
                              >
                                {item.billing_type}
                              </MenuItem>
                            );
                          })}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={12} className={classes.marginBillBox}>
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        // defaultValue="female"
                        name="radio-buttons-group"
                        className={classes.displayBlock}
                        value={unitBillingType}
                        onChange={handleSelectOptionChange}
                      >
                        {unitBillingTypeList.length > 0 &&
                          unitBillingTypeList.map((item) => {
                            return (
                              <FormControlLabel
                                value={item.id}
                                control={<Radio color="primary" />}
                                label={item.unit_billing_type}
                              />
                            );
                          })}

                        {/* <FormControlLabel
                          value="Custom"
                          control={<Radio color="primary" />}
                          label="Custom"
                        /> */}
                      </RadioGroup>
                    </FormControl>
                  </Grid>

                  {renderBillType()}

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
                        className={clsx(classes.backGroundConfrim)}
                        variant="outlined"
                        onClick={() => addBillingBillingUpdate(bllingTypeId)}
                      >
                        {t("gateway:btnSave")}
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    md={12}
                    className={clsx(
                      classes.borderBottomMeasurement,
                      classes.marginRow
                    )}
                  ></Grid>

                  {/* ค่าใช้จ่ายทั่วไป */}
                  <Grid item md={12} className={classes.marginRow}>
                    <Typography variant="h4">ค่าใช้จ่ายทั่วไป</Typography>
                  </Grid>
                  {rowsUnitPriceEdit.length > 0 &&
                    rowsUnitPriceEdit.map((item, index) => (
                      <Grid
                        item
                        md={12}
                        className={clsx(
                          classes.marginRow,
                          classes.flexRow,
                          classes.modalContent
                        )}
                      >
                        {console.log("#Nan 9999999999===", item, index)}
                        <Grid item md={5}>
                          <TextField
                            // id="input-with-icon-textfield"
                            size="small"
                            fullWidth
                            variant="outlined"
                            value={item.description}
                            onChange={(e) =>
                              handleDescriptionUnit(e, item, index)
                            }
                            disabled={item.isEdit ? false : true}
                          />
                        </Grid>

                        <Grid item md={3}>
                          <TextField
                            // id="input-with-icon-textfield"
                            size="small"
                            fullWidth
                            variant="outlined"
                            value={item.cost}
                            onChange={(e) => handlePrice(e, item, index)}
                            disabled={item.isEdit ? false : true}
                          />
                        </Grid>
                        <Grid item md={2}>
                          <TextField
                            // id="input-with-icon-textfield"
                            size="small"
                            fullWidth
                            variant="outlined"
                            value={generalSelect}
                          />
                        </Grid>
                        <Grid item>
                          {item.id ? (
                            <Grid item>
                              {item.isEdit && item.id ? (
                                <>
                                  <Typography
                                    className={clsx(
                                      // classes.fontSixeCell,
                                      classes.paddingCol,
                                      classes.cursor
                                    )}
                                    onClick={(event) =>
                                      handleGeneralExpensesUnitUpdate(
                                        event,
                                        item,
                                        index
                                      )
                                    }
                                  >
                                    {"save"}
                                  </Typography>
                                </>
                              ) : (
                                <>
                                  <img
                                    src={IconEdit}
                                    alt="IconEdit"
                                    className={clsx(classes.cursor)}
                                    onClick={() =>
                                      handleEditMeasurementUnit(item, index)
                                    }
                                  />
                                  <img
                                    src={IconDelete}
                                    alt="IconDelete"
                                    className={clsx(classes.cursor)}
                                    onClick={(event) =>
                                      handleDeleteGeneralExpensesUnit(
                                        event,
                                        item.id
                                      )
                                    }
                                  />
                                </>
                              )}
                            </Grid>
                          ) : (
                            <img
                              src={IconDelete}
                              alt="IconDelete"
                              className={clsx(classes.cursor)}
                              onClick={(event) =>
                                handleDeleteGeneralExpensesUnit(event, item.id)
                              }
                            />
                          )}
                        </Grid>
                      </Grid>
                    ))}

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
                        onClick={addNewRowUnitPrice}
                        className={clsx(classes.backGroundCancel)}
                      >
                        {t("floor:addRecord")}
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
                        className={clsx(classes.backGroundConfrim)}
                        variant="outlined"
                        onClick={addGeneralExpensesUnit}
                      >
                        {t("gateway:btnSave")}
                      </Button>
                    </Grid>
                  </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(UnitManagement);
