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
    marginLeft: 15,
  },
  marginRow: {
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
    backgroundColor: "#FFF",
    color: "#000",
    width: "100%",
  },
  btnColorActive: {
    color: "#27963C",
  },
  btnWidth: {
    width: "100%",
  },
  activeIcon: {
    backgroundColor: "#27963C",
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
    width: "60em",
    marginTop: 40,
    // height: "50em",
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
    width: "60em",
    // height: "100%",
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

const SystemOverview = () => {
  const classes = useStyles();
  const { t, i18n } = useTranslation(["home", "footer", "login"]);
  const matches = useMediaQuery("(min-width:1024px)");

  const [diagram, setDiagram] = useState("1");
  // const position = useMousePosition();
  const [offSet, setOffSet] = useState([
    {
      box: "box1",
      x: {
        min: "100",
        max: "184",
      },
      y: {
        min: "150",
        max: "-30",
      },
      detail: {
        title: "Electrical",
        subTitle: "MEA Power Supply",
      },
    },
    {
      box: "box2",
      x: {
        min: "100",
        max: "280",
      },
      y: {
        min: "380",
        max: "450",
      },
      detail: {
        title: "Electrical",
        subTitle: "Solar Supply",
      },
    },
    {
      box: "box3",
      x: {
        min: "770",
        max: "380",
      },
      y: {
        min: "380",
        max: "330",
      },
      detail: {
        title: "Electrical",
        subTitle: "Total Usage",
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
        min: "100",
        max: "184",
      },
      y: {
        min: "150",
        max: "-30",
      },
      detail: {
        title: "Electrical",
        subTitle: "MEA Power Supply",
      },
    },
    {
      box: "box2",
      x: {
        min: "100",
        max: "280",
      },
      y: {
        min: "380",
        max: "450",
      },
      detail: {
        title: "Electrical",
        subTitle: "Solar Supply",
      },
    },
    {
      box: "box3",
      x: {
        min: "770",
        max: "380",
      },
      y: {
        min: "380",
        max: "330",
      },
      detail: {
        title: "Electrical",
        subTitle: "Total Usage",
      },
    },
    {
      box: "box4",
      x: {
        min: "700",
        max: "380",
      },
      y: {
        min: "380",
        max: "-30",
      },
      detail: {
        title: "",
        subTitle: "",
      },
    },
  ];

  const Image = process.env.PUBLIC_URL + "/img/design2.png";

  const handleBtnDiaram = (value) => {
    // console.log("e", value, index);
    setDiagram(value);
  };

  const handleCanvasData = (data) => {
    console.log("Data received from CanvasComponent:", data);
    // const clickedBox = offSet.find((box) => {
    //   const xInRange = data.x >= box.x.min && data.x <= box.x.max;
    //   const yInRange = data.y >= box.y.min && data.y <= box.y.max;
    //   return xInRange && yInRange;
    // });

    // console.log("ffffff====", clickedBox);
    // if (clickedBox) {
    //   setOpenPopover(true);
    //   setPopoverAnchor({ x: data.x, y: data.y, detail: clickedBox.detail });
    // } else {
    //   setOpenPopover(false);
    // }
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
          <Card>
            <CardContent
              className={clsx(classes.paddindCardContent, classes.cursorImag)}
              onClick={() => handleOpenModal(popoverAnchor)}
            >
              <Grid item>
                <Typography variant="subtitle2">
                  {popoverAnchor.detail.title}
                </Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.fontSizeHead}>
                  {popoverAnchor.detail.subTitle}
                </Typography>
              </Grid>
              <Grid item className={clsx(classes.FlexCard)}>
                <Typography variant="body2">Power</Typography>
                <Typography className={classes.fontSizeSub}>2 kWh</Typography>
              </Grid>
              <Grid item className={classes.FlexCard}>
                <Typography variant="body2">Energy day</Typography>
                <Typography className={classes.fontSizeSub}>11 kWh</Typography>
              </Grid>
              <Grid item className={classes.FlexCard}>
                <Typography variant="body2">Total Energy</Typography>
                <Typography
                  className={clsx(classes.fontSizeSub, classes.marginBox)}
                >
                  1,111,111 kWh
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
              top: `${item.y.max}px`,
              left: `${item.x.min}px`,
            }}
          >
            {item.box === "box4" ? (
              <Grid>
                <Typography variant="h3" className={classes.btnColorActive}>
                  {" "}
                  DB-B1{" "}
                </Typography>
              </Grid>
            ) : (
              <Card>
                <CardContent
                  className={clsx(
                    classes.paddindCardContent,
                    classes.cursorImag
                  )}
                  onClick={() => handleOpenModal(item)}
                >
                  <Grid item>
                    <Typography variant="subtitle2">
                      {item.detail.title}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.fontSizeHead}>
                      {item.detail.subTitle}
                    </Typography>
                  </Grid>
                  <Grid item className={clsx(classes.FlexCard)}>
                    <Typography variant="body2">Power</Typography>
                    <Typography className={classes.fontSizeSub}>
                      2 kWh
                    </Typography>
                  </Grid>
                  <Grid item className={classes.FlexCard}>
                    <Typography variant="body2">Energy day</Typography>
                    <Typography className={classes.fontSizeSub}>
                      11 kWh
                    </Typography>
                  </Grid>
                  <Grid item className={classes.FlexCard}>
                    <Typography variant="body2">Total Energy</Typography>
                    <Typography
                      className={clsx(classes.fontSizeSub, classes.marginBox)}
                    >
                      1,111,111 kWh
                    </Typography>
                  </Grid>
                </CardContent>
              </Card>
            )}
          </Grid>
        );
      });
    }
  };

  // ขนาดหน้าจอ ipad จะแสดงผลแบบนี้ //
  const renderCardRow = () => {
    return defaultData.map((card) => {
      return (
        <Grid item md={12} className={classes.marginRow}>
          {card.box === "box4" ? (
            <Grid>
              {/* <Typography variant="h3" className={classes.btnColorActive}>
                {" "}
                DB-B1{" "}
              </Typography> */}
            </Grid>
          ) : (
            <Card>
              <CardContent
                className={clsx(classes.paddindCardContent, classes.cursorImag)}
                onClick={() => handleOpenModal(card)}
              >
                <Grid item>
                  <Typography variant="h6">{card.detail.title}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h5">{card.detail.subTitle}</Typography>
                </Grid>
                <Grid item className={clsx(classes.FlexCard)}>
                  <Typography variant="body2">Power</Typography>
                  <Typography variant="body2">2 kWh</Typography>
                </Grid>
                <Grid item className={classes.FlexCard}>
                  <Typography variant="body2">Energy day</Typography>
                  <Typography variant="body2">11 kWh</Typography>
                </Grid>
                <Grid item className={classes.FlexCard}>
                  <Typography variant="body2">Total Energy</Typography>
                  <Typography variant="body2">1,111,111 kWh</Typography>
                </Grid>
              </CardContent>
            </Card>
          )}
        </Grid>
      );
    });
  };

  return (
    <>
      <Layout type={"SystemOverview"}>
        <Grid item className={classes.marginRow}>
          <Typography variant="h6"> System Overview </Typography>
        </Grid>
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

        {/* <ModalProcess
          open={openModalProcess}
          close={() => setOpenModalProcess(false)}
          t={t}
          data={dataModal}
        /> */}
      </Layout>
    </>
  );
};

SystemOverview.propTypes = {};

export default SystemOverview;
