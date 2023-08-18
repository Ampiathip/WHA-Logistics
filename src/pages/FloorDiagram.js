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
    // backgroundColor: "#E6F7FF",
    color: "#000",
    width: "100%",
  },
  btnColorActive: {
    // backgroundColor: "#FEC70B",
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
    // justifyContent: "center",
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
    width: "55em",
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
    width: "55em",
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
    fontFamily: "Nunito, sans-serif !important",
  },
  fontSizeSub: {
    fontSize: 12,
    fontWeight: "normal",
    fontFamily: "Nunito, sans-serif !important",
  },
  displayFlex: {
    display: "flex",
  },
  marginRight: {
    marginRight: 20,
  },
  marginLeft: {
    marginLeft: 20,
  },
  borderHead: {
    border: "1px solid #000",
    padding: 5,
    textAlign: "center",
  },
  borderTitleBox: {
    borderRight: "1px solid #000",
    borderLeft: "1px solid #000",
    borderBottom: "1px solid #000",
    padding: 5,
    textAlign: "center",
    fontSize: 12,
  },
  backgroundBox1: {
    backgroundColor: "#92D2E0",
  },
  backgroundBox2: {
    backgroundColor: "#B3FCD5",
  },
  backgroundBox3: {
    backgroundColor: "#FDF2CF",
  },
  backgroundBox4: {
    backgroundColor: "#DBE1F1",
  },
  backgroundBox5: {
    backgroundColor: "#E5EFDB",
  },
  backgroundBox6: {
    backgroundColor: "#F4C1DC",
  },
  backgroundBox7: {
    backgroundColor: "#CCDFB7",
  },
  backgroundBoxFloor: {
    backgroundColor: "#FFFF4B",
  },
  backgroundBoxFloor2: {
    backgroundColor: "#A1CE5F",
  },
  backgroundBoxFloor3: {
    backgroundColor: "#52AEEB",
  },
  backgroundBoxFloor4: {
    backgroundColor: "#326EBB",
  },
  backgroundBoxFloor5: {
    backgroundColor: "#F4C23C",
  },
  backgroundBoxFloor6: {
    backgroundColor: "#B18BE1",
  },
  backgroundBoxFloor7: {
    backgroundColor: "#92D2E0",
  },
}));

