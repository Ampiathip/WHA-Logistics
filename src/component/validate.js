import React from 'react';
import {Grid, makeStyles, Typography} from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles(
  (theme) => {
    return {
      invalidError: {
        color: '#C00D0D',
        textAlign: 'left',
        // fontSize: '14px',
      },
    };
  },
  {index: 1},
);

const Validate = ({errorText}) => {
  const classes = useStyles();
  return (
    <Grid item xs={12}>
      {errorText ? (
        <Typography variant="subtitle2" className={classes.invalidError}>
          {errorText}
        </Typography>
      ) : null}
    </Grid>
  );
};

Validate.propTypes = {
  errorText: PropTypes.string,
};

export default Validate;
