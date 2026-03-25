import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components/macro';
import logonLogo from './assets/boot-windows-logo.png';
import { MicrosoftLogo } from './MicrosoftLogo';
import { ProgressBar } from './LoadingBar';

const TOTAL_MS = 5000;
const STEP_MS = TOTAL_MS / 3;

const STATUS_MESSAGES = [
  'Starting Windows XP\u2026',
  'Loading Personal Settings\u2026',
  'Preparing Desktop\u2026',
];

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const Pulse = keyframes`
  0%   { opacity: 0.5; }
  50%  { opacity: 1;   }
  100% { opacity: 0.5; }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: black;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Franklin Gothic Medium', Arial, sans-serif;
  font-size: 14px;
  padding: 21px;
  animation: ${fadeIn} 500ms linear;
  footer {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: flex-end;
    line-height: 0.5;
  }
`;

const StatusText = styled.span`
  font-family: Tahoma, sans-serif;
  font-size: 12px;
  color: #aaaaaa;
  margin-bottom: 8px;
  letter-spacing: 0.2px;
  min-height: 16px;
  animation: ${Pulse} 1.4s ease-in-out infinite;
`;

export interface BootLoaderProps {
  onDone?: () => void;
}

export const BootLoader: React.FC<BootLoaderProps> = ({ onDone }) => {
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    STATUS_MESSAGES.forEach((_, i) => {
      if (i === 0) return;
      timers.push(setTimeout(() => setMsgIdx(i), STEP_MS * i));
    });
    if (onDone) {
      timers.push(setTimeout(onDone, TOTAL_MS));
    }
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      <div style={{ flexGrow: 1.3 }} />
      <img src={logonLogo} alt="Windows XP" />
      <div style={{ flexGrow: 1 }} />
      <StatusText>{STATUS_MESSAGES[msgIdx]}</StatusText>
      <ProgressBar width={126} />
      <div style={{ flexGrow: 1 }} />
      <footer>
        <span>Copyright &copy; Microsoft Corporation</span>
        <MicrosoftLogo />
      </footer>
    </Wrapper>
  );
};
