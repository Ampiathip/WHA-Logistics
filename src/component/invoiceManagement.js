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
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import StackedLineChartOutlinedIcon from "@mui/icons-material/StackedLineChartOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import dayjs from "dayjs";

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
    fontSize: "12px !important",
  },
  fontSixeCell: {
    fontSize: "12px !important",
  },
  marginIcon: {
    marginRight: "5px !important",
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
  displayContents: {
    display: "contents",
  },
  marginDate: {
    marginRight: "5px !important",
    marginLeft: "5px !important",
  },
  borderboxIcon: {
    border: "1px solid #000",
    // padding: 8,
    borderRadius: 10,
  },
  marginBoxIcon: {
    marginRight: 15,
  },
  backGroundPrint: {
    width: "100%",
    backgroundColor: "#F683AC !important",
    borderColor: "#F683AC !important",
    color: "#fff !important",
    "&:hover": {
      backgroundColor: "#F683AC !important",
      boxShadow: `none`,
    },
  },
  backGroundExcel: {
    width: "100%",
    backgroundColor: "#20744A !important",
    borderColor: "#20744A !important",
    color: "#fff !important",
    "&:hover": {
      backgroundColor: "#20744A !important",
      boxShadow: `none`,
    },
  },
}));

const rows = [
  {
    id: 1,
    lastName: "Snow",
    firstName: "Jon",
    age: 35,
    date: "ooo",
    data: "oooo",
    action: null,
  },
  {
    id: 2,
    lastName: "Lannister",
    firstName: "Cersei",
    age: 42,
    date: "ooo",
    data: "oooo",
    action: null,
  },
  {
    id: 3,
    lastName: "Lannister",
    firstName: "Jaime",
    age: 45,
    date: "ooo",
    data: "oooo",
    action: null,
  },
  {
    id: 4,
    lastName: "Stark",
    firstName: "Arya",
    age: 16,
    date: "ooo",
    data: "oooo",
    action: null,
  },
  {
    id: 5,
    lastName: "Targaryen",
    firstName: "Daenerys",
    age: null,
    date: "ooo",
    data: "oooo",
    action: null,
  },
  {
    id: 6,
    lastName: "Melisandre",
    firstName: null,
    age: 150,
    date: "ooo",
    data: "oooo",
    action: null,
  },
  {
    id: 7,
    lastName: "Clifford",
    firstName: "Ferrara",
    age: 44,
    date: "ooo",
    data: "oooo",
    action: null,
  },
  {
    id: 8,
    lastName: "Frances",
    firstName: "Rossini",
    age: 36,
    date: "ooo",
    data: "oooo",
    action: null,
  },
  {
    id: 9,
    lastName: "Roxie",
    firstName: "Harvey",
    age: 65,
    date: "ooo",
    data: "oooo",
    action: null,
  },
];

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
    disablePadding: false,
    label: "Select",
  },
  {
    id: "calories",
    numeric: false,
    disablePadding: false,
    label: "Unit No.",
  },
  {
    id: "fat",
    numeric: false,
    disablePadding: false,
    label: "Issue Date",
  },
  {
    id: "carbs",
    numeric: false,
    disablePadding: false,
    label: "Due Date",
  },
  {
    id: "power",
    numeric: false,
    disablePadding: false,
    label: "Recent",
  },
  {
    id: "protein",
    numeric: false,
    disablePadding: false,
    label: "Previous",
  },
  {
    id: "unit",
    numeric: false,
    disablePadding: false,
    label: "Total Use",
  },
  {
    id: "rate",
    numeric: false,
    disablePadding: false,
    label: "Rate",
  },
  {
    id: "totalCharge",
    numeric: false,
    disablePadding: false,
    label: "Total Charge",
  },
  {
    id: "currency",
    numeric: false,
    disablePadding: false,
    label: "Currency",
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

const InvoiceManagement = ({ t, login }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const dispatch = useDispatch();
  const classes = useStyles();
  const sideBar = useSelector((state) => state.sidebar);
  const token = useSelector((state) => state.token);
  const theme = useTheme();
  const navigate = useNavigate();
  // modal //
  const [open, setOpen] = useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
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
  const [fitterSelect, setFitterSelect] = useState("none");
  const [nameBox, setNameBox] = useState("");
  const [value, setValue] = useState(dayjs());
  const [valueEnd, setValueEnd] = useState(dayjs().add(30, "day"));
  const [measurementList, setMeasurementList] = useState([]);
  const [measurementSelect, setMeasurementSelect] = useState("");
  const [buildingList, setBuildingList] = useState([]);
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
    }
    console.log("token", token, login);
  }, [token]);

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
          if (item.measurement_type === "Electrical") {
            setMeasurementSelect(item.id);
            setMeasurementName(item.measurement_type);
            getInvoiceData(value, valueEnd, item.id);
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

  const getBuilding = async () => {
    setIsLoading(true);
    try {
      await API.connectTokenAPI(token);
      await API.getBuildingData().then((response) => {
        const dataPayload = response.data;
        setBuildingList(dataPayload);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
      const response = error.response;
      swalFire(response.data);
      setIsLoading(false);
    }
  };

  const getInvoiceData = async (startTime, endTime, measurementSelect) => {
    setIsLoading(true);
    try {
      await API.connectTokenAPI(token);
      await API.getInvoiceData(startTime, endTime, measurementSelect).then(
        (response) => {
          const dataPayload = response.data;
          console.log("###### ", dataPayload);
          setRows(dataPayload);
          setIsLoading(false);
        }
      );
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

  const handleClickOpen = (event, id) => {
    setOpen(true);
    // getBuildingView(id);
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

  const sortedRows = useMemo(() => {
    if (fitterSelect !== "none") {
      const sorted = stableSort(rows, getComparator(order, orderBy));
      return sorted.filter((item) => item.building_id === fitterSelect);
    } else {
      return stableSort(rows, getComparator(order, orderBy));
    }
  }, [order, orderBy, rows, fitterSelect]);

  const visibleRows = useMemo(
    () =>
      sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage, sortedRows]
  );

  console.log("#Nan sortedRows", sortedRows, visibleRows);

  const handleOpenView = (event, id) => {
    setOpenView(true);
    // getBuildingView(id);
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
      // setRows(filteredRows);
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
      // setRows(filteredResults);
    } else {
      getBuilding();
    }
  };

  const handleFitterSelectChange = (event) => {
    setFitterSelect(event.target.value);
  };

  const handleBoxIcon = async (event, name, index) => {
    console.log("#Nan 888888888", name, index);
    setMeasurementSelect(name.id);
    getInvoiceData(value, valueEnd, name.id);
  };

  const handleValue = (newValue) => {
    console.log("###", newValue);
    // const dateFormat = newValue.format('YYYY-MM-DD')
    setValue(newValue);
    // getInvoiceData(dateFormat, valueEnd, measurementSelect);
  };

  const handleValueEnd = (newValue) => {
    // const dateEndFormat = newValue.format('YYYY-MM-DD')
    setValueEnd(newValue);
    // getInvoiceData(value, dateEndFormat, measurementSelect);
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
    return (
      <Grid
        item
        className={clsx(
          item.id == measurementSelect ? classes.borderboxIcon : "",
          classes.marginBoxIcon
        )}
        onClick={(e) => handleBoxIcon(e, item, index)}
      >
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

  return (
    <Box className={classes.marginRow}>
      {isLoading ? (
        <Box mt={4} width={1} display="flex" justifyContent="center">
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <>
          <Grid item md={12} className={clsx(classes.flexRow)}>
            <Grid item className={clsx(classes.flexRow)}>
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
                    // For other measurement_types, sort in ascending order
                    return a.measurement_type - b.measurement_type;
                  })
                  .map((item, index) => {
                    return renderViewBox(item, index);
                  })}
            </Grid>
            <Grid item md={10} className={clsx(classes.flexRowBtnModal)}>
              <Grid item md={4} className={classes.marginBoxIcon}>
                <Button
                  className={clsx(classes.backGroundPrint)}
                  variant="outlined"
                >
                  {t("invoice:print")}
                </Button>
              </Grid>
              <Grid item md={4}>
                <Button
                  className={clsx(classes.backGroundExcel)}
                  variant="outlined"
                >
                  {t("invoice:excel")}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            md={12}
            className={clsx(classes.flexRow, classes.marginRow)}
          >
            <Grid item className={classes.flexRow}>
              <HomeOutlinedIcon className={classes.alignSelf} />
              <Typography variant="h6"> / {sideBar}</Typography>
            </Grid>
            <Grid item md={11} className={classes.textCenter}>
              <Typography variant="h5">{t("invoice:period")}</Typography>
            </Grid>
          </Grid>
          <Grid
            item
            md={12}
            className={clsx(classes.flexRow, classes.justContent)}
          >
            <Grid item md={3} className={classes.marginRow}>
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
              <FormControl variant="outlined" size="small" fullWidth>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={fitterSelect}
                  placeholder={t("invoice:select")}
                  onChange={handleFitterSelectChange}
                >
                  <MenuItem value="none" disabled>
                    {t("invoice:select")}
                  </MenuItem>
                  {buildingList.length > 0 &&
                    buildingList.map((item) => {
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
            </Grid>
            <Grid
              item
              // md={5}
              className={clsx(classes.flexRow)}
            >
              <Grid item className={clsx(classes.flexRow, classes.alignItem)}>
                <Typography variant="subtitle2" className={classes.marginIcon}>
                  {t("invoice:start")}
                </Typography>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      value={value}
                      onChange={(newValue) => handleValue(newValue)}
                      format="YYYY-MM-DD"
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <Grid item className={clsx(classes.flexRow, classes.alignItem)}>
                <Typography variant="subtitle2" className={classes.marginDate}>
                  {t("invoice:end")}
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      value={valueEnd}
                      onChange={(newValue) => handleValueEnd(newValue)}
                      format="YYYY-MM-DD"
                      slotProps={{
                        textField: {
                          error: _.isEmpty(valueEnd),
                        },
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Grid>

          <Box sx={{ width: "100%" }} className={classes.marginRow}>
            <Paper sx={{ width: "100%", mb: 2 }}>
              {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
              <TableContainer>
                <Table
                  sx={{ minWidth: 750 }}
                  aria-labelledby="tableTitle"
                  // size={dense ? "small" : "medium"}
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
                      const isItemSelected = isSelected(row.id);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, row.id)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.name}
                          selected={isItemSelected}
                          sx={{ cursor: "pointer" }}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                            />
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                            className={classes.fontSixeCell}
                            align="center"
                          >
                            {row.unit_id}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classes.fontSixeCell}
                          >
                            {row.issue_date}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classes.fontSixeCell}
                          >
                            {row.due_date}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classes.fontSixeCell}
                          >
                            {row.recent}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classes.fontSixeCell}
                          >
                            {row.previus}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classes.fontSixeCell}
                          >
                            {row.total_use}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classes.fontSixeCell}
                          >
                            {row.rate}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classes.fontSixeCell}
                          >
                            {row.total_charge}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classes.fontSixeCell}
                          >
                            {row.currency}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classes.fontSixeCell}
                          >
                            {/* <img
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
                            /> */}
                            <img
                              src={IconDelete}
                              alt="IconDelete"
                              // onClick={(event) => {
                              //   handleClickDeleteData(event, row.id);
                              // }}
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
          {/* <Typography variant="h3">{buildingName}</Typography> */}
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
                      {/* {buildingName ? buildingName : "-"} */}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item md={12} className={clsx(classes.marginRow)}>
                <Typography variant="h5"> {t("building:lattitude")}</Typography>
                <Grid item className="mt-2">
                  <Typography variant="body1">
                    {/* {lattitude ? lattitude : "-"} */}
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
                    {/* {longtitude ? longtitude : "-"} */}
                  </Typography>
                </Grid>
              </Grid>

              <Grid item md={12} className={clsx(classes.marginRow)}>
                <Typography variant="h5"> {t("building:area")}</Typography>
                <Grid item className="mt-2">
                  {/* <Typography variant="body1">{area ? area : "-"}</Typography> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceManagement);
