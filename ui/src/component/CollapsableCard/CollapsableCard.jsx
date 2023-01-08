import * as React from "react";
import PropTypes from "prop-types";
import TextField from "../TextField/TextField";
import {
  Autocomplete,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

function CollapsableCard(props) {
  const {
    children,
    titleLabel,
    title,
    variant,
    setTitle,
    deleteable,
    onDelete,
    setTitleTo,
    titleOptions,
    ...other
  } = props;
  const [collapsed, setCollapsed] = React.useState(false);
  const [cardTitle, setCardTitle] = React.useState(title);

  const onBlurHandler = () => {
    setTitle(cardTitle);
  };

  const cardHeaderProps = {};
  if (setTitle && collapsed) {
    if (titleOptions) {
      cardHeaderProps.avatar = (
        <Autocomplete
          disablePortal
          options={titleOptions}
          onChange={(e, value) => (setTitleTo ? setTitleTo(value) : setCardTitle(value))}
          value={setTitleTo ? title : cardTitle}
          renderInput={(params) => (
            <TextField label={titleLabel || ""} {...params} onBlur={onBlurHandler} />
          )}
        />
      );
    } else {
      cardHeaderProps.avatar = (
        <TextField
          label={titleLabel || ""}
          setTo={setTitleTo ? setTitleTo : setCardTitle}
          value={setTitleTo ? title : cardTitle}
          onBlur={onBlurHandler}
        />
      );
    }
  }

  return (
    <React.Fragment>
      <Card variant={variant} style={{ width: "100%" }}>
        <React.Fragment>
          <CardHeader
            title={(!collapsed || !setTitle) && cardTitle}
            titleTypographyProps={{ variant: "h8", color: "secondary.main" }}
            {...cardHeaderProps}
            action={
              <IconButton
                onClick={() => setCollapsed(!collapsed)}
                aria-label="expand"
                size="small"
              >
                {collapsed ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </IconButton>
            }
            {...other}
          />
          <Collapse in={collapsed} timeout="auto" unmountOnExit>
            <CardContent>{children}</CardContent>
          </Collapse>
        </React.Fragment>
      </Card>
      {deleteable && (
        <div style={{ margin: "0rem 1rem" }}>
          <IconButton onClick={() => onDelete(title)} size="medium">
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </div>
      )}
    </React.Fragment>
  );
}
CollapsableCard.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  variant: PropTypes.string,
  setTitle: PropTypes.func,
  setTitleTo: PropTypes.func,
  deleteable: PropTypes.bool,
  onDelete: PropTypes.func,
  titleOptions: PropTypes.arrayOf(PropTypes.string),
};

export default CollapsableCard;
