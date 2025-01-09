import { useState } from 'react';
import SceneBg from '../public/assets/bg.jpg';
import styled from '@emotion/styled';
import CanvasComponent from './CanvasComponent';
import { Button } from '@mui/material';

type Props = {
  className?: string;
};

const App = ({ className }: Props): JSX.Element => {
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [isDamageVisible, setIsDamageVisible] = useState(false);
  const [killDusa, setKillDusa] = useState(false);
  const [chickenAttack, setChickenAttack] = useState(false);

  const handlePlayVideo = () => {
    setChickenAttack(true);

    setTimeout(() => {
      setIsVideoVisible(true);
      setIsDamageVisible(false);
    }, 800)
  };

  const handleVideoEnd = () => {
    setIsVideoVisible(false);
    setIsDamageVisible(true);
    setChickenAttack(false);

    setTimeout(() => {
      setKillDusa(true)
    }, 200)

    setTimeout(() => {
      setIsDamageVisible(false);
    }, 2000);
  };

  return (
    <Wrapper className={className}>
      <CanvasComponent chickenAttack={chickenAttack} killDusa={killDusa} />
      <ButtonWrapper>
        <Button variant="contained" color="primary" onClick={handlePlayVideo}>
          Attack
        </Button>
      </ButtonWrapper>
      {isVideoVisible && (
        <VideoOverlay>
          <Video
            src="/public/assets/animation.mp4"
            autoPlay
            controls
            onEnded={handleVideoEnd}
          />
        </VideoOverlay>
      )}
      {isDamageVisible && <DamageText>-50 HP</DamageText>}
    </Wrapper>
  );
};

export default App;

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    background: url(${SceneBg}) no-repeat center center;
    background-size: cover;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    position: relative;
`;

const ButtonWrapper = styled.div`
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
`;

const VideoOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    animation: fadeIn 0.5s ease-in-out;

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

const Video = styled.video`
    width: 90%;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
`;

const DamageText = styled.div`
    position: fixed;
    top: 30%;
    right: 5%;
    transform: translate(-50%, -50%);
    font-size: 2rem;
    color: red;
    padding: 10px 20px;
    border-radius: 5px;
    text-align: center;
    z-index: 1100;
    animation: damageTextAnimation 5s ease-in-out forwards;

    @keyframes damageTextAnimation {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        50% {
            opacity: 0.8;
            transform: translate(-50%, -70%) scale(1.2);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -100%) scale(0.9);
        }
    }
`;


