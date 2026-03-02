import React, { useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components/macro';
import { PROFILE } from '../config/profile';
import { useVolume } from '../audio/VolumeContext';

/* ─────────────────────────────────────────────────────────
   KEYFRAMES
───────────────────────────────────────────────────────── */
const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to   { opacity: 0; }
`;

/* ─────────────────────────────────────────────────────────
   CHROME BARS  (top + bottom)
───────────────────────────────────────────────────────── */
const ChromeBar = styled.div<{ $pos: 'top' | 'bottom' }>`
  position: absolute;
  left: 0;
  right: 0;
  height: 62px;
  ${p => p.$pos === 'top' ? 'top: 0;' : 'bottom: 0;'}
  /* replicates the XP gradient bar */
  background:
    linear-gradient(
      180deg,
      ${p => p.$pos === 'top'
        ? '#3168ce 0%, #2458b8 30%, #1c4aad 60%, #1840a0 100%'
        : '#1840a0 0%, #1c4aad 40%, #2458b8 70%, #3168ce 100%'}
    );
  ${p => p.$pos === 'top'
    ? 'border-bottom: 3px solid #5b93e1;'
    : 'border-top: 3px solid #5b93e1;'}
  display: flex;
  align-items: center;
  padding: 0 28px;
  z-index: 2;
`;

/* ─────────────────────────────────────────────────────────
   FULL SCREEN WRAPPER
───────────────────────────────────────────────────────── */
const Screen = styled.div<{ $fading: boolean }>`
  position: absolute;
  inset: 0;
  background: #5b80d6;   /* XP welcome-screen blue */
  font-family: Tahoma, sans-serif;
  user-select: none;
  overflow: hidden;
  animation: ${fadeIn} 700ms ease;
  ${p => p.$fading && css`animation: ${fadeOut} 400ms ease forwards;`}
`;

/* ─────────────────────────────────────────────────────────
   CENTRE LAYOUT  (two panels + vertical rule)
───────────────────────────────────────────────────────── */
const Content = styled.div`
  position: absolute;
  inset: 62px;          /* leave room for chrome bars */
  display: flex;
  align-items: center;
`;

const LeftPanel = styled.div`
  flex: 0 0 42%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;
  padding: 0 32px;
`;

const VertRule = styled.div`
  width: 1px;
  height: 70%;
  background: rgba(255, 255, 255, 0.35);
  flex-shrink: 0;
`;

const RightPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0 48px;
  gap: 24px;
`;

/* ─────────────────────────────────────────────────────────
   XP LOGO  (left panel)
───────────────────────────────────────────────────────── */
const LogoWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1;
`;

const LogoMicrosoft = styled.span`
  font-family: 'Franklin Gothic Medium', Arial, sans-serif;
  font-style: italic;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 0.5px;
`;

const LogoWindows = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 2px;
`;

/* 4-colour Windows flag */
const Flag = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px;
  width: 34px;
  height: 34px;
  transform: skewX(-6deg);
`;

const FlagPane = styled.div<{ $c: string }>`
  background: ${p => p.$c};
  border-radius: 1px;
`;

const LogoTextWrap = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1;
`;

const LogoTextWindows = styled.span`
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-style: italic;
  font-size: 30px;
  color: white;
  font-weight: normal;
  letter-spacing: -0.5px;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.25);
`;

const LogoTextXP = styled.span`
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-style: italic;
  font-size: 22px;
  color: #f8c644;
  font-weight: normal;
  margin-left: 2px;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.35);
`;

const LeftInstruction = styled.p`
  font-size: 13px;
  color: white;
  text-align: center;
  margin: 0;
  font-style: italic;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.4);
  line-height: 1.5;
`;

/* ─────────────────────────────────────────────────────────
   USER CARD  (right panel)
───────────────────────────────────────────────────────── */
const UserCard = styled.div<{ $hovered: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  padding: 10px 14px 10px 10px;
  border-radius: 4px;
  background: ${p => p.$hovered ? 'rgba(255,255,255,0.15)' : 'transparent'};
  transition: background 180ms;
`;

const AvatarFrame = styled.div<{ $hovered: boolean }>`
  width: 64px;
  height: 64px;
  border: 3px solid ${p => p.$hovered
    ? 'rgba(255,255,255,0.95)'
    : 'rgba(255,255,255,0.55)'};
  border-radius: 3px;
  overflow: hidden;
  flex-shrink: 0;
  transition: border-color 180ms;
  box-shadow: 0 0 8px rgba(0,0,0,0.35);
`;

const Avatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const UserName = styled.div`
  color: white;
  font-size: 15px;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.6);
  max-width: 200px;
  word-break: break-word;
  line-height: 1.2;
`;

const AccountType = styled.div`
  color: rgba(255,255,255,0.75);
  font-size: 11px;
`;

const ArrowHint = styled.div<{ $show: boolean }>`
  margin-top: 6px;
  font-size: 11px;
  color: rgba(255,255,255,0.85);
  opacity: ${p => p.$show ? 1 : 0};
  transition: opacity 200ms;
  display: flex;
  align-items: center;
  gap: 4px;
`;

/* ─────────────────────────────────────────────────────────
   BOTTOM  (left side of bottom bar)
───────────────────────────────────────────────────────── */
const BarLogoText = styled.span`
  font-family: 'Franklin Gothic Medium', Tahoma, sans-serif;
  font-style: italic;
  font-size: 16px;
  color: white;
  letter-spacing: 0.3px;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.4);
