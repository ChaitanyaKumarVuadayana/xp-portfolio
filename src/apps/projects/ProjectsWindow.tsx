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

const ToolbarIcon = styled.span`font-size: 28px;`;
const ToolbarTitle = styled.div`
  font-size: 14px; font-weight: bold; color: #fff;
  text-shadow: 0 1px 2px #000;
`;
const ToolbarSub = styled.div`
  font-size: 10px; color: #aecaff; margin-top: 2px;
`;

const Body = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const Sidebar = styled.div`
  width: 140px;
  min-width: 140px;
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
  background: ${p => p.active
    ? 'linear-gradient(180deg, #2f6dc9 0%, #1a5ab7 100%)'
    : 'transparent'};
  border-bottom: 1px solid #d4d0c8;
  display: flex;
  align-items: center;
  gap: 6px;
  &:hover { background: ${p => p.active ? undefined : '#d4d0c8'}; }
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 14px 16px;
`;

const ProjHeader = styled.div`
  border-bottom: 2px solid #0a246a;
  padding-bottom: 8px;
  margin-bottom: 12px;
`;

const ProjName = styled.div`
  font-size: 14px; font-weight: bold; color: #0a246a;
`;

const ProjDesc = styled.div`
  color: #444; margin-top: 5px; line-height: 1.5;
`;

const SubTitle = styled.div`
  font-weight: bold; color: #0a246a; margin: 12px 0 5px;
  font-size: 11px;
`;

const TagRow = styled.div`
  display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 8px;
`;

const Tag = styled.span`
  background: #ddeeff; border: 1px solid #99bbdd;
  border-radius: 2px; padding: 1px 6px;
  font-size: 10px; color: #003366;
`;

const BulletList = styled.ul`
  margin: 0 0 0 16px; padding: 0;
  li { margin-bottom: 3px; line-height: 1.4; }
`;

const AwardBadge = styled.div`
  display: inline-flex; align-items: center; gap: 6px;
  background: linear-gradient(135deg, #ffd70033, #ff8c0022);
  border: 1px solid #ffd700;
  border-radius: 4px; padding: 5px 10px;
  color: #7a5800; font-size: 11px; margin-top: 8px;
`;

const GitHubLink = styled.a`
  display: inline-flex; align-items: center; gap: 5px;
  margin-top: 12px; padding: 4px 12px;
  border: 1px solid #707070; border-radius: 3px;
  background: linear-gradient(180deg, #f5f4ef 0%, #e1e0d9 100%);
  text-decoration: none; color: #000; font-size: 11px;
  cursor: pointer;
  &:hover { background: linear-gradient(180deg, #e8e7e0 0%, #d8d7d0 100%); }
`;

export const ProjectsWindow: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const proj = PROFILE.projects[selectedIdx];

  return (
    <Wrapper>
      <Toolbar>
        <ToolbarIcon>📁</ToolbarIcon>
        <div>
          <ToolbarTitle>My Projects</ToolbarTitle>
          <ToolbarSub>Personal and open-source project portfolio</ToolbarSub>
        </div>
      </Toolbar>
      <Body>
        <Sidebar>
          {PROFILE.projects.map((p, i) => (
            <SidebarItem
              key={i}
              active={i === selectedIdx}
              onClick={() => setSelectedIdx(i)}>
              📁 {p.name}
            </SidebarItem>
          ))}
        </Sidebar>
        <Content>
          <ProjHeader>
            <ProjName>📁 {proj.name}</ProjName>
            <ProjDesc>{proj.description}</ProjDesc>
          </ProjHeader>

          <SubTitle>🔧 Tech Stack</SubTitle>
          <TagRow>
            {proj.techStack.map(t => <Tag key={t}>{t}</Tag>)}
          </TagRow>

          <SubTitle>✅ Key Features</SubTitle>
          <BulletList>
            {proj.features.map((f, i) => <li key={i}>{f}</li>)}
          </BulletList>

          {'award' in proj && proj.award && (
            <AwardBadge>🏆 {proj.award}</AwardBadge>
          )}

          <br />
          <GitHubLink href={PROFILE.github} target="_blank" rel="noreferrer">
            🐙 View on GitHub
          </GitHubLink>
        </Content>
      </Body>
    </Wrapper>
  );
};
