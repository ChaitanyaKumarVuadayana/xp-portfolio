import React from 'react';
import computerIcon from '../../assets/icons/computer.png';
import { Program } from '../../Program.interface';
import { AboutWindow } from './AboutWindow';

export const AboutApp: Program = async function () {
  this.os.windowManager.create({
    title: 'About Me',
    icon: computerIcon,
    rect: {
      left: 395,
      top: 190,
      width: 540,
      height: 410,
    },
    minSize: { width: 400, height: 340 },
    body: <AboutWindow />,
  });
};

AboutApp.metadata = {
  name: 'About Me',
  icon: computerIcon,
};
