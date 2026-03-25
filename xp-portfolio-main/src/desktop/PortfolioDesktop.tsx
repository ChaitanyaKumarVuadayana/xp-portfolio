import React, { useContext, useCallback } from 'react';
import styled from 'styled-components/macro';
import { OSContext } from '../App';
import { PROFILE } from '../config/profile';
import computerIcon from '../assets/icons/computer.png';
import controlPanelIcon from '../assets/icons/apps/control-panel.png';
import folderIcon from '../assets/icons/filetypes/folder.png';
import picturesIcon from '../assets/icons/filetypes/folder-pictures.png';
import richTextIcon from '../assets/icons/filetypes/rich-text.png';
import ieIcon from '../assets/icons/apps/internet-explorer.png';
import outlookIcon from '../assets/icons/apps/outlook.png';
import minesweeperIcon from '../apps/minesweeper/assets/icon.png';
import notepadIcon from '../apps/notepad/assets/notepad.png';

const DesktopGrid = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: flex-start;
  padding: 20px 6px 6px 10px;
  row-gap: 8px;
  column-gap: 8px;
  height: 100%;
  overflow: hidden;
`;

const ShortcutItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
  height: 72px;
  padding: 4px;
  cursor: default;
  border-radius: 3px;
  user-select: none;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  &:active img {
    filter: grayscale(100%) brightness(30%) sepia(100%) hue-rotate(-180deg)
      saturate(700%) contrast(0.8);
  }

  img {
    width: 32px;
    height: 32px;
    pointer-events: none;
    padding-bottom: 4px;
  }
`;

const ShortcutLabel = styled.div`
  font-family: Tahoma, sans-serif;
  font-size: 11px;
  color: white;
  text-shadow: 1px 1px 3px rgb(0, 0, 0);
  text-align: center;
  word-wrap: break-word;
  max-width: 80px;
  line-height: 1.2;
  pointer-events: none;
`;

interface Shortcut {
  label: string;
  icon: string;
  appId: string;
  args?: string[];
  isAvatar?: boolean;
}

const SHORTCUTS: Shortcut[] = [
  { label: 'About Me',          icon: PROFILE.profileImage, appId: 'About Me',        isAvatar: true },
  { label: 'Resume',            icon: richTextIcon,         appId: 'Resume' },
  { label: 'My Projects',       icon: folderIcon,           appId: 'My Projects' },
  { label: 'Experience',        icon: picturesIcon,         appId: 'Experience' },
  { label: 'Technical Skills',  icon: controlPanelIcon,     appId: 'Technical Skills' },
  { label: 'Achievements',      icon: picturesIcon,         appId: 'Achievements' },
  { label: 'My Computer',       icon: computerIcon,         appId: 'File Explorer',   args: ['/C:'] },
  { label: 'Notepad',           icon: notepadIcon,          appId: 'Notepad' },
  { label: 'Minesweeper',       icon: minesweeperIcon,      appId: 'Minesweeper' },
  { label: 'Internet Explorer', icon: ieIcon,               appId: 'Internet Explorer' },
  { label: 'Contact Me',        icon: outlookIcon,          appId: 'Contact' },
];

export const PortfolioDesktop: React.FC = () => {
  const { processManager, programManager } = useContext(OSContext)!;

  const handleClick = useCallback(
    (appId: string, args?: string[]) => {
      if (!appId) return;
      const app = programManager.installed.find(
        p => p.metadata.name === appId
      );
      if (app) {
        processManager.startFromMemory(app, {
          fileName: `${app.name}.exe`,
          arguments: args ?? [],
        });
      }
    },
    [processManager, programManager]
  );

  return (
    <DesktopGrid>
      {SHORTCUTS.map(s => (
        <ShortcutItem
          key={s.label}
          onDoubleClick={() => handleClick(s.appId, s.args)}
          title={`Double-click to open ${s.label}`}>
          {s.isAvatar ? (
            <img
              src={s.icon}
              alt={s.label}
              draggable={false}
              onError={(e) => { (e.target as HTMLImageElement).src = PROFILE.profileImageFallback; }}
              style={{
                width: 48,
                height: 48,
                borderRadius: 6,
                objectFit: 'cover',
                paddingBottom: 4,
                pointerEvents: 'none',
              }}
            />
          ) : (
            <img src={s.icon} alt={s.label} draggable={false} />
          )}
          <ShortcutLabel>{s.label}</ShortcutLabel>
        </ShortcutItem>
      ))}
    </DesktopGrid>
  );
};
