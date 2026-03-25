import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { PROFILE } from '../../config/profile';

// ── Formspree form ID – replace with your own at https://formspree.io
const FORMSPREE_ID = 'YOUR_FORM_ID';

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

const HeaderTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 1px 2px #000;
`;

const HeaderSub = styled.div`
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
  padding: 12px;
`;

const SidebarTitle = styled.div`
  font-weight: bold;
  color: #0a246a;
  font-size: 11px;
  border-bottom: 1px solid #d4d0c8;
  padding-bottom: 4px;
  margin-bottom: 8px;
`;

const ContactInfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  margin-bottom: 10px;
`;

const ContactLabel = styled.span`
  font-size: 9px;
  text-transform: uppercase;
  color: #888;
  letter-spacing: 0.5px;
`;

const ContactValue = styled.a`
  font-size: 11px;
  color: #0000ee;
  text-decoration: none;
  word-break: break-all;
  &:hover { text-decoration: underline; }
`;

const ContactValueText = styled.span`
  font-size: 11px;
  color: #333;
`;

const FormArea = styled.div`
  flex: 1;
  padding: 14px 16px;
  overflow-y: auto;
`;

const FormTitle = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: #0a246a;
  border-bottom: 1px solid #d4d0c8;
  margin-bottom: 10px;
  padding-bottom: 4px;
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin-bottom: 10px;
`;

const FormLabel = styled.label`
  font-weight: bold;
  color: #333;
`;

const FormInput = styled.input`
  padding: 4px 6px;
  border: 1px solid #aaa;
  border-radius: 2px;
  font-family: Tahoma, sans-serif;
  font-size: 11px;
  background: #fff;
  &:focus { outline: 1px solid #0a246a; }
`;

const FormTextarea = styled.textarea`
  padding: 4px 6px;
  border: 1px solid #aaa;
  border-radius: 2px;
  font-family: Tahoma, sans-serif;
  font-size: 11px;
  background: #fff;
  resize: vertical;
  min-height: 80px;
  &:focus { outline: 1px solid #0a246a; }
`;

const SendBtn = styled.button`
  padding: 4px 18px;
  font-family: Tahoma, sans-serif;
  font-size: 11px;
  cursor: pointer;
  border: 1px solid #707070;
  border-radius: 3px;
  background: linear-gradient(180deg, #f5f4ef 0%, #e1e0d9 100%);
  &:hover { background: linear-gradient(180deg, #e8e7e0 0%, #d8d7d0 100%); }
  &:active { background: linear-gradient(180deg, #dedad2 0%, #e8e7e0 100%); }
`;

const StatusMsg = styled.div<{ ok?: boolean }>`
  padding: 6px 10px;
  border-radius: 3px;
  background: ${p => (p.ok ? '#d4edda' : '#f8d7da')};
  border: 1px solid ${p => (p.ok ? '#c3e6cb' : '#f5c6cb')};
  color: ${p => (p.ok ? '#155724' : '#721c24')};
  margin-top: 8px;
  font-size: 11px;
`;

export const ContactWindow: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      setStatus(res.ok ? 'ok' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <Wrapper>
      <Header>
        <HeaderIcon>📬</HeaderIcon>
        <div>
          <HeaderTitle>Outlook Express</HeaderTitle>
          <HeaderSub>Send a message to {PROFILE.shortName}</HeaderSub>
        </div>
      </Header>
      <Body>
        <Sidebar>
          <SidebarTitle>Contact Info</SidebarTitle>
          <ContactInfoItem>
            <ContactLabel>📞 Phone</ContactLabel>
            <ContactValueText>{PROFILE.phone}</ContactValueText>
          </ContactInfoItem>
          <ContactInfoItem>
            <ContactLabel>📧 Email</ContactLabel>
            <ContactValue href={`mailto:${PROFILE.email}`}>{PROFILE.email}</ContactValue>
          </ContactInfoItem>
          <ContactInfoItem>
            <ContactLabel>🔗 GitHub</ContactLabel>
            <ContactValue href={PROFILE.github} target="_blank" rel="noreferrer">
              GitHub Profile
            </ContactValue>
          </ContactInfoItem>
          <ContactInfoItem>
            <ContactLabel>💼 LinkedIn</ContactLabel>
            <ContactValue href={PROFILE.linkedin} target="_blank" rel="noreferrer">
              LinkedIn Profile
            </ContactValue>
          </ContactInfoItem>
        </Sidebar>
        <FormArea>
          <FormTitle>✉️ New Message</FormTitle>
          <form onSubmit={handleSubmit}>
            <FormRow>
              <FormLabel htmlFor="contact-name">Your Name</FormLabel>
              <FormInput
                id="contact-name"
                type="text"
                required
                placeholder="John Doe"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </FormRow>
            <FormRow>
              <FormLabel htmlFor="contact-email">Your Email</FormLabel>
              <FormInput
                id="contact-email"
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </FormRow>
            <FormRow>
              <FormLabel htmlFor="contact-message">Message</FormLabel>
              <FormTextarea
                id="contact-message"
                required
                placeholder="Write your message here..."
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
            </FormRow>
            <SendBtn type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : '📤 Send Message'}
            </SendBtn>
            {status === 'ok' && (
              <StatusMsg ok>✅ Message sent! I'll get back to you soon.</StatusMsg>
            )}
            {status === 'error' && (
              <StatusMsg>
                ❌ Failed to send. Set up Formspree ID in ContactWindow.tsx or email directly at{' '}
                <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>.
              </StatusMsg>
            )}
          </form>
        </FormArea>
      </Body>
    </Wrapper>
  );
};
