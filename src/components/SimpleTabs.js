import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import BoltVolumeForm from './BoltVolumeForm';
import ETAForm from './ETAForm';
import TurnForm from './TurnForm';


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
    sendAnalytics('Tab click', newValue);
  };

  return (
    <Box>
      <AppBar position="static" color="primary" borderRadius="5px">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="ETA" {...a11yProps(0)} />
          <Tab label="Turn" {...a11yProps(1)} />
          <Tab label="Source" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Box py={4}>
          <ETAForm />
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box py={4}>
          <TurnForm />
        </Box>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Box py={4}>
          <BoltVolumeForm />
        </Box>
      </TabPanel>
    </Box>
  );
}

// Matomo Analytics
// must add main matomo script in index.html
function sendAnalytics(trackEvent, newValue){
  var tabTitles = ['eta', 'turn', 'source']; //could be done with a cleaner way
  var tabTitle = tabTitles[newValue];
  //console.log(trackEvent+" "+tabTitle);
  window._paq.push(['trackEvent', trackEvent, tabTitle]);
}
