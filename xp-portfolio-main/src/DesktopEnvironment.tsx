import React, { FC } from 'react';
import { TaskBar } from './taskbar/TaskBar';
import { Desktop } from './desktop/Desktop';
import { WindowRenderer } from './windows/WindowRenderer';
import styled from 'styled-components/macro';
import bliss from './assets/wallpapers/bliss.jpg';

const UsableArea = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-flow: column nowrap;
`;

/* Inner wrapper: takes all remaining height after the TaskBar */
const DesktopArea = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
  min-height: 0;
`;

const StyledDesktopEnvironment = styled(UsableArea).attrs({
  // done with inline style to avoid flickering in dev builds
  style: {
    backgroundImage: `url(${bliss})`,
  },
})`
  background: transparent center / cover no-repeat;
`;

export const DesktopEnvironment: FC = () => (
  <StyledDesktopEnvironment>
    <DesktopArea>
      <Desktop path="/C:/Documents and Settings/Vudayana Chaitanya Kumar/Desktop" />
      <WindowRenderer />
    </DesktopArea>
    <TaskBar height={30} />
  </StyledDesktopEnvironment>
);
