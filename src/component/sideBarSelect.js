import {
    Grid,
    Container,
    Typography,
    Card,
    CardContent,
    Box,
  } from "@mui/material";
  import { Link } from "react-router-dom";
  
  const SideBarSelect = ({ children }) => {

    return (
      <>
        <Grid container>
          <Grid item md={12} className="disPlayFlexRow">
            <Grid item md={3} className="MaxWidthSideBar"></Grid>
            <Grid item md={2} className="MarginCard">
              <Card>
                <CardContent>
                  <Typography variant="h6">Selected Point</Typography>
                  <div className="MarginCard backGrourdCard">
                    <Box className="padingText">
                      <Typography variant="body1" className="ColorAccondion">
                        Energy L1
                      </Typography>
                    </Box>
                    <Box className="padingText">
                      <Typography variant="body1" className="ColorAccondion">
                        Energy L3
                      </Typography>
                    </Box>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={7}>{children}</Grid>
          </Grid>
        </Grid>
      </>
    );
  };
  
  SideBarSelect.propTypes = {};
  
  export default SideBarSelect;
  