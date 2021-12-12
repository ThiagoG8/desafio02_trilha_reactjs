import { useEffect, useState } from "react";

import { GenreResponseProps } from './types';

import { Button } from '../components/Button';

import { api } from '../services/api';

interface SideBarProps {
  ClickButton:(id: number) => void;
  selectedGenreId: number;
}

export function SideBar({ClickButton, selectedGenreId}: SideBarProps) {
  // Complete aqui
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  function handleClickButton(id: number) {
    ClickButton(id);
  }

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}