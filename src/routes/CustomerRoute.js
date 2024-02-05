import React from 'react';
import PropTypes from 'prop-types';
import { Route, Routes } from 'react-router-dom';

import Homepage from '../pages/customer/Homepage';

const CustomerRoute = (props) => {
  return (
    <Routes>
      <Route path="/homepage" element={<Homepage />} />
    </Routes>
  );
};

CustomerRoute.propTypes = {};

export default CustomerRoute;
