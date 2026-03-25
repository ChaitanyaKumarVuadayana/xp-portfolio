import React, { useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components/macro';
import useOnClickOutside from 'use-onclickoutside';
import { useVolume } from '../../audio/VolumeContext';

/* ── Animations ────────────────────────────────────────── */
const slideUp = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/* ── Popup shell ───────────────────────────────────────── */
const Popup = styled.div`
  position: absolute;
  bottom: calc(100% + 4px);
  right: 0;
  z-index: 2000;

  width: 52px;
  background: #ece9d8;
  border: 1px solid #919b9c;
  box-shadow: 2px 2px 6px rgba(0,0,0,0.45);
  font-family: Tahoma, sans-serif;
  font-size: 11px;
  color: #000;
  animation: ${slideUp} 120ms ease;
  user-select: none;
`;

const PopupTitle = styled.div`
  background: linear-gradient(to right, #0f6cc1, #3a96e8);
  color: white;
  text-align: center;
  padding: 3px 0;
  font-size: 10px;
  letter-spacing: 0.3px;
`;

const PopupBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 0 6px;
  gap: 6px;
`;

/* ── Vertical slider via rotated horizontal range ──────── */
const SliderWrap = styled.div`
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RangeInput = styled.input`
  -webkit-appearance: slider-vertical;
  writing-mode: bt-lr;
  width: 22px;
  height: 70px;
  cursor: pointer;
  accent-color: #0f6cc1;
`;

const MuteRow = styled.label`
  display: flex;
  align-items: center;
  gap: 3px;
  cursor: pointer;
  font-size: 10px;
`;

/* ── Speaker icon SVG ──────────────────────────────────── */
function SpeakerIcon({ muted, level }: { muted: boolean; level: number }) {
  const color = 'white';
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill={color}>
      {/* Speaker body */}
      <polygon points="1,5 5,5 9,2 9,14 5,11 1,11" />
      {!muted && level > 0 && (
        <path d="M11,5.5 Q13,8 11,10.5" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      )}
      {!muted && level > 0.5 && (
        <path d="M12.5,3.5 Q15.5,8 12.5,12.5" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      )}
      {muted && (
        <>
          <line x1="11" y1="5.5" x2="15" y2="10.5" stroke="red" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="15" y1="5.5" x2="11" y2="10.5" stroke="red" strokeWidth="1.5" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

/* ── Tray button ───────────────────────────────────────── */
const TrayBtn = styled.button`
  background: none;
  border: none;
  padding: 2px 3px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  position: relative;

  &:hover { background: rgba(255,255,255,0.18); }
  &:active { background: rgba(255,255,255,0.08); }
`;

/* ── Component ─────────────────────────────────────────── */
export const VolumeControl: React.FC = () => {
  const { volume, muted, setVolume, setMuted } = useVolume();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null!);
  useOnClickOutside(ref, () => setOpen(false));

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <TrayBtn
        title={muted ? 'Volume: Muted' : `Volume: ${Math.round(volume * 100)}%`}
        onClick={() => setOpen(o => !o)}
      >
        <SpeakerIcon muted={muted} level={volume} />
      </TrayBtn>

      {open && (
        <Popup>
          <PopupTitle>Volume</PopupTitle>
          <PopupBody>
            <SpeakerIcon muted={muted} level={volume} />
            <SliderWrap>
              <RangeInput
                type="range"
                min={0}
                max={100}
                value={muted ? 0 : Math.round(volume * 100)}
                onChange={e => {
                  const v = Number(e.target.value) / 100;
                  setVolume(v);
                  if (muted && v > 0) setMuted(false);
                }}
              />
            </SliderWrap>
            <MuteRow>
              <input
                type="checkbox"
                checked={muted}
                onChange={e => setMuted(e.target.checked)}
                style={{ margin: 0 }}
              />
              Mute
            </MuteRow>
          </PopupBody>
        </Popup>
      )}
    </div>
  );
};
