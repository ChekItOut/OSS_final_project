import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const getWeatherIcon = (description) => {
  if (!description) return '🌍';
  const desc = description.toLowerCase();
  if (desc.includes('clear') || desc.includes('sun')) return '☀️';
  if (desc.includes('cloud')) return '☁️'; //이미지 사용하려했는데, 어려워서 이모티콘으로 대체함
  if (desc.includes('rain')) return '🌧️';
  if (desc.includes('snow')) return '❄️';
  if (desc.includes('thunder')) return '⚡';
  return '🌤️';
};

const HistoryPage = () => {
  const navigate = useNavigate();
  const [historyList, setHistoryList] = useState([]);

  useEffect(() => {
    fetch('https://weatherserverpublish-production-6ce6.up.railway.app/weather/history')
      .then(res => res.json())
      .then(data => setHistoryList(data))
      .catch(err => console.error(err));
  }, []);

  const handleDeleteAll = () => {
    if (window.confirm("정말로 모든 검색 기록을 삭제하시겠습니까?")) {
      fetch('https://weatherserverpublish-production-6ce6.up.railway.app/weather/deleteAll', {
        method: 'DELETE', // 서버의 @DeleteMapping과 매칭
      })
      .then(res => {
        if (res.ok) {
          setHistoryList([]); // 성공 시 화면 목록 비우기!
          alert("모든 기록이 삭제되었습니다.");
        } else {
          alert("삭제에 실패했습니다.");
        }
      })
      .catch(err => console.error("삭제 요청 중 에러 발생:", err));
    }
  };

  return (
    <div className="main-container">
      <header className="header">
        <div className="logo" onClick={() => navigate('/')}>GLOBAL WEATHER INFORMATION</div>
        <button className="btn-outline" onClick={() => navigate('/')}>Back</button>
      </header>

      <div className="hero-section" style={{justifyContent: 'flex-start', paddingTop: '50px'}}>
        {}
        <div style={{
          width: '100%', 
          maxWidth: '600px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '30px'
        }}>
          <h2 className="title-serif" style={{fontSize: '2.5rem', margin: 0}}>Search Logs</h2>
          
          {}
          {historyList.length > 0 && (
            <button 
              onClick={handleDeleteAll}
              style={{
                background: 'rgba(255, 50, 50, 0.2)', 
                border: '1px solid rgba(255, 50, 50, 0.5)',
                color: '#ff6b6b',
                padding: '8px 16px',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: 'bold',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 50, 50, 0.4)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 50, 50, 0.2)'}
            >
              🗑️ CLEAR ALL
            </button>
          )}
        </div>
        
        {}
        <div className="history-list">
          {historyList.length === 0 ? <p style={{color:'#ccc'}}>조회된 기록이 없습니다.</p> : null}
          {historyList.map((item, index) => (
            <div key={index} className="history-item">
              <div style={{display:'flex', alignItems:'center', gap:'15px'}}>
                <span style={{fontSize:'2rem'}}>{getWeatherIcon(item.description)}</span>
                <div style={{textAlign:'left'}}>
                  <div style={{fontWeight:'700', fontSize:'1.1rem'}}>{item.city}</div>
                  <div style={{color:'var(--text-grey)', fontSize:'0.85rem'}}>{item.description}</div>
                </div>
              </div>
              <div style={{textAlign:'right'}}>
                <div style={{color:'var(--accent-lime)', fontWeight:'700', fontSize:'1.2rem'}}>
                  {item.temperature}°C
                </div>
                <div style={{color:'var(--text-grey)', fontSize:'0.8rem'}}>
                  💧 {item.humidity}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;