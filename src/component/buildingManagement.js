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
    label: "Building  ID",
  },
  {
    id: "calories",
    numeric: false,
    disablePadding: false,
    label: "Building  Name",
  },
  {
    id: "fat",
    numeric: false,
    disablePadding: false,
    label: "Latitude",
  },
  {
    id: "carbs",
    numeric: false,
    disablePadding: false,
    label: "Longitude",
  },
  {
    id: "power",
    numeric: false,
    disablePadding: false,
    label: "No of Floor",
  },
  {
    id: "protein",
    numeric: false,
    disablePadding: false,
    label: "No of Floor",
  },
  {
    id: "unit",
    numeric: false,
    disablePadding: false,
    label: "No of Unit",
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

const BuildingManagement = ({ t, login }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [buildingName, setBuildingName] = useState("");
  const [lattitude, setLattitude] = useState();
  const [longtitude, setLongtitude] = useState();
  const [area, setArea] = useState();

  const dispatch = useDispatch();
  const classes = useStyles();
  const sideBar = useSelector((state) => state.sidebar);
  const token = useSelector((state) => state.token);
  const theme = useTheme();
  const navigate = useNavigate();
  // modal //
  const [open, setOpen] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const fullScreenEdit = useMediaQuery(theme.breakpoints.down("xl"));
  const [openAdd, setOpenAdd] = useState(false);
  const [file, setFile] = useState("");
  const [openView, setOpenView] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isValidate, setIsValidate] = useState(true);
  const [isIdEdit, setIsIdEdit] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const [rows, setRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  // const [sortedRows, setSortedRows] = useState(rows);

  const [rowsBuildingPriceEdit, setRowsBuildingPriceEdit] = useState([]);
  const [measurementList, setMeasurementList] = useState([]);
  const [measurementSelect, setMeasurementSelect] = useState("");
  const [currencyTypeList, setCurrencyTypeList] = useState([]);
  const [currencyTypeSelect, setCurrencyTypeSelect] = useState("none");
  const billDateList = [
    {
      id: 1,
      name: 1,
    },
    {
      id: 2,
      name: 2,
    },
    {
      id: 3,
      name: 3,
    },
    {
      id: 4,
      name: 4,
    },
    {
      id: 5,
      name: 5,
    },
    {
      id: 6,
      name: 6,
    },
    {
      id: 7,
      name: 7,
    },
    {
      id: 8,
      name: 8,
    },
    {
      id: 9,
      name: 9,
    },
    {
      id: 10,
      name: 10,
    },
    {
      id: 11,
      name: 11,
    },
    {
      id: 12,
      name: 12,
    },
    {
      id: 13,
      name: 13,
    },
    {
      id: 14,
      name: 14,
    },
    {
      id: 15,
      name: 15,
    },
    {
      id: 16,
      name: 16,
    },
    {
      id: 17,
      name: 17,
    },
    {
      id: 18,
      name: 18,
    },
    {
      id: 19,
      name: 19,
    },
    {
      id: 20,
      name: 20,
    },
    {
      id: 21,
      name: 21,
    },
    {
      id: 22,
      name: 22,
    },
    {
      id: 23,
      name: 23,
    },
    {
      id: 24,
      name: 24,
    },
    {
      id: 25,
      name: 25,
    },
    {
      id: 26,
      name: 26,
    },
    {
      id: 27,
      name: 27,
    },
    {
      id: 28,
      name: 28,
    },
    {
      id: 29,
      name: 29,
    },
    {
      id: 30,
      name: 30,
    },
    {
      id: 31,
      name: 31,
    },
  ];
  const [billDate, setBillDate] = useState("none");
  const [billId, setBillId] = useState();
  const [bllingTypeList, setBllingTypeList] = useState([]);
  const [bllingTypeSelect, setBllingTypeSelect] = useState("none");
  const [bllingTypeSelectName, setBllingTypeSelectName] = useState("none");
  const [bllingCost, setBllingCost] = useState("");
  const [bllingOnPeak, setBllingOnPeak] = useState("");
  const [bllingOffPeak, setBllingOffPeak] = useState("");
  const [bllingServiceCharge, setBllingServiceCharge] = useState("");
  const [bllingTypeId, setBllingTypeSelectId] = useState("none");
  const [measurementName, setMeasurementName] = useState("");

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
      getBuilding();
      getMeasurementTypeData();
      getCurrencyTypeData();
      getBillingTypeData();
    }
    console.log("token", token, login);
  }, [token]);

  const getBuilding = async () => {
    setIsLoading(true);
    try {
      await API.connectTokenAPI(token);
      await API.getBuildingData().then((response) => {
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

  // get getMeasurementTypeData //
  const getMeasurementTypeData = async () => {
    setIsLoading(true);
    try {
      await API.connectTokenAPI(token);
      await API.getMeasurementTypeData().then((response) => {
        const dataPayload = response.data;
        console.log("#Nan vvvvvv", dataPayload);
        setMeasurementList(dataPayload);
        dataPayload.map((item) => {
          if (item.measurement_type === "Electrical") {
            setMeasurementSelect(item.id);
            setMeasurementName(item.measurement_type);
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

  console.log("# 99999999", measurementSelect, measurementName);

  // get getCurrencyTypeData //
  const getCurrencyTypeData = async () => {
    setIsLoading(true);
    try {
      await API.connectTokenAPI(token);
      await API.getCurrencyTypeData().then((response) => {
        const dataPayload = response.data;
        // console.log("#Nan vvvvvv", dataPayload);
        setCurrencyTypeList(dataPayload);
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

  const handleValidate = (type) => {
    let isValidate = true;

    if (type === "edit") {
      if (_.isEmpty(buildingName) || !lattitude || !longtitude || !area) {
        isValidate = false;
      }
      console.log("isValidateEdit", isValidate);
      setIsValidate(isValidate);
    } else {
      if (
        _.isEmpty(buildingName) ||
        _.isEmpty(lattitude) ||
        _.isEmpty(longtitude) ||
        _.isEmpty(area)
      ) {
        isValidate = false;
      }
      console.log("isValidate", isValidate);
      setIsValidate(isValidate);
    }

    if (isValidate) {
      if (type === "edit") {
        buildingUpdate(isIdEdit);
      } else {
        buildingRegister();
      }
    }
  };

  const buildingRegister = async () => {
    setIsLoading(true);
    let reader = new window.FileReader();
    if (file) {
      reader.readAsDataURL(file);
      try {
        reader.onload = async () => {
          const base64File = reader.result; // Extract the base64 data
          const body = {
            name: buildingName,
            latitude: lattitude,
            longitude: longtitude,
            area: area,
            file: base64File, // Include the Base64 encoded file
          };
          API.connectTokenAPI(token);
          await API.BuildingRegister(body).then((response) => {
            const dataPayload = response.data;
            console.log("dataPayload", dataPayload, response);
            if (response.status === 200) {
              MySwal.fire({
                icon: "success",
                confirmButtonText: "ตกลง",
                text: dataPayload,
              });
              getBuilding();
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
          name: buildingName,
          latitude: lattitude,
          longitude: longtitude,
          area: area,
          file: "", // Include the Base64 encoded file
        };
        API.connectTokenAPI(token);
        await API.BuildingRegister(body).then((response) => {
          const dataPayload = response.data;
          console.log("dataPayload", dataPayload, response);
          if (response.status === 200) {
            MySwal.fire({
              icon: "success",
              confirmButtonText: "ตกลง",
              text: dataPayload,
            });
            getBuilding();
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

  const buildingUpdate = async (id) => {
    setIsLoading(true);
    let reader = new window.FileReader();
    if (file) {
      reader.readAsDataURL(file);
      try {
        reader.onload = async () => {
          const base64File = reader.result; // Extract the base64 data
          const body = {
            name: buildingName,
            latitude: lattitude,
            longitude: longtitude,
            area: area,
            file: base64File,
            fileOld: "",
          };
          API.connectTokenAPI(token);
          await API.buildingUpdate(id, body).then((response) => {
            const dataPayload = response.data;
            // console.log("dataPayload", dataPayload, response);
            if (response.status === 200) {
              MySwal.fire({
                icon: "success",
                confirmButtonText: "ตกลง",
                text: dataPayload,
              });
              getBuilding();
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
          name: buildingName,
          latitude: lattitude,
          longitude: longtitude,
          area: area,
          file: "",
          fileOld: "",
        };
        API.connectTokenAPI(token);
        await API.buildingUpdate(id, body).then((response) => {
          const dataPayload = response.data;
          // console.log("dataPayload", dataPayload, response);
          if (response.status === 200) {
            MySwal.fire({
              icon: "success",
              confirmButtonText: "ตกลง",
              text: dataPayload,
            });
            getBuilding();
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

  const getBuildingView = async (id) => {
    setIsLoading(true);
    try {
      await API.connectTokenAPI(token);
      await API.getBuildingView(id).then((response) => {
        const dataPayload = response.data;
        // console.log("dataPayload", response, dataPayload);
        dataPayload.length > 0 &&
          dataPayload.map((item) => {
            console.log("9999=======item", item);
            setBuildingName(item.name);
            setLattitude(item.latitude);
            setLongtitude(item.longitude);
            setArea(item.area);
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

  const buildingDelete = async (id) => {
    setIsLoading(true);
    try {
      await API.connectTokenAPI(token);
      await API.buildingDelete(id).then((response) => {
        const dataPayload = response.data;
        if (response.status === 200) {
          getBuilding();
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
        buildingDelete(id);
      } else if (result.isDismissed) {
        setIsLoading(false);
      }
    });
  };

  const getBuildingParamList = async (buildingId) => {
    setIsLoading(true);
    try {
      API.connectTokenAPI(token);
      await API.getBuildingParamList(buildingId).then((response) => {
        const dataPayload = response.data;
        console.log("#Nan dataPayload", response, dataPayload);
        dataPayload.length > 0 &&
          dataPayload.map((item) => {
            console.log("#Nan 9999=======item", item);
            setBillId(item.id);
            setBillDate(
              item.billing_date &&
                billDateList.find((f) => f.name === item.billing_date).id
            );
            setCurrencyTypeSelect(
              item.currency_type &&
                currencyTypeList.find(
                  (f) => f.currency_type === item.currency_type
                ).id
            );
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

  const addbBildingParamUpdate = async (buillId) => {
    setIsLoading(true);
    setOpen(false);
    try {
      const data = {
        billing_date: billDate,
        currency_type_id: currencyTypeSelect,
      };
      API.connectTokenAPI(token);
      await API.buildingParamUpdate(buillId, data).then((response) => {
        const dataPayload = response.data;
        console.log("#Nan dataPayload", response, dataPayload);
        if (response.status === 200) {
          MySwal.fire({
            icon: "success",
            confirmButtonText: "ตกลง",
            text: dataPayload,
          }).then((result) => {
            if (result.isConfirmed) {
              getBuildingParamList(isIdEdit);
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

  const getUpdateDataGeneralExpensesBuilding = async (id) => {
    const data = await getGeneralExpensesBuildingData(id, measurementSelect);
    setRowsBuildingPriceEdit(data);
  };

  const getUpdateRowGeneralExpensesBuilding = async (id, index, rowId) => {
    const data = await getGeneralExpensesBuildingData(id, measurementSelect);
    const foundData = data.find((f) => f.id === rowId);
    const updatedRows = [...rowsBuildingPriceEdit];
    updatedRows[index] = foundData;
    console.log("#Nan ==foundData", foundData, data, id);
    // Update the state with the new array
    setRowsBuildingPriceEdit(updatedRows);
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

  // addGeneralExpensesBuilding //
  const addGeneralExpensesBuilding = async () => {
    setIsLoading(true);
    setOpen(false);
    try {
      let body = [];
      rowsBuildingPriceEdit.length > 0 &&
        rowsBuildingPriceEdit.forEach((row) => {
          // ตรวจสอบว่า row.new_point_id ไม่ซ้ำกับค่าใน body
          // const isUnique = !body.some(
          //   (data) => row.id === null
          // );

          if (!row.id) {
            const data = {
              building_id: isIdEdit,
              measurement_type_id: measurementSelect,
              description: row.description,
              cost: row.cost,
            };
            body.push(data);
          }
        });
      console.log("body====", body);
      API.connectTokenAPI(token);
      await API.generalExpensesBuildingRegister(body).then((response) => {
        const dataPayload = response.data;
        console.log("dataPayload====Point", dataPayload, response);
        if (response.status === 200) {
          MySwal.fire({
            icon: "success",
            confirmButtonText: "ตกลง",
            text: dataPayload,
          }).then((result) => {
            if (result.isConfirmed) {
              getUpdateDataGeneralExpensesBuilding(isIdEdit);
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

  // addNewRowUnitPrice //
  const addNewRowBuildingPrice = () => {
    const newRow = {
      id: null,
      description: "",
      cost: "",
      generalSelect: null,
      isEdit: true,
    };

    const updatedRows = [...rowsBuildingPriceEdit];
    updatedRows.push(newRow);
    setRowsBuildingPriceEdit(updatedRows);
  };

  const addBillingBillingUpdate = async (bllingId) => {
    setIsLoading(true);
    setOpen(false);
    try {
      const body = {
        billingTypeID: bllingTypeSelect,
        cost: bllingCost,
        onPeak: bllingOnPeak,
        offPeak: bllingOffPeak,
        serviceCharge: bllingServiceCharge,
      };
      console.log("body====", body);
      API.connectTokenAPI(token);
      await API.billingBillingUpdate(bllingId, body).then((response) => {
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

  const getGeneralExpensesBuildingData = async (buildingId, measurementId) => {
    // setIsLoading(true);
    let list = [];
    try {
      API.connectTokenAPI(token);
      await API.getGeneralExpensesBuildingData(buildingId, measurementId).then(
        async (response) => {
          let dataPayload = response?.data;
          console.log("#Nan dataPayload", response, dataPayload);
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

  const handleGeneralExpensesBuildingUpdate = async (event, row, index) => {
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
      await API.generalExpensesBuildingUpdate(row.id, data).then((response) => {
        const dataPayload = response.data;
        if (response.status === 200) {
          MySwal.fire({
            icon: "success",
            confirmButtonText: "ตกลง",
            text: dataPayload,
          }).then((result) => {
            if (result.isConfirmed) {
              getUpdateRowGeneralExpensesBuilding(isIdEdit, index, row.id);
              setOpen(true);
              handleEditMeasurementBuilding(row, index, false);
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

  const handleEditMeasurementBuilding = async (row, index, isEdit = true) => {
    const updatedRows = [...rowsBuildingPriceEdit];
    // Update the device_id of the specific row at the given index
    updatedRows[index].isEdit = isEdit;
    // Update the state with the new array
    setRowsBuildingPriceEdit(updatedRows);
  };

  // delete row generalExpensesBuildingDelete //
  const generalExpensesBuildingDelete = async (rowId) => {
    setIsLoading(true);
    setOpen(false);
    try {
      await API.connectTokenAPI(token);
      await API.generalExpensesBuildingDelete(rowId).then((response) => {
        const dataPayload = response.data;
        if (response.status === 200) {
          MySwal.fire({
            icon: "success",
            confirmButtonText: "ตกลง",
            text: dataPayload,
          }).then((result) => {
            if (result.isConfirmed) {
              getUpdateDataGeneralExpensesBuilding(isIdEdit);
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

  const handleDeleteGeneralExpensesBuilding = (event, id) => {
    setOpen(false);
    MySwal.fire({
      icon: "warning",
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
      showCancelButton: true,
      text: "คุณต้องการลบข้อมูลหรือไม่",
    }).then((result) => {
      if (result.isConfirmed) {
        generalExpensesBuildingDelete(id);
      } else if (result.isDismissed) {
        setIsLoading(false);
      }
    });
  };

  const handleLongtitude = (event) => {
    setLongtitude(event.target.value);
    if (_.isEmpty(event.target.value)) {
      setIsValidate(false);
    } else {
      setIsValidate(true);
    }
  };

  const handleArea = (event) => {
    setArea(event.target.value);
    if (_.isEmpty(event.target.value)) {
      setIsValidate(false);
    } else {
      setIsValidate(true);
    }
  };

  const handleBuildingName = (event) => {
    setBuildingName(event.target.value);
    if (_.isEmpty(event.target.value)) {
      setIsValidate(false);
    } else {
      setIsValidate(true);
    }
  };

  const handleLattitude = (event) => {
    setLattitude(event.target.value);
    if (_.isEmpty(event.target.value)) {
      setIsValidate(false);
    } else {
      setIsValidate(true);
    }
  };

  const handleDescriptionUnit = (event, item, index) => {
    const newValue = event.target.value;
    // Create a copy of the existing rowsPointEdit array
    const updatedRows = [...rowsBuildingPriceEdit];
    // Update the device_id of the specific row at the given index
    updatedRows[index].description = newValue;
    // Update the state with the new array
    setRowsBuildingPriceEdit(updatedRows);
  };

  const handlePrice = (event, item, index) => {
    const newValue = event.target.value;
    const updatedRows = [...rowsBuildingPriceEdit];
    updatedRows[index].cost = newValue;
    // Update the state with the new array
    setRowsBuildingPriceEdit(updatedRows);
  };

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
    setIsValidate(true);
    setBuildingName("");
    setLattitude("");
    setLongtitude("");
    setFile("");
    setArea("");
    setImagePreviewUrl("");
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleOpenView = (event, id) => {
    setOpenView(true);
    getBuildingView(id);
    setIsIdEdit(id);
  };

  const handleCloseView = () => {
    setOpenView(false);
  };

  const getBillingBillingView = async (buildingId, measurementSelect) => {
    setIsLoading(true);
    try {
      API.connectTokenAPI(token);
      await API.getBillingBillingView(buildingId, measurementSelect).then(
        (response) => {
          const dataPayload = response.data;
          // console.log("#Nan dataPayload", response, dataPayload);
          dataPayload.length > 0 &&
            dataPayload.map((item) => {
              console.log("#Nan 9999=======item", item);
              setBllingTypeSelectId(item.building_billing_id);
              setBllingTypeSelect(item.billing_type_id);
              setBllingTypeSelectName(item.billing_type);
              setBllingOnPeak(item.on_peak);
              setBllingOffPeak(item.off_peak);
              setBllingServiceCharge(item.service_charge);
              setBllingCost(item.cost);
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
    getBuildingView(id);
    setIsIdEdit(id);
    getBuildingParamList(id);

    getBillingBillingView(id, measurementSelect);

    const dataGeneralBuiling = await getGeneralExpensesBuildingData(
      id,
      measurementSelect
    );

    console.log("#Nan dataGeneralBuilding", dataGeneralBuiling, isIdEdit);
    setRowsBuildingPriceEdit(dataGeneralBuiling);
  };

  const handleUploadFile = (e) => {
    // setFile(e.target.files[0]);
    // if (e.target.files.length > 0) {
    //   setFile(URL.createObjectURL(e.target.files[0]));
    // } else {
    //   setIsValidate(false);
    // }
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

  const openPageFlooreDetail = (event, id) => {
    // navigate("/buildingFloorDetail");
    navigate("/buildingFloorDetail", { state: { buildingId: id } });
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
      getBuilding();
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
      getBuilding();
    }
  };

  const handleOpenModalEdit = () => {
    setOpenModalEdit(true);
    setOpenView(false);
  };

  const handleCloseModalEdit = () => {
    setOpenModalEdit(false);
  };

  const handleBillDate = (event) => {
    setBillDate(event.target.value);
  };

  const handleCurrencyType = (event) => {
    setCurrencyTypeSelect(event.target.value);
  };

  const handleBoxIcon = async (event, name, index) => {
    console.log("#Nan 888888888", name, index);
    setMeasurementSelect(name.id);
    getBillingBillingView(isIdEdit, name.id);
    const dataGeneralBuilding = await getGeneralExpensesBuildingData(
      isIdEdit,
      name.id
    );

    console.log("#Nan dataGeneralBuilding", dataGeneralBuilding, isIdEdit);
    setRowsBuildingPriceEdit(dataGeneralBuilding);
  };

  const renderViewBox = (item, index) => {
    const listImg = [
      {
        id: 0,
        name: "Vector.png",
        type: "Electrical",
      },
      {
        id: 1,
        name: "VectorNum.png",
        type: "Air",
      },
      {
        id: 2,
        name: "VectorIcon.png",
        type: "Hot",
      },
      {
        id: 3,
        name: "VectorCool.png",
        type: "Cold",
      },
    ];
    // const sortedItems = listImg.sort((a, b) => a.id - b.id);
    return (
      <Grid
        item
        className={clsx(
          item.id == measurementSelect ? classes.borderboxIcon : "",
          classes.marginBoxIcon
        )}
        onClick={(e) => handleBoxIcon(e, item, index)}
      >
        {/* {sortedItems.map((img, index) => {
          if (img.type === item.measurement_type) {
            return (
              <img
                key={index}
                src={process.env.PUBLIC_URL + `img/${img.name}`}
                alt="Icon"
              />
            );
          }
          return null;
        })} */}
        {/* {renderImage()} */}
        {listImg.map((img, index) => {
          if (img.type === item.measurement_type) {
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

  const renderImage = () => {
    console.log("##  gggggggg", measurementName);
    if (measurementName === "Electrical") {
      return <img src={process.env.PUBLIC_URL + `img/Vector.png`} alt="Icon" />;
    } else if (measurementName === "Air") {
      return (
        <img src={process.env.PUBLIC_URL + `img/VectorNum.png`} alt="Icon" />
      );
    } else if (measurementName === "Hot") {
      return (
        <img src={process.env.PUBLIC_URL + `img/VectorIcon.png`} alt="Icon" />
      );
    } else if (measurementName === "Cold") {
      return (
        <img src={process.env.PUBLIC_URL + `img/VectorCool.png`} alt="Icon" />
      );
    }
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
    if (bllingTypeSelect !== "none") {
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
                placeholder={t("building:search")}
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
                {t("building:btnAdd")}
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
                            {row.latitude}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classes.fontSixeCell}
                          >
                            {row.longitude}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classes.fontSixeCell}
                          >
                            {row.no_of_floor}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classes.fontSixeCell}
                          >
                            {row.no_of_floor}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classes.fontSixeCell}
                          >
                            {row.no_of_unit}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classes.fontSixeCell}
                          >
                            <img
                              src={IconDocument}
                              alt="IconDocument"
                              onClick={(event) => {
                                openPageFlooreDetail(event, row.id);
                              }}
                            />

                            <img
                              src={IconShow}
                              alt="IconShow"
                              onClick={(event) => {
                                handleOpenView(event, row.id);
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
                    {/* {emptyRows > 0 && (
                      <TableRow
                        style={{
                          height: (dense ? 33 : 53) * emptyRows,
                        }}
                      >
                        <TableCell colSpan={6} />
                      </TableRow>
                    )} */}
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
          <Typography variant="h3">{t("building:edit")}</Typography>
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
                  {t("building:buildingName")}
                </Typography>
                <TextField
                  // id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("building:buildingName")}
                  fullWidth
                  variant="outlined"
                  value={buildingName}
                  onChange={handleBuildingName}
                  error={!isValidate && _.isEmpty(buildingName)}
                />
                {!isValidate && _.isEmpty(buildingName) ? (
                  <Validate errorText={"กรุณาระบุข้อมูล"} />
                ) : null}
              </Grid>
              <Grid item md={12}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("building:lattitude")}
                </Typography>
                <TextField
                  // id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("building:lattitude")}
                  fullWidth
                  variant="outlined"
                  value={lattitude}
                  onChange={handleLattitude}
                  error={lattitude ? false : !isValidate}
                />
                {lattitude ? (
                  false
                ) : !isValidate ? (
                  <Validate errorText={"กรุณาระบุข้อมูล"} />
                ) : null}
              </Grid>
              <Grid item md={12}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("building:longtitude")}
                </Typography>
                <TextField
                  // id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("building:longtitude")}
                  fullWidth
                  variant="outlined"
                  value={longtitude}
                  onChange={handleLongtitude}
                  error={longtitude ? false : !isValidate}
                />
                {longtitude ? (
                  false
                ) : !isValidate ? (
                  <Validate errorText={"กรุณาระบุข้อมูล"} />
                ) : null}
              </Grid>
              <Grid item md={12}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("building:area")}
                </Typography>
                <TextField
                  // id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("building:area")}
                  fullWidth
                  variant="outlined"
                  value={area}
                  onChange={handleArea}
                  error={area ? false : !isValidate}
                />
                {area ? (
                  false
                ) : !isValidate ? (
                  <Validate errorText={"กรุณาระบุข้อมูล"} />
                ) : null}
              </Grid>
              <Grid item md={12}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("building:upload")}
                </Typography>
                <Grid
                  item
                  md={12}
                  //   className={clsx(classes.flexRow, classes.justContentCenter)}
                >
                  <Grid item md={6} className={classes.displayContents}>
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

                  {/* {!isValidate && _.isNull(file) ? (
                    <Validate errorText={"กรุณาระบุข้อมูล"} />
                  ) : null} */}
                </Grid>
              </Grid>

              <Grid
                item
                md={12}
                className={clsx(classes.flexRowBtnModal, classes.marginRow)}
              >
                <Grid item md={3}>
                  <Button
                    onClick={handleCloseModalEdit}
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
          <Typography variant="h3">{t("building:add")}</Typography>
        </DialogTitle>
        <DialogContent>
          <Grid item md={12}>
            <Typography variant="subtitle2" className="pb-3">
              {t("building:buildingName")}
            </Typography>
            <TextField
              // id="input-with-icon-textfield"
              size="small"
              placeholder={t("building:buildingName")}
              fullWidth
              variant="outlined"
              value={buildingName}
              onChange={handleBuildingName}
              error={!isValidate && _.isEmpty(buildingName)}
            />
            {!isValidate && _.isEmpty(buildingName) ? (
              <Validate errorText={"กรุณาระบุข้อมูล"} />
            ) : null}
          </Grid>
          <Grid item md={12}>
            <Typography variant="subtitle2" className="mt-3 pb-3">
              {t("building:lattitude")}
            </Typography>
            <TextField
              // id="input-with-icon-textfield"
              size="small"
              placeholder={t("building:lattitude")}
              fullWidth
              variant="outlined"
              value={lattitude}
              onChange={handleLattitude}
              error={!isValidate && _.isEmpty(lattitude)}
            />
            {!isValidate && _.isEmpty(lattitude) ? (
              <Validate errorText={"กรุณาระบุข้อมูล"} />
            ) : null}
          </Grid>
          <Grid item md={12}>
            <Typography variant="subtitle2" className="mt-3 pb-3">
              {t("building:longtitude")}
            </Typography>
            <TextField
              // id="input-with-icon-textfield"
              size="small"
              placeholder={t("building:longtitude")}
              fullWidth
              variant="outlined"
              value={longtitude}
              onChange={handleLongtitude}
              error={!isValidate && _.isEmpty(longtitude)}
            />
            {!isValidate && _.isEmpty(longtitude) ? (
              <Validate errorText={"กรุณาระบุข้อมูล"} />
            ) : null}
          </Grid>
          <Grid item md={12}>
            <Typography variant="subtitle2" className="mt-3 pb-3">
              {t("building:area")}
            </Typography>
            <TextField
              // id="input-with-icon-textfield"
              size="small"
              placeholder={t("building:area")}
              fullWidth
              variant="outlined"
              value={area}
              onChange={handleArea}
              error={!isValidate && _.isEmpty(area)}
            />
            {!isValidate && _.isEmpty(area) ? (
              <Validate errorText={"กรุณาระบุข้อมูล"} />
            ) : null}
          </Grid>
          <Grid item md={12}>
            <Typography variant="subtitle2" className="mt-3 pb-3">
              {t("building:upload")}
            </Typography>
            <Grid
              item
              md={12}
              //   className={clsx(classes.flexRow, classes.justContentCenter)}
            >
              <Grid item md={6} className={classes.displayContents}>
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

              {/* {!isValidate && _.isNull(imagePreviewUrl) ? (
                <Validate errorText={"กรุณาระบุข้อมูล"} />
              ) : null} */}
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
          <Typography variant="h3">{buildingName}</Typography>
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
                      {buildingName ? buildingName : "-"}
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
                <Typography variant="h5"> {t("building:lattitude")}</Typography>
                <Grid item className="mt-2">
                  <Typography variant="body1">
                    {lattitude ? lattitude : "-"}
                  </Typography>
                </Grid>
              </Grid>

              <Grid item md={12} className={clsx(classes.marginRow)}>
                <Typography variant="h5">
                  {" "}
                  {t("building:longtitude")}
                </Typography>
                <Grid item className="mt-2">
                  <Typography variant="body1">
                    {longtitude ? longtitude : "-"}
                  </Typography>
                </Grid>
              </Grid>

              <Grid item md={12} className={clsx(classes.marginRow)}>
                <Typography variant="h5"> {t("building:area")}</Typography>
                <Grid item className="mt-2">
                  <Typography variant="body1">{area ? area : "-"}</Typography>
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
                  measurementList
                    .slice()
                    .sort((a, b) => {
                      // If the measurement_type is "Electrical", prioritize it by placing it first
                      if (a.measurement_type === "Electrical") {
                        return -1;
                      } else if (b.measurement_type === "Electrical") {
                        return 1;
                      }

                      // If the measurement_type is "Cold", prioritize it by placing it last
                      if (a.measurement_type === "Cold") {
                        return 1;
                      } else if (b.measurement_type === "Cold") {
                        return -1;
                      }
                      // For other measurement_types, sort in ascending order
                      return a.measurement_type - b.measurement_type;
                    })
                    .map((item, index) => {
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
                  {/* Billing Date */}
                  <Grid item md={12} className={classes.marginRow}>
                    <Typography variant="h4">Billing Date</Typography>
                  </Grid>
                  <Grid
                    item
                    md={12}
                    className={clsx(
                      classes.marginRow,
                      classes.flexRow,
                      classes.alignItem
                    )}
                  >
                    <Grid item md={3} className={classes.textCenter}>
                      <Typography variant="h5">
                        {" "}
                        {t("building:billingDate")}
                      </Typography>
                    </Grid>
                    <Grid item md={9} className={classes.textCenter}>
                      <FormControl variant="outlined" size="small" fullWidth>
                        <Select
                          labelId="demo-select-small-label"
                          // id="demo-select-small"
                          value={billDateList.length > 0 ? billDate : "none"}
                          placeholder={t("gateway:billingType")}
                          onChange={handleBillDate}
                          // error={billingTypeSelect === "none" && !isValidate}
                        >
                          <MenuItem value="none" disabled>
                            billDate
                          </MenuItem>
                          {billDateList.length > 0 &&
                            billDateList.map((item) => {
                              return (
                                <MenuItem
                                  id={"selectBillDateList-" + item.id}
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
                  </Grid>

                  {/* Currency type */}
                  <Grid item md={12} className={classes.marginRow}>
                    <Typography variant="h4">Currency type</Typography>
                  </Grid>
                  <Grid item md={12} className={clsx(classes.marginRow)}>
                    <FormControl variant="outlined" size="small" fullWidth>
                      <Select
                        labelId="demo-select-small-label"
                        // id="demo-select-small"
                        value={
                          currencyTypeList.length > 0
                            ? currencyTypeSelect
                            : "none"
                        }
                        placeholder={t("gateway:billingType")}
                        onChange={handleCurrencyType}
                        // error={billingTypeSelect === "none" && !isValidate}
                      >
                        <MenuItem value="none" disabled>
                          {t("building:selectCurrency")}
                        </MenuItem>
                        {currencyTypeList.length > 0 &&
                          currencyTypeList.map((item) => {
                            return (
                              <MenuItem
                                id={"selectCurrencyTypeList-" + item.id}
                                key={item.id}
                                value={item.id}
                              >
                                {item.currency_type}
                              </MenuItem>
                            );
                          })}
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
                        onClick={() => addbBildingParamUpdate(billId)}
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
                  {rowsBuildingPriceEdit.length > 0 &&
                    rowsBuildingPriceEdit.map((item, index) => (
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
                        {/* <Grid item md={2}>
                          <TextField
                            id="input-with-icon-textfield"
                            size="small"
                            fullWidth
                            variant="outlined"
                            value={generalSelect}
                          />
                        </Grid> */}
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
                                      handleGeneralExpensesBuildingUpdate(
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
                                      handleEditMeasurementBuilding(item, index)
                                    }
                                  />
                                  <img
                                    src={IconDelete}
                                    alt="IconDelete"
                                    className={clsx(classes.cursor)}
                                    onClick={(event) =>
                                      handleDeleteGeneralExpensesBuilding(
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
                                handleDeleteGeneralExpensesBuilding(
                                  event,
                                  item.id
                                )
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
                        onClick={addNewRowBuildingPrice}
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
                        onClick={addGeneralExpensesBuilding}
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

export default connect(mapStateToProps, mapDispatchToProps)(BuildingManagement);
