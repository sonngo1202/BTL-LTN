import React from 'react';
import {useNavigate} from 'react-router-dom'
import './Home.css';

function Home() {
    const navigate = useNavigate();

  const handleOptionClick = (option) => {
    if(option === 'option1'){
        navigate(`/button-control`)
    }else{
        navigate(`/gesture-control`, {state :{isActive: true}})
    }
  };

  return (
    <div className="home-container">
      <h1>Trang chủ Điều khiển Xe</h1>
      <div className="options">
        <button onClick={() => handleOptionClick('option1')}>Điều khiển bằng nút</button>
        <button onClick={() => handleOptionClick('option2')}>Điều khiển bằng cử chỉ tay</button>
      </div>
    </div>
  );
}

export default Home;
