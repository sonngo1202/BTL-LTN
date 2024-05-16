import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './GestureControl.css';

function GestureControl() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    const sendDataToServer = (imageData) => {
      const serverURL = 'http://127.0.0.1:5000/gesture-control';
      fetch(serverURL, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image: imageData })
      })
        .then(response => response.json())
        .then(data => {
          console.log('Received response from server:', data);
        })
        .catch(error => {
          console.error('Error sending data to server:', error);
        });
    };

    const captureAndSendData = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL('image/jpeg');
      sendDataToServer(imageData);
    };

    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoElement.srcObject = stream;
        videoElement.addEventListener('play', () => {
          intervalRef.current = setInterval(captureAndSendData, 1000);
        });
      })
      .catch(error => {
        console.error('Error accessing camera:', error);
      });

    return () => {
      if (videoElement.srcObject) {
        videoElement.srcObject.getTracks().forEach(track => track.stop());
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handBack = () => {
    navigate('/');
  };

  return (
    <div>
      <div id="video-container">
        <video ref={videoRef} id="video-feed" autoPlay></video>
      </div>
      <button className='gesture-back' onClick={handBack}>Quay lại</button>
    </div>
  );
}

export default GestureControl;
