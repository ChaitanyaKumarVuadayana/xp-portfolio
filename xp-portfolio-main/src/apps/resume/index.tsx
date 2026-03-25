import React from 'react';
import resumeIcon from '../../assets/icons/filetypes/rich-text.png';
import { Program } from '../../Program.interface';
import { ResumeWindow } from './ResumeWindow';

export const ResumeApp: Program = async function () {
  this.os.windowManager.create({
    title: 'Resume.txt',
    icon: resumeIcon,
    rect: {
      left: 430,
      top: 215,
      width: 490,
      height: 450,
    },
    minSize: { width: 360, height: 320 },
    body: <ResumeWindow />,
  });
};

ResumeApp.metadata = {
  name: 'Resume',
  icon: resumeIcon,
};
