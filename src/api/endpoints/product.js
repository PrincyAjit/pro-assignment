import fetchData from '../fetchWrapper';

export const getProductById = async (bodyRequestData) => {
  try {
    const productDetails = await fetchData(
      '/Product/GetProductById',
      bodyRequestData
    );
    return productDetails;
  } catch (error) {
    throw new Error(`Failed to fetch product details: ${error.message}`);
  }
};

export const getAllProducts = async () => {
  try {
    const productsDetails = await fetchData('/Product/GetAllProduct');
    return productsDetails;
  } catch (error) {
    throw new Error(`Failed to fetch all products: ${error.message}`);
  }
};

export const addProduct = async (bodyRequestData) => {
  try {
    const response = await fetchData(
      '/Product/AddProduct',
      bodyRequestData,
      'POST'
    );
    return response;
  } catch (error) {
    throw new Error(`Failed to add product: ${error.message}`);
  }
};

export const editProduct = async (bodyRequestData) => {
  try {
    const response = await fetchData(
      '/Product/EditProduct',
      bodyRequestData,
      'PUT'
    );
    return response;
  } catch (error) {
    throw new Error(`Failed to edit product: ${error.message}`);
  }
};

export const deleteProduct = async (bodyRequestData) => {
  try {
    const response = await fetchData(
      '/Product/DeleteProduct',
      bodyRequestData,
      'DELETE'
    );
    return response;
  } catch (error) {
    throw new Error(`Failed to delete product: ${error.message}`);
  }
};
