import React from 'react';
import outlookIcon from '../../assets/icons/apps/outlook.png';
import { Program } from '../../Program.interface';
import { ContactWindow } from './ContactWindow';

export const ContactApp: Program = async function () {
  this.os.windowManager.create({
    title: 'Outlook Express – Contact Me',
    icon: outlookIcon,
    rect: {
      left: 255,
      top: 90,
      width: 510,
      height: 390,
    },
    minSize: { width: 400, height: 320 },
    body: <ContactWindow />,
  });
};

ContactApp.metadata = {
  name: 'Contact',
  icon: outlookIcon,
};
