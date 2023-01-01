import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function SingleFieldModal(props) {
  const { title, onOk, onCancel, closeHandler } = props;
  const [value, setValue] = React.useState("");

  return (
    <Modal
      open={true}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h6" component="h2" color="text.primary">
          {title}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <TextField
            variant="outlined"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{ width: "100%" }}
          />
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.primary" mt={2}>
          <Button
            variant="outlined"
            onClick={() => {
              onCancel && onCancel(value);
              closeHandler();
            }}
            style={{ marginRight: "2rem" }}
          >
            CANCEL
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              onOk(value);
              closeHandler();
            }}
          >
            OK
          </Button>
        </Typography>
      </Box>
    </Modal>
  );
}
SingleFieldModal.propTypes = {
  title: PropTypes.string.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  closeHandler: PropTypes.func.isRequired,
};

export default SingleFieldModal;