const FloorDiagram = () => {
  const classes = useStyles();
  const { t, i18n } = useTranslation(["home", "footer", "login"]);
  const matches = useMediaQuery("(min-width:1024px)");

  const [diagram, setDiagram] = useState("1");
  // const position = useMousePosition();
  const [foolrOne, setFoolrOne] = useState([
    {
      box: "box1",
      name: "Canteen",
      x: {
        min: "334",
        max: "330",
      },
      y: {
        min: "300",
        max: "361",
      },
      detail: {
        title: "LC.WH.11",
        subTitle: "Power 2kw",
      },
    },
    {
      box: "box2",
      name: "F1",
      x: {
        min: "453",
        max: "280",
      },
      y: {
        min: "380",
        max: "468",
      },
      detail: {
        title: "CU.EX.11",
        subTitle: "Power 2kw",
      },
    },
    {
      box: "box3",
      name: "F1",
      x: {
        min: "451",
        max: "380",
      },
      y: {
        min: "380",
        max: "520",
      },
      detail: {
        title: "LC.WH.12",
        subTitle: "Power 2kw",
      },
    },
    {
      box: "box4",
      name: "F1",
      x: {
        min: "115",
        max: "450",
      },
      y: {
        min: "400",
        max: "636",
      },
      detail: {
        title: "LC.WH.13",
        subTitle: "Power 2kw",
      },
    },
  ]);

  const [foolrTwo, setFoolrTwo] = useState([
    {
      box: "box1",
      name: "Lighting",
      x: {
        min: "206",
        max: "330",
      },
      y: {
        min: "300",
        max: "578",
      },
      detail: {
        title: "6 LC-AC.02",
        subTitle: "Power 2kw",
      },
    },
    {
      box: "box2",
      name: "Power",
      x: {
        min: "301",
        max: "280",
      },
      y: {
        min: "380",
        max: "578",
      },
      detail: {
        title: "5 LCE-OF.02",
        subTitle: "Power 2kw",
      },
    },
    {
      box: "box3",
      name: "Power",
      x: {
        min: "439",
        max: "380",
      },
      y: {
        min: "380",
        max: "665",
      },
      detail: {
        title: "7 LCE-AC.04",
        subTitle: "Power 2kw",
      },
    },
    {
      box: "box4",
      name: "Power",
      x: {
        min: "543",
        max: "450",
      },
      y: {
        min: "400",
        max: "665",
      },
      detail: {
        title: "8 LCE-Server",
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
      name: "Canteen",
      x: {
        min: "334",
        max: "330",
      },
      y: {
        min: "300",
        max: "361",
      },
      detail: {
        title: "3 Canteen",
        subTitle: "Power 2kw",
      },
    },
    {
      box: "box2",
      name: "F1",
      x: {
        min: "423",
        max: "280",
      },
      y: {
        min: "380",
        max: "468",
      },
      detail: {
        title: "1 CE.OF.01",
        subTitle: "Power 2kw",
      },
    },
    {
      box: "box3",
      name: "F1",
      x: {
        min: "420",
        max: "380",
      },
      y: {
        min: "380",
        max: "520",
      },
      detail: {
        title: "2 LCE-AC.01",
        subTitle: "Power 2kw",
      },
    },
    {
      box: "box4",
      name: "F1",
      x: {
        min: "115",
        max: "450",
      },
      y: {
        min: "400",
        max: "636",
      },
      detail: {
        title: "4 LEC.SEC",
        subTitle: "Power 2kw",
      },
    },
  ];

  const defaultDataFloor2 = [
    {
      box: "box1",
      name: "Lighting",
      x: {
        min: "206",
        max: "330",
      },
      y: {
        min: "300",
        max: "578",
      },
      detail: {
        title: "6 LC-AC.02",
        subTitle: "Power 2kw",
      },
    },
    {
      box: "box2",
      name: "Power",
      x: {
        min: "301",
        max: "280",
      },
      y: {
        min: "380",
        max: "578",
      },
      detail: {
        title: "5 LCE-OF.02",
        subTitle: "Power 2kw",
      },
    },
    {
      box: "box3",
      name: "Power",
      x: {
        min: "439",
        max: "380",
      },
      y: {
        min: "380",
        max: "665",
      },
      detail: {
        title: "7 LCE-AC.04",
        subTitle: "Power 2kw",
      },
    },
    {
      box: "box4",
      name: "Power",
      x: {
        min: "543",
        max: "450",
      },
      y: {
        min: "400",
        max: "665",
      },
      detail: {
        title: "8 LCE-Server",
        subTitle: "Power 2kw",
      },
    },
  ];

  const ImageFloor = process.env.PUBLIC_URL + "/img/image24.png";
  const ImageFloorTwo = process.env.PUBLIC_URL + "/img/image22.png";

  const handleBtnDiaram = (value) => {
    // console.log("e", value, index);
    setDiagram(value);
  };

  const handleCanvasData = (data) => {
    console.log("Data received from CanvasComponent:", data);
    let clickedBox = {};
    if (diagram === '1') {
      clickedBox = foolrOne.find((box) => {
        const xInRange = data.x >= box.x.min && data.x <= box.x.max;
        const yInRange = data.y >= box.y.min && data.y <= box.y.max;
        return xInRange && yInRange;
      });
    } else {
      clickedBox = foolrTwo.find((box) => {
        const xInRange = data.x >= box.x.min && data.x <= box.x.max;
        const yInRange = data.y >= box.y.min && data.y <= box.y.max;
        return xInRange && yInRange;
      });
    }

    console.log("ffffff====", clickedBox);
    if (clickedBox) {
      setOpenPopover(true);
      setPopoverAnchor({
        x: data.x,
        y: data.y,
        detail: clickedBox.detail,
        name: clickedBox.name,
      });
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
            className={clsx(
              classes.btnColor,
              popoverAnchor.name === "Canteen"
                ? classes.backgroundBox5
                : classes.backgroundBox1
            )}
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
              left: `${item.x.min - 20}px`,
            }}
          >
            <Card
              className={clsx(
                classes.btnColor,
                item.name === "Canteen"
                  ? classes.backgroundBox5
                  : classes.backgroundBox1
              )}
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


  const renderCardBoxFloorTwo = () => {
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
            className={clsx(
              classes.btnColor,
              popoverAnchor.name === "Lighting"
                ? classes.backgroundBoxFloor
                : classes.backgroundBoxFloor2
            )}
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
      return defaultDataFloor2.map((item) => {
        return (
          <Grid
            item
            className={classes.positionBox}
            style={{
              top: `${item.y.max - 34}px`,
              left: `${item.x.min - 20}px`,
            }}
          >
            <Card
              className={clsx(
                classes.btnColor,
                item.name === "Lighting"
                  ? classes.backgroundBoxFloor
                  : classes.backgroundBoxFloor2
              )}
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
  const renderCardRowFloorOne = () => {
    return defaultData.map((card) => {
      return (
        <Grid item md={12} className={classes.marginBox}>
          <Card
            className={clsx(
              classes.btnColor,
              card.name === "Canteen"
                ? classes.backgroundBox5
                : classes.backgroundBox1
            )}
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

  const renderCardRowFloorTwo = () => {
    return defaultDataFloor2.map((card) => {
      return (
        <Grid item md={12} className={classes.marginBox}>
          <Card
            className={clsx(
              classes.btnColor,
              card.name === "Lighting"
                ? classes.backgroundBoxFloor
                : classes.backgroundBoxFloor2
            )}
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
      <Layout type={"FloorDiagram"}>
        {/* <Grid container className="FlexRowCard"> */}
        {/* <Grid item md={2}></Grid> */}
        <Box
          className={clsx(classes.flexRow, classes.marginBox, classes.flexWrap)}
        >
          <Grid item md={3}>
            <Card>
              <CardContent>
                <Grid item className={classes.FlexCard}>
                  <Typography variant="body1">
                    Yesterday Energy Usage
                  </Typography>
                  <Typography variant="body1">21 kWh</Typography>
                </Grid>
                <Grid item className={classes.FlexCard}>
                  <Typography variant="body1">Day to day Usage</Typography>
                  <Typography variant="body1">32 kWh</Typography>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item md={3}>
            <Card>
              <CardContent>
                <Grid item className={classes.FlexCard}>
                  <Typography variant="body1">
                    This Month Energy Usage
                  </Typography>
                  <Typography variant="body1">21 kWh</Typography>
                </Grid>
                <Grid item className={classes.FlexCard}>
                  <Typography variant="body1">Month to Month Usage</Typography>
                  <Typography variant="body1">32 kWh</Typography>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item md={3}>
            <Card>
              <CardContent>
                <Grid item className={classes.FlexCard}>
                  <Typography variant="body1">This Month Peak Usage</Typography>
                  {/* <Typography variant="body1">2 kWh</Typography> */}
                </Grid>
                <Grid item className={classes.FlexCard}>
                  <Typography variant="body1">999 kw Time: 11.11</Typography>
                  {/* <Typography variant="body1">2 kWh</Typography> */}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Box>

        <Box
          className={clsx(
            classes.alignCenter,
            classes.marginBox,
            classes.displayFlex,
            classes.flexWrap
          )}
        >
          <Grid item md={2}>
            <Typography variant="h5">Floor Diagram</Typography>
          </Grid>
          <Grid item md={2} className={classes.marginRight}>
            <Button
              variant="contained"
              className={`${
                diagram == "1" ? classes.activeIcon : classes.btnColor
              }`}
              onClick={() => handleBtnDiaram("1")}
            >
              Floor 1
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
              Floor 2
            </Button>
          </Grid>
        </Box>

        {/* Floor 1 */}
        {matches ? (
          <Box>
            {diagram === "1" ? (
              <Grid item md={12} className={classes.FlexIcon}>
                <Grid item md={1}></Grid>
                <Grid item className={clsx(classes.positionImg)}>
                  <ImageComponent className={classes} src={ImageFloor} />
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
                </Grid>
                <Grid item md={2} className={classes.marginLeft}>
                  <Typography variant="h6" className={clsx(classes.borderHead)}>
                    {" "}
                    Group Name
                  </Typography>
                  <Typography
                    className={clsx(
                      classes.borderTitleBox,
                      classes.backgroundBox1
                    )}
                  >
                    {" "}
                    Air System Fl1
                  </Typography>
                  <Typography
                    className={clsx(
                      classes.borderTitleBox,
                      classes.backgroundBox1
                    )}
                  >
                    {" "}
                    Air System Fl1
                  </Typography>
                  <Typography
                    className={clsx(
                      classes.borderTitleBox,
                      classes.backgroundBox2
                    )}
                  >
                    {" "}
                    Air System Fl2
                  </Typography>
                  <Typography
                    className={clsx(
                      classes.borderTitleBox,
                      classes.backgroundBox2
                    )}
                  >
                    {" "}
                    Air System Fl2
                  </Typography>
                  <Typography
                    className={clsx(
                      classes.borderTitleBox,
                      classes.backgroundBox3
                    )}
                  >
                    {" "}
                    Server Area
                  </Typography>
                  <Typography
                    className={clsx(
                      classes.borderTitleBox,
                      classes.backgroundBox3
                    )}
                  >
                    {" "}
                    Server Area
                  </Typography>
                  <Typography
                    className={clsx(
                      classes.borderTitleBox,
                      classes.backgroundBox4
                    )}
                  >
                    {" "}
                    Office Receptacle
                  </Typography>
                  <Typography
                    className={clsx(
                      classes.borderTitleBox,
                      classes.backgroundBox4
                    )}
                  >
                    {" "}
                    Office Receptacle
                  </Typography>
                  <Typography
                    className={clsx(
                      classes.borderTitleBox,
                      classes.backgroundBox4
                    )}
                  >
                    {" "}
                    Office Receptacle
                  </Typography>
                  <Typography
                    className={clsx(
                      classes.borderTitleBox,
                      classes.backgroundBox5
                    )}
                  >
                    {" "}
                    Canteen
                  </Typography>
                  <Typography
                    className={clsx(
                      classes.borderTitleBox,
                      classes.backgroundBox5
                    )}
                  >
                    {" "}
                    Canteen
                  </Typography>
                  <Typography
                    className={clsx(
                      classes.borderTitleBox,
                      classes.backgroundBox6
                    )}
                  >
                    {" "}
                    Facility
                  </Typography>
                  <Typography
                    className={clsx(
                      classes.borderTitleBox,
                      classes.backgroundBox7
                    )}
                  >
                    {" "}
                    Parking and landscape
                  </Typography>
                  <Typography
                    className={clsx(
                      classes.borderTitleBox,
                      classes.backgroundBox7
                    )}
                  >
                    {" "}
                    Parking and landscape
                  </Typography>
                </Grid>
              </Grid>
            ) : (
              <Grid item md={12} className={classes.FlexIcon}>
                <Grid item md={1}></Grid>
                <Grid item className={classes.positionImg}>
                  <ImageComponent className={classes} src={ImageFloorTwo} />
                  <CanvasComponent
                    className={classes}
                    setOffSet={handleCanvasData}
                  />
                  {renderCardBoxFloorTwo()}
                </Grid>
                <Grid item md={2} className={classes.marginLeft}>
                  <Typography variant="h6" className={clsx(classes.borderHead)}>
                    {" "}
                    Group Name
                  </Typography>
                  <Typography
                    className={clsx(
                      classes.borderTitleBox,
                      classes.backgroundBoxFloor
                    )}
                  >
                    {" "}
                    WH Lighting
                  </Typography>
                  <Typography
                    className={clsx(
                      classes.borderTitleBox,
                      classes.backgroundBoxFloor
                    )}
                  >
                    {" "}
                    WH Lighting
                  </Typography>
                  <Typography
                    className={clsx(
                      classes.borderTitleBox,
                      classes.backgroundBoxFloor
                    )}
                  >
                    {" "}
                    WH Lighting
                  </Typography>
                  <Typography
                    className={clsx(
                      classes.borderTitleBox,
                      classes.backgroundBoxFloor
                    )}
                  >
                    {" "}
                    WH Lighting
                  </Typography>
                  <Typography
                    className={clsx(
                      classes.borderTitleBox,
                      classes.backgroundBoxFloor
                    )}
                  >
                    {" "}
                    WH Lighting
                  </Typography>
                  <Typography
                    className={clsx(
                      classes.borderTitleBox,
                      classes.backgroundBoxFloor2
                    )}
                  >
                    {" "}
                    WH Power
                  </Typography>
                  <Typography
                    className={clsx(
                      classes.borderTitleBox,
                      classes.backgroundBoxFloor2
                    )}
                  >
                    {" "}
                    WH Power
                  </Typography>
                  <Typography
                    className={clsx(
                      classes.borderTitleBox,
                      classes.backgroundBoxFloor2
                    )}
                  >
                    {" "}
                    WH Power
                  </Typography>
                  <Typography
                    className={clsx(
                      classes.borderTitleBox,
                      classes.backgroundBoxFloor2
                    )}
                  >
                    {" "}
                    WH Power
                  </Typography>
                  <Typography
                    className={clsx(
                      classes.borderTitleBox,
                      classes.backgroundBoxFloor3
                    )}
                  >
                    {" "}
                    WH Big Fan
                  </Typography>
                  <Typography
                    className={clsx(
                      classes.borderTitleBox,
                      classes.backgroundBoxFloor3
                    )}
                  >
                    {" "}
                    WH Big Fan
                  </Typography>
                  <Typography
                    className={clsx(
                      classes.borderTitleBox,
                      classes.backgroundBoxFloor4
                    )}
                  >
                    {" "}
                    Charger Area
                  </Typography>
                  <Typography
                    className={clsx(
                      classes.borderTitleBox,
                      classes.backgroundBoxFloor5
                    )}
                  >
                    {" "}
                    LC Receptacle
                  </Typography>
                  <Typography
                    className={clsx(
                      classes.borderTitleBox,
                      classes.backgroundBoxFloor5
                    )}
                  >
                    {" "}
                    LC Receptacle
                  </Typography>
                  <Typography
                    className={clsx(
                      classes.borderTitleBox,
                      classes.backgroundBoxFloor5
                    )}
                  >
                    {" "}
                    LC Receptacle
                  </Typography>
                  <Typography
                    className={clsx(
                      classes.borderTitleBox,
                      classes.backgroundBoxFloor6
                    )}
                  >
                    {" "}
                    WH Receptacle
                  </Typography>
                  <Typography
                    className={clsx(
                      classes.borderTitleBox,
                      classes.backgroundBoxFloor7
                    )}
                  >
                    {" "}
                    Facility
                  </Typography>
                  <Typography
                    className={clsx(
                      classes.borderTitleBox,
                      classes.backgroundBoxFloor7
                    )}
                  >
                    {" "}
                    Facility
                  </Typography>
                  <Typography
                    className={clsx(
                      classes.borderTitleBox,
                      classes.backgroundBoxFloor7
                    )}
                  >
                    {" "}
                    Facility
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Box>
        ) : (
          <Box>
            {diagram === "1"
              ? renderCardRowFloorOne()
              : renderCardRowFloorTwo()}
          </Box>
        )}

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

FloorDiagram.propTypes = {};

export default FloorDiagram;
