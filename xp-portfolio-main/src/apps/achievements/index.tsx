import React from 'react';
import picturesIcon from '../../assets/icons/filetypes/folder-pictures.png';
import { Program } from '../../Program.interface';
import { AchievementsWindow } from './AchievementsWindow';

export const AchievementsApp: Program = async function () {
  this.os.windowManager.create({
    title: 'Achievements & Certifications',
    icon: picturesIcon,
    rect: {
      left: Math.max(0, window.innerWidth * 0.5 - 280),
      top: Math.max(0, window.innerHeight * 0.5 - 200),
      width: Math.min(window.innerWidth, 580),
      height: Math.min(window.innerHeight - 60, 400),
    },
    minSize: { width: 360, height: 300 },
    body: <AchievementsWindow />,
  });
};

AchievementsApp.metadata = {
  name: 'Achievements',
  icon: picturesIcon,
};
