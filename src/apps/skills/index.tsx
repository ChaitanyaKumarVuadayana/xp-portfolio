import React from 'react';
import controlPanelIcon from '../../assets/icons/apps/control-panel.png';
import { Program } from '../../Program.interface';
import { SkillsWindow } from './SkillsWindow';

export const SkillsApp: Program = async function () {
  this.os.windowManager.create({
    title: 'Technical Skills',
    icon: controlPanelIcon,
    rect: {
      left: 290,
      top: 115,
      width: 530,
      height: 400,
    },
    minSize: { width: 360, height: 300 },
    body: <SkillsWindow />,
  });
};

SkillsApp.metadata = {
  name: 'Technical Skills',
  icon: controlPanelIcon,
};
