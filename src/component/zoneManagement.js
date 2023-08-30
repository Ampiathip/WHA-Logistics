import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { addZone } from "../js/actions";

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
    // height: "90% !important",
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
}));

function createData(name, calories, fat, carbs, unit) {
  return {
    name,
    calories,
    fat,
    carbs,
    // power,
    // protein,
    unit,
  };
}

const rows = [
  createData(1, "Zone 1", "Public Zone", "Building 1", 1120),
  createData(2, "Zone 2", "Public Zone", "Building 1", 1120),
  createData(3, "Zone 3", "Public Zone", "Building 1", 1120),
  createData(4, "Zone 4", "Public Zone", "Building 1", 1120),
  createData(5, "Zone 5", "Public Zone", "Building 1", 1120),
  createData(6, "Zone 6", "Public Zone", "Building 1", 1120),
  createData(7, "Zone 7", "Public Zone", "Building 1", 1120),
  createData(8, "Zone 8", "Public Zone", "Building 1", 1120),
  createData(9, "Zone 9", "Public Zone", "Building 1", 1120),
  createData(10, "Zone 10", "Public Zone", "Building 1", 1120),
  createData(11, "Zone 11", "Public Zone", "Building 1", 1120),
  createData(12, "Zone 12", "Public Zone", "Building 1", 1120),
  createData(13, "Zone 13", "Public Zone", "Building 1", 1120),
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
    label: "Zone ID",
  },
  {
    id: "calories",
    numeric: false,
    disablePadding: false,
    label: "Zone Name",
  },
  {
    id: "fat",
    numeric: false,
    disablePadding: false,
    label: "Zone Type",
  },
  {
    id: "carbs",
    numeric: false,
    disablePadding: false,
    label: "Building Name",
  },
  // {
  //   id: "power",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "No of Floor",
  // },
  // {
  //   id: "protein",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "No of Floor",
  // },
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

export default function EnhancedTable({ t }) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [buildingName, setBuildingName] = useState("none");
  const [zoneName, setZoneName] = useState("");
  const [zoneType, setZoneType] = useState("none");

  const classes = useStyles();
  const sideBar = useSelector((state) => state.sidebar);
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // modal //
  const [open, setOpen] = useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
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

  const handleZoneType = (event) => {
    setZoneType(event.target.value);
  };

  const handleBuildingName = (event) => {
    setBuildingName(event.target.value);
  };

  const handleZoneName = (event) => {
    setZoneName(event.target.value);
  };

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const openPageZoneDetail = () => {
    navigate(`/zoneDetail`);
  };

  const handleDetailZone = (event, row) => {
    dispatch(addZone(row));
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
            placeholder={t("zone:search")}
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
            {t("zone:btnAdd")}
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
                      {/* <TableCell
                        align="center"
                        className={classes.fontSixeCell}
                      >
                        {row.power}
                      </TableCell> */}
                      {/* <TableCell
                        align="center"
                        className={classes.fontSixeCell}
                      >
                        {row.protein}
                      </TableCell> */}
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
                        <FeedOutlinedIcon
                          className={classes.marginIcon}
                          // onClick={{openPageZoneDetail, handleDetailZone(row)}}
                          onClick={(event) => {
                            openPageZoneDetail();
                            handleDetailZone(event, row);
                          }}
                        />
                        <VisibilityOutlinedIcon
                          className={classes.marginIcon}
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
          <Typography variant="h3">{t("zone:editZone")}</Typography>
        </DialogTitle>
        <DialogContent>
          <Grid item md={12}>
            <Typography variant="subtitle2" className="pb-3">
              {t("zone:zoneName")}
            </Typography>
            <TextField
              id="input-with-icon-textfield"
              size="small"
              placeholder={t("building:buildingName")}
              fullWidth
              variant="outlined"
              value={zoneName}
              onChange={handleZoneName}
            />
          </Grid>
          <Grid item md={12}>
            <Typography variant="subtitle2" className="mt-3 pb-3">
              {t("zone:zoneType")}
            </Typography>
            <FormControl variant="outlined" size="small" fullWidth>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={zoneType}
                placeholder={t("gateway:selectCommunication")}
                onChange={handleZoneType}
              >
                <MenuItem value="none">{t("zone:selectZoneType")}</MenuItem>
                {/* <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem> */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={12}>
            <Typography variant="subtitle2" className="mt-3 pb-3">
              {t("building:buildingName")}
            </Typography>
            <FormControl variant="outlined" size="small" fullWidth>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={buildingName}
                placeholder={t("gateway:selectCommunication")}
                onChange={handleBuildingName}
              >
                <MenuItem value="none">{t("building:buildingName")}</MenuItem>
                {/* <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem> */}
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
              >
                {t("building:btnSave")}
              </Button>
            </Grid>
          </Grid>
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
          <Typography variant="h3">{t("zone:add")}</Typography>
        </DialogTitle>
        <DialogContent>
          <Grid item md={12}>
            <Typography variant="subtitle2" className="pb-3">
              {t("zone:zoneName")}
            </Typography>
            <TextField
              id="input-with-icon-textfield"
              size="small"
              placeholder={t("building:buildingName")}
              fullWidth
              variant="outlined"
              value={zoneName}
              onChange={handleZoneName}
            />
          </Grid>
          <Grid item md={12}>
            <Typography variant="subtitle2" className="mt-3 pb-3">
              {t("zone:zoneType")}
            </Typography>
            <FormControl variant="outlined" size="small" fullWidth>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={zoneType}
                placeholder={t("gateway:selectCommunication")}
                onChange={handleZoneType}
              >
                <MenuItem value="none">{t("zone:selectZoneType")}</MenuItem>
                {/* <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem> */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={12}>
            <Typography variant="subtitle2" className="mt-3 pb-3">
              {t("building:buildingName")}
            </Typography>
            <FormControl variant="outlined" size="small" fullWidth>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={buildingName}
                placeholder={t("gateway:selectCommunication")}
                onChange={handleBuildingName}
              >
                <MenuItem value="none">{t("building:buildingName")}</MenuItem>
                {/* <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem> */}
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
    </Container>
  );
}
