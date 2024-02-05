import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { getAllProducts } from '../../api/endpoints/product';

const Homepage = (props) => {
  useEffect(() => {
    getAllProducts()
      .then((response) => {
        console.log({ response });
      })
      .catch((error) => {
        console.log({ error });
      });
  }, []);
  return <div>Customer Homepage</div>;
};

Homepage.propTypes = {};

export default Homepage;
