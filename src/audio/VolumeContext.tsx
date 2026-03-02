import React, { createContext, useContext, useState } from 'react';

interface VolumeContextValue {
  volume: number;          // 0–1
  muted: boolean;
  effectiveVolume: number; // 0 when muted, else volume
  setVolume: (v: number) => void;
  setMuted: (m: boolean) => void;
}

export const VolumeContext = createContext<VolumeContextValue>({
  volume: 0.75,
  muted: false,
  effectiveVolume: 0.75,
  setVolume: () => {},
  setMuted: () => {},
});

export const VolumeProvider: React.FC = ({ children }) => {
  const [volume, setVolume] = useState(0.75);
  const [muted, setMuted]   = useState(false);
  const effectiveVolume = muted ? 0 : volume;

  return (
    <VolumeContext.Provider value={{ volume, muted, effectiveVolume, setVolume, setMuted }}>
      {children}
    </VolumeContext.Provider>
  );
};

export const useVolume = () => useContext(VolumeContext);
