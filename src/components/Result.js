/*
Result paper view

props: title, value, description
*/

import React from 'react';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    height: "100%"
  },
}));


export default function Result(props){
  const classes = useStyles();

  return(
    <Paper className={classes.root} elevation={2}>
      <Typography variant="h6" gutterBottom align="center">
        {props.title}
      </Typography>
      <Typography variant="h4" gutterBottom align="center">
        {props.value}
      </Typography>
      <Typography gutterBottom align="center">
        {props.description}
      </Typography>
    </Paper>
  );


}
