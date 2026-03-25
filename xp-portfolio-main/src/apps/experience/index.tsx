import React from 'react';
import folderIcon from '../../assets/icons/filetypes/folder.png';
import { Program } from '../../Program.interface';
import { ExperienceWindow } from './ExperienceWindow';

export const ExperienceApp: Program = async function () {
  this.os.windowManager.create({
    title: 'Program Files – Professional Experience',
    icon: folderIcon,
    rect: {
      left: 360,
      top: 165,
      width: 570,
      height: 420,
    },
    minSize: { width: 420, height: 320 },
    body: <ExperienceWindow />,
  });
};

ExperienceApp.metadata = {
  name: 'Experience',
  icon: folderIcon,
};
