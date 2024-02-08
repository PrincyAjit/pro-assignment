import fetchData from '../fetchWrapper';

export const createCustomer = async (bodyRequestData) => {
  try {
    const newCustomer = await fetchData(
      '/Customer/CreateCustomer',
      bodyRequestData,
      'POST'
    );
    return newCustomer;
  } catch (error) {
    throw new Error(`Failed to create customer: ${error.message}`);
  }
};

export const getAllCustomer = async (bodyRequestData) => {
  try {
    const customers = await fetchData(
      '/Customer/GetAllCustomer',
      bodyRequestData,
      'POST'
    );
    return customers;
  } catch (error) {
    throw new Error(`Failed to fetch customers: ${error.message}`);
  }
};
