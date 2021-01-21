import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';

import SimpleTabs from './components/SimpleTabs';
import ReloadButton from './components/ReloadButton';


import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {
    minHeight: "50vh"
  },
}));

function Copyright() {
  return (
    <Box mt={2}>
      <Typography variant="body2" color="textSecondary" align="center">
        <Link color="primary" href="https://acte.ltd">
          ACTE Technology Co. Ltd.
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Box>
  );
}

function OpenSourceProject(){
  return(
    <Link target="_blank" color="primary" href="https://github.com/AdrienAdB/seismic-calculator">
      open source project
    </Link>
  );
}


export default function App() {

  const classes = useStyles();

  return (
      <Container maxWidth="sm" >

        <Box
          borderRadius="5px"
          boxShadow={1}
          bgcolor="#fff"
          my={4}
          px={2}
          py={6}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Seismic Calculator
          </Typography>
          <Box className={classes.wrapper} my={4} minHeigth='50vh'>
            <SimpleTabs />
          </Box>
          <Box mt={4}>
            <Typography color="textSecondary" align="center">
              An <OpenSourceProject /> made with ReactJS and Material UI
            </Typography>
          </Box>

          <Copyright />

          <ReloadButton />


        </Box>

      </Container>


  );
}
