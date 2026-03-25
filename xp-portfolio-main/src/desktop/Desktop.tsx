import React, { FC } from 'react';
import styled from 'styled-components/macro';
import { PortfolioDesktop } from './PortfolioDesktop';

const StyledDesktop = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Desktop: FC<{ path: string }> = ({ path }) => (
  <StyledDesktop>
    <PortfolioDesktop />
  </StyledDesktop>
);
