import React from 'react';
import TextField from 'material-ui/TextField';

export default ({input, label, meta: {touched, error}, ...rest}) => (
  <TextField
    margin="normal"
    fullWidth
    label={label}
    placeholder={rest.placeholder}
    helperText={touched && error}
    error={!!(touched && error)}
    {...input}
    {...rest}
  />
);