import Layout from "../component/layout";
import PropTypes from "prop-types";
import {
  Grid,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";

const Dashboard = () => {
  return (
    <>
      <Layout type={"Dashboard"}>
        <Grid container className="FlexRowCard">
          <Grid item md={2}></Grid>
          <Grid item md={3}>
            <Card className="MarginCard">
              <CardContent>
                <Grid item className="FlexCard">
                  <Typography variant="h6">Word of the Day</Typography>
                  <Typography variant="h5">2 kWh</Typography>
                </Grid>
                <Grid item className="FlexCard">
                  <Typography variant="h6">Day to day Usage</Typography>
                  <Typography variant="h5">2 kWh</Typography>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item md={3}>
            <Card className="MarginCard">
              <CardContent>
                <Grid item className="FlexCard">
                  <Typography variant="h6">Word of the Day</Typography>
                  <Typography variant="h5">2 kWh</Typography>
                </Grid>
                <Grid item className="FlexCard">
                  <Typography variant="h6">Day to day Usage</Typography>
                  <Typography variant="h5">2 kWh</Typography>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item md={3}>
            <Card className="MarginCard">
              <CardContent>
                <Grid item className="FlexCard">
                  <Typography variant="h6">Word of the Day</Typography>
                  <Typography variant="h5">2 kWh</Typography>
                </Grid>
                <Grid item className="FlexCard">
                  <Typography variant="h6">Day to day Usage</Typography>
                  <Typography variant="h5">2 kWh</Typography>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item md={12} className="FlexIconHead">
            <Grid item md={2}></Grid>
            <Grid item md={2} className="textCenter padingText">
              <Typography variant="h5">Floor Diagram</Typography>
            </Grid>
            <Grid item md={1} className="padingText MaxWidth">
              <Button variant="contained" className="btnWidth">
                DB-B1
              </Button>
            </Grid>
            <Grid item md={1} className="padingText MaxWidth">
              <Button variant="contained" className="btnColor btnWidth">
                DB-B2
              </Button>
            </Grid>
            <Grid item md={1} className="padingText MaxWidth">
              <Button variant="contained" className="btnColor btnWidth">
                DB-B3
              </Button>
            </Grid>
            <Grid item md={1} className="padingText MaxWidth">
              <Button variant="contained" className="btnColor btnWidth">
                DB-B4
              </Button>
            </Grid>
          </Grid>

          <Grid item md={12} className="positionImg">
            <Grid item md={1}></Grid>
            <Grid item md={10} className="FlexIcon">
              <img
                src={process.env.PUBLIC_URL + "/img/test2.png"}
                alt="img-test"
                width={900}
              />
            </Grid>
            <Grid item md={1}></Grid>
          </Grid>

          <Grid item md={12}>
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
                    <Typography variant="body1" className="frontSizeBtn">Power</Typography>
                    <Typography variant="body1" className="frontSizeBtn">2 kWh</Typography>
                  </Grid>
                  <Grid item className="FlexCard">
                    <Typography variant="body1" className="frontSizeBtn">Energy day</Typography>
                    <Typography variant="body1" className="frontSizeBtn">11 kWh</Typography>
                  </Grid>
                  <Grid item className="FlexCard">
                    <Typography variant="body1" className="frontSizeBtn">Total Energy</Typography>
                    <Typography variant="body1" className="frontSizeBtn">1,111,111 kWh</Typography>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid item md={12}>
            <Grid item md={3} className="positionBixImgTwo">
              <Card className="MarginCard">
                <CardContent className="paddindCardContent">
                  <Grid item>
                    <Typography variant="h6">MDB - 1</Typography>
                  </Grid>
                  <Grid item className="FlexCard">
                    <Typography variant="body1" className="frontSizeBtn">Power</Typography>
                    <Typography variant="body1" className="frontSizeBtn">2 kWh</Typography>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid item md={12}>
            <Grid item md={3} className="positionBixImgThree">
              <Card className="MarginCard">
                <CardContent className="paddindCardContent borderCard"> 
                  <Grid item>
                    <Typography variant="h6">Solar Cell</Typography>
                  </Grid>
                  <Grid item className="FlexCard">
                    <Typography variant="body1" className="frontSizeBtn">Power</Typography>
                    <Typography variant="body1" className="frontSizeBtn">2 kWh</Typography>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid item md={12}>
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
          </Grid>

          <Grid item md={12}>
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
          </Grid>

          <Grid item md={12}>
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
          </Grid>

          <Grid item md={12}>
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
          </Grid>

          <Grid item md={12}>
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
          </Grid>

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
          </Grid>
          
          
        </Grid>
      </Layout>
    </>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
