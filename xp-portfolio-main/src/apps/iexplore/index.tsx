import React from 'react';
import ieIcon from '../../assets/icons/apps/internet-explorer.png';
import { Program } from '../../Program.interface';
import { IEWindow } from './IEWindow';

export const IEApp: Program = async function () {
  this.os.windowManager.create({
    title: 'Internet Explorer',
    icon: ieIcon,
    rect: {
      left: 185,
      top: 40,
      width: 490,
      height: 370,
    },
    minSize: { width: 360, height: 300 },
    body: <IEWindow />,
  });
};

IEApp.metadata = {
  name: 'Internet Explorer',
  icon: ieIcon,
};
