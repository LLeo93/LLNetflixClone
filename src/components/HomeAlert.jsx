import { useState, useEffect } from 'react';
import './HomeAlert.css';

const HomeAlert = ({ message }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 20000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <div className={`alert-container ${visible ? 'show' : 'hide'}`}>
      <div className="alert alert-info d-flex justify-content-between align-items-center">
        <span>{message}</span>
        <button className="btn-close" onClick={handleClose}></button>
      </div>
    </div>
  );
};

export default HomeAlert;
