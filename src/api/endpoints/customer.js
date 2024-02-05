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
