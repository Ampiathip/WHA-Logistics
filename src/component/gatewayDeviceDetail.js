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
  Card,
  CardContent,
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
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import { Topic } from "@mui/icons-material";

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
    fontSize: "15px !important",
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

function createData(name, calories, fat, device, carbs, power, protein, unit) {
  return {
    name,
    calories,
    fat,
    device,
    carbs,
    power,
    protein,
    unit,
  };
}

const rows = [
  createData(
    1,
    "Gateway 1",
    "JCA Brand",
    "JCA Model One",
    "Gateway 1",
    20,
    20,
    "2022-01-01"
  ),
  createData(
    2,
    "Device 2",
    "JCA Brand",
    "JCA Model One",
    "Gateway 2",
    20,
    20,
    "2022-01-01"
  ),
  createData(
    3,
    "Device 3",
    "JCA Brand",
    "JCA Model One",
    "Gateway 3",
    20,
    20,
    "2022-01-01"
  ),
  createData(
    4,
    "Device 4",
    "JCA Brand",
    "JCA Model One",
    "Gateway 4",
    20,
    20,
    "2022-01-01"
  ),
  createData(
    5,
    "Device 5",
    "JCA Brand",
    "JCA Model One",
    "Gateway 5",
    20,
    20,
    "2022-01-01"
  ),
  createData(
    6,
    "Device 6",
    "JCA Brand",
    "JCA Model One",
    "Gateway 6",
    20,
    20,
    "2022-01-01"
  ),
  createData(
    7,
    "Device 7",
    "JCA Brand",
    "JCA Model One",
    "Gateway 7",
    20,
    20,
    "2022-01-01"
  ),
  createData(
    8,
    "Device 8",
    "JCA Brand",
    "JCA Model One",
    "Gateway 8",
    20,
    20,
    "2022-01-01"
  ),
  createData(
    9,
    "Device 9",
    "JCA Brand",
    "JCA Model One",
    "Gateway 9",
    20,
    20,
    "2022-01-01"
  ),
  createData(
    10,
    "Device 10",
    "JCA Brand",
    "JCA Model One",
    "Gateway 10",
    20,
    20,
    "2022-01-01"
  ),
  createData(
    11,
    "Device 11",
    "JCA Brand",
    "JCA Model One",
    "Gateway 11",
    20,
    20,
    "2022-01-01"
  ),
  createData(
    12,
    "Device 12",
    "JCA Brand",
    "JCA Model One",
    "Gateway 12",
    20,
    20,
    "2022-01-01"
  ),
  createData(
    13,
    "Device 13",
    "JCA Brand",
    "JCA Model One",
    "Gateway 13",
    20,
    20,
    "2022-01-01"
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

export default function EnhancedTable({ t, pageName }) {
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

  const classes = useStyles();
  const sideBar = useSelector((state) => state.sidebar);
  const theme = useTheme();
  // modal //
  const [open, setOpen] = useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [openAdd, setOpenAdd] = useState(false);
  const [file, setFile] = useState(null);
  const [communicationType, setCommunicationType] = useState("none");
  const [openView, setOpenView] = useState(false);
  const fullScreenView = useMediaQuery(theme.breakpoints.down("xl"));
  // view //
  const [rowsPerPageView, setRowsPerPageView] = useState(5);
  const [pageView, setPageView] = useState(0);
  const [rowsPoint, setRowsPoint] = useState([
    {
      name: 1,
      code: "India",
      population: "IN",
      size: 1324171354,
      density: 3287263,
      unit: "RM001",
    },
  ]);
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
      id: "size",
      label: "Data",
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
    // {
    //   id: 'action',
    //   label: 'Action',
    //   minWidth: 170,
    //   align: 'center',
    //   format: (value) => value.toFixed(2),
    // },
  ];
  // edit //
  const [deviceId, setDeviceId] = useState("");
  const [pointName, setPointName] = useState("");
  const [topic, setTopic] = useState("");
  const [data, setData] = useState("");
  const [dataUnit, setDataUnit] = useState("");
  const [unitBinding, setUnitBinding] = useState("");
  const [rowsPerPageEdit, setRowsPerPageEdit] = useState(5);
  const [pageEdit, setPageEdit] = useState(0);
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
    {
      id: "size",
      label: "Data",
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
    {
      id: "action",
      label: "Action",
      align: "center",
    },
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenView = () => {
    setOpenView(true);
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

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
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

  const handleCloseView = () => {
    setOpenView(false);
  };

  const handleUploadFile = (e) => {
    // setFile(e.target.files[0]);
    if (e.target.files.length > 0) {
      setFile(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleCommunicationType = (event) => {
    setCommunicationType(event.target.value);
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

  const handleChangePageEdit = (event, newPage) => {
    setPageEdit(newPage);
  };

  const handleChangeRowsPerPageEdit = (event) => {
    setRowsPerPageEdit(parseInt(event.target.value));
    setPageEdit(0);
  };

  const deleteRow = (rowName) => {
    // const updatedRows = rowsPointEdit.filter((row) => row.name !== rowName);
    // setRowsPointEdit(updatedRows);
  };

  const handleDeviceId  = (event) => {
    setDeviceId(event.target.value);
  };

  const handlePointName  = (event) => {
    setPointName(event.target.value);
  };

  const handleTopic  = (event) => {
    setTopic(event.target.value);
  };

  const handleData  = (event) => {
    setData(event.target.value);
  };

  const handleDataUnit  = (event) => {
    setDataUnit(event.target.value);
  };

  const handleUnitBinding  = (event) => {
    setUnitBinding(event.target.value);
  };

  return (
    <Container className={classes.marginRow}>
      <Grid item className={classes.flexRow}>
        <HomeOutlinedIcon
          className={clsx(pageName ? classes.activeColor : classes.alignSelf)}
        />
        <Typography
          variant="h6"
          className={clsx(pageName ? classes.activeColor : "")}
        >
          {" "}
          / {sideBar}{" "}
        </Typography>
        <Typography variant="h6"> / {pageName} </Typography>
      </Grid>
      <Grid item md={12} className={clsx(classes.flexRow, classes.justContent)}>
        <Grid item md={5} className={classes.marginRow}>
          <TextField
            id="input-with-icon-textfield"
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
                        {row.device}
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
                          onClick={handleClickOpenView}
                        />
                        <SettingsOutlinedIcon onClick={handleClickOpen} />
                        <DeleteOutlineOutlinedIcon />
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
          <Box className={classes.borderBox}>
            <Card className={clsx(classes.cardBoxGeteway)}>
              <CardContent>
                <Typography variant="h5">{t("gateway:gatewayInfo")}</Typography>
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
                    <Button variant="outlined" className={classes.btnSecret}>
                      <KeyOutlinedIcon />
                      <Typography variant="body1">View Secret</Typography>
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card className={clsx("mt-3", classes.cardBox)}>
              <CardContent>
                <Typography variant="h5">{t("gateway:DeviceInfo")}</Typography>
                <Grid item md={12} className={clsx(classes.flexRow)}>
                  <Grid item md={6} className={classes.marginIcon}>
                    {file ? (
                      <img
                        src={file}
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
                      <Typography variant="h6"> 1</Typography>
                    </Grid>
                    <Grid
                      item
                      className={clsx(classes.flexRow, classes.justContent)}
                    >
                      <Typography variant="h6"> Device name</Typography>
                      <Typography variant="h6"> Device 1</Typography>
                    </Grid>
                    <Grid
                      item
                      className={clsx(classes.flexRow, classes.justContent)}
                    >
                      <Typography variant="h6"> Brand</Typography>
                      <Typography variant="h6"> JCA Brand</Typography>
                    </Grid>
                    <Grid
                      item
                      className={clsx(classes.flexRow, classes.justContent)}
                    >
                      <Typography variant="h6"> Model</Typography>
                      <Typography variant="h6"> JCA Model One</Typography>
                    </Grid>
                    <Grid
                      item
                      className={clsx(classes.flexRow, classes.justContent)}
                    >
                      <Typography variant="h6"> Type</Typography>
                      <Typography variant="h6"> Modebus RTU</Typography>
                    </Grid>
                    <Grid
                      item
                      className={clsx(classes.flexRow, classes.justContent)}
                    >
                      <Typography variant="h6"> Installation Date</Typography>
                      <Typography variant="h6"> 2022-01-01</Typography>
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

            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 640 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columnsPointEdit.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth, fontSize: 16 }}
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
                      .map((row) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.code}
                          >
                            <TableCell
                              component="th"
                              id={row.name}
                              scope="row"
                              padding="none"
                              style={{ fontSize: 16 }}
                              align="center"
                            >
                              {row.name ? (
                                row.name
                              ) : (
                                <Grid item className={classes.marginDataTable}>
                                  <TextField
                                    value={deviceId}
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    onChange={handleDeviceId}
                                  />
                                </Grid>
                              )}
                            </TableCell>
                            <TableCell
                              component="th"
                              id={row.name}
                              scope="row"
                              padding="none"
                              style={{ fontSize: 16 }}
                              align="center"
                            >
                              {row.code ? (
                                row.code
                              ) : (
                                <Grid item className={classes.marginDataTable}>
                                  <TextField
                                    value={pointName}
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    onChange={handlePointName}
                                  />
                                </Grid>
                              )}
                            </TableCell>
                            <TableCell
                              component="th"
                              id={row.name}
                              scope="row"
                              padding="none"
                              style={{ fontSize: 16 }}
                              align="center"
                            >
                              {row.population ? (
                                row.population
                              ) : (
                                <Grid item className={classes.marginDataTable}>
                                  <TextField
                                    value={topic}
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    onChange={handleTopic}
                                  />
                                </Grid>
                              )}
                            </TableCell>
                            <TableCell
                              component="th"
                              id={row.name}
                              scope="row"
                              padding="none"
                              style={{ fontSize: 16 }}
                              align="center"
                            >
                              {row.size ? (
                                row.size
                              ) : (
                                <Grid item className={classes.marginDataTable}>
                                  <TextField
                                    value={data}
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    onChange={handleData}
                                  />
                                </Grid>
                              )}
                            </TableCell>
                            <TableCell
                              component="th"
                              id={row.name}
                              scope="row"
                              padding="none"
                              style={{ fontSize: 16 }}
                              align="center"
                            >
                              {row.density ? (
                                row.density
                              ) : (
                                <Grid item className={classes.marginDataTable}>
                                  <TextField
                                    value={dataUnit}
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    onChange={handleDataUnit}
                                  />
                                </Grid>
                              )}
                            </TableCell>
                            <TableCell
                              component="th"
                              id={row.name}
                              scope="row"
                              padding="none"
                              style={{ fontSize: 16 }}
                              align="center"
                            >
                              {row.unit ? (
                                row.unit
                              ) : (
                                <Grid item className={classes.marginDataTable}>
                                  <TextField
                                    value={unitBinding}
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    onChange={handleUnitBinding}
                                  />
                                </Grid>
                              )}
                            </TableCell>
                            <TableCell
                              component="th"
                              id={row.name}
                              scope="row"
                              padding="none"
                              align="center"
                            >
                              {row.action ? (
                                <>
                                  {/* <BorderColorOutlinedIcon /> */}
                                  <DeleteOutlineOutlinedIcon
                                    onClick={deleteRow(row.name)}
                                  />
                                </>
                              ) : (
                                <DeleteOutlineOutlinedIcon />
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
                  onClick={handleClose}
                  className={clsx(classes.backGroundConfrim)}
                  variant="outlined"
                >
                  {t("gateway:btnSave")}
                </Button>
              </Grid>
            </Grid>
          </Box>
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
                {/* <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem> */}
              </Select>
            </FormControl>
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
                  {file ? (
                    <img
                      src={file}
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
              >
                {t("building:btnAddModal")}
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        {/* <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            {t("building:btnCancel")}
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            {t("building:btnAddModal")}
          </Button>
        </DialogActions> */}
      </Dialog>

      {/* Modal ViewData */}
      <Dialog
        fullScreen={fullScreenView}
        // className={classes.modalWidth}
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
          <Box>
            <Card className={clsx(classes.cardBoxGeteway)}>
              <CardContent>
                <Typography variant="h5">{t("gateway:gatewayInfo")}</Typography>
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
                    <Button variant="outlined" className={classes.btnSecret}>
                      <KeyOutlinedIcon />
                      <Typography variant="body1">View Secret</Typography>
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card className={clsx("mt-3", classes.cardBox)}>
              <CardContent>
                <Typography variant="h5">{t("gateway:DeviceInfo")}</Typography>
                <Grid item md={12} className={clsx(classes.flexRow)}>
                  <Grid item md={6} className={classes.marginIcon}>
                    {file ? (
                      <img
                        src={file}
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
                      <Typography variant="h6"> 1</Typography>
                    </Grid>
                    <Grid
                      item
                      className={clsx(classes.flexRow, classes.justContent)}
                    >
                      <Typography variant="h6"> Device name</Typography>
                      <Typography variant="h6"> Device 1</Typography>
                    </Grid>
                    <Grid
                      item
                      className={clsx(classes.flexRow, classes.justContent)}
                    >
                      <Typography variant="h6"> Brand</Typography>
                      <Typography variant="h6"> JCA Brand</Typography>
                    </Grid>
                    <Grid
                      item
                      className={clsx(classes.flexRow, classes.justContent)}
                    >
                      <Typography variant="h6"> Model</Typography>
                      <Typography variant="h6"> JCA Model One</Typography>
                    </Grid>
                    <Grid
                      item
                      className={clsx(classes.flexRow, classes.justContent)}
                    >
                      <Typography variant="h6"> Type</Typography>
                      <Typography variant="h6"> Modebus RTU</Typography>
                    </Grid>
                    <Grid
                      item
                      className={clsx(classes.flexRow, classes.justContent)}
                    >
                      <Typography variant="h6"> Installation Date</Typography>
                      <Typography variant="h6"> 2022-01-01</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
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
                          style={{ minWidth: column.minWidth, fontSize: 18 }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rowsPoint
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
                            {columnsPoint.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  style={{ fontSize: 15 }}
                                >
                                  {column.format && typeof value === "number"
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 8, 10]}
                component="div"
                count={rowsPoint.length}
                rowsPerPage={rowsPerPageView}
                page={pageView}
                onPageChange={handleChangePageView}
                onRowsPerPageChange={handleChangeRowsPerPageView}
              />
            </Paper>
          </Box>
        </DialogContent>
      </Dialog>
    </Container>
  );
}
