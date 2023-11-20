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
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
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
  addZone,
} from "../js/actions";
import IconDelete from "../images/icon/Delete.svg";
import IconDocument from "../images/icon/Document.svg";
import IconShow from "../images/icon/Show.svg";
import IconSetting from "../images/icon/Setting.svg";

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
  paddingIcon: {
    padding: "0px !important",
  },
}));

function descendingComparator(a, b, orderBy) {
  if (b.unit_info_id < a.unit_info_id) {
    return -1;
  }
  if (b.unit_info_id > a.unit_info_id) {
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

const not = (a, b) => {
  return a.filter((value) => b.indexOf(value) === -1);
};

const intersection = (a, b) => {
  // return a.filter((value) => b.indexOf(value.unit_info_id) !== -1);
  return a;
};

const intersectionLeft = (a, b) => {
  // return a.filter((value) => b.indexOf(value.id) !== -1);
  return a;
};

const ZoneDetailManagement = ({ t, pageName, subPageName, zoneData }) => {
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
  const [point, setPoint] = useState("");
  const [noPoint, setNoPoint] = useState("");
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
  const [unitTypeSelect, setUnitTypeSelect] = useState("none");
  const [billingId, setBillingId] = useState("");

  const dispatch = useDispatch();
  const classes = useStyles();
  const sideBar = useSelector((state) => state.sidebar);
  const token = useSelector((state) => state.token);
  const setZoneData = useSelector((state) => state.zone);
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
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  // const [sortedRows, setSortedRows] = useState(rows);
  const [searchQueryBuilding, setSearchQueryBuilding] = useState("");

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

  const [openAddZonePoint, setOpenAddZonePoint] = useState(false);
  const [checked, setChecked] = useState([]);
  const [checkedLeft, setCheckedLeft] = useState([]);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);

  const leftChecked = intersectionLeft(checkedLeft, left);
  const rightChecked = intersection(checked, right);

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
      getZoneUnitData(id);
      getUnitTypeList();
    }
  }, [token, setZoneData]);

  console.log("setZoneData", zoneData);

  const getZoneUnitData = async (id) => {
    setIsLoading(true);
    try {
      await API.connectTokenAPI(token);
      await API.getZoneUnitData(id).then((response) => {
        const dataPayload = response.data;
        console.log("dataPayload", dataPayload);
        dataPayload.length > 0 &&
          dataPayload.map((item) => {
            setBillingId(item.building_id);
          });
        setRight(dataPayload);
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

  // get uint building //
  const zoneUnitBuilding = async (id) => {
    setIsLoading(true);
    try {
      await API.connectTokenAPI(token);
      await API.zoneUnitBuilding(id).then((response) => {
        const dataPayload = response.data;
        // console.log("dataPayload====building", dataPayload);
        const filteredData = dataPayload.filter(
          (row) => !right.some((item) => item.unit_info_id === row.id)
        );
        console.log("=======>>>>", filteredData);
        setLeft(filteredData);
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
            // setUnitNumber(item.unit);
            setDescription(item.description);
            setUnitTypeSelect(item.type_id);
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

  const handleValidate = (type) => {
    let isValidate = true;
    if (type === "edit") {
      if (
        _.isEmpty(unitNumber) ||
        _.isEmpty(unitName) ||
        _.isEmpty(description) ||
        !unitTypeSelect ||
        _.isEmpty(imagePreviewUrl)
      ) {
        isValidate = false;
      }
      setIsValidate(isValidate);
    }

    if (isValidate) {
      if (type === "edit") {
        unitUpdate(isIdEdit);
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
              getZoneUnitData(id);
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
            getZoneUnitData(id);
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

  const zoneUnitDelete = async (rowId) => {
    setIsLoading(true);
    try {
      await API.connectTokenAPI(token);
      await API.unitDelete(rowId).then((response) => {
        const dataPayload = response.data;
        if (response.status === 200) {
          MySwal.fire({
            icon: "success",
            confirmButtonText: "ตกลง",
            text: dataPayload,
          });
          getZoneUnitData(id);
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
        zoneUnitDelete(id);
      } else if (result.isDismissed) {
        setIsLoading(false);
      }
    });
  };

  const handleClickOpen = (event, id) => {
    setOpen(true);
    getUnitView(id);
    setIsIdEdit(id);
    setIsValidate(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseView = () => {
    setOpenView(false);
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

  const handlePoint = (event) => {
    setPoint(event.target.value);
  };

  const handleNoPoint = (event) => {
    setNoPoint(event.target.value);
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
    setOpenAddZonePoint(true);
    if (zoneData.building_id) {
      zoneUnitBuilding(zoneData.building_id);
    }
  };

  const handleCloseZonePoint = () => {
    setOpenAddZonePoint(false);
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

  const openPageFloorDetail = () => {
    navigate("/zone");
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
      getZoneUnitData(id);
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
      getZoneUnitData(id);
    }
  };

  // Update visibleRows based on the searchQuery
  const updateVisibleRowsBuilding = (query) => {
    setIsLoading(true);
    if (query) {
      const filteredRows = left.filter((row) =>
        Object.values(row).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(query.toLowerCase())
        )
      );
      console.log("filteredRows", filteredRows);
      setLeft(filteredRows);
      setIsLoading(false);
    } else {
      zoneUnitBuilding(billingId);
    }
  };

  const handleSearchChangeBuilding = (event) => {
    const query = event.target.value;
    setSearchQueryBuilding(query);
    setIsLoading(true);
    // updateVisibleRowsBuilding(query);
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
      setLeft(filteredResults);
      setIsLoading(false);
    } else {
      zoneUnitBuilding(billingId);
    }
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const handleToggleLeft = (value) => () => {
    const currentIndex = checkedLeft.indexOf(value);
    const newChecked = [...checkedLeft];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setCheckedLeft(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
    handleUpdateZonePoint("all");
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setCheckedLeft(not(checkedLeft, leftChecked));
    handleUpdateZonePoint();
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
    handleCheckedDeleteData();
    // zoneUnitCheckedDelete();
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
    handleCheckedDeleteData("all");
  };

  const zoneUnitCheckedDelete = async (type) => {
    setOpenAddZonePoint(false);
    setIsLoading(true);
    try {
      let body = [];
      if (type === "all") {
        right.length > 0 &&
          right.map((item) => {
            const array = {
              id: item.zone_unit_id,
            };
            body.push(array);
          });
      } else {
        checked.map((value) => {
          const data = {
            id: value,
          };
          body.push(data);
        });
      }
      // console.log("8888888=======", body, checked, right);
      API.connectTokenAPI(token);
      await API.zoneUnitDelete(body).then((response) => {
        const dataPayload = response.data;
        console.log("dataPayload", dataPayload);
        if (response.status === 200) {
          MySwal.fire({
            icon: "success",
            confirmButtonText: "ตกลง",
            text: dataPayload,
          }).then((result) => {
            if (result.isConfirmed) {
              getZoneUnitData(id);
              // setOpenAddZonePoint(true);
            } else if (result.isDismissed) {
              setIsLoading(false);
            }
          });
          // zoneUnitBuilding(billingId);
          // getZoneUnitData(id);
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
  const handleCheckedDeleteData = (type) => {
    setOpenAddZonePoint(false);
    MySwal.fire({
      icon: "warning",
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
      showCancelButton: true,
      text: "คุณต้องการลบข้อมูลหรือไม่",
    }).then((result) => {
      if (result.isConfirmed) {
        zoneUnitCheckedDelete(type);
      } else if (result.isDismissed) {
        setIsLoading(false);
      }
    });
  };

  const handleSaveZonePoint = async () => {
    setOpenAddZonePoint(false);
    setIsLoading(true);
    try {
      let body = [];
      checkedLeft.map((value) => {
        const data = {
          zone_id: id,
          unit_id: value,
        };
        body.push(data);
      });
      // console.log("checkedLeft", checkedLeft, body);
      API.connectTokenAPI(token);
      await API.zoneUnitRegister(body).then((response) => {
        const dataPayload = response.data;
        // console.log("dataPayload====Point", dataPayload, response);
        if (response.status === 200) {
          MySwal.fire({
            icon: "success",
            confirmButtonText: "ตกลง",
            text: dataPayload,
          }).then((result) => {
            if (result.isConfirmed) {
              getZoneUnitData(id);
              setCheckedLeft([]);
              // await zoneUnitBuilding(billingId);
              // setOpenAddZonePoint(true);
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

  const handleUpdateZonePoint = async (type) => {
    setOpenAddZonePoint(false);
    setIsLoading(true);
    try {
      let body = [];
      if (type === "all") {
        left.length > 0 &&
          left.map((item) => {
            const array = {
              id: id,
              zone_id: item.zone_unit_id,
              unit_id: item.unit_info_id,
            };
            body.push(array);
          });
      } else {
        checkedLeft.map((value) => {
          const data = {
            id: id,
            zone_id: id,
            unit_id: value,
          };
          body.push(data);
        });
      }
      console.log("checkedLeft", checkedLeft, body);
      API.connectTokenAPI(token);
      await API.zoneUnitUpdate(body).then((response) => {
        const dataPayload = response.data;
        // console.log("dataPayload====Point", dataPayload, response);
        if (response.status === 200) {
          MySwal.fire({
            icon: "success",
            confirmButtonText: "ตกลง",
            text: dataPayload,
          }).then((result) => {
            if (result.isConfirmed) {
              getZoneUnitData(id);
              // setOpenAddZonePoint(true);
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

  const customList = (items) => (
    <Paper sx={{ width: "100%", height: "100%", overflow: "auto" }}>
      {isLoading ? (
        <Box mt={4} width={1} display="flex" justifyContent="center">
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <>
          <List dense component="div" role="list">
            {items.map((value) => {
              const labelId = `transfer-list-item-${value.zone_unit_id}-label`;

              return (
                <ListItem
                  key={value.zone_unit_id}
                  role="listitem"
                  button
                  onClick={handleToggle(value.zone_unit_id)}
                >
                  <ListItemIcon>
                    <Checkbox
                      checked={checked.indexOf(value.zone_unit_id) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{
                        "aria-labelledby": labelId,
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={value.unit} />
                </ListItem>
              );
            })}
          </List>
        </>
      )}
    </Paper>
  );

  const customListLeft = (items) => (
    <Paper sx={{ width: "100%", height: "100%", overflow: "auto" }}>
      {isLoading ? (
        <Box mt={4} width={1} display="flex" justifyContent="center">
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <>
          <List dense component="div" role="list">
            {items.map((value) => {
              const labelId = `transfer-list-item-${value.id}-label`;

              return (
                <ListItem
                  key={value.id}
                  role="listitem"
                  button
                  onClick={handleToggleLeft(value.id)}
                >
                  <ListItemIcon>
                    <Checkbox
                      checked={checkedLeft.indexOf(value.id) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{
                        "aria-labelledby": labelId,
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={value.unit} />
                </ListItem>
              );
            })}
          </List>
        </>
      )}
    </Paper>
  );

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
              onClick={openPageFloorDetail}
            >
              {" "}
              / {sideBar} / {pageName}
            </Typography>
            <Typography variant="h6">
              {subPageName ? " / " + subPageName : ""}{" "}
            </Typography>
          </Grid>
          {zoneData && (
            <Grid item md={12} className={classes.marginRow}>
              <Card>
                <CardContent>
                  <Typography variant="h4">{zoneData?.zone}</Typography>
                  <Typography variant="h5" className="pt-3">
                    {zoneData?.zone}
                  </Typography>
                  <Grid
                    item
                    md={12}
                    className={clsx(
                      classes.flexRow,
                      classes.justContent,
                      classes.marginRow
                    )}
                  >
                    <Grid item md={6}>
                      <Typography variant="body2">
                        {t("gateway:building")}
                      </Typography>
                      <Typography variant="subtitle2" className="pt-1">
                        {zoneData?.building_name}
                      </Typography>
                    </Grid>
                    <Grid item md={6}>
                      <Typography variant="body2">{t("zone:type")}</Typography>
                      <Typography variant="subtitle2" className="pt-1">
                        {zoneData?.type}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          )}
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
                {t("floor:btnAddUnitZone")}
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

                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, rowItem.name)}
                          role="checkbox"
                          // aria-checked={isItemSelected}
                          // tabIndex={-1}
                          key={rowItem.zone_unit_id}
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
                            {rowItem.unit_info_id}
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
                            {rowItem.type_id}
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
                            className={clsx(
                              classes.fontSixeCell,
                              classes.paddingIcon
                            )}
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
                                handleOpenView(event, rowItem.unit_info_id);
                              }}
                            />

                            <img
                              src={IconSetting}
                              alt="IconSetting"
                              onClick={(event) => {
                                handleClickOpen(event, rowItem.unit_info_id);
                              }}
                            />
                            <img
                              src={IconDelete}
                              alt="IconDelete"
                              onClick={(event) => {
                                handleClickDeleteData(
                                  event,
                                  rowItem.unit_info_id
                                );
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
                className={clsx(classes.flexRow, classes.alignItem)}
              >
                <Grid item md={3}>
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
                {_.isEmpty(imagePreviewUrl) && !isValidate && (
                  <Validate errorText={"กรุณาระบุข้อมูล"} />
                )}
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
                  onChange={handleBuilding}
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
                  onChange={handleFloorName}
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
                    onClick={() => handleValidate("edit")}
                  >
                    {t("gateway:btnSave")}
                  </Button>
                </Grid>
              </Grid>
            </>
          )}
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
                <Grid item md={9}>
                  <Grid
                    item
                    className={clsx(classes.boxMargin, classes.marginRow)}
                  >
                    <Typography variant="h5">
                      {unitName ? unitName : "-"}
                    </Typography>
                  </Grid>
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

      {/* Modal Add Zone Point*/}
      <Dialog
        fullScreen={fullScreen}
        // className={classes.modalWidth}
        open={openAddZonePoint}
        onClose={handleCloseZonePoint}
        aria-labelledby="responsive-dialog-title"
        classes={{
          paper: classes.modalWidth,
        }}
      >
        <DialogTitle id="responsive-dialog-title" className="mt-3">
          <Grid item md={12} className={clsx(classes.flexRow)}>
            <Grid item md={6}>
              <Typography variant="h3">
                {t("floor:building")} : {zoneData?.building_name}{" "}
              </Typography>
            </Grid>
            <Grid item md={6}>
              <Typography variant="h3">
                {t("floor:zone")} : {zoneData?.zone}{" "}
              </Typography>
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
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item md={12} className={classes.marginRow}>
                  <Grid item md={5}>
                    <TextField
                      // id="input-with-icon-textfield"
                      size="small"
                      placeholder="Search by Unit"
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchOutlinedIcon />
                          </InputAdornment>
                        ),
                      }}
                      variant="outlined"
                      value={searchQueryBuilding}
                      onChange={handleSearchChangeBuilding}
                    />
                  </Grid>
                </Grid>
                <Grid item md={5}>
                  {customListLeft(left)}
                </Grid>
                <Grid item>
                  <Grid container direction="column" alignItems="center">
                    {/* <Button
                      sx={{ my: 0.5 }}
                      variant="outlined"
                      size="small"
                      onClick={handleAllRight}
                      disabled={left.length === 0}
                      aria-label="move all right"
                    >
                      ≫
                    </Button> */}
                    {/* <Button
                      sx={{ my: 0.5 }}
                      variant="outlined"
                      size="small"
                      onClick={handleCheckedRight}
                      disabled={leftChecked.length === 0}
                      aria-label="move selected right"
                    >
                      &gt;
                    </Button> */}
                    <Button
                      sx={{ my: 0.5 }}
                      variant="outlined"
                      size="small"
                      onClick={handleCheckedLeft}
                      disabled={rightChecked.length === 0}
                      aria-label="move selected left"
                    >
                      &lt;
                    </Button>
                    <Button
                      sx={{ my: 0.5 }}
                      variant="outlined"
                      size="small"
                      onClick={handleAllLeft}
                      disabled={right.length === 0}
                      aria-label="move all left"
                    >
                      ≪
                    </Button>
                  </Grid>
                </Grid>
                <Grid item md={5}>
                  {customList(right)}
                </Grid>
                <Grid
                  item
                  md={12}
                  className={clsx(classes.flexRowBtnModal, classes.marginRow)}
                >
                  <Grid item md={3}>
                    <Button
                      onClick={handleCloseZonePoint}
                      className={clsx(classes.backGroundCancel)}
                      variant="outlined"
                    >
                      {t("gateway:btnCancel")}
                    </Button>
                  </Grid>
                  <Grid item md={3} className={classes.boxMargin}>
                    <Button
                      onClick={handleSaveZonePoint}
                      className={clsx(classes.backGroundConfrim)}
                      variant="outlined"
                    >
                      {t("gateway:btnSave")}
                    </Button>
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
    zone: state.zone,
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
)(ZoneDetailManagement);
