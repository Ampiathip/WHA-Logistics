import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  makeStyles,
  Box,
  TextField,
} from "@material-ui/core";
import clsx from "clsx";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const useStyles = makeStyles((theme) => ({
  flexRow: {
    display: "flex",
    // justifyContent: "space-around",
  },
  marginBox: {
    margin: 15,
  },
  FlexCard: {
    display: "flex",
    justifyContent: "space-around",
  },
  alignCenter: {
    alignItems: "center",
  },
  btnColor: {
    backgroundColor: "#FFF",
    color: "#000",
    width: "100%",
  },
  btnWidth: {
    width: "100%",
  },
  activeIcon: {
    backgroundColor: "#27963C",
    color: "#fff",
    width: "100%",
    "&:hover": {
      backgroundColor: "#27963C !important",
      boxShadow: `none`,
    },
  },
  FlexIcon: {
    display: "flex",
    justifyContent: "center",
  },
  flexWrap: {
    flexWrap: "wrap",
  },
  marginLeft: {
    marginLeft: 15,
  },
  marginTopCard: {
    marginTop: 15,
  },
  btnWidthAction: {
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
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData(
    "MDB_Voltage_L3_L1_hight",
    "Value > 430",
    "Voltage L3 สูงกว่าปกติ",
    "MBD.1"
  ),
  createData(
    "MDB_Voltage_L3_L1_hight",
    "Value > 430",
    "Voltage L3 สูงกว่าปกติ",
    "MBD.1"
  ),
  createData(
    "MDB_Voltage_L3_L1_hight",
    "Value > 430",
    "Voltage L3 สูงกว่าปกติ",
    "MBD.1"
  ),
  createData(
    "MDB_Voltage_L3_L1_hight",
    "Value > 430",
    "Voltage L3 สูงกว่าปกติ",
    "MBD.1"
  ),
];

const ParameterData = ({ t }) => {
  const classes = useStyles();

  const [parameter, setParameter] = useState("electrical");
  const [unit, setUnit] = useState("3");
  const [service, setService] = useState("3");

  const handleBtnParameter = (value) => {
    // console.log("e", value, index);
    setParameter(value);
  };

  const handleUnitChange = (event) => {
    setUnit(event.target.value);
  };

  const handleServiceChange = (event) => {
    setService(event.target.value);
  };

  return (
    <>
      <Box
        className={clsx(
          classes.alignCenter,
          classes.marginBox,
          classes.flexRow
        )}
      >
        <Grid item md={1}></Grid>
        <Grid item md={2}>
          <Typography variant="h5">{t("parameter:name")}</Typography>
        </Grid>
        <Grid item md={2}>
          <Button
            variant="contained"
            className={`${
              parameter == "electrical" ? classes.activeIcon : classes.btnColor
            }`}
            onClick={() => handleBtnParameter("electrical")}
          >
            {t("parameter:electrical")}
          </Button>
        </Grid>
        <Grid item md={2} className={classes.marginLeft}>
          <Button
            variant="contained"
            className={`${
              parameter == "alarm" ? classes.activeIcon : classes.btnColor
            }`}
            onClick={() => handleBtnParameter("alarm")}
          >
            {t("parameter:alarm")}
          </Button>
        </Grid>
      </Box>

      {parameter && parameter === "electrical" ? (
        <Box>
          <Card>
            <CardContent>
              <Grid item md={12} className={clsx(classes.FlexCard)}>
                <Grid item md={3}>
                  <Typography variant="h6">รายการ</Typography>
                </Grid>
                <Grid item md={3}>
                  <Typography variant="h6">ราคาหน่วยละ</Typography>
                </Grid>
                <Grid item md={3}></Grid>
              </Grid>

              <Grid
                item
                md={12}
                className={clsx(classes.FlexCard, classes.marginTopCard)}
              >
                <Grid item md={3}>
                  <Typography variant="body1">1 kWh ขึ้นไป</Typography>
                </Grid>
                <Grid item md={3}>
                  <TextField
                    id="input-with-icon-textfield"
                    size="small"
                    placeholder={t("diveices:meter")}
                    className={classes.inputWidth}
                    variant="outlined"
                    value={unit}
                    onChange={handleUnitChange}
                  />
                </Grid>
                <Grid item md={3}>
                  <Typography variant="h6">บาท</Typography>
                </Grid>
              </Grid>

              <Grid
                item
                md={12}
                className={clsx(classes.FlexCard, classes.marginTopCard)}
              >
                <Grid item md={3}>
                  <Typography variant="body1">ค่าบริการ</Typography>
                </Grid>
                <Grid item md={3}>
                  <TextField
                    id="input-with-icon-textfield"
                    size="small"
                    placeholder={t("diveices:meter")}
                    className={classes.inputWidth}
                    variant="outlined"
                    value={service}
                    onChange={handleServiceChange}
                  />
                </Grid>
                <Grid item md={3}>
                  <Typography variant="h6">บาท</Typography>
                </Grid>
              </Grid>

              {/* Button */}
              <Grid
                item
                md={12}
                className={clsx(classes.FlexCard, classes.marginTopCard)}
              >
                <Grid item md={3}>
                  {" "}
                </Grid>
                <Grid item md={3} className="mt-3">
                  <Button
                    variant="outlined"
                    className={clsx(classes.btnColor, classes.btnWidthAction)}
                  >
                    {t("parameter:refresh")}
                  </Button>
                </Grid>
                <Grid item md={3} className="mt-3">
                  <Button
                    variant="outlined"
                    className={clsx(classes.activeIcon, classes.btnWidthAction)}
                    // onClick={() => handleBtnParameter("alarm")}
                  >
                    {t("parameter:save")}
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      ) : (
        <Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.fontSixeHead}>Name</TableCell>
                  <TableCell align="center" className={classes.fontSixeHead}>
                    Condition
                  </TableCell>
                  <TableCell align="center" className={classes.fontSixeHead}>
                    Message
                  </TableCell>
                  <TableCell align="center" className={classes.fontSixeHead}>
                    Group
                  </TableCell>
                  <TableCell align="center" className={classes.fontSixeHead}>
                    Edit
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      className={classes.fontSixeCell}
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="center" className={classes.fontSixeCell}>
                      {row.calories}
                    </TableCell>
                    <TableCell align="center" className={classes.fontSixeCell}>
                      {row.fat}
                    </TableCell>
                    <TableCell align="center" className={classes.fontSixeCell}>
                      {row.carbs}
                    </TableCell>
                    <TableCell align="center" className={classes.fontSixeCell}>
                      <BorderColorOutlinedIcon className={classes.marginIcon}/>
                      <DeleteOutlineOutlinedIcon  />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </>
  );
};

ParameterData.propTypes = {};

export default ParameterData;
