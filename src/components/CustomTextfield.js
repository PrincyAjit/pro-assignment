// #region Imports
// #region Library imports
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormHelperText, OutlinedInput } from '@mui/material';
import { createUseStyles } from 'react-jss';
import clsx from 'clsx';
// #endregion Library imports

// #region Custom/User defined components imports
import CustomLabel from './CustomLabel';
// #endregion Custom/User defined components imports

// #region utilities imports
import { isFunction } from '../utils/utilFunctions';
// #endregion utilities imports
// #endregion Imports

// #region Styling
const useStyles = createUseStyles((theme) => ({
  formControl: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderRadius: 0,
      border: '1px solid #EDEDED',
    },
  },
  textFieldRoot: {
    fontSize: '16px',
    // padding: 0,
    '& .MuiFormLabel-root': {
      fontSize: '16px',
    },
    '& .MuiInputBase-input': {
      height: '26px',
      padding: '12px',
      fontSize: '16px',
    },
  },
  helperText: {
    marginLeft: '0 !important',
  },
  endAdornmentIcon: {
    cursor: 'pointer',
  },
}));
// #endregion Styling

const getErrorMessage = (type, value, label, min, max) => {
  const labelOrTypeInMessage = label ? label?.toLowerCase() : type;
  const emptyValueMessage = `Please enter the ${labelOrTypeInMessage}.`;
  // Add validations for other types as per requirement.
  if (type === 'number') {
    if (min && value < min)
      return `Please enter a value greater than ${min - 1}.`;
    if (max && value > max) return `Please enter a value lesser than ${max}`;
  }

  if (!Boolean(value)) return emptyValueMessage;
  else return null;
};

/**
 * CustomTextField Component
 *
 * This component renders an input element with a label on top and customised styling and error handling for text and number types itself for now.
 * It will render for other types as well but necessary validations as per the type wont work for those(since its not added). Can add more customization as per requirement.
 *
 * @component
 * @example
 * // Example usage:
 * <CustomTextfield
 *   id="username"
 *   label="Username"
 *   placeholder="Enter your username"
 *   value={username}
 *   onChange={(id, value) => handleInputChange(id, value)}
 *   type="text"
 *   inputProps={{ maxLength: 20 }}
 *   multiline={false}
 *   minRows={3}
 
 * />
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.id - The unique identifier for the input element. Useful when there are multiple similar textfield elements in the view.
 * @param {string} [props.value] - The value of the input element.
 * @param {string} [props.label] - The label for the input element shown above the element as per design.
 * @param {string} [props.placeholder] - The placeholder text for the input element.
 * @param {boolean} [props.disabled] - If true, the input element will be disabled.
 * @param {function} [props.onChange] - The callback function invoked when the input value changes.
 * @param {string} [props.type] - The type of the input element (text,textarea, email, url, password,number etc->All types of input element). default is "text".
 * @param {Object} [props.inputProps] - Additional attributes to be passed to the input element(specific to the type of input element).
 * @param {boolean} [props.multiline=false] - If true, the input element will be a textarea.
 * @param {number} [props.minRows=3] - The minimum number of rows for a multiline input.
 *  @param {string} [props.customErrorMessage] - A custom error message to be displayed.
 *
 * @returns {ReactElement} The rendered CustomTextField component.
 */
const CustomTextfield = (props) => {
  const classes = useStyles();
  let {
    id,
    value: valueReceived,
    label,
    placeholder,
    disabled,
    onChange,
    type,
    inputProps,
    multiline,
    minRows,
    customClasses,
    customErrorMessage,
  } = props;
  console.log('dummy console');
  type = type ?? 'text';
  const [value, setValue] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const handleChange = (event) => {
    let updatedValue = event.target.value;
    if (type === 'number') updatedValue = parseInt(updatedValue);
    const updatedErrorMessage = getErrorMessage(
      type,
      updatedValue,
      label,
      inputProps?.min,
      inputProps?.max
    );
    setValue(updatedValue);
    setErrorMessage(updatedErrorMessage);
    if (isFunction(onChange)) onChange(id, updatedValue);
  };

  useEffect(() => {
    setValue(valueReceived);
  }, [valueReceived]);

  return (
    <div className={clsx(['w-full', customClasses?.root])}>
      {label && <CustomLabel label={label} />}
      <FormControl
        fullWidth
        className={classes.formControl}
        error={Boolean(customErrorMessage || errorMessage)}
      >
        <OutlinedInput
          data-testid={`textfield-${id}`}
          id={`textfield-${id}`}
          key={`textfield-${id}`}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          inputProps={inputProps}
          disabled={disabled}
          variant="outlined"
          multiline={multiline}
          minRows={minRows}
          className={classes.textFieldRoot}
          error={Boolean(errorMessage)}
        />
        {(customErrorMessage || errorMessage) && (
          <FormHelperText className={classes.helperText}>
            {customErrorMessage || errorMessage}
          </FormHelperText>
        )}
      </FormControl>
    </div>
  );
};

CustomTextfield.propTypes = {};

export default CustomTextfield;
