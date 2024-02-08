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
