import React from 'react';
import { Button } from 'react-bootstrap';
import * as serviceWorker from '../serviceWorker';


function handleReload() {
  localStorage.clear();
  serviceWorker.unregister();
  window.location.reload(true);
}

export default function ReloadButton(){

  return (
    <div className="text-muted small text-center pt-3">
      <p></p>
      <p>
        We enforced caching for slow internet connection. Click reload below if you're experiencing issues.
      </p>
      <Button
          className="text-center btn btn-secondary"
          size="sm"
          color="secondary"
          onClick={handleReload}>
          Reload
        </Button>
    </div>

  );



}
