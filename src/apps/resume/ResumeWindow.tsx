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

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  background: #ece9d8;
  border-bottom: 1px solid #aca899;
`;

const ToolbarBtn = styled.a`
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
  &:hover { background: linear-gradient(180deg, #e8e7e0 0%, #d8d7d0 100%); }
  &:active { background: linear-gradient(180deg, #dedad2 0%, #e8e7e0 100%); }
`;

const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  background: #fff;
  border: 1px solid #d4d0c8;
  margin: 8px;
  padding: 20px 28px;
  box-shadow: inset 0 0 3px rgba(0,0,0,0.1);
`;

const ResumeHeader = styled.div`
  text-align: center;
  border-bottom: 2px solid #0a246a;
  padding-bottom: 12px;
  margin-bottom: 14px;
`;

const ResumeName = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #0a246a;
  letter-spacing: 1px;
`;

const ResumeRole = styled.div`
  font-size: 12px;
  color: #555;
  margin-top: 4px;
`;

const ContactLine = styled.div`
  font-size: 10px;
  color: #777;
  margin-top: 6px;
`;

const Section = styled.div`
  margin-bottom: 14px;
`;

const SectionTitle = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: #0a246a;
  border-bottom: 1px solid #0a246a;
  margin-bottom: 6px;
  padding-bottom: 2px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ExpEntry = styled.div`
  margin-bottom: 10px;
`;

const ExpHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
`;

const ExpOrg = styled.div`
  font-size: 10px;
  color: #555;
  margin-bottom: 4px;
`;

const BulletList = styled.ul`
  margin: 2px 0 0 16px;
  padding: 0;
  li { margin-bottom: 2px; line-height: 1.4; }
`;

const ProjectEntry = styled.div`
  margin-bottom: 8px;
`;

const ProjectName = styled.span`
  font-weight: bold;
`;

const SkillRow = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 4px;
  flex-wrap: wrap;
`;

const SkillLabel = styled.span`
  font-weight: bold;
  min-width: 100px;
  flex-shrink: 0;
`;

const SkillValue = styled.span`
  color: #333;
`;

const AchievementItem = styled.div`
  margin-bottom: 4px;
`;

export const ResumeWindow: React.FC = () => (
  <Wrapper>
    <Toolbar>
      <ToolbarBtn href="/resume.pdf" download>
        💾 Download PDF
      </ToolbarBtn>
      
    </Toolbar>
    <ScrollArea>
      <ResumeHeader>
        <ResumeName>{PROFILE.name.toUpperCase()}</ResumeName>
        <ResumeRole>{PROFILE.role} · {PROFILE.tagline}</ResumeRole>
        <ContactLine>
          {PROFILE.location} · {PROFILE.phone} · {PROFILE.email}
        </ContactLine>
        <ContactLine>
          {PROFILE.github} · {PROFILE.linkedin}
        </ContactLine>
      </ResumeHeader>

      <Section>
        <SectionTitle>Professional Summary</SectionTitle>
        <div style={{ lineHeight: 1.5 }}>{PROFILE.summary}</div>
      </Section>

      <Section>
        <SectionTitle>Experience</SectionTitle>
        {PROFILE.experience.map((exp, i) => (
          <ExpEntry key={i}>
            <ExpHeader>
              <span>{exp.role}</span>
              <span style={{ fontWeight: 'normal', fontSize: 10 }}>{exp.period}</span>
            </ExpHeader>
            <ExpOrg>{exp.company} · {exp.location}</ExpOrg>
            {exp.projects.map((proj, j) => (
              <div key={j} style={{ marginBottom: 6 }}>
                <div style={{ fontStyle: 'italic', marginBottom: 2 }}>{proj.name}:</div>
                <BulletList>
                  {proj.bullets.map((b, k) => <li key={k}>{b}</li>)}
                </BulletList>
              </div>
            ))}
          </ExpEntry>
        ))}
      </Section>

      <Section>
        <SectionTitle>Technical Skills</SectionTitle>
        {(Object.entries(PROFILE.skills) as [string, readonly string[]][]).map(
          ([cat, skills]) => (
            <SkillRow key={cat}>
              <SkillLabel>{cat}:</SkillLabel>
              <SkillValue>{skills.join(', ')}</SkillValue>
            </SkillRow>
          )
        )}
      </Section>

      <Section>
        <SectionTitle>Projects</SectionTitle>
        {PROFILE.projects.map((proj, i) => (
          <ProjectEntry key={i}>
            <ProjectName>{proj.name}</ProjectName>: {proj.description}
            <div style={{ fontSize: 10, color: '#555', marginTop: 2 }}>
              Stack: {proj.techStack.join(', ')}
            </div>
          </ProjectEntry>
        ))}
      </Section>

      <Section>
        <SectionTitle>Achievements</SectionTitle>
        {PROFILE.achievements.map((ach, i) => (
          <AchievementItem key={i}>
            <strong>{ach.title}</strong>, {ach.subtitle} ({ach.year})
          </AchievementItem>
        ))}
      </Section>
    </ScrollArea>
  </Wrapper>
);
