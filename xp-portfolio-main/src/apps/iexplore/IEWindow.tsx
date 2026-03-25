import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { PROFILE } from '../../config/profile';

const PREVIEW_MAP: Array<{ match: string; preview: string }> = [
  { match: 'github.com',   preview: '/ex/github.png'   },
  { match: 'linkedin.com', preview: '/ex/linkedin.png' },
];
function getPreview(url: string): string | null {
  return PREVIEW_MAP.find(p => url.includes(p.match))?.preview ?? null;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #ece9d8;
  font-family: Tahoma, sans-serif;
  font-size: 11px;
`;

const IEBar = styled.div`
  background: linear-gradient(180deg, #d4d0c8 0%, #bbb8ae 100%);
  padding: 4px 8px;
  display: flex;
  align-items: center;
  gap: 6px;
  border-bottom: 1px solid #aca899;
`;

const IELogo = styled.span`
  font-size: 20px;
`;

const IETitle = styled.span`
  font-size: 12px;
  color: #333;
  font-weight: bold;
`;

const AddressBar = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  background: #ece9d8;
  padding: 3px 8px;
  border-bottom: 1px solid #aca899;
  font-size: 11px;
`;

const AddressInput = styled.input`
  flex: 1;
  padding: 2px 6px;
  border: 1px solid #aaa;
  border-radius: 2px;
  font-family: Tahoma, sans-serif;
  font-size: 11px;
  background: #fff;
`;

const GoBtn = styled.button`
  padding: 2px 10px;
  font-family: Tahoma, sans-serif;
  font-size: 11px;
  cursor: pointer;
  border: 1px solid #707070;
  border-radius: 2px;
  background: linear-gradient(180deg, #f5f4ef 0%, #e1e0d9 100%);
  &:hover { background: linear-gradient(180deg, #fff 0%, #eee 100%); }
  &:active { background: #d0cfc8; }
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: #fff;
`;

const HomeHeader = styled.div`
  text-align: center;
  margin-bottom: 24px;
`;

const HomeTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #0a246a;
`;

const HomeSub = styled.div`
  font-size: 12px;
  color: #666;
  margin-top: 6px;
`;

const LinksGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  max-width: 480px;
  margin: 0 auto;
`;

const LinkCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: #f5f7ff;
  border: 1px solid #c8d4f0;
  border-radius: 6px;
  text-decoration: none;
  color: #333;
  transition: background 0.15s;
  cursor: pointer;
  &:hover {
    background: #dde8ff;
    border-color: #0a246a;
  }
`;

const LinkIcon = styled.div`
  font-size: 40px;
  margin-bottom: 10px;
`;

const LinkTitle = styled.div`
  font-size: 13px;
  font-weight: bold;
  color: #0a246a;
  margin-bottom: 4px;
`;

const LinkUrl = styled.div`
  font-size: 9px;
  color: #888;
  word-break: break-all;
  text-align: center;
`;

const FavoritesSection = styled.div`
  max-width: 480px;
  margin: 24px auto 0;
`;

const FavTitle = styled.div`
  font-weight: bold;
  color: #0a246a;
  border-bottom: 1px solid #0a246a;
  padding-bottom: 4px;
  margin-bottom: 8px;
`;

const FavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 6px;
  color: #0000ee;
  text-decoration: none;
  border-radius: 2px;
  font-size: 11px;
  cursor: pointer;
  &:hover { background: #e8ecff; text-decoration: underline; }
`;

const StatusBar = styled.div`
  background: #ece9d8;
  border-top: 1px solid #aca899;
  padding: 2px 8px;
  font-size: 10px;
  color: #555;
`;

const PreviewWrap = styled.div`
  flex: 1;
  overflow-y: auto;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PreviewImg = styled.img`
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
`;

const OpenLiveBtn = styled.button`
  margin: 16px auto;
  padding: 6px 20px;
  font-family: Tahoma, sans-serif;
  font-size: 11px;
  cursor: pointer;
  border: 1px solid #707070;
  border-radius: 2px;
  background: linear-gradient(180deg, #f5f4ef 0%, #e1e0d9 100%);
  &:hover { background: linear-gradient(180deg, #fff 0%, #eee 100%); }
  &:active { background: #d0cfc8; }
`;

const IFrameEl = styled.iframe`
  flex: 1;
  width: 100%;
  border: none;
`;

export const IEWindow: React.FC = () => {
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const [addressVal, setAddressVal] = useState(`about:${PROFILE.name}`);

  const navigate = (url: string) => { setCurrentUrl(url); setAddressVal(url); };
  const goHome   = () => { setCurrentUrl(null); setAddressVal(`about:${PROFILE.name}`); };

  const handleGo = () => {
    const val = addressVal.trim();
    if (!val || val.startsWith('about:')) { goHome(); return; }
    navigate(val.startsWith('http') ? val : `https://${val}`);
  };

  const preview = currentUrl ? getPreview(currentUrl) : null;

  const renderContent = () => {
    if (!currentUrl) return (
      <Content>
        <HomeHeader>
          <HomeTitle>🌐 {PROFILE.name}</HomeTitle>
          <HomeSub>Click a link to open it in Internet Explorer</HomeSub>
        </HomeHeader>
        <LinksGrid>
          <LinkCard onClick={() => navigate(PROFILE.github)}>
            <LinkIcon>🐙</LinkIcon>
            <LinkTitle>GitHub</LinkTitle>
            <LinkUrl>{PROFILE.github}</LinkUrl>
          </LinkCard>
          <LinkCard onClick={() => navigate(PROFILE.linkedin)}>
            <LinkIcon>💼</LinkIcon>
            <LinkTitle>LinkedIn</LinkTitle>
            <LinkUrl>{PROFILE.linkedin}</LinkUrl>
          </LinkCard>
        </LinksGrid>
        <FavoritesSection>
          <FavTitle>⭐ Favorites</FavTitle>
          <FavItem onClick={() => navigate(PROFILE.github)}>🐙 GitHub</FavItem>
          <FavItem onClick={() => navigate(PROFILE.linkedin)}>💼 LinkedIn</FavItem>
          <FavItem onClick={() => window.open(`mailto:${PROFILE.email}`, '_blank')}>📧 Email</FavItem>
        </FavoritesSection>
      </Content>
    );

    if (preview) return (
      <PreviewWrap>
        <PreviewImg
          src={preview}
          alt={currentUrl}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        <OpenLiveBtn onClick={() => window.open(currentUrl!, '_blank')}>
          🔗 Open Live Website
        </OpenLiveBtn>
      </PreviewWrap>
    );

    return <IFrameEl src={currentUrl} title={currentUrl} sandbox="allow-scripts allow-same-origin allow-forms" />;
  };

  return (
    <Wrapper>
      <IEBar>
        <IELogo>🌐</IELogo>
        <IETitle>Internet Explorer</IETitle>
        <GoBtn onClick={goHome} style={{ marginLeft: 4 }}>Home</GoBtn>
      </IEBar>
      <AddressBar>
        <span style={{ color: '#666' }}>Address:</span>
        <AddressInput
          value={addressVal}
          onChange={e => setAddressVal(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleGo(); }}
        />
        <GoBtn onClick={handleGo}>Go</GoBtn>
      </AddressBar>
      {renderContent()}
      <StatusBar>Done</StatusBar>
    </Wrapper>
  );
};
