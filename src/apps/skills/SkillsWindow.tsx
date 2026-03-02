import React from 'react';
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

const Header = styled.div`
  background: linear-gradient(180deg, #0a246a 0%, #26599b 100%);
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const HeaderIcon = styled.span`
  font-size: 28px;
`;

const HeaderText = styled.div`
  color: #fff;
`;

const HeaderTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  text-shadow: 0 1px 2px #000;
`;

const HeaderSub = styled.div`
  font-size: 10px;
  color: #aecaff;
  margin-top: 2px;
`;

const Grid = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 14px 16px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
  align-content: start;
`;

const CategoryCard = styled.div`
  background: #fff;
  border: 1px solid #d4d0c8;
  border-radius: 3px;
  padding: 10px 12px;
  box-shadow: 1px 1px 2px rgba(0,0,0,0.1);
`;

const CardTitle = styled.div`
  font-weight: bold;
  color: #0a246a;
  font-size: 11px;
  border-bottom: 1px solid #d4d0c8;
  padding-bottom: 5px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

const Tag = styled.span`
  background: #ddeeff;
  border: 1px solid #99bbdd;
  border-radius: 2px;
  padding: 1px 6px;
  font-size: 10px;
  color: #003366;
  white-space: nowrap;
`;

const categoryIcons: Record<string, string> = {
  Programming: '⌨️',
  Backend: '🔧',
  Database: '🗄️',
  Concepts: '💡',
  Security: '🔒',
  Tools: '🛠️',
};

export const SkillsWindow: React.FC = () => (
  <Wrapper>
    <Header>
      <HeaderIcon>⚙️</HeaderIcon>
      <HeaderText>
        <HeaderTitle>Technical Skills</HeaderTitle>
        <HeaderSub>Manage and view installed capabilities</HeaderSub>
      </HeaderText>
    </Header>
    <Grid>
      {(Object.entries(PROFILE.skills) as [string, readonly string[]][]).map(
        ([category, skills]) => (
          <CategoryCard key={category}>
            <CardTitle>
              <span>{categoryIcons[category] ?? '📂'}</span>
              {category}
            </CardTitle>
            <TagRow>
              {skills.map(skill => (
                <Tag key={skill}>{skill}</Tag>
              ))}
            </TagRow>
          </CategoryCard>
        )
      )}
    </Grid>
  </Wrapper>
);
