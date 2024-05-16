import React, { useState } from 'react';
import './ButtonControl.css'; 
import { useNavigate } from 'react-router-dom';

function ButtonControl() {
  const navigate = useNavigate();
  const [power, setPower] = useState(false)
  const [controls, setControls] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    stop: false,
  });

  const serverURL = 'http://127.0.0.1:5000/button-control';
  const sendDataToServer = (button) => {
    fetch(serverURL, {
        method: 'POST',
        mode: 'cors',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ button: button })
    })
        .then(response => response.json())
        .then(data => {
        console.log('Received response from server:', data);
        })
        .catch(error => {
        console.error('Error sending data to server:', error);
        });
    };

  const handleControlClick = (control) => {
    setControls(prevControls => ({
      ...prevControls,
      forward: control === 'Forward',
      backward: control === 'Backward',
      left: control === 'Turn Left',
      right: control === 'Turn Right',
      stop: control === 'Stop'
    }));
    sendDataToServer(control)
  };

  const toggleSwitch = () => {
    if(!power){
        sendDataToServer("Go")
    }else{
      sendDataToServer("Interrupt")
    }
    setPower(prevState => !prevState);
  };

  const handBack = () =>{
    navigate(`/`)
  }

  return (
    <div className="car-control-container">
      <div className="controls">
        <button className={controls.forward ? 'active' : ''} onClick={() => handleControlClick('Forward')}>▲</button>
        <div className="side-controls">
          <button className={controls.left ? 'active' : ''} onClick={() => handleControlClick('Turn Left')} >◄</button>
          <button className={controls.stop ? 'active' : ''} onClick={() => handleControlClick('Stop')} id='stop'>■</button>
          <button className={controls.right ? 'active' : ''} onClick={() => handleControlClick('Turn Right')} >►</button>
        </div>
        <button className={controls.backward ? 'active' : ''} onClick={() => handleControlClick('Backward')} >▼</button>
      </div>
      <div className='power'>
          <p className='go'>Go</p>
          <label className="switch">
              <input type="checkbox" checked={power} onChange={toggleSwitch} />
              <span className="slider round"></span>
          </label>
      </div>
      <div>
        <button className='button-back' onClick={handBack}>Quay lại</button>
      </div>
    </div>
  );
}

export default ButtonControl;
