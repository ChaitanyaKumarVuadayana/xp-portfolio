import React from 'react';
import docsIcon from '../../assets/icons/filetypes/folder-documents.png';
import { Program } from '../../Program.interface';
import { ProjectsWindow } from './ProjectsWindow';

export const ProjectsApp: Program = async function () {
  this.os.windowManager.create({
    title: 'My Projects',
    icon: docsIcon,
    rect: {
      left: 325,
      top: 140,
      width: 550,
      height: 415,
    },
    minSize: { width: 400, height: 320 },
    body: <ProjectsWindow />,
  });
};

ProjectsApp.metadata = {
  name: 'My Projects',
  icon: docsIcon,
};
