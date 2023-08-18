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
import { Height } from "@mui/icons-material";

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
    fontSize: "18px !important",
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
    width: '100%',
  },
}));

function createData(name, calories, fat, carbs, power, protein) {
  return {
    name,
    calories,
    fat,
    carbs,
    power,
    protein,
  };
}

const rows = [
  createData(1, "MDB_1", 10, 220, 20, 1120),
  createData(2, "MDB_2", 10, 220, 20, 1120),
  createData(3, "MDB_3", 10, 220, 20, 1120),
  createData(4, "MDB_4", 10, 220, 20, 1120),
  createData(5, "MDB_5", 10, 220, 20, 1120),
  createData(6, "MDB_6", 10, 220, 20, 1120),
  createData(7, "MDB_7", 10, 220, 20, 1120),
  createData(8, "MDB_8", 10, 220, 20, 1120),
  createData(9, "MDB_9", 10, 220, 20, 1120),
  createData(10, "MDB_10", 10, 220, 20, 1120),
  createData(11, "MDB_11", 10, 220, 20, 1120),
  createData(12, "MDB_12", 10, 220, 20, 1120),
  createData(13, "MDB_13", 10, 220, 20, 1120),
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

export default function EnhancedTable({ t }) {
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

  const classes = useStyles();
  const sideBar = useSelector((state) => state.sidebar);
  const theme = useTheme();
  // modal //
  const [open, setOpen] = useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down("xl"));
  const [openAdd, setOpenAdd] = useState(false);

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

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
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

  return (
    <Container className={classes.marginRow}>
      <Grid item className={classes.flexRow}>
        <HomeOutlinedIcon className={classes.alignSelf} />
        <Typography variant="h6"> / {sideBar}</Typography>
      </Grid>
      <Grid item md={12} className={clsx(classes.flexRow, classes.justContent)}>
        <Grid item md={5} className={classes.marginRow}>
          <TextField
            id="input-with-icon-textfield"
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
                        <FeedOutlinedIcon className={classes.marginIcon} />
                        <BorderColorOutlinedIcon onClick={handleClickOpen} />
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
                <img
                  src={process.env.PUBLIC_URL + "/img/Group.png"}
                  alt="img-test"
                  className={classes.imgWidth}
                />
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
          <CloseIcon onClick={handleCloseAdd} className={clsx(classes.cursor)} />
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
                <img
                  src={process.env.PUBLIC_URL + "/img/Group.png"}
                  alt="img-test"
                  className={classes.imgWidth}
                />
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
}
