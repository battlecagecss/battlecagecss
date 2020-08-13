import React from "react";
import { connect } from "react-redux";
import { selectValue } from "../reducers/nodeReducer";

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // should pick a value and submit it to the redux store

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    this.props.submitValue(this.state.value);
    event.preventDefault();
    // should take the attribute, value and node
    const { node, attribute } = this.props;
    // modify the node
    node.style[attribute] = this.state.value;
    // submit the new HTML to the backend via socket
    // alert("A name was submitted: " + this.state.value);
    const newHTML = document.getElementById("mainBox").innerHTML;
    // setHTML(newHTML);
    this.props.socket.emit("updatePage", { html: newHTML });
    this.setState({value: ''})
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          {this.props.node && this.props.node.className} Property:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  node: state.node.node,
  attribute: state.node.attribute,
  value: state.node.value,
  socket: state.socket.socket,
});

const mapDispatchToProps = (dispatch) => ({
  submitValue: (value) => dispatch(selectValue(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NameForm);
