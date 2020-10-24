import React from 'react';
import { useContext, createContext, useState } from 'react';
import { LatLng } from 'react-native-maps';

const OrphanageDataContext = createContext({});

export const OrphanageDataProvider: React.FC = (props) => {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [position, setPosition] = useState<LatLng>({
    latitude: 0,
    longitude: 0,
  });
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState([] as any);

  return (
    <OrphanageDataContext.Provider
      value={{
        name,
        setName,
        position,
        setPosition,
        about,
        setAbout,
        instructions,
        setInstructions,
        opening_hours,
        setOpeningHours,
        open_on_weekends,
        setOpenOnWeekends,
        images,
        setImages,
      }}
    >
      {props.children}
    </OrphanageDataContext.Provider>
  );
};

export const useOrphanageData = () => {
  const {
    name,
    setName,
    position,
    setPosition,
    about,
    setAbout,
    instructions,
    setInstructions,
    opening_hours,
    setOpeningHours,
    open_on_weekends,
    setOpenOnWeekends,
    images,
    setImages,
  } = useContext(OrphanageDataContext) as any;
  return {
    name,
    setName,
    position,
    setPosition,
    about,
    setAbout,
    instructions,
    setInstructions,
    opening_hours,
    setOpeningHours,
    open_on_weekends,
    setOpenOnWeekends,
    images,
    setImages,
  };
};
