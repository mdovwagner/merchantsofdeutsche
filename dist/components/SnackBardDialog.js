import React from 'react';
import { Alert, Snackbar } from '@mui/material';

// function Alert(props) {
//     return <MuiAlert elevation={6} variant="filled" {...props} />;
// }
import { jsx as _jsx } from "react/jsx-runtime";
export default class SnackbarDialog extends React.Component {
  constructor(...args) {
    super(...args);
    this.handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      this.props.endMessage();
    };
  }
  render() {
    return /*#__PURE__*/_jsx("div", {
      children: /*#__PURE__*/_jsx(Snackbar, {
        open: this.props.message.valid,
        autoHideDuration: 5000,
        onClose: this.handleClose,
        children: /*#__PURE__*/_jsx(Alert, {
          onClose: this.handleClose,
          severity: this.props.message.type,
          children: this.props.message.text
        })
      })
    });
  }
}