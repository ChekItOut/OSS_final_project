import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const MainPage = () => {
  const navigate = useNavigate();
  const cityInputRef = useRef(null);

  const handleSearch = () => {
    const city = cityInputRef.current.value;
    if (city) {
      navigate(`/weather/${city}`);
    } else {
      alert("도시 이름을 입력해주세요!");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="main-container">
      <header className="header">
        
      </header>

      <div className="hero-section">
        <h1 className="title-serif">GLOBAL</h1>
        <h1 className="title-neon">WEATHER</h1>
        <h1 className="title-serif">INFORMATION</h1>
        
        <p className="subtitle">AI가 분석해주는 실시간 날씨와 주의사항을 확인하세요.</p>

        <div className="search-box">
          <input 
            ref={cityInputRef} 
            type="text" 
            placeholder="Search City (e.g. Seoul, Japan) 영어로 올바른 스펠링 입력" 
            onKeyDown={handleKeyDown}
          />
          <button className="btn-neon" onClick={handleSearch}>Get Started</button>
        </div>

        <button className="link-text" onClick={() => navigate('/history')}>
          지난 검색 기록 보기 &rarr;
        </button>
      </div>
    </div>
  );
};

export default MainPage;