import { BASE_URL } from './apiConfigs';

const fetchData = async (url, data = null, method = 'GET') => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const options = {
    method,
    headers,
  };

  if (data) options.body = JSON.stringify(data);

  try {
    const response = await fetch(`${BASE_URL}${url}`, options);

    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw new Error(`Request failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error('Fetch Error:', error);
    throw new Error('Network error occurred');
  }
};

export default fetchData;
