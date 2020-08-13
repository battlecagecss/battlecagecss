import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { selectAttribute } from "../reducers/nodeReducer";

function SimpleMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  // should pick an attribute and submit it to the redux store

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (attribute) => {
    console.log("closed");
    if (typeof attribute === 'string')    props.selectAttribute(attribute);
    setAnchorEl(null);
  };

  return (
    <div id="footer">
      <div>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          Attribute Selection
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleClose("color")}>Color</MenuItem>
          <MenuItem onClick={() => handleClose("background-color")}>Background Color</MenuItem>
          <MenuItem onClick={() => handleClose("font-size")}>Font Size</MenuItem>
          <MenuItem onClick={() => handleClose("height")}>Height</MenuItem>
          <MenuItem onClick={() => handleClose("display")}>Display</MenuItem>
          <MenuItem onClick={() => handleClose("opacity")}>Opacity</MenuItem>
          <MenuItem onClick={() => handleClose("alignment")}>
            Alignment
          </MenuItem>
        </Menu>
      </div>
      <div>{props.attribute}</div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  attribute: state.node.attribute,
});

const mapDispatchToProps = (dispatch) => ({
  selectAttribute: (attr) => dispatch(selectAttribute(attr)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SimpleMenu);
