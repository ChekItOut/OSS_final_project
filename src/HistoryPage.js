import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

// 날씨 아이콘 헬퍼 함수
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

const HistoryPage = () => {
  const navigate = useNavigate();
  const [historyList, setHistoryList] = useState([]);

  // 페이지 로드 시 기록 조회
  useEffect(() => {
    fetch('https://weatherserverpublish-production-6ce6.up.railway.app/weather/history')
      .then(res => res.json())
      .then(data => setHistoryList(data))
      .catch(err => console.error(err));
  }, []);

  // [기능 추가] 전체 삭제 핸들러
  const handleDeleteAll = () => {
    if (window.confirm("정말로 모든 검색 기록을 삭제하시겠습니까?")) {
      fetch('https://weatherserverpublish-production-6ce6.up.railway.app/weather/deleteAll', {
        method: 'DELETE', // 서버의 @DeleteMapping과 매칭
      })
      .then(res => {
        if (res.ok) {
          setHistoryList([]); // 성공 시 화면 목록 비우기
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
        {/* 상단 제목 및 삭제 버튼 영역 */}
        <div style={{
          width: '100%', 
          maxWidth: '600px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '30px'
        }}>
          <h2 className="title-serif" style={{fontSize: '2.5rem', margin: 0}}>Search Logs</h2>
          
          {/* 기록이 1개 이상일 때만 삭제 버튼 표시 */}
          {historyList.length > 0 && (
            <button 
              onClick={handleDeleteAll}
              style={{
                background: 'rgba(255, 50, 50, 0.2)', // 붉은색 반투명 버튼
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
        
        {/* 리스트 출력 영역 */}
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