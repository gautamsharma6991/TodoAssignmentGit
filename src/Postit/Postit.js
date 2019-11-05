import React from 'react';
import './Postit.css';

const Postit = ( props ) => {

let backgroundColour = props.colour

const colourstyle = {
  backgroundColor: backgroundColour,
}

return (

<div draggable
  className = 'post-it'
  style={colourstyle}
    onDragStart={() => props.onDragStart(props.key)}>
      <h3>{props.title}</h3>
      <p>{props.content}</p>
      <button onClick={() => props.onClick(props.key)}>Update</button>
  </div>

  );
};

export default Postit;
