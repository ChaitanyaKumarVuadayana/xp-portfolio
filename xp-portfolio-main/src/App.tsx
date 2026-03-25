import React, { useState, useEffect, useRef } from 'react';
import './ContextMenu.scss';
import { WindowManager } from './windows/WindowManager';
import { ProgramManager } from './apps/ProgramManager';
import { ProcessManager } from './apps/ProcessManager';
import { WelcomeScreen } from './logon/WelcomeScreen';
import { BootLoader } from './boot/BootLoader';
import { LoginScreen } from './logon/LoginScreen';
import { OS } from './OS';
import styled, { keyframes } from 'styled-components/macro';
import { Loadable } from './misc/Loadable';
import { loadFileSystem } from './filesystem/loadFileSystem';
import { VolumeProvider, useVolume } from './audio/VolumeContext';

async function loadProgramManager(): Promise<ProgramManager> {
  const manager = new ProgramManager();

  await Promise.all([
    manager.install(async () => (await import('./apps/notepad')).NotepadApp),
    manager.install(async () => (await import('./apps/explorer')).ExplorerApp),
    manager.install(
      async () => (await import('./apps/minesweeper')).MinesweeperApp
    ),
    manager.install(
      async () => (await import('./apps/pictureviewer')).PictureViewerApp
    ),
    // ── Portfolio Apps ──────────────────────────────────
    manager.install(async () => (await import('./apps/about')).AboutApp),
    manager.install(async () => (await import('./apps/projects')).ProjectsApp),
    manager.install(async () => (await import('./apps/skills')).SkillsApp),
    manager.install(
      async () => (await import('./apps/experience')).ExperienceApp
    ),
    manager.install(
      async () => (await import('./apps/achievements')).AchievementsApp
    ),
    manager.install(async () => (await import('./apps/resume')).ResumeApp),
    manager.install(async () => (await import('./apps/contact')).ContactApp),
    manager.install(async () => (await import('./apps/iexplore')).IEApp),
  ]);

  return manager;
}

async function loadOS(): Promise<OS> {
  const os: Partial<OS> = {
    fileSystem: await loadFileSystem(),
    programManager: await loadProgramManager(),
    windowManager: new WindowManager(),
  };

  os.processManager = new ProcessManager(os as OS);

  return os as OS;
}

function wait(ms: number): Promise<void> {
  if (process.env.NODE_ENV && process.env.NODE_ENV === 'development')
    return Promise.resolve();

  return new Promise(resolve => setTimeout(() => resolve(), ms));
}

const LoadableDesktopEnvironment = Loadable({
  loader: () =>
    Promise.all([import('./DesktopEnvironment'), wait(300)]).then(r => r[0]),
  loading: () => <WelcomeScreen />,
  render: (loaded, props) => <loaded.DesktopEnvironment {...props} />,
});

const LoadableOS = Loadable({
  loader: () => Promise.all([loadOS(), wait(0)]).then(r => r[0]),
  loading: () => <div style={{ width: '100%', height: '100%', background: 'black' }} />,
  render: (loaded, props) => <OSContext.Provider value={loaded} {...props} />,
});

export const OSContext = React.createContext<OS | null>(null);

/* ── Startup app sequence ─────────────────────────────────────────── */
interface StartupEntry {
  name: string;
  args?: string[];
}

const STARTUP_SEQUENCE: StartupEntry[] = [
  { name: 'Windows Picture and Fax Viewer', args: ['/C:/Pictures/profile.png'] },
  { name: 'Internet Explorer' },
  { name: 'Minesweeper' },
  { name: 'Contact' },
  { name: 'Technical Skills' },
  { name: 'My Projects' },
  { name: 'Experience' },
  { name: 'About Me' },
  { name: 'Resume' },
];

interface StartupSequenceProps {
  triggered: boolean;
}

/**
 * Renders null. Fires exactly once when triggered=true to open
 * portfolio apps one-by-one with a 1 s gap between each.
 */
const StartupSequence: React.FC<StartupSequenceProps> = ({ triggered }) => {
  const os = React.useContext(OSContext);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!triggered || !os || hasRun.current) return;
    hasRun.current = true;

    const ids: number[] = STARTUP_SEQUENCE.map((entry, i) =>
      window.setTimeout(() => {
        const app = os.programManager.installed.find(
          p => p.metadata.name === entry.name
        );
        if (app) {
          os.processManager.startFromMemory(app, {
            fileName: `${app.metadata.name}.exe`,
            arguments: entry.args ?? [],
          });
        }
      }, (i + 1) * 1000)
    );

    return () => ids.forEach(window.clearTimeout);
  }, [triggered, os]);

  return null;
};

function blockEvent(e: React.BaseSyntheticEvent<any>) {
  if (process.env.NODE_ENV && process.env.NODE_ENV !== 'development')
    e.preventDefault();
}

const StyledApp = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  font-family: Tahoma;
  font-size: 11px;
  color: black;
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 100;
  animation: ${fadeIn} 500ms ease;
`;

/**
 * Always mounted so the OS loads silently in the background.
 * Visually hidden and non-interactive until the user logs in.
 */
const DesktopLayer = styled.div<{ $visible: boolean }>`
  position: absolute;
  inset: 0;
  opacity: ${p => p.$visible ? 1 : 0};
  pointer-events: ${p => p.$visible ? 'all' : 'none'};
  visibility: ${p => p.$visible ? 'visible' : 'hidden'};
  transition: opacity 700ms ease;
`;

type Phase = 'boot' | 'login' | 'desktop';

/** Plays the XP startup sound exactly once, 300 ms after the desktop becomes visible */
function useStartupSound(phase: Phase) {
  const played = useRef(false);
  const { effectiveVolume } = useVolume();
  useEffect(() => {
    if (phase !== 'desktop' || played.current) return;
    played.current = true;
    try {
      const snd = new Audio(process.env.PUBLIC_URL + '/sounds/xp-startup.mp3');
      snd.volume = effectiveVolume;
      const id = window.setTimeout(() => snd.play().catch(() => {}), 300);
      return () => window.clearTimeout(id);
    } catch {}
  }, [phase]); // eslint-disable-line react-hooks/exhaustive-deps
}

function App() {
  const [phase, setPhase] = useState<Phase>('boot');
  useStartupSound(phase);

  return (
    <StyledApp onContextMenu={blockEvent} onDragStart={blockEvent}>
      {/* Desktop is always mounted so OS loads silently during boot/login */}
      <DesktopLayer $visible={phase === 'desktop'}>
        <LoadableOS>
          <LoadableDesktopEnvironment />
          <StartupSequence triggered={phase === 'desktop'} />
        </LoadableOS>
      </DesktopLayer>

      {/* Boot screen */}
      {phase === 'boot' && (
        <Overlay>
          <BootLoader onDone={() => setPhase('login')} />
        </Overlay>
      )}

      {/* Login screen */}
      {phase === 'login' && (
        <Overlay>
          <LoginScreen onLogin={() => setPhase('desktop')} />
        </Overlay>
      )}
    </StyledApp>
  );
}

export default function AppRoot() {
  return (
    <VolumeProvider>
      <App />
    </VolumeProvider>
  );
}
