import React from 'react';
import BootstrapSpinner from 'react-bootstrap/Spinner';

function CustomSpinner() {
  return (
    <BootstrapSpinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </BootstrapSpinner>
  );
}

export default CustomSpinner;
