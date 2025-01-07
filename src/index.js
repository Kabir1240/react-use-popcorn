import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import StarRating from "./components/StarRating"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StarRating maxRating={3} messages={["good", "bad", "great"]}/>
  </React.StrictMode>
);
