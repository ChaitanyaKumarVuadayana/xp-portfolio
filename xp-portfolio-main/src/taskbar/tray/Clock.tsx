import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components/macro';
import useOnClickOutside from 'use-onclickoutside';

/* ── Animations ─────────────────────────────────────────── */
const slideUp = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/* ── Clock button ───────────────────────────────────────── */
const ClockBtn = styled.button`
  background: none;
  border: none;
  color: white;
  font-family: Tahoma, sans-serif;
  font-size: 11px;
  cursor: pointer;
  padding: 0 6px 0 4px;
  height: 100%;
  text-shadow: 1px 1px 1px rgba(0,0,0,0.5);
  white-space: nowrap;

  &:hover { background: rgba(255,255,255,0.15); }
`;

/* ── Calendar popup ─────────────────────────────────────── */
const CalPopup = styled.div`
  position: absolute;
  bottom: calc(100% + 4px);
  right: 0;
  z-index: 2000;

  width: 200px;
  background: #ece9d8;
  border: 1px solid #919b9c;
  box-shadow: 2px 2px 8px rgba(0,0,0,0.45);
  font-family: Tahoma, sans-serif;
  font-size: 11px;
  color: #000;
  animation: ${slideUp} 120ms ease;
  user-select: none;
`;

const CalHeader = styled.div`
  background: linear-gradient(to right, #0f6cc1, #3a96e8);
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px;
  font-size: 11px;
  font-weight: bold;
`;

const NavBtn = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 13px;
  padding: 0 4px;
  line-height: 1;
  &:hover { color: #cde; }
`;

const CalGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  padding: 4px 6px 6px;
`;

const DayLabel = styled.div`
  text-align: center;
  font-weight: bold;
  color: #555;
  font-size: 10px;
  padding: 2px 0;
`;

const DayCell = styled.div<{ $today?: boolean; $otherMonth?: boolean }>`
  text-align: center;
  padding: 3px 0;
  border-radius: 2px;
  cursor: default;
  font-size: 11px;
  color: ${p => p.$otherMonth ? '#aaa' : '#000'};
  background: ${p => p.$today ? '#0f6cc1' : 'transparent'};
  color: ${p => p.$today ? 'white' : p.$otherMonth ? '#aaa' : '#000'};
  font-weight: ${p => p.$today ? 'bold' : 'normal'};

  &:hover {
    background: ${p => p.$today ? '#0f6cc1' : '#c0d8f0'};
  }
`;

const TODAY_DATE = new Date();
const MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December'];
const DAY_LABELS = ['Su','Mo','Tu','We','Th','Fr','Sa'];

function buildCalendarCells(year: number, month: number) {
  const first = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev  = new Date(year, month, 0).getDate();

  const cells: Array<{ day: number; otherMonth: boolean }> = [];

  for (let i = first - 1; i >= 0; i--)
    cells.push({ day: daysInPrev - i, otherMonth: true });

  for (let d = 1; d <= daysInMonth; d++)
    cells.push({ day: d, otherMonth: false });

  while (cells.length % 7 !== 0)
    cells.push({ day: cells.length - daysInMonth - first + 1, otherMonth: true });

  return cells;
}

function CalendarPopup({ onClose }: { onClose: () => void }) {
  const today = new Date();
  const [displayYear, setDisplayYear]   = useState(today.getFullYear());
  const [displayMonth, setDisplayMonth] = useState(today.getMonth());
  const ref = useRef<HTMLDivElement>(null!);
  useOnClickOutside(ref, onClose);

  const prev = () => {
    if (displayMonth === 0) { setDisplayMonth(11); setDisplayYear(y => y - 1); }
    else setDisplayMonth(m => m - 1);
  };
  const next = () => {
    if (displayMonth === 11) { setDisplayMonth(0); setDisplayYear(y => y + 1); }
    else setDisplayMonth(m => m + 1);
  };

  const cells = buildCalendarCells(displayYear, displayMonth);
  const isToday = (day: number, otherMonth: boolean) =>
    !otherMonth &&
    day === TODAY_DATE.getDate() &&
    displayMonth === TODAY_DATE.getMonth() &&
    displayYear === TODAY_DATE.getFullYear();

  return (
    <CalPopup ref={ref}>
      <CalHeader>
        <NavBtn onClick={prev}>‹</NavBtn>
        <span>{MONTHS[displayMonth]} {displayYear}</span>
        <NavBtn onClick={next}>›</NavBtn>
      </CalHeader>
      <CalGrid>
        {DAY_LABELS.map(d => <DayLabel key={d}>{d}</DayLabel>)}
        {cells.map((c, i) => (
          <DayCell key={i} $today={isToday(c.day, c.otherMonth)} $otherMonth={c.otherMonth}>
            {c.day}
          </DayCell>
        ))}
      </CalGrid>
    </CalPopup>
  );
}

export function Clock() {
  const [time, setTime]   = useState(new Date());
  const [calOpen, setCalOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const formattedTime = time.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div ref={wrapRef} style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }}>
      <ClockBtn
        title={time.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        onClick={() => setCalOpen(o => !o)}
      >
        {formattedTime}
      </ClockBtn>
      {calOpen && <CalendarPopup onClose={() => setCalOpen(false)} />}
    </div>
  );
}
