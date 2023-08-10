import React, { useState, useEffect, Component } from "react";
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
  Popover,
} from "@material-ui/core";
import clsx from "clsx";
import { useMousePosition } from "../utils/useMousePosition";

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
  btnColorActive: {
    backgroundColor: "#FEC70B",
    color: "#000",
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
    justifyContent: "center",
  },
  flexWrap: {
    flexWrap: "wrap",
  },
  positionBixImg: {
    position: "absolute",
    top: "40%",
    left: "73%",
  },
  positionImg: {
    position: "relative",
    // zIndex: -1,
    width: "70em",
    height: "50em",
  },
  btnBox: {
    position: "absolute",
    top: "85%",
    left: "30%",
  },
  cursorImag: {
    cursor: "pointer",
  },
  positionAbImg: {
    position: "absolute",
    width: "70em",
    height: "100%",
  },
  positionBox: {
    position: "absolute",
  },
  paddindCardContent: {
    padding: "5px !important",
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const { t, i18n } = useTranslation(["home", "footer", "login"]);

  const [diagram, setDiagram] = useState("1");
  // const position = useMousePosition();
  const [offSet, setOffSet] = useState([
    {
      box: "box1",
      x: {
        min: "160",
        max: "200",
      },
      y: {
        min: "300",
        max: "450",
      },
      detail: {
        title: "LC.WH.11",
        subTitle: "Power 2kw",
      },
    },
    {
      box: "box2",
      x: {
        min: "240",
        max: "280",
      },
      y: {
        min: "380",
        max: "450",
      },
      detail: {
        title: "CU.EX.11",
        subTitle: "Power 2kw",
      },
    },
    {
      box: "box3",
      x: {
        min: "300",
        max: "380",
      },
      y: {
        min: "380",
        max: "450",
      },
      detail: {
        title: "LC.WH.12",
        subTitle: "Power 2kw",
      },
    },
    {
      box: "box4",
      x: {
        min: "370",
        max: "450",
      },
      y: {
        min: "400",
        max: "450",
      },
      detail: {
        title: "LC.WH.13",
        subTitle: "Power 2kw",
      },
    },
    {
      box: "box5",
      x: {
        min: "430",
        max: "550",
      },
      y: {
        min: "380",
        max: "450",
      },
      detail: {
        title: "CU.OF.11",
        subTitle: "Power 2kw",
      },
    },
    {
      box: "box6",
      x: {
        min: "540",
        max: "620",
      },
      y: {
        min: "380",
        max: "450",
      },
      detail: {
        title: "CU.OF.12",
        subTitle: "Power 2kw",
      },
    },
    {
      box: "box7",
      x: {
        min: "600",
        max: "690",
      },
      y: {
        min: "380",
        max: "450",
      },
      detail: {
        title: "LC.AC.11",
        subTitle: "Power 2kw",
      },
    },
    {
      box: "box8",
      x: {
        min: "700",
        max: "780",
      },
      y: {
        min: "380",
        max: "450",
      },
      detail: {
        title: "BP.11",
        subTitle: "Power 2kw",
      },
    },
    {
      box: "solarCell",
      x: {
        min: "840",
        max: "880",
      },
      y: {
        min: "380",
        max: "450",
      },
      detail: {
        title: "Solar Cell",
        subTitle: "Power 2kw",
      },
    },
  ]);
  const [openPopover, setOpenPopover] = useState(false);
  const [popoverAnchor, setPopoverAnchor] = useState({
    x: 0,
    y: 0,
    detail: {
      title: "",
      subTitle: "",
    },
  });

  const handleBtnDiaram = (value) => {
    // console.log("e", value, index);
    setDiagram(value);
  };

  const handleCanvasData = (data) => {
    // console.log("Data received from CanvasComponent:", data);
    const clickedBox = offSet.find((box) => {
      const xInRange = data.x >= box.x.min && data.x <= box.x.max;
      const yInRange = data.y >= box.y.min && data.y <= box.y.max;
      return xInRange && yInRange;
    });

    console.log("ffffff====", clickedBox);
    if (clickedBox) {
      setOpenPopover(true);
      setPopoverAnchor({ x: data.x, y: data.y, detail: clickedBox.detail });
    } else {
      setOpenPopover(false);
    }
  };

  return (
    <>
      <Layout type={"Dashboard"}>
        {/* <Grid container className="FlexRowCard"> */}
        {/* <Grid item md={2}></Grid> */}
        <Box
          className={clsx(classes.flexRow, classes.marginBox, classes.flexWrap)}
        >
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
              className={`${
                diagram == "1" ? classes.activeIcon : classes.btnColor
              }`}
              onClick={() => handleBtnDiaram("1")}
            >
              DB-B1
            </Button>
          </Grid>
          <Grid item md={2}>
            <Button
              variant="contained"
              className={`${
                diagram == "2" ? classes.activeIcon : classes.btnColor
              }`}
              onClick={() => handleBtnDiaram("2")}
            >
              DB-B2
            </Button>
          </Grid>
          <Grid item md={2}>
            <Button
              variant="contained"
              className={`${
                diagram == "3" ? classes.activeIcon : classes.btnColor
              }`}
              onClick={() => handleBtnDiaram("3")}
            >
              DB-B3
            </Button>
          </Grid>
          <Grid item md={2}>
            <Button
              variant="contained"
              className={`${
                diagram == "4" ? classes.activeIcon : classes.btnColor
              }`}
              onClick={() => handleBtnDiaram("4")}
            >
              DB-B4
            </Button>
          </Grid>
        </Box>

        <Box>
          <Grid item md={12} className={classes.FlexIcon}>
            <Grid item md={1}></Grid>
            {/* <Grid item > */}
            {/* <img
                src={process.env.PUBLIC_URL + "/img/test2.png"}
                alt="img-test"
                width={1100}
                onClick={(event) => handleClick(event)}
              /> */}
            {/* </Grid> */}
            <Grid item className={classes.positionImg}>
              <ImageComponent className={classes} />
              <CanvasComponent
                className={classes}
                setOffSet={handleCanvasData}
              />
              {openPopover && (
                <Grid
                  item
                  className={classes.positionBox}
                  style={{
                    top: `${popoverAnchor.y - 50}px`,
                    left: `${popoverAnchor.x - 50}px`,
                  }}
                >
                  <Card className={popoverAnchor.x > 830 ? classes.btnColorActive : classes.btnColor}>
                    <CardContent className={classes.paddindCardContent}>
                      <Grid item>
                        <Typography variant="body1">
                          {popoverAnchor.detail.title}
                        </Typography>
                      </Grid>
                      <Grid item className="FlexCard">
                        <Typography variant="subtitle2">
                          {popoverAnchor.detail.subTitle}
                        </Typography>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              )}

              {/* <Popover
                open={openPopover}
                anchorReference="anchorPosition"
                anchorPosition={
                  popoverAnchor
                    ? { top: popoverAnchor.y, left: popoverAnchor.x + 300 }
                    : undefined
                }
                onClose={closePopover}
              >
                Popover content
                <div>Popover Content</div>
              </Popover> */}
            </Grid>
          </Grid>
        </Box>

        <Grid item md={12}>
          <Grid item md={3} className={classes.positionBixImg}>
            <Card className="MarginCard">
              <CardContent>
                <Grid item>
                  <Typography variant="body1">Processing Process</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6">MDB - 1</Typography>
                </Grid>
                <Grid item className={classes.FlexCard}>
                  <Typography variant="body1">Power</Typography>
                  <Typography variant="body1">2 kWh</Typography>
                </Grid>
                <Grid item className={classes.FlexCard}>
                  <Typography variant="body1">Energy day</Typography>
                  <Typography variant="body1">11 kWh</Typography>
                </Grid>
                <Grid item className={classes.FlexCard}>
                  <Typography variant="body1">Total Energy</Typography>
                  <Typography variant="body1">1,111,111 kWh</Typography>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

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

class ImageComponent extends Component {
  render() {
    const { className } = this.props;
    return (
      <img
        src={process.env.PUBLIC_URL + "/img/test2.png"}
        alt="Your Image"
        className={className.positionAbImg}
      />
    );
  }
}

class CanvasComponent extends Component {
  state = {
    isDrawing: false,
    // positions: [
    //   {
    //     box: "box1",
    //     x: {
    //       min: "160",
    //       max: "175",
    //     },
    //     y: {
    //       min: "430",
    //       max: "445",
    //     },
    //   },
    //   {
    //     box: "box2",
    //     x: {
    //       min: "170",
    //       max: "185",
    //     },
    //     y: {
    //       min: "440",
    //       max: "450",
    //     },
    //   },
    // ],
  };

  canvasRef = React.createRef();

  componentDidMount() {
    const canvas = this.canvasRef.current;
    this.context = canvas.getContext("2d");
  }

  handleMouseDown = async (event) => {
    this.setState({ isDrawing: true });
    const { offsetX, offsetY } = event.nativeEvent;
    // this.context.beginPath();
    // this.context.moveTo(offsetX, offsetY);
    console.log("handleMouseDown", offsetX, offsetY);
    // await this.setState({
    //   offset: { x: offsetX, y: offsetY },
    // });
    this.props.setOffSet({ x: offsetX, y: offsetY });
    // const clickedBox = this.state.positions.find((box) => {
    //   const xInRange = offsetX >= box.x.min && offsetX <= box.x.max;
    //   const yInRange = offsetY >= box.y.min && offsetY <= box.y.max;
    //   return xInRange && yInRange;
    // });
  };

  // handleMouseMove = (event) => {
  //   if (!this.state.isDrawing) return;
  //   const { offsetX, offsetY } = event.nativeEvent;
  //   this.context.lineTo(offsetX, offsetY);
  //   this.context.stroke();
  //   this.setState((prevState) => ({
  //     positions: [...prevState.positions, { x: offsetX, y: offsetY }],
  //   }));
  //   console.log('handleMouseMove', offsetX, offsetY);
  // };

  handleMouseUp = () => {
    this.setState({ isDrawing: false });
    console.log("handleMouseUp");
  };

  render() {
    const { className } = this.props;
    return (
      <canvas
        ref={this.canvasRef}
        onMouseDown={this.handleMouseDown}
        // onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        onTouchStart={this.handleMouseDown}
        // onTouchMove={this.handleMouseMove}
        onTouchEnd={this.handleMouseUp}
        className={clsx(className.positionAbImg, className.cursorImag)}
      />
    );
  }
}
