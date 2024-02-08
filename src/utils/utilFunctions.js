export const isValidArray = (data) => {
  return Array.isArray(data) && data.length > 0;
};

export const isValidObject = (data) => {
  return (
    typeof data === 'object' &&
    data !== null &&
    !Array.isArray(data) &&
    Object.keys(data).length > 0
  );
};

export const isFunction = (data) => {
  return typeof data === 'function';
};

export const isValidString = (data) => {
  return typeof data === 'string' && data.trim() !== '';
};

export const capitalizeFirstLetter = (str) => {
  // Check if the input is a non-empty string
  if (typeof str === 'string' && str.length > 0) {
    // Capitalize the first letter and concatenate the rest of the string
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  // Return the original input if it's not a valid string
  return str;
};
