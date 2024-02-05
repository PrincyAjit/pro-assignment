import fetchData from '../fetchWrapper';

export const getOrderById = async (bodyRequestData) => {
  try {
    const orderDetails = await fetchData(
      '/Order/GetOrderById',
      bodyRequestData
    );
    return orderDetails;
  } catch (error) {
    throw new Error(`Failed to fetch order details: ${error.message}`);
  }
};

export const getAllOrders = async (bodyRequestData) => {
  try {
    const ordersDetails = await fetchData(
      '/Order/GetAllOrder',
      bodyRequestData
    );
    return ordersDetails;
  } catch (error) {
    throw new Error(`Failed to fetch orders details: ${error.message}`);
  }
};

export const addOrder = async (bodyRequestData) => {
  try {
    const response = await fetchData(
      '/Order/AddOrder',
      bodyRequestData,
      'POST'
    );
    return response;
  } catch (error) {
    throw new Error(`Failed to add order: ${error.message}`);
  }
};

export const updateOrder = async (bodyRequestData) => {
  try {
    const response = await fetchData(
      '/Order/UpdateOrder',
      bodyRequestData,
      'PUT'
    );
    return response;
  } catch (error) {
    throw new Error(`Failed to update order: ${error.message}`);
  }
};

export const cancelOrder = async (bodyRequestData) => {
  try {
    const response = await fetchData(
      '/Order/CancelOrder',
      bodyRequestData,
      'PUT'
    );
    return response;
  } catch (error) {
    throw new Error(`Failed to cancel order: ${error.message}`);
  }
};
