import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { PROFILE } from '../../config/profile';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #ece9d8;
  font-family: Tahoma, sans-serif;
  font-size: 11px;
`;

const Toolbar = styled.div`
  background: linear-gradient(180deg, #0a246a 0%, #26599b 100%);
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ToolbarIcon = styled.span`
  font-size: 28px;
`;

const ToolbarText = styled.div``;

const ToolbarTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 1px 2px #000;
`;

const ToolbarSub = styled.div`
  font-size: 10px;
  color: #aecaff;
  margin-top: 2px;
`;

const Body = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const Sidebar = styled.div`
  width: 160px;
  min-width: 160px;
  background: #e8e7e0;
  border-right: 1px solid #aca899;
  overflow-y: auto;
  padding: 8px 0;
`;

const SidebarItem = styled.div<{ active?: boolean }>`
  padding: 6px 10px;
  cursor: pointer;
  font-weight: bold;
  font-size: 11px;
  color: ${p => (p.active ? '#fff' : '#333')};
  background: ${p =>
    p.active
      ? 'linear-gradient(180deg, #2f6dc9 0%, #1a5ab7 100%)'
      : 'transparent'};
  border-bottom: 1px solid #d4d0c8;
  display: flex;
  align-items: center;
  gap: 6px;
  &:hover {
    background: ${p => (p.active ? undefined : '#d4d0c8')};
  }
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 14px 16px;
  background: #ece9d8;
`;

const CompanyHeader = styled.div`
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 2px solid #0a246a;
`;

const CompanyName = styled.div`
  font-size: 13px;
  font-weight: bold;
  color: #0a246a;
`;

const RoleText = styled.div`
  font-size: 12px;
  color: #333;
  margin-top: 3px;
`;

const PeriodText = styled.div`
  font-size: 10px;
  color: #888;
  margin-top: 2px;
`;

const ProjectBlock = styled.div`
  margin-bottom: 16px;
  background: #fff;
  border: 1px solid #d4d0c8;
  border-radius: 3px;
  padding: 10px 12px;
`;

const ProjectName = styled.div`
  font-weight: bold;
  font-size: 12px;
  color: #0a246a;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const ProjectDesc = styled.div`
  color: #555;
  margin-bottom: 8px;
  font-style: italic;
`;

const BulletList = styled.ul`
  margin: 0;
  padding-left: 18px;
  li {
    margin-bottom: 3px;
    line-height: 1.5;
  }
`;

export const ExperienceWindow: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const exp = PROFILE.experience[selectedIdx];

  return (
    <Wrapper>
      <Toolbar>
        <ToolbarIcon>💼</ToolbarIcon>
        <ToolbarText>
          <ToolbarTitle>Professional Experience</ToolbarTitle>
          <ToolbarSub>Installed services and deployed systems</ToolbarSub>
        </ToolbarText>
      </Toolbar>
      <Body>
        <Sidebar>
          {PROFILE.experience.map((e, i) => (
            <SidebarItem
              key={i}
              active={i === selectedIdx}
              onClick={() => setSelectedIdx(i)}>
              🏢 {e.company.split('(')[0].trim()}
            </SidebarItem>
          ))}
        </Sidebar>
        <Content>
          <CompanyHeader>
            <CompanyName>📁 {exp.company}</CompanyName>
            <RoleText>⚙️ {exp.role}</RoleText>
            <PeriodText>🗓 {exp.period} · {exp.location}</PeriodText>
          </CompanyHeader>
          {exp.projects.map((proj, i) => (
            <ProjectBlock key={i}>
              <ProjectName>📄 {proj.name}</ProjectName>
              <ProjectDesc>{proj.description}</ProjectDesc>
              <BulletList>
                {proj.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </BulletList>
            </ProjectBlock>
          ))}
        </Content>
      </Body>
    </Wrapper>
  );
};
