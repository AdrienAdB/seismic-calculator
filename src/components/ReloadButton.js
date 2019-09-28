import React from 'react';
import {Box, Button, Typography} from '@material-ui/core';


function refreshPage() {
  window.location.reload(false);
}

export default function ReloadButton(){

  return (
    <Box pt={6}>
      <Typography variant="caption" display="block" color="textSecondary" align="center">
        We enforced caching for slow internet connection. Click reload below if you're experiencing issues.
      </Typography>
      <Typography variant="caption" display="block" color="textSecondary" align="center" pt={2}>
        <Button
          size="small"
          onClick={refreshPage}>
          Reload
        </Button>
      </Typography>
    </Box>

  );



}
