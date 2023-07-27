import React, { useState, useEffect } from "react";
import Layout from "../component/layout";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import {
  Grid,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  makeStyles,
  Box,
} from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  flexRow: {
    display: "flex",
    justifyContent: "space-around",
  },
  marginBox: {
    margin: 15,
  },
  FlexCard: {
    display: "flex",
    justifyContent: "space-between",
  },
  alignCenter: {
    alignItems: "center",
  },
  btnColor: {
    backgroundColor: "#E6F7FF",
    color: "#000",
    width: "100%",
  },
  btnWidth: {
    width: "100%",
  },
  activeIcon: {
    backgroundColor: "#03257D",
    color: "#fff",
    width: "100%",
  },
  FlexIcon: {
    display: "flex",
    justifyContent: 'center',
  },
  flexWrap: {
    flexWrap: 'wrap'
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const { t, i18n } = useTranslation(["home", "footer", "login"]);

  const [diagram, setDiagram] = useState('1');

  const handleBtnDiaram = (value) => {
    // console.log("e", value, index);
    setDiagram(value);
  };
  return (
    <>
      <Layout type={"Dashboard"}>
        {/* <Grid container className="FlexRowCard"> */}
        {/* <Grid item md={2}></Grid> */}
        <Box className={clsx(classes.flexRow, classes.marginBox, classes.flexWrap)}>
          <Grid item md={3}>
            <Card>
              <CardContent>
                <Grid item className={classes.FlexCard}>
                  <Typography variant="body1">Word of the Day</Typography>
                  <Typography variant="body1">2 kWh</Typography>
                </Grid>
                <Grid item className={classes.FlexCard}>
                  <Typography variant="body1">Day to day Usage</Typography>
                  <Typography variant="body1">2 kWh</Typography>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item md={3}>
            <Card>
              <CardContent>
                <Grid item className={classes.FlexCard}>
                  <Typography variant="body1">Word of the Day</Typography>
                  <Typography variant="body1">2 kWh</Typography>
                </Grid>
                <Grid item className={classes.FlexCard}>
                  <Typography variant="body1">Day to day Usage</Typography>
                  <Typography variant="body1">2 kWh</Typography>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item md={3}>
            <Card>
              <CardContent>
                <Grid item className={classes.FlexCard}>
                  <Typography variant="body1">Word of the Day</Typography>
                  <Typography variant="body1">2 kWh</Typography>
                </Grid>
                <Grid item className={classes.FlexCard}>
                  <Typography variant="body1">Day to day Usage</Typography>
                  <Typography variant="body1">2 kWh</Typography>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Box>

        <Box
          className={clsx(
            classes.alignCenter,
            classes.marginBox,
            classes.flexRow,
            classes.flexWrap
          )}
        >
          <Grid item md={2}>
            <Typography variant="h5">Floor Diagram</Typography>
          </Grid>
          <Grid item md={2}>
            <Button
              variant="contained"
              className={`${diagram == '1' ? classes.activeIcon : classes.btnColor}`}
              onClick={() => handleBtnDiaram('1')}
            >
              DB-B1
            </Button>
          </Grid>
          <Grid item md={2}>
            <Button
              variant="contained"
              className={`${diagram == '2' ? classes.activeIcon : classes.btnColor}`}
              onClick={() => handleBtnDiaram('2')}
            >
              DB-B2
            </Button>
          </Grid>
          <Grid item md={2}>
            <Button
              variant="contained"
              className={`${diagram == '3' ? classes.activeIcon : classes.btnColor}`}
              onClick={() => handleBtnDiaram('3')}
            >
              DB-B3
            </Button>
          </Grid>
          <Grid item md={2}>
            <Button
              variant="contained"
              className={`${diagram == '4' ? classes.activeIcon : classes.btnColor}`}
              onClick={() => handleBtnDiaram('4')}
            >
              DB-B4
            </Button>
          </Grid>
        </Box>

        <Box className="positionImg">
          <Grid item md={12} className={classes.FlexIcon}>
            <img
              src={process.env.PUBLIC_URL + "/img/test2.png"}
              alt="img-test"
              width={900}
            />
          </Grid>
        </Box>

        {/* <Grid item md={12}>
          <Grid item md={3} className="positionBixImg">
            <Card className="MarginCard">
              <CardContent className="paddindCardContent">
                <Grid item>
                  <Typography variant="body1">Processing Process</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6">MDB - 1</Typography>
                </Grid>
                <Grid item className="FlexCard">
                  <Typography variant="body1" className="frontSizeBtn">
                    Power
                  </Typography>
                  <Typography variant="body1" className="frontSizeBtn">
                    2 kWh
                  </Typography>
                </Grid>
                <Grid item className="FlexCard">
                  <Typography variant="body1" className="frontSizeBtn">
                    Energy day
                  </Typography>
                  <Typography variant="body1" className="frontSizeBtn">
                    11 kWh
                  </Typography>
                </Grid>
                <Grid item className="FlexCard">
                  <Typography variant="body1" className="frontSizeBtn">
                    Total Energy
                  </Typography>
                  <Typography variant="body1" className="frontSizeBtn">
                    1,111,111 kWh
                  </Typography>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid> */}

        {/* <Grid item md={12}>
          <Grid item md={3} className="positionBixImgTwo">
            <Card className="MarginCard">
              <CardContent className="paddindCardContent">
                <Grid item>
                  <Typography variant="h6">MDB - 1</Typography>
                </Grid>
                <Grid item className="FlexCard">
                  <Typography variant="body1" className="frontSizeBtn">
                    Power
                  </Typography>
                  <Typography variant="body1" className="frontSizeBtn">
                    2 kWh
                  </Typography>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid> */}

        {/* <Grid item md={12}>
          <Grid item md={3} className="positionBixImgThree">
            <Card className="MarginCard">
              <CardContent className="paddindCardContent borderCard">
                <Grid item>
                  <Typography variant="h6">Solar Cell</Typography>
                </Grid>
                <Grid item className="FlexCard">
                  <Typography variant="body1" className="frontSizeBtn">
                    Power
                  </Typography>
                  <Typography variant="body1" className="frontSizeBtn">
                    2 kWh
                  </Typography>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid> */}

        {/* <Grid item md={12}>
          <Grid item md={3} className="positionBixImgInfo">
            <Card className="MarginCard">
              <CardContent className="paddindCardContent borderCardInfo">
                <Grid item>
                  <Typography className="frontSizeBtn">BP.11</Typography>
                </Grid>
                <Grid item className="FlexCard">
                  <Typography className="frontSizeBtn">Power</Typography>
                  <Typography className="frontSizeBtn">2 kWh</Typography>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid> */}

        {/* <Grid item md={12}>
          <Grid item md={3} className="positionBixImgInfoTwo">
            <Card className="MarginCard">
              <CardContent className="paddindCardContent borderCardInfo">
                <Grid item>
                  <Typography className="frontSizeBtn">LC.AC.11</Typography>
                </Grid>
                <Grid item className="FlexCard">
                  <Typography className="frontSizeBtn">Power</Typography>
                  <Typography className="frontSizeBtn">2 kWh</Typography>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid> */}

        {/* <Grid item md={12}>
          <Grid item md={3} className="positionBixImgInfoThree">
            <Card className="MarginCard">
              <CardContent className="paddindCardContent borderCardInfo">
                <Grid item>
                  <Typography className="frontSizeBtn">CU.OF.12</Typography>
                </Grid>
                <Grid item className="FlexCard">
                  <Typography className="frontSizeBtn">Power</Typography>
                  <Typography className="frontSizeBtn">2 kWh</Typography>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid> */}

        {/* <Grid item md={12}>
          <Grid item md={3} className="positionBixImgInfoFour">
            <Card className="MarginCard">
              <CardContent className="paddindCardContent borderCardInfo">
                <Grid item>
                  <Typography className="frontSizeBtn">CU.OF.11</Typography>
                </Grid>
                <Grid item className="FlexCard">
                  <Typography className="frontSizeBtn">Power</Typography>
                  <Typography className="frontSizeBtn">2 kWh</Typography>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid> */}

        {/* <Grid item md={12}>
          <Grid item md={3} className="positionBixImgInfoFive">
            <Card className="MarginCard">
              <CardContent className="paddindCardContent borderCardInfo">
                <Grid item>
                  <Typography className="frontSizeBtn">LC.WH.13</Typography>
                </Grid>
                <Grid item className="FlexCard">
                  <Typography className="frontSizeBtn">Power</Typography>
                  <Typography className="frontSizeBtn">2 kWh</Typography>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid> */}
{/* 
        <Grid item md={12}>
          <Grid item md={3} className="positionBixImgInfoSix">
            <Card className="MarginCard">
              <CardContent className="paddindCardContent borderCardInfo">
                <Grid item>
                  <Typography className="frontSizeBtn">LC.WH.12</Typography>
                </Grid>
                <Grid item className="FlexCard">
                  <Typography className="frontSizeBtn">Power</Typography>
                  <Typography className="frontSizeBtn">2 kWh</Typography>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid> */}

        {/* </Grid> */}
      </Layout>
    </>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
