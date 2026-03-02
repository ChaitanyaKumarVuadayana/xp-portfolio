import React from 'react';
import styled, { keyframes } from 'styled-components/macro';
import { PROFILE } from '../../config/profile';

const shimmer = keyframes`
  0% { opacity: 0.7; }
  50% { opacity: 1; }
  100% { opacity: 0.7; }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #ece9d8;
  font-family: Tahoma, sans-serif;
  font-size: 11px;
`;

const Header = styled.div`
  background: linear-gradient(180deg, #7b4f00 0%, #c07800 100%);
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const HeaderIcon = styled.span`
  font-size: 28px;
`;

const HeaderTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 1px 2px #000;
`;

const HeaderSub = styled.div`
  font-size: 10px;
  color: #ffe0a0;
  margin-top: 2px;
`;

const Gallery = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 14px;
  align-content: start;
`;

const Card = styled.div`
  background: #fff;
  border: 1px solid #d4d0c8;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 2px 2px 4px rgba(0,0,0,0.12);
`;

const CardBanner = styled.div<{ color: string }>`
  background: ${p => p.color};
  padding: 14px;
  text-align: center;
  font-size: 36px;
`;

const CardBody = styled.div`
  padding: 10px 12px;
`;

const CardTitle = styled.div`
  font-weight: bold;
  font-size: 12px;
  color: #222;
  margin-bottom: 4px;
`;

const CardSubtitle = styled.div`
  font-size: 10px;
  color: #666;
  font-style: italic;
  margin-bottom: 6px;
`;

const CardDesc = styled.div`
  font-size: 11px;
  color: #444;
  line-height: 1.4;
`;

const CardYear = styled.div`
  font-size: 10px;
  color: #999;
  margin-top: 6px;
  text-align: right;
`;

const iconMap: Record<string, string> = {
  trophy: '🏆',
  medal: '🥇',
  star: '⭐',
};

const colorMap: Record<string, string> = {
  trophy: 'linear-gradient(135deg, #ffd700, #ff8c00)',
  medal: 'linear-gradient(135deg, #c0c0c0, #a0a0a0)',
  star: 'linear-gradient(135deg, #1a5ab7, #0a246a)',
};

export const AchievementsWindow: React.FC = () => (
  <Wrapper>
    <Header>
      <HeaderIcon>🖼️</HeaderIcon>
      <div>
        <HeaderTitle>Achievements &amp; Certifications</HeaderTitle>
        <HeaderSub>Awards, recognitions and production deployments</HeaderSub>
      </div>
    </Header>
    <Gallery>
      {PROFILE.achievements.map((ach, i) => (
        <Card key={i}>
          <CardBanner color={colorMap[ach.icon] ?? '#ddd'}>
            {iconMap[ach.icon] ?? '🎖️'}
          </CardBanner>
          <CardBody>
            <CardTitle>{ach.title}</CardTitle>
            <CardSubtitle>{ach.subtitle}</CardSubtitle>
            <CardDesc>{ach.description}</CardDesc>
            <CardYear>{ach.year}</CardYear>
          </CardBody>
        </Card>
      ))}
    </Gallery>
  </Wrapper>
);
