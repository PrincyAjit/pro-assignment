import React from 'react';
import PropTypes from 'prop-types';
import { Route, Routes } from 'react-router-dom';

import Homepage from '../pages/admin/Homepage';

const AdminRoute = (props) => {
  return (
    <Routes>
      <Route path="/homepage" element={<Homepage />} />
    </Routes>
  );
};

AdminRoute.propTypes = {};

export default AdminRoute;
