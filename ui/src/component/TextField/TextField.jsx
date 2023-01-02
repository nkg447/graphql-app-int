import * as React from "react";
import MuiTextField from "@mui/material/TextField";
import PropTypes from "prop-types";

function TextField(props) {
  const { label, value, setTo, style, ...others } = props;
  return (
    <MuiTextField
      label={label}
      size="small"
      value={value ? value : ""}
      variant="outlined"
      onChange={(e) => {
        setTo(e.target.value);
      }}
      margin={"dense"}
      style={{ marginRight: "1rem", width: "100%", ...style }}
      {...others}
    />
  );
}

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setTo: PropTypes.func,
  style: PropTypes.object,
};

export default TextField;
