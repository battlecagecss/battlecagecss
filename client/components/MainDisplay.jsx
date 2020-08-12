import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
const socket = io('http://localhost:3000');

const Display = (props) => {
  const [html, setHTML] = useState('');

  useEffect(() => {
    socket.on('pageInfo', (html) => setHTML(html));
    socket.on('newPage', (html) => {
      console.log('got new html');
      setHTML(html.html);
    });
    let room = window.location.pathname.split('/')[2];
    socket.emit('joinRoom', room);
    socket.on('updatePlayerList', console.log);
    console.log('recieved html');
  }, [socket]);

  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const DOMNode = e.target;
    const styles = getComputedStyle(DOMNode);
    // put the option of styles in a different component
    const attr = prompt('pick an attribute');
    const val = prompt('pick a value');
    DOMNode.style[attr] = val;
    const newHTML = document.getElementById('mainBox').innerHTML;
    setHTML(newHTML);
    socket.emit('updatePage', { html: newHTML });
  };

  return (
    <div
      style={{ maxHeight: '80vh', overflowY: 'scroll' }}
      id='mainBox'
      onClick={handleClick}
      dangerouslySetInnerHTML={{ __html: html }}></div>
  );
};

export default Display;
