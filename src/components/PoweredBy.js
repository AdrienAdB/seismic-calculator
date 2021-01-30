import React from 'react';

const PoweredBy = (props) => {
  return(
    <p>Powered by <a className="text-orange" target="_blank" href="https://acte.ltd?mtm_campaign=seismic-calculator">
        ACTE Technology Co., Ltd.
      </a> { props.date && new Date().getFullYear() }
    </p>
  );
}


export default PoweredBy;
