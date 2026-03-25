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

const TwoPanel = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const LeftPanel = styled.div`
  width: 130px;
  min-width: 130px;
  background: linear-gradient(180deg, #0a246a 0%, #26599b 45%, #1b4887 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 18px 10px;
  gap: 12px;
`;

const SystemIcon = styled.div`
  width: 64px;
  height: 64px;
  background: url('/icons/computer.png') center / contain no-repeat;
  /* Fallback: CSS monitor drawing */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 42px;
`;

const SystemLabel = styled.div`
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  text-shadow: 0 1px 2px #000;
`;

const RightPanel = styled.div`
  flex: 1;
  padding: 14px 16px;
  overflow-y: auto;
  background: #ece9d8;
`;

const SectionTitle = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: #0a246a;
  border-bottom: 1px solid #0a246a;
  margin-bottom: 10px;
  padding-bottom: 2px;
`;

const Row = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 6px;
  align-items: flex-start;
  line-height: 1.4;
`;

const RowLabel = styled.span`
  font-weight: bold;
  color: #333;
  min-width: 110px;
  flex-shrink: 0;
`;

const RowValue = styled.span`
  color: #111;
`;

const BulletList = styled.ul`
  margin: 4px 0 10px 16px;
  padding: 0;
  list-style: disc;
  li {
    margin-bottom: 3px;
    line-height: 1.4;
  }
`;

const SummaryBox = styled.div`
  background: #fff;
  border: 1px solid #aaa;
  border-radius: 2px;
  padding: 8px 10px;
  margin-top: 8px;
  line-height: 1.5;
  color: #222;
  font-size: 11px;
`;

const Footer = styled.div`
  border-top: 1px solid #aca899;
  padding: 8px 12px;
  display: flex;
  justify-content: flex-end;
  gap: 6px;
  background: #ece9d8;
`;

const XPButton = styled.button`
  padding: 3px 14px;
  font-family: Tahoma, sans-serif;
  font-size: 11px;
  cursor: pointer;
  border: 1px solid #707070;
  border-radius: 3px;
  background: linear-gradient(180deg, #f5f4ef 0%, #e1e0d9 100%);
  &:active { background: linear-gradient(180deg, #dedad2 0%, #e8e7e0 100%); }
`;

export const AboutWindow: React.FC = () => (
  <Wrapper>
    <TwoPanel>
      <LeftPanel>
        <SystemIcon>🖥️</SystemIcon>
        <SystemLabel>My Computer</SystemLabel>
        <div style={{ color: '#aecaff', fontSize: 10, textAlign: 'center', marginTop: 8 }}>
          System Properties
        </div>
      </LeftPanel>
      <RightPanel>
        <SectionTitle>System Information</SectionTitle>

        <Row><RowLabel>User:</RowLabel>      <RowValue>{PROFILE.name}</RowValue></Row>
        <Row><RowLabel>Role:</RowLabel>      <RowValue>{PROFILE.role}</RowValue></Row>
        <Row><RowLabel>Tagline:</RowLabel>   <RowValue>{PROFILE.tagline}</RowValue></Row>
        <Row><RowLabel>Location:</RowLabel>  <RowValue>{PROFILE.location}</RowValue></Row>
        <Row>
          <RowLabel>Organization:</RowLabel>
          <RowValue>C-DAC (Centre for Development of Advanced Computing), Noida</RowValue>
        </Row>
        <Row><RowLabel>Experience:</RowLabel><RowValue>Government Backend Systems Engineer</RowValue></Row>

        <SectionTitle style={{ marginTop: 14 }}>Specialization</SectionTitle>
        <BulletList>
          <li>Backend Engineering</li>
          <li>REST API Development</li>
          <li>High Availability Systems (99.95% uptime)</li>
          <li>Database Optimization (217× latency reduction)</li>
          <li>Secure Access Systems &amp; Government Security</li>
        </BulletList>

        <SectionTitle>Professional Summary</SectionTitle>
        <SummaryBox>{PROFILE.summary}</SummaryBox>

        <SectionTitle style={{ marginTop: 14 }}>Contact</SectionTitle>
        <Row><RowLabel>📞 Phone:</RowLabel>  <RowValue>{PROFILE.phone}</RowValue></Row>
        <Row>
          <RowLabel>📧 Email:</RowLabel>
          <RowValue>
            <a href={`mailto:${PROFILE.email}`} style={{ color: '#0000ee' }}>
              {PROFILE.email}
            </a>
          </RowValue>
        </Row>
        <Row>
          <RowLabel>🔗 GitHub:</RowLabel>
          <RowValue>
            <a href={PROFILE.github} target="_blank" rel="noreferrer" style={{ color: '#0000ee' }}>
              {PROFILE.github}
            </a>
          </RowValue>
        </Row>
        <Row>
          <RowLabel>💼 LinkedIn:</RowLabel>
          <RowValue>
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" style={{ color: '#0000ee' }}>
              {PROFILE.linkedin}
            </a>
          </RowValue>
        </Row>
      </RightPanel>
    </TwoPanel>
    <Footer>
      <XPButton>OK</XPButton>
      <XPButton>Apply</XPButton>
    </Footer>
  </Wrapper>
);
