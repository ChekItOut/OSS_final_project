import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './App.css';

const getWeatherIcon = (description) => {
  if (!description) return '🌍';
  const desc = description.toLowerCase();
  if (desc.includes('clear') || desc.includes('sun')) return '☀️';
  if (desc.includes('cloud')) return '☁️';
  if (desc.includes('rain')) return '🌧️';
  if (desc.includes('snow')) return '❄️';
  if (desc.includes('thunder')) return '⚡';
  return '🌤️';
};

const ResultPage = () => {
  const { city } = useParams();
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://weatherserverpublish-production-6ce6.up.railway.app/weather/${city}`)
      .then(res => res.ok ? res.json() : Promise.reject('Failed'))
      .then(data => {
        setWeatherData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [city]);

  if (loading) return <div className="main-container" style={{justifyContent:'center'}}><div className="loading-spinner"></div></div>;
  
  if (!weatherData) return (
    <div className="main-container" style={{justifyContent:'center'}}>
      <h2 style={{color:'white'}}>System Error</h2>
      <p style={{color:'#999'}}>도시를 찾을 수 없습니다.</p>
      <button className="btn-neon" onClick={() => navigate('/')}>RETURN</button>
    </div>
  );

  return (
    <div className="main-container">
      <header className="header">
        <div className="logo" onClick={() => navigate('/')}>GLOBAL INTELLIGENCE</div>
        <button className="btn-outline" onClick={() => navigate('/')}>Main</button>
      </header>

      <div className="hero-section">
        <div className="glass-card">
          <div className="weather-header">
            <span className="weather-emoji">{getWeatherIcon(weatherData.description)}</span>
            <div>
              <h2 className="city-name">{weatherData.city}</h2>
              <p className="weather-desc">{weatherData.description}</p>
            </div>
          </div>

          <div className="stats-row">
            <div className="stat-item">
              <h4>TEMPERATURE</h4>
              <p>{weatherData.temperature}°C</p>
            </div>
            <div className="stat-item">
              <h4>HUMIDITY</h4>
              <p>{weatherData.humidity}%</p>
            </div>
          </div>

          <div className="ai-box">
            <span className="ai-label">GEMINI ANALYSIS</span>
            <p className="ai-text">{weatherData.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;