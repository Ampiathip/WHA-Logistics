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
    backgroundColor: "#03257D !important",
    color: "#fff !important",
    "&:hover": {
      backgroundColor: "#03257D !important",
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
    label: "Devices Name",
  },
  {
    id: "fat",
    numeric: true,
    disablePadding: false,
    label: "Current AVG (A)",
  },
  {
    id: "carbs",
    numeric: true,
    disablePadding: false,
    label: "Voltage AVG (V)",
  },
  {
    id: "power",
    numeric: true,
    disablePadding: false,
    label: "Power Total (kW)",
  },
  {
    id: "protein",
    numeric: true,
    disablePadding: false,
    label: "Energy Total (kWh)",
  },
  {
    id: "action",
    numeric: true,
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

const DeviceManagement = ({ t, login }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [meterId, setMeterId] = useState("");
  const [meterName, setMeterName] = useState("");
  const [installation, setInstallation] = useState("");
  const [numberSN, setNumberSN] = useState("");
  const [band, setBand] = useState("");
  const [series, setSeries] = useState("");
  const [remark, setRemark] = useState("");
  const [file, setFile] = useState("");

  const dispatch = useDispatch();
  const classes = useStyles();
  const sideBar = useSelector((state) => state.sidebar);
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const theme = useTheme();
  // modal //
  const [open, setOpen] = useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down("xl"));
  const [openAdd, setOpenAdd] = useState(false);

  const [openView, setOpenView] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [isValidate, setIsValidate] = useState(true);
  const [isIdEdit, setIsIdEdit] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [sortedRows, setSortedRows] = useState(rows);

  const swalFire = (msg) => {
    MySwal.fire({
      icon: "error",
      confirmButtonText: "ตกลง",
      text: msg,
    });
  };

  // useEffect(() => {
  //   dispatch(checkToken());
  //   if (!_.isEmpty(token)) {
  //     getDevice();
  //   }
  // }, [token]);

  const getDevice = async () => {
    setIsLoading(true);
    try {
      const boby = {
        listGatewayID: [1, 2, 3],
      };
      await API.connectTokenAPI(token);
      await API.getDeviceData(boby).then((response) => {
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

  const deviceRegister = async () => {
    setIsLoading(true);
    let reader = new window.FileReader();
    reader.readAsDataURL(file);
    try {
      reader.onload = async () => {
        const base64File = reader.result; // Extract the base64 data
        const body = {
          deviceName: meterName,
          gatewayID: "",
          deviceBand: band,
          model: series,
          serialNumber: numberSN,
          installationDate: installation,
          communicationType: "",
          description: remark,
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
  };

  const deviceUpdate = async (id) => {
    setIsLoading(true);
    let reader = new window.FileReader();
    reader.readAsDataURL(file);
    try {
      reader.onload = async () => {
        const base64File = reader.result; // Extract the base64 data
        const body = {
          deviceName: meterName,
          gatewayID: "",
          deviceBand: band,
          model: series,
          serialNumber: numberSN,
          installationDate: installation,
          communicationType: "",
          description: remark,
          file: base64File, // Include the Base64 encoded file
        };
        await API.connectTokenAPI(token);
        await API.deviceUpdate(id, body).then((response) => {
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
            // setFile(item.file);
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

  const handleClickOpen = () => {
    setOpen(true);
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

  const visibleRows = useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, rows]
  );

  const handleMeterIdChange = (event) => {
    setMeterId(event.target.value);
  };

  const handleMeterNameChange = (event) => {
    setMeterName(event.target.value);
  };

  const handleBandChange = (event) => {
    setBand(event.target.value);
  };

  const handleSeriesChange = (event) => {
    setSeries(event.target.value);
  };

  const handleInstallationChange = (event) => {
    setInstallation(event.target.value);
  };

  const handleRemarkChange = (event) => {
    setRemark(event.target.value);
  };

  const handleNumberSNChange = (event) => {
    setNumberSN(event.target.value);
  };

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
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
      updateVisibleRows(query);
    };

  return (
    <Container className={classes.marginRow}>
      <Grid item className={classes.flexRow}>
        <HomeOutlinedIcon className={classes.alignSelf} />
        <Typography variant="h6"> / {sideBar}</Typography>
      </Grid>
      <Grid item md={12} className={clsx(classes.flexRow, classes.justContent)}>
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
            onClick={handleClickOpenAdd}
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
                        <img
                          src={IconDocument}
                          alt="IconDocument"
                          // onClick={(event) => {
                          //   openPageZoneDetail(event, row.id);
                          //   handleDetailZone(event, row);
                          // }}
                        />

                        <img
                          src={IconShow}
                          alt="IconShow"
                          // onClick={(event) => {
                          //   handleClickOpenView(event, row.id);
                          // }}
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
              onClick={handleClose}
            />
            {t("diveices:realtime")}
          </Typography>
          <CloseIcon onClick={handleClose} className={clsx(classes.cursor)} />
        </DialogTitle>
        <DialogContent
          className={clsx(
            classes.flexRow,
            classes.modalContent,
            classes.paddingContent
          )}
        >
          <Box className="mt-3">
            <Grid
              item
              md={12}
              className={clsx(
                classes.flexRow,
                classes.justContent,
                classes.alignItem
              )}
            >
              <Grid item md={5} className={classes.borderImg}>
                <Grid item md={12}>
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
                    {imagePreviewUrl ? (
                      <img
                        src={imagePreviewUrl}
                        alt="img-upload"
                        className={classes.imgWidth}
                      />
                    ) : (
                      <img
                        src={process.env.PUBLIC_URL + "/img/Group.png"}
                        alt="img-test"
                        className={classes.imgWidth}
                      />
                    )}
                  </label>
                </Grid>
              </Grid>
              <Grid item md={7}>
                <Grid item className={classes.boxMargin}>
                  <Typography variant="subtitle2" className="pb-3">
                    {t("diveices:meter")}
                  </Typography>
                  <TextField
                    id="input-with-icon-textfield"
                    size="small"
                    placeholder={t("diveices:meter")}
                    fullWidth
                    variant="outlined"
                    value={meterId}
                    disabled
                    // onChange={handleMeterIdChange}
                  />
                </Grid>
                <Grid
                  item
                  className={clsx(classes.boxMargin, classes.marginRow)}
                >
                  <Typography variant="subtitle2" className="pb-3">
                    {t("diveices:meterName")}
                  </Typography>
                  <TextField
                    id="input-with-icon-textfield"
                    size="small"
                    placeholder={t("diveices:meterName")}
                    fullWidth
                    variant="outlined"
                    value={meterName}
                    onChange={handleMeterNameChange}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={12}>
              <Typography variant="subtitle2" className="mt-3 pb-3">
                {t("diveices:installation")}
              </Typography>
              <TextField
                id="input-with-icon-textfield"
                size="small"
                placeholder={t("diveices:installation")}
                fullWidth
                variant="outlined"
                value={installation}
                onChange={handleInstallationChange}
              />
            </Grid>
            <Grid item md={12}>
              <Typography variant="subtitle2" className="mt-3 pb-3">
                {t("diveices:sn")}
              </Typography>
              <TextField
                id="input-with-icon-textfield"
                size="small"
                placeholder={t("diveices:sn")}
                fullWidth
                variant="outlined"
                value={numberSN}
                onChange={handleNumberSNChange}
              />
            </Grid>
            <Grid item md={12}>
              <Typography variant="subtitle2" className="mt-3 pb-3">
                {t("diveices:band")}
              </Typography>
              <TextField
                id="input-with-icon-textfield"
                size="small"
                placeholder={t("diveices:band")}
                fullWidth
                variant="outlined"
                value={band}
                onChange={handleBandChange}
              />
            </Grid>
            <Grid item md={12}>
              <Typography variant="subtitle2" className="mt-3 pb-3">
                {t("diveices:series")}
              </Typography>
              <TextField
                id="input-with-icon-textfield"
                size="small"
                placeholder={t("diveices:series")}
                fullWidth
                variant="outlined"
                value={series}
                onChange={handleSeriesChange}
              />
            </Grid>
            <Grid item md={12}>
              <Typography variant="subtitle2" className="mt-3 pb-3">
                {t("diveices:remark")}
              </Typography>
              <TextField
                id="input-with-icon-textfield"
                // size="small"
                placeholder={t("diveices:remark")}
                fullWidth
                className={clsx("mb-4")}
                variant="outlined"
                value={remark}
                onChange={handleRemarkChange}
              />
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
              <Grid item md={3} className={clsx("mb-4", classes.boxMargin)}>
                <Button
                  className={clsx(classes.backGroundConfrim)}
                  variant="outlined"
                  // onClick={handleValidate}
                >
                  {t("building:btnAddModal")}
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Box className={clsx(classes.backgroundBox)}>
            <Grid item md={12} className={classes.paddingRowHead}>
              <Typography variant="h5">{t("diveices:realtime")}</Typography>
            </Grid>

            {/* Current */}
            <Grid item md={12} className={classes.paddingRow}>
              <Typography variant="h6" className="pt-2">
                {t("diveices:current")}
              </Typography>
            </Grid>
            <Grid
              item
              md={12}
              className={clsx(
                classes.flexRow,
                classes.modalContent,
                classes.alignItem,
                classes.textCenter,
                classes.paddingCol
              )}
            >
              <Grid item md={1}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("diveices:l1")}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("diveices:l1")}
                  fullWidth
                  variant="outlined"
                  //   value={installation}
                  //   onChange={handleInstallationChange}
                />
              </Grid>
              <Grid item md={1}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("diveices:l2")}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("diveices:l2")}
                  fullWidth
                  variant="outlined"
                  //   value={installation}
                  //   onChange={handleInstallationChange}
                />
              </Grid>
              <Grid item md={1}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("diveices:l3")}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("diveices:l3")}
                  fullWidth
                  variant="outlined"
                  //   value={installation}
                  //   onChange={handleInstallationChange}
                />
              </Grid>
              <Grid item md={1}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("diveices:avg")}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("diveices:avg")}
                  fullWidth
                  variant="outlined"
                  //   value={installation}
                  //   onChange={handleInstallationChange}
                />
              </Grid>
            </Grid>

            {/* voltage */}
            <Grid item md={12} className={classes.paddingRow}>
              <Typography variant="h6" className="pt-2">
                {t("diveices:voltage")}
              </Typography>
            </Grid>
            <Grid
              item
              md={12}
              className={clsx(
                classes.flexRow,
                classes.modalContent,
                classes.alignItem,
                classes.textCenter,
                classes.paddingCol
              )}
            >
              <Grid item md={1}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("diveices:l1")}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("diveices:l1")}
                  fullWidth
                  variant="outlined"
                  //   value={installation}
                  //   onChange={handleInstallationChange}
                />
              </Grid>
              <Grid item md={1}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("diveices:l2")}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("diveices:l2")}
                  fullWidth
                  variant="outlined"
                  //   value={installation}
                  //   onChange={handleInstallationChange}
                />
              </Grid>
              <Grid item md={1}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("diveices:l3")}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("diveices:l3")}
                  fullWidth
                  variant="outlined"
                  //   value={installation}
                  //   onChange={handleInstallationChange}
                />
              </Grid>
              <Grid item md={1}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("diveices:avg")}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("diveices:avg")}
                  fullWidth
                  variant="outlined"
                  //   value={installation}
                  //   onChange={handleInstallationChange}
                />
              </Grid>
            </Grid>

            {/* active */}
            <Grid item md={12} className={classes.paddingRow}>
              <Typography variant="h6" className="pt-2">
                {t("diveices:active")}
              </Typography>
            </Grid>
            <Grid
              item
              md={12}
              className={clsx(
                classes.flexRow,
                classes.modalContent,
                classes.alignItem,
                classes.textCenter,
                classes.paddingCol
              )}
            >
              <Grid item md={1}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("diveices:l1")}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("diveices:l1")}
                  fullWidth
                  variant="outlined"
                  //   value={installation}
                  //   onChange={handleInstallationChange}
                />
              </Grid>
              <Grid item md={1}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("diveices:l2")}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("diveices:l2")}
                  fullWidth
                  variant="outlined"
                  //   value={installation}
                  //   onChange={handleInstallationChange}
                />
              </Grid>
              <Grid item md={1}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("diveices:l3")}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("diveices:l3")}
                  fullWidth
                  variant="outlined"
                  //   value={installation}
                  //   onChange={handleInstallationChange}
                />
              </Grid>
              <Grid item md={1}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("diveices:total")}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("diveices:total")}
                  fullWidth
                  variant="outlined"
                  //   value={installation}
                  //   onChange={handleInstallationChange}
                />
              </Grid>
            </Grid>

            {/* reactive */}
            <Grid item md={12} className={classes.paddingRow}>
              <Typography variant="h6" className="pt-2">
                {t("diveices:reactive")}
              </Typography>
            </Grid>
            <Grid
              item
              md={12}
              className={clsx(
                classes.flexRow,
                classes.modalContent,
                classes.alignItem,
                classes.textCenter,
                classes.paddingCol
              )}
            >
              <Grid item md={1}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("diveices:l1")}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("diveices:l1")}
                  fullWidth
                  variant="outlined"
                  //   value={installation}
                  //   onChange={handleInstallationChange}
                />
              </Grid>
              <Grid item md={1}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("diveices:l2")}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("diveices:l2")}
                  fullWidth
                  variant="outlined"
                  //   value={installation}
                  //   onChange={handleInstallationChange}
                />
              </Grid>
              <Grid item md={1}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("diveices:l3")}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("diveices:l3")}
                  fullWidth
                  variant="outlined"
                  //   value={installation}
                  //   onChange={handleInstallationChange}
                />
              </Grid>
              <Grid item md={1}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("diveices:total")}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("diveices:total")}
                  fullWidth
                  variant="outlined"
                  //   value={installation}
                  //   onChange={handleInstallationChange}
                />
              </Grid>
            </Grid>

            {/* energy */}
            <Grid item md={12} className={classes.paddingRow}>
              <Typography variant="h6" className="pt-2">
                {t("diveices:energy")}
              </Typography>
            </Grid>
            <Grid
              item
              md={12}
              className={clsx(
                classes.flexRow,
                classes.modalContent,
                classes.alignItem,
                classes.textCenter,
                classes.paddingCol
              )}
            >
              <Grid item md={1}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("diveices:l1")}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("diveices:l1")}
                  fullWidth
                  variant="outlined"
                  //   value={installation}
                  //   onChange={handleInstallationChange}
                />
              </Grid>
              <Grid item md={1}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("diveices:l2")}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("diveices:l2")}
                  fullWidth
                  variant="outlined"
                  //   value={installation}
                  //   onChange={handleInstallationChange}
                />
              </Grid>
              <Grid item md={1}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("diveices:l3")}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("diveices:l3")}
                  fullWidth
                  variant="outlined"
                  //   value={installation}
                  //   onChange={handleInstallationChange}
                />
              </Grid>
              <Grid item md={1}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("diveices:total")}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("diveices:total")}
                  fullWidth
                  variant="outlined"
                  //   value={installation}
                  //   onChange={handleInstallationChange}
                />
              </Grid>
            </Grid>

            {/* power */}
            <Grid item md={12} className={classes.paddingRow}>
              <Typography variant="h6" className="pt-2">
                {t("diveices:power")}
              </Typography>
            </Grid>
            <Grid
              item
              md={12}
              className={clsx(
                classes.flexRow,
                classes.modalContent,
                classes.alignItem,
                classes.textCenter,
                classes.paddingCol
              )}
            >
              <Grid item md={1}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("diveices:l1")}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("diveices:l1")}
                  fullWidth
                  variant="outlined"
                  //   value={installation}
                  //   onChange={handleInstallationChange}
                />
              </Grid>
              <Grid item md={1}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("diveices:l2")}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("diveices:l2")}
                  fullWidth
                  variant="outlined"
                  //   value={installation}
                  //   onChange={handleInstallationChange}
                />
              </Grid>
              <Grid item md={1}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("diveices:l3")}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("diveices:l3")}
                  fullWidth
                  variant="outlined"
                  //   value={installation}
                  //   onChange={handleInstallationChange}
                />
              </Grid>
              <Grid item md={1}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("diveices:avg")}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("diveices:avg")}
                  fullWidth
                  variant="outlined"
                  //   value={installation}
                  //   onChange={handleInstallationChange}
                />
              </Grid>
            </Grid>
          </Box>

          {/* <DialogContentText>
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText> */}
        </DialogContent>
        {/* <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Disagree
          </Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions> */}
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
              onClick={handleCloseAdd}
            />
            {t("diveices:realtime")}
          </Typography>
          <CloseIcon
            onClick={handleCloseAdd}
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
          <Box className="mt-3">
            <Grid
              item
              md={12}
              className={clsx(
                classes.flexRow,
                classes.justContent,
                classes.alignItem
              )}
            >
              <Grid item md={6} className={classes.borderImg}>
                <Grid item md={12}>
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
                    {imagePreviewUrl ? (
                      <img
                        src={imagePreviewUrl}
                        alt="img-upload"
                        className={classes.imgWidth}
                      />
                    ) : (
                      <img
                        src={process.env.PUBLIC_URL + "/img/Group.png"}
                        alt="img-test"
                        className={classes.imgWidth}
                      />
                    )}
                  </label>
                </Grid>
              </Grid>
              <Grid item md={6}>
                <Grid item className={classes.boxMargin}>
                  <Typography variant="subtitle2" className="pb-3">
                    {t("diveices:meter")}
                  </Typography>
                  <TextField
                    id="input-with-icon-textfield"
                    size="small"
                    placeholder={t("diveices:meter")}
                    fullWidth
                    variant="outlined"
                    value={meterId}
                    disabled
                    // onChange={handleMeterIdChange}
                  />
                </Grid>
                <Grid
                  item
                  className={clsx(classes.boxMargin, classes.marginRow)}
                >
                  <Typography variant="subtitle2" className="pb-3">
                    {t("diveices:meterName")}
                  </Typography>
                  <TextField
                    id="input-with-icon-textfield"
                    size="small"
                    placeholder={t("diveices:meterName")}
                    fullWidth
                    variant="outlined"
                    value={meterName}
                    onChange={handleMeterNameChange}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={12}>
              <Typography variant="subtitle2" className="mt-3 pb-3">
                {t("diveices:installation")}
              </Typography>
              <TextField
                id="input-with-icon-textfield"
                size="small"
                placeholder={t("diveices:installation")}
                fullWidth
                variant="outlined"
                value={installation}
                onChange={handleInstallationChange}
              />
            </Grid>
            <Grid item md={12}>
              <Typography variant="subtitle2" className="mt-3 pb-3">
                {t("diveices:sn")}
              </Typography>
              <TextField
                id="input-with-icon-textfield"
                size="small"
                placeholder={t("diveices:sn")}
                fullWidth
                variant="outlined"
                value={numberSN}
                onChange={handleNumberSNChange}
              />
            </Grid>
            <Grid item md={12}>
              <Typography variant="subtitle2" className="mt-3 pb-3">
                {t("diveices:band")}
              </Typography>
              <TextField
                id="input-with-icon-textfield"
                size="small"
                placeholder={t("diveices:band")}
                fullWidth
                variant="outlined"
                value={band}
                onChange={handleBandChange}
              />
            </Grid>
            <Grid item md={12}>
              <Typography variant="subtitle2" className="mt-3 pb-3">
                {t("diveices:series")}
              </Typography>
              <TextField
                id="input-with-icon-textfield"
                size="small"
                placeholder={t("diveices:series")}
                fullWidth
                variant="outlined"
                value={series}
                onChange={handleSeriesChange}
              />
            </Grid>
            <Grid item md={12}>
              <Typography variant="subtitle2" className="mt-3 pb-3">
                {t("diveices:remark")}
              </Typography>
              <TextField
                id="input-with-icon-textfield"
                // size="small"
                placeholder={t("diveices:remark")}
                fullWidth
                className={clsx("mb-4")}
                variant="outlined"
                value={remark}
                onChange={handleRemarkChange}
              />
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
              <Grid item md={3} className={clsx("mb-4", classes.boxMargin)}>
                <Button
                  className={clsx(classes.backGroundConfrim)}
                  variant="outlined"
                  // onClick={handleValidate}
                >
                  {t("building:btnAddModal")}
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Box className={clsx(classes.backgroundBox)}>
            <Grid item md={12} className={classes.paddingRowHead}>
              <Typography variant="h5">{t("diveices:realtime")}</Typography>
            </Grid>

            {/* Current */}
            <Grid item md={12} className={classes.paddingRow}>
              <Typography variant="h6" className="pt-2">
                {t("diveices:current")}
              </Typography>
            </Grid>
            <Grid
              item
              md={12}
              className={clsx(
                classes.flexRow,
                classes.modalContent,
                classes.alignItem,
                classes.textCenter,
                classes.paddingCol
              )}
            >
              <Grid item md={1}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("diveices:l1")}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("diveices:l1")}
                  fullWidth
                  variant="outlined"
                  //   value={installation}
                  //   onChange={handleInstallationChange}
                />
              </Grid>
              <Grid item md={1}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("diveices:l2")}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("diveices:l2")}
                  fullWidth
                  variant="outlined"
                  //   value={installation}
                  //   onChange={handleInstallationChange}
                />
              </Grid>
              <Grid item md={1}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("diveices:l3")}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("diveices:l3")}
                  fullWidth
                  variant="outlined"
                  //   value={installation}
                  //   onChange={handleInstallationChange}
                />
              </Grid>
              <Grid item md={1}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("diveices:avg")}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("diveices:avg")}
                  fullWidth
                  variant="outlined"
                  //   value={installation}
                  //   onChange={handleInstallationChange}
                />
              </Grid>
            </Grid>

            {/* voltage */}
            <Grid item md={12} className={classes.paddingRow}>
              <Typography variant="h6" className="pt-2">
                {t("diveices:voltage")}
              </Typography>
            </Grid>
            <Grid
              item
              md={12}
              className={clsx(
                classes.flexRow,
                classes.modalContent,
                classes.alignItem,
                classes.textCenter,
                classes.paddingCol
              )}
            >
              <Grid item md={1}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("diveices:l1")}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("diveices:l1")}
                  fullWidth
                  variant="outlined"
                  //   value={installation}
                  //   onChange={handleInstallationChange}
                />
              </Grid>
              <Grid item md={1}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("diveices:l2")}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("diveices:l2")}
                  fullWidth
                  variant="outlined"
                  //   value={installation}
                  //   onChange={handleInstallationChange}
                />
              </Grid>
              <Grid item md={1}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("diveices:l3")}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("diveices:l3")}
                  fullWidth
                  variant="outlined"
                  //   value={installation}
                  //   onChange={handleInstallationChange}
                />
              </Grid>
              <Grid item md={1}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("diveices:avg")}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("diveices:avg")}
                  fullWidth
                  variant="outlined"
                  //   value={installation}
                  //   onChange={handleInstallationChange}
                />
              </Grid>
            </Grid>

            {/* active */}
            <Grid item md={12} className={classes.paddingRow}>
              <Typography variant="h6" className="pt-2">
                {t("diveices:active")}
              </Typography>
            </Grid>
            <Grid
              item
              md={12}
              className={clsx(
                classes.flexRow,
                classes.modalContent,
                classes.alignItem,
                classes.textCenter,
                classes.paddingCol
              )}
            >
              <Grid item md={1}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("diveices:l1")}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("diveices:l1")}
                  fullWidth
                  variant="outlined"
                  //   value={installation}
                  //   onChange={handleInstallationChange}
                />
              </Grid>
              <Grid item md={1}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("diveices:l2")}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("diveices:l2")}
                  fullWidth
                  variant="outlined"
                  //   value={installation}
                  //   onChange={handleInstallationChange}
                />
              </Grid>
              <Grid item md={1}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("diveices:l3")}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("diveices:l3")}
                  fullWidth
                  variant="outlined"
                  //   value={installation}
                  //   onChange={handleInstallationChange}
                />
              </Grid>
              <Grid item md={1}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("diveices:total")}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("diveices:total")}
                  fullWidth
                  variant="outlined"
                  //   value={installation}
                  //   onChange={handleInstallationChange}
                />
              </Grid>
            </Grid>

            {/* reactive */}
            <Grid item md={12} className={classes.paddingRow}>
              <Typography variant="h6" className="pt-2">
                {t("diveices:reactive")}
              </Typography>
            </Grid>
            <Grid
              item
              md={12}
              className={clsx(
                classes.flexRow,
                classes.modalContent,
                classes.alignItem,
                classes.textCenter,
                classes.paddingCol
              )}
            >
              <Grid item md={1}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("diveices:l1")}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("diveices:l1")}
                  fullWidth
                  variant="outlined"
                  //   value={installation}
                  //   onChange={handleInstallationChange}
                />
              </Grid>
              <Grid item md={1}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("diveices:l2")}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("diveices:l2")}
                  fullWidth
                  variant="outlined"
                  //   value={installation}
                  //   onChange={handleInstallationChange}
                />
              </Grid>
              <Grid item md={1}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("diveices:l3")}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("diveices:l3")}
                  fullWidth
                  variant="outlined"
                  //   value={installation}
                  //   onChange={handleInstallationChange}
                />
              </Grid>
              <Grid item md={1}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("diveices:total")}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("diveices:total")}
                  fullWidth
                  variant="outlined"
                  //   value={installation}
                  //   onChange={handleInstallationChange}
                />
              </Grid>
            </Grid>

            {/* energy */}
            <Grid item md={12} className={classes.paddingRow}>
              <Typography variant="h6" className="pt-2">
                {t("diveices:energy")}
              </Typography>
            </Grid>
            <Grid
              item
              md={12}
              className={clsx(
                classes.flexRow,
                classes.modalContent,
                classes.alignItem,
                classes.textCenter,
                classes.paddingCol
              )}
            >
              <Grid item md={1}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("diveices:l1")}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("diveices:l1")}
                  fullWidth
                  variant="outlined"
                  //   value={installation}
                  //   onChange={handleInstallationChange}
                />
              </Grid>
              <Grid item md={1}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("diveices:l2")}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("diveices:l2")}
                  fullWidth
                  variant="outlined"
                  //   value={installation}
                  //   onChange={handleInstallationChange}
                />
              </Grid>
              <Grid item md={1}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("diveices:l3")}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("diveices:l3")}
                  fullWidth
                  variant="outlined"
                  //   value={installation}
                  //   onChange={handleInstallationChange}
                />
              </Grid>
              <Grid item md={1}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("diveices:total")}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("diveices:total")}
                  fullWidth
                  variant="outlined"
                  //   value={installation}
                  //   onChange={handleInstallationChange}
                />
              </Grid>
            </Grid>

            {/* power */}
            <Grid item md={12} className={classes.paddingRow}>
              <Typography variant="h6" className="pt-2">
                {t("diveices:power")}
              </Typography>
            </Grid>
            <Grid
              item
              md={12}
              className={clsx(
                classes.flexRow,
                classes.modalContent,
                classes.alignItem,
                classes.textCenter,
                classes.paddingCol
              )}
            >
              <Grid item md={1}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("diveices:l1")}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("diveices:l1")}
                  fullWidth
                  variant="outlined"
                  //   value={installation}
                  //   onChange={handleInstallationChange}
                />
              </Grid>
              <Grid item md={1}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("diveices:l2")}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("diveices:l2")}
                  fullWidth
                  variant="outlined"
                  //   value={installation}
                  //   onChange={handleInstallationChange}
                />
              </Grid>
              <Grid item md={1}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("diveices:l3")}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("diveices:l3")}
                  fullWidth
                  variant="outlined"
                  //   value={installation}
                  //   onChange={handleInstallationChange}
                />
              </Grid>
              <Grid item md={1}>
                <Typography variant="subtitle2" className="mt-3 pb-3">
                  {t("diveices:avg")}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <TextField
                  id="input-with-icon-textfield"
                  size="small"
                  placeholder={t("diveices:avg")}
                  fullWidth
                  variant="outlined"
                  //   value={installation}
                  //   onChange={handleInstallationChange}
                />
              </Grid>
            </Grid>
          </Box>

          {/* <DialogContentText>
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText> */}
        </DialogContent>
        {/* <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Disagree
          </Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(DeviceManagement);
