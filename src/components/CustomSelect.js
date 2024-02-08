import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Select, InputLabel, MenuItem, FormControl, Box } from '@mui/material';
import { createUseStyles } from 'react-jss';
import clsx from 'clsx';

import CustomLabel from './CustomLabel';

import { isFunction } from '../utils/utilFunctions';

const useStyles = createUseStyles((theme) => ({
  box: {
    // textAlign: "center",
    width: '100%',
  },
  formControl: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderRadius: 0,
      border: '1px solid #EDEDED',
    },
  },
  selectRoot: {
    height: '50px',
    fontSize: '16px',
  },
  noLeftPadding: {
    '& .MuiSelect-select': {
      paddingLeft: 0,
    },
  },
  selectLabel: {
    fontSize: '16px',
    color: theme.palette.secondary.light,
  },
  menuItem: {
    fontSize: '16px',
  },
  noBorder: {
    '& .MuiOutlinedInput-notchedOutline': {
      border: 0,
    },
  },
}));

const CustomSelect = (props) => {
  const classes = useStyles();
  let {
    id,
    data,
    value,
    disabled,
    label,
    placeholder,
    onChange,
    customClasses,
  } = props;

  const [selectedValue, setSelectedValue] = useState('');

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
    if (isFunction(onChange)) onChange(id, event.target.value);
  };

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  return (
    <>
      <Box className={clsx([classes.box, customClasses?.root])} key={id}>
        {label && <CustomLabel label={label} />}
        <FormControl fullWidth className={classes.formControl}>
          <InputLabel id={`${id}-select-label`} className={classes.selectLabel}>
            {placeholder}
          </InputLabel>
          <Select
            labelId={`${id}-select-label`}
            id={`${id}-select`}
            value={selectedValue}
            label={placeholder}
            onChange={handleSelectChange}
            className={classes.selectRoot}
            disabled={disabled}
            MenuProps={{
              // getContentAnchorEl: null,
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center',
              },
              // classes: {
              //   paper: classes.menu,
              // },
            }}
          >
            {data?.map((menuItemValue, idx) => (
              <MenuItem
                key={idx}
                value={menuItemValue}
                className={classes.menuItem}
              >
                {menuItemValue}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </>
  );
};

CustomSelect.propTypes = {};

export default CustomSelect;
