import React, {useEffect} from 'react';
import ReactFlow, { useKeyPress } from 'react-flow-renderer';

  // Call our hook for each key that we'd like to monitor
  let stateOfSpace =false;
  let getSpace = ()=>{
  return stateOfSpace
  }
  export {getSpace}
  export default function Spacebar() {
    const spacePressed = useKeyPress('Space');

  
    useEffect(() => {
      console.log('space pressed', spacePressed);
      stateOfSpace = spacePressed;
    }, [spacePressed]);

  
    return null;
  }