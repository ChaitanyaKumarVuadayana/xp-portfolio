import React, { useCallback, useEffect, useRef, useState } from 'react';
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

const profilePulse = keyframes`
  0% {
    box-shadow:
      0 0 8px rgba(0, 0, 0, 0.35),
      0 0 0 0 rgba(255, 255, 255, 0.35);
  }
  70% {
    box-shadow:
      0 0 12px rgba(0, 0, 0, 0.35),
      0 0 0 12px rgba(255, 255, 255, 0);
  }
  100% {
    box-shadow:
      0 0 8px rgba(0, 0, 0, 0.35),
      0 0 0 0 rgba(255, 255, 255, 0);
  }
`;

const arrowBounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(4px); }
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
const UserCardWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: min(100%, 420px);
`;

const UserCard = styled.div<{ $hovered: boolean }>`
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  cursor: pointer;
  padding: 12px 14px;
  border-radius: 6px;
  background: ${p => p.$hovered ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.08)'};
  border: 1px solid ${p => p.$hovered ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.28)'};
  box-shadow: ${p => p.$hovered
    ? '0 0 18px rgba(255,255,255,0.26), 0 8px 20px rgba(0,0,0,0.25)'
    : '0 6px 14px rgba(0,0,0,0.22)'};
  transform: ${p => p.$hovered ? 'scale(1.015)' : 'scale(1)'};
  transition: transform 180ms ease, box-shadow 180ms ease, background 180ms ease, border-color 180ms ease;

  @media (max-width: 700px) {
    max-width: 320px;
  }
`;

const ArrowCallout = styled.div<{ $active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  gap: 3px;
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.55);
  pointer-events: none;
  opacity: ${p => p.$active ? 1 : 0};
  animation: ${p => p.$active ? css`${arrowBounce} 1200ms ease-in-out infinite` : 'none'};
`;

const ArrowText = styled.span`
  font-size: 11px;
  font-weight: bold;
  white-space: nowrap;
  text-align: center;
`;

const ArrowIcon = styled.span`
  font-size: 18px;
  line-height: 1;
  color: #ffdb64;
`;

const AvatarFrame = styled.div<{ $hovered: boolean; $active: boolean }>`
  width: 64px;
  height: 64px;
  border: 3px solid ${p => p.$hovered
    ? 'rgba(255,255,255,0.95)'
    : 'rgba(255,255,255,0.55)'};
  border-radius: 3px;
  overflow: hidden;
  flex-shrink: 0;
  transition: border-color 180ms, box-shadow 180ms;
  box-shadow: ${p => p.$hovered
    ? '0 0 14px rgba(255,255,255,0.4), 0 0 8px rgba(0,0,0,0.35)'
    : '0 0 8px rgba(0,0,0,0.35)'};
  animation: ${p => p.$active ? css`${profilePulse} 2200ms ease-in-out infinite` : 'none'};
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

type FullscreenCapableElement = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void> | void;
  msRequestFullscreen?: () => Promise<void> | void;
};

const requestImmediateFullscreen = (): Promise<void> => {
  const root = document.documentElement as FullscreenCapableElement;

  if (root.requestFullscreen) {
    return root.requestFullscreen();
  }

  if (root.webkitRequestFullscreen) {
    return Promise.resolve(root.webkitRequestFullscreen()).then(() => undefined);
  }

  if (root.msRequestFullscreen) {
    return Promise.resolve(root.msRequestFullscreen()).then(() => undefined);
  }

  return Promise.reject(new Error('Fullscreen API is not supported in this browser.'));
};

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [hovered, setHovered] = useState(false);
  const [fading,  setFading]  = useState(false);
  const doneRef               = useRef(false);
  const autoLoginTimerRef     = useRef<number | null>(null);
  const transitionTimerRef    = useRef<number | null>(null);
  const { effectiveVolume }   = useVolume();

  const handleClick = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;

    if (autoLoginTimerRef.current !== null) {
      window.clearTimeout(autoLoginTimerRef.current);
      autoLoginTimerRef.current = null;
    }

    /* 1. Play XP login sound (ignore if file missing or blocked) */
    try {
      const snd = new Audio('/sounds/xp-login.mp3');
      snd.volume = effectiveVolume;
      snd.play().catch(() => {});
    } catch {}

    /* 2. Request fullscreen immediately after user action */
    requestImmediateFullscreen().catch(() => {});

    /* 3. Fade out the login screen, then immediately show desktop */
    setFading(true);
    transitionTimerRef.current = window.setTimeout(onLogin, 400);
  }, [effectiveVolume, onLogin]);

  useEffect(() => {
    autoLoginTimerRef.current = window.setTimeout(() => {
      handleClick();
    }, 10000);

    return () => {
      if (autoLoginTimerRef.current !== null) {
        window.clearTimeout(autoLoginTimerRef.current);
        autoLoginTimerRef.current = null;
      }

      if (transitionTimerRef.current !== null) {
        window.clearTimeout(transitionTimerRef.current);
        transitionTimerRef.current = null;
      }
    };
  }, [handleClick]);

  return (
    <Screen $fading={fading} onClick={handleClick}>

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
            Click on user photo or anywhere to sign in
          </LeftInstruction>
        </LeftPanel>

        {/* VERTICAL RULE */}
        <VertRule />

        {/* RIGHT — user card */}
        <RightPanel>
          <UserCardWrap>
            <ArrowCallout $active={!fading}>
              <ArrowText>Click here or anywhere to sign in</ArrowText>
              <ArrowIcon>▼</ArrowIcon>
            </ArrowCallout>

            <UserCard
              $hovered={hovered}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onClick={handleClick}
            >
              <AvatarFrame $hovered={hovered} $active={!fading}>
                <Avatar
                  src={PROFILE.profileImage}
                  alt={PROFILE.name}
                  onError={(e) => { (e.target as HTMLImageElement).src = PROFILE.profileImageFallback; }}
                />
              </AvatarFrame>

              <UserInfo>
                <UserName>{PROFILE.name}</UserName>
                <AccountType>{PROFILE.role}</AccountType>
              </UserInfo>
            </UserCard>
          </UserCardWrap>
        </RightPanel>
      </Content>

    </Screen>
  );
};
