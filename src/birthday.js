import React, { useState, useEffect } from 'react';
import './App.css';

const Birthday = ({  }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(birthDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };
  
  const [birthDate] = useState('2024-03-24');
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [countdownEnded, setCountdownEnded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showGif, setShowGif] = useState(false);
  const [showSecondGif, setShowSecondGif] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [images] = useState([
    'hero1.jpeg',
    'hero2.jpeg',
    'hero3.jpeg',
    'hero4.jpeg',
    'hero5.jpeg',
    'hero7.jpeg',
  ]);

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? images.length - 1 : prevSlide - 1));
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
  };

  const [isAutoplay, setIsAutoplay] = useState(true);
  const autoplayInterval = 3000;

  useEffect(() => {
    let intervalId;
    if (isAutoplay) {
      intervalId = setInterval(goToNextSlide, autoplayInterval);
    }
    return () => clearInterval(intervalId);
  }, [currentSlide, isAutoplay]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const playMusic = () => {
    const audio = document.getElementById('bdysong.ogg');
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <div>
      <div>
        <div className="card">
          <div className="card-body">
          <div className="carousel">
    <button className="carousel-button" onClick={goToPrevSlide}>«</button>
    <img className="carousel-image" src={`${process.env.PUBLIC_URL}/${images[currentSlide]}`} alt={`images ${currentSlide}`} />

    <button className="carousel-button" onClick={goToNextSlide}>»</button>
</div>
          </div>
        </div>
        <div className="container">
          <div className="floating-heart-card">
            <div style={{fontFamily:"bold",color:"white"}}>
              <h3>[̲̅H]</h3>
              <h3>[̲̅A]</h3>
              <h3>[̲̅P]</h3>
              <h3>[̲̅P]</h3>
              <h3>[̲̅Y]</h3>♡
            </div>
            <div style={{fontFamily:"monospace",color:"white"}}>
              <h3>[̲̅B]</h3>
              <h3>[̲̅D]</h3>
              <h3>[̲̅A]</h3>
              <h3>[̲̅Y] </h3>♡
            </div>
            <div style={{fontFamily:"monospace",color:"white"}}>
              <h3>[̲̅Q]</h3>
              <h3>[̲̅T]</h3>
              <h3>[̲̅T]</h3>
              <h3>[̲̅U]</h3>
            </div>
          </div>
  
          <div className="floating-wish">
            <div style={{fontFamily:"bold",color:"white"}}>
              <h3>[̲̅H]</h3>
              <h3>[̲̅A]</h3>
              <h3>[̲̅P]</h3>
              <h3>[̲̅P]</h3>
              <h3>[̲̅Y]</h3>♡
            </div>
            <div style={{fontFamily:"monospace",color:"white"}}>
              <h3>[̲̅B]</h3>
              <h3>[̲̅D]</h3>
              <h3>[̲̅A]</h3>
              <h3>[̲̅Y] </h3>♡
            </div>
            <div style={{fontFamily:"monospace",color:"white"}}>
              <h3>[̲̅Q]</h3>
              <h3>[̲̅T]</h3>
              <h3>[̲̅T]</h3>
              <h3>[̲̅U]</h3>
            </div>
          </div>
          <div className={`countdown ${countdownEnded ? 'hidden' : ''}`}>
  {timeLeft.days > 0 && <div className="countdown-item">{timeLeft.days} days</div>}
  {timeLeft.hours > 0 && <div className="countdown-item">{timeLeft.hours} hours</div>}
  {timeLeft.minutes >= 0 && <div className="countdown-item">{timeLeft.minutes} minutes</div>}
  {timeLeft.seconds > 0 && <div className="countdown-item">{timeLeft.seconds} seconds</div>}
  {countdownEnded && (
    <div className="birthday-message">cheers to 1 more year Hero  </div>
  )}    
</div>

          <div  className='button'> 
          
          <button className='gif-button' onClick={() => {
              setShowSecondGif(true);
              let count = 0;
              const intervalId = setInterval(() => {
                count++;
                if (count >= 3) {
                  clearInterval(intervalId);
                  setShowSecondGif(false);
                }
              }, 1000);
            }}>
              &#127874;
            </button>
          {showGif && <img  src="candelblow.gif" alt="Play GIF" className="gif-image" />}  
          <button className='gif-button' onClick={() => {
              setShowGif(true);
              let count = 0;
              const intervalId = setInterval(() => {
                count++;
                if (count >= 5) {
                  clearInterval(intervalId);
                  setShowGif(false);
                }
              }, 1000);
            }}>
              &#129512;
            </button>
            {showSecondGif && <img  src="cakegif.gif" alt="Play GIF" className="gif-image" />}  
            <audio id="bdysong.ogg">
              <source src="bdysong.ogg" type="audio/ogg" />
              Your browser does not support the audio element.
            </audio>
            <button className={`music-button ${isPlaying ? 'clicked' : ''}`} onClick={playMusic}> &#127926; </button>
         
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default Birthday;

