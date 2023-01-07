import * as React from "react";
import MuiTextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import { Tooltip } from "@mui/material";

function TextField(props) {
  const { label, value, setTo, style, tooltip, ...others } = props;

  const tetFieldComponent = (
    <MuiTextField
      label={label}
      size="small"
      value={value ? value : ""}
      variant="outlined"
      onChange={(e) => {
        if (setTo) setTo(e.target.value);
      }}
      margin={"dense"}
      style={{ marginRight: "1rem", width: "100%", ...style }}
      {...others}
    />
  );

  if (tooltip) {
    return <Tooltip title={tooltip}>{tetFieldComponent}</Tooltip>;
  } else {
    return tetFieldComponent;
  }
}

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  setTo: PropTypes.func,
  style: PropTypes.object,
  tooltip: PropTypes.string,
};

export default TextField;
