import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import { selectNode } from "../reducers/nodeReducer";
import { createSocket } from "../reducers/socketReducer";
const socket = io("http://localhost:3000");

const mapStateToProps = (state) => ({
  node: state.node.node,
});

const mapDispatchToProps = (dispatch) => ({
  selectNode: (node) => dispatch(selectNode(node)),
  createSocket: (socket) => dispatch(createSocket(socket)),
});

const Display = (props) => {
  const { selectNode, node } = props;
  const [html, setHTML] = useState("");

  useEffect(() => {
    socket.on("pageInfo", (html) => setHTML(html));
    socket.on("newPage", (html) => {
      console.log("got new html");
      setHTML(html.html);
    });
    let room = window.location.pathname.split("/")[2];
    socket.emit("joinRoom", room);
    socket.on("updatePlayerList", console.log);
    console.log("recieved html");
    props.createSocket(socket);
  }, [socket]);

  const handleClick = (e) => {
    // should take a node and save it in the redux store
    e.stopPropagation();
    e.preventDefault();
    const DOMNode = e.target;
    // // should send DOMNode to redux store
    console.log(DOMNode);
    selectNode(DOMNode);
    // const styles = getComputedStyle(DOMNode);
    // // put the option of styles in a different component
    // const attr = prompt("pick an attribute");
    // const val = prompt("pick a value");
    // DOMNode.style[attr] = val;
    // const newHTML = document.getElementById("mainBox").innerHTML;
    // setHTML(newHTML);
    // socket.emit("updatePage", { html: newHTML });
  };

  return (
    <div
      style={{ maxHeight: "80vh", overflowY: "scroll" }}
      id="mainBox"
      onClick={handleClick}
      dangerouslySetInnerHTML={{ __html: html }}
    ></div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Display);
