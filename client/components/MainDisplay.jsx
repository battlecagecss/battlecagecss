import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
const socket = io('http://localhost:3000');

const Display = (props) => {
  const [html, setHTML] = useState('');

  useEffect(() => {
    socket.on('pageInfo', (html) => setHTML(html));
    console.log('recieved html');
  }, [socket]);

  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const DOMNode = e.target;
    const styles = getComputedStyle(DOMNode);
    // put the option of styles in a different component
    const response = prompt('pick a color');
    DOMNode.style.backgroundColor = response;
  };

  return <div onClick={handleClick} dangerouslySetInnerHTML={{ __html: html }}></div>;
};

export default Display;
