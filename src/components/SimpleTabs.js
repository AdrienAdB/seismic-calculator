import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import BoltVolumeForm from './BoltVolumeForm';
import SpeedForm from './SpeedForm';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
      <Typography
        component="div"

        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        <Box py={3}>{children}</Box>
      </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


export default function SimpleTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    sendAnalytics(event, newValue);
  };

  return (
    <Box>
      <AppBar position="static" color="primary" borderRadius="5px">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Speed" {...a11yProps(0)} />
          <Tab label="Source" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Box py={4}>
          <SpeedForm />
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box py={4}>
          <BoltVolumeForm />
        </Box>
      </TabPanel>
    </Box>
  );
}

// Matomo Analytics
// must add main matomo script in index.html
function sendAnalytics(event, newValue){
  var tabTitles = ['speed', 'source']; //could be done with a cleaner way
  var tabTitle = tabTitles[newValue]
  window._paq.push(['trackEvent', 'Tab click', tabTitle]);
}
