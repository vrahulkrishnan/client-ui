import { createStyles } from '@mantine/core';
import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import { TelFieldProps } from './types';

const useStyles = createStyles(theme => ({
  telInput: {
    '.form-control': {
      fontFamily: 'Montserrat,sans-serif',
      borderRadius: theme.defaultRadius,
      width: '100%',
      borderColor: 'transparent',
      fontSize: 14,
      backgroundColor: '#f5f5f5',
      minHeight: 50,
      '&:focus': {
        outline: 'none',
        borderColor: '#eb6e1c !important'
      }
    },
    '.flag-dropdown': {
      borderRadius: '6rem 0 0 6rem',
      borderColor: 'transparent',
      borderRight: 'none'
    },
    '.form-control:focus + .flag-dropdown': {
      outline: 'none',
      borderColor: '#eb6e1c !important'
    }
  }
}));

const TelField = ({ name, required, onChange, ...props }: TelFieldProps) => {
  const handleChange = (value, data, event, formattedValue) => {
    onChange(formattedValue, event);
  };
  const { classes, cx } = useStyles();
  return (
    <PhoneInput
      inputProps={{ name, required }}
      disableSearchIcon
      enableSearch
      containerClass={cx(classes.telInput)}
      country="ae"
      onChange={handleChange}
      countryCodeEditable={false}
      {...props}
    />
  );
};

export default TelField;
