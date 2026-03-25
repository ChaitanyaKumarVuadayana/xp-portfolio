import React from 'react';
import styled from 'styled-components/macro';

interface DownloadResumeButtonProps {
  label?: string;
  fileName?: string;
  className?: string;
}

const DownloadLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  font-family: Tahoma, sans-serif;
  font-size: 11px;
  cursor: pointer;
  border: 1px solid #707070;
  border-radius: 3px;
  background: linear-gradient(180deg, #f5f4ef 0%, #e1e0d9 100%);
  text-decoration: none;
  color: #000;

  &:hover {
    background: linear-gradient(180deg, #e8e7e0 0%, #d8d7d0 100%);
  }

  &:active {
    background: linear-gradient(180deg, #dedad2 0%, #e8e7e0 100%);
  }
`;

export const DownloadResumeButton: React.FC<DownloadResumeButtonProps> = ({
  label = 'Download Resume',
  fileName = 'Chaitanya_Kumar_Resume.pdf',
  className,
}) => (
  <DownloadLink href="/resume.pdf" download={fileName} className={className}>
    <span aria-hidden="true">💾</span>
    {label}
  </DownloadLink>
);