`;

/* ─────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────── */
export interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [hovered, setHovered] = useState(false);
  const [fading,  setFading]  = useState(false);
  const doneRef               = useRef(false);
  const { effectiveVolume }   = useVolume();

  const handleClick = () => {
    if (doneRef.current) return;
    doneRef.current = true;

    /* 1. Play XP login sound (ignore if file missing or blocked) */
    try {
      const snd = new Audio('/sounds/xp-login.mp3');
      snd.volume = effectiveVolume;
      snd.play().catch(() => {});
    } catch {}

    /* 2. Request fullscreen — ignore denial */
    document.documentElement.requestFullscreen().catch(() => {});

    /* 3. Fade out the login screen, then immediately show desktop */
    setFading(true);
    setTimeout(onLogin, 400);
  };

  return (
    <Screen $fading={fading}>

      {/* ── TOP CHROME BAR ── */}
      <ChromeBar $pos="top">
        <BarLogoText>Windows&nbsp;<em>XP</em></BarLogoText>
      </ChromeBar>

      {/* ── BOTTOM CHROME BAR ── */}
      <ChromeBar $pos="bottom">
        <BarLogoText style={{ fontSize: 11, fontStyle: 'normal', opacity: 0.85 }}>
          Microsoft Windows XP Professional
        </BarLogoText>
      </ChromeBar>

      {/* ── MAIN CONTENT ── */}
      <Content>

        {/* LEFT — logo + instruction */}
        <LeftPanel>
          <LogoWrap>
            <LogoMicrosoft>Microsoft<sup style={{ fontSize: 8 }}>®</sup></LogoMicrosoft>
            <LogoWindows>
              <Flag>
                <FlagPane $c="#e63b2e" />
                <FlagPane $c="#5eb141" />
                <FlagPane $c="#f0c228" />
                <FlagPane $c="#2e6edc" />
              </Flag>
              <LogoTextWrap>
                <LogoTextWindows>Windows<LogoTextXP>XP</LogoTextXP></LogoTextWindows>
              </LogoTextWrap>
            </LogoWindows>
          </LogoWrap>

          <LeftInstruction>
            To begin, click your user name
          </LeftInstruction>
        </LeftPanel>

        {/* VERTICAL RULE */}
        <VertRule />

        {/* RIGHT — user card */}
        <RightPanel>
          <UserCard
            $hovered={hovered}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={handleClick}
          >
            <AvatarFrame $hovered={hovered}>
              <Avatar
                src={PROFILE.profileImage}
                alt={PROFILE.name}
                onError={(e) => { (e.target as HTMLImageElement).src = PROFILE.profileImageFallback; }}
              />
            </AvatarFrame>

            <UserInfo>
              <UserName>{PROFILE.name}</UserName>
              <AccountType>{PROFILE.role}</AccountType>
              <ArrowHint $show={hovered}>
                ▶ Click to sign in
              </ArrowHint>
            </UserInfo>
          </UserCard>
        </RightPanel>
      </Content>

    </Screen>
  );
};
