import React from "react";

export default function Magnet({x, y, index}){
    const size = 40;

    var style = {
        position: 'absolute',
        left: `${x - size / 2}px`,
        top: `${y - size / 2}px`,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        backgroundColor: 'red',
        border: '2px solid black',
  };


    if (index % 2 == 0){
        style.backgroundColor = "blue";
    }
    else {
        style.backgroundColor = "red";
    }

  return <div  style = {style} ></div>
    
}