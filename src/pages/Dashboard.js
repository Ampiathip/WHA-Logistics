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
import CanvasComponent from "../utils/canvasComponent";
import ImageComponent from "../utils/imageComponent";
import useMediaQuery from "@mui/material/useMediaQuery";
import ModalProcess from "../component/modalProcess";

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
  fontSizeHead: {
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Poppins, sans-serif !important",
  },
  fontSizeSub: {
    fontSize: 12,
    fontWeight: "normal",
    fontFamily: "Poppins, sans-serif !important",
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const { t, i18n } = useTranslation(["home", "footer", "login"]);
  const matches = useMediaQuery("(min-width:1024px)");

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

  // modal //
  const [openModalProcess, setOpenModalProcess] = useState(false);
  const [dataModal, setDataModal] = useState("");

  const defaultData = [
    {
      box: "box1",
      x: {
        min: "140",
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
        min: "220",
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
        min: "380",
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
        min: "460",
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
        min: "620",
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
  ];

  const Image = process.env.PUBLIC_URL + "/img/test2.png";

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

  const handleOpenModal = (item) => {
    setDataModal(item);
    setOpenModalProcess(true);
  };

  // ขนาดหน้าจอ บน computer จะแสดงผลแบบนี้ // 
  const renderCardBox = () => {
    if (openPopover) {
      return (
        <Grid
          item
          className={classes.positionBox}
          style={{
            top: `${popoverAnchor.y - 50}px`,
            left: `${popoverAnchor.x - 50}px`,
          }}
        >
          <Card
            className={
              popoverAnchor.x > 830 ? classes.btnColorActive : classes.btnColor
            }
          >
            <CardContent className={classes.paddindCardContent}>
              <Grid item>
                <Typography className={classes.fontSizeHead}>
                  {popoverAnchor.detail.title}
                </Typography>
              </Grid>
              <Grid item className="FlexCard">
                <Typography className={classes.fontSizeSub}>
                  {popoverAnchor.detail.subTitle}
                </Typography>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      );
    } else {
      return defaultData.map((item) => {
        return (
          <Grid
            item
            className={classes.positionBox}
            style={{
              top: `${item.y.max - 34}px`,
              left: `${item.x.min - 50}px`,
            }}
          >
            <Card
              className={
                item.x.max > 830 ? classes.btnColorActive : classes.btnColor
              }
            >
              <CardContent
                className={clsx(classes.paddindCardContent, classes.cursorImag)}
                onClick={() => handleOpenModal(item)}
              >
                <Grid item>
                  <Typography className={classes.fontSizeHead}>
                    {item.detail.title}
                  </Typography>
                </Grid>
                <Grid item className="FlexCard">
                  <Typography className={classes.fontSizeSub}>
                    {item.detail.subTitle}
                  </Typography>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        );
      });
    }
  };

  // ขนาดหน้าจอ ipad จะแสดงผลแบบนี้ // 
  const renderCardRow = () => {
    return defaultData.map((card) => {
      return (
        <Grid item md={12} className={classes.marginBox}>
          <Card
            className={
              card.x.max > 830 ? classes.btnColorActive : classes.btnColor
            }
          >
            <CardContent
              className={clsx(classes.paddindCardContent, classes.cursorImag)}
              onClick={() => handleOpenModal(card)}
            >
              <Grid item>
                <Typography variant="h6">{card.detail?.title}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">{card.detail?.subTitle}</Typography>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      );
    });
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

        {matches ? (
          <Box>
            <Grid item md={12} className={classes.FlexIcon}>
              <Grid item md={1}></Grid>
              <Grid item className={classes.positionImg}>
                <ImageComponent className={classes} src={Image} />
                <CanvasComponent
                  className={classes}
                  setOffSet={handleCanvasData}
                />
                {renderCardBox()}
                {/* {openPopover && (
                <Grid
                  item
                  className={classes.positionBox}
                  style={{
                    top: `${popoverAnchor.y - 50}px`,
                    left: `${popoverAnchor.x - 50}px`,
                  }}
                >
                  <Card
                    className={
                      popoverAnchor.x > 830
                        ? classes.btnColorActive
                        : classes.btnColor
                    }
                  >
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
              )} */}

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
        ) : (
          <Box>{renderCardRow()}</Box>
        )}

        {/* <Grid item md={12}>
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
        </Grid> */}

        <ModalProcess
          open={openModalProcess}
          close={() => setOpenModalProcess(false)}
          t={t}
          data={dataModal}
        />
      </Layout>
    </>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
