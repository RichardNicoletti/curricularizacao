import { createContext, useContext } from 'react';

const AnimalContext = createContext();

export const useAnimalContext = () => useContext(AnimalContext);

export const AnimalProvider = ({ children }) => {
  const animais = [
    {
      id: 1,
      nome: 'Bartô',
      tipo: 'Cachorro',
      raca: 'Vira-lata',
      idade: '2 anos',
      porte: 'Médio',
      castrado: true,
      vacinado: true,
      descricao: 'Bartô é um cãozinho alegre e carinhoso, adora brincar com outros animais.',
      imagem: 'https://placedog.net/400/597?id=200'
    },
    {
      id: 2,
      nome: 'Luzia',
      tipo: 'Cachorro',
      raca: 'SRD',
      idade: '1 ano',
      porte: 'Pequeno',
      castrado: false,
      vacinado: true,
      descricao: 'Luzia é tranquila, ótima para apartamento e muito dócil.',
      imagem: 'https://placedog.net/400/403?id=83'
    },

    {
      id: 3,
      nome: 'Dino',
      tipo: 'Cachorro',
      raca: 'Dalmata',
      idade: '3 ano',
      porte: 'Médio',
      castrado: false,
      vacinado: true,
      descricao: 'Dino é um cachorro com presença forte, porém com atenção pode ficar dócil.',
      imagem: 'https://placedog.net/400/382?id=123'
    },
    {
      id: 4,
      nome: 'Pintada',
      tipo: 'Cachorro',
      raca: 'SRD',
      idade: '1 ano',
      porte: 'Pequeno',
      castrado: false,
      vacinado: true,
      descricao: 'Pintada é tranquila, ótima para apartamento e muito dócil.',
      imagem: 'https://placedog.net/400/328?id=201'
    },
    {
      id: 5,
      nome: 'Rex',
      tipo: 'Cachorro',
      raca: 'SRD',
      idade: '1 ano',
      porte: 'Pequeno',
      castrado: false,
      vacinado: true,
      descricao: 'Rex é temperamental, ideal estar em lugar amplos com espaço para brincar.',
      imagem: 'https://placedog.net/400/434?id=246'
    },
    {
      id: 6,
      nome: 'Caramelo',
      tipo: 'Cachorro',
      raca: 'Viralata',
      idade: '1 ano',
      porte: 'Pequeno',
      castrado: false,
      vacinado: true,
      descricao: 'Caramelo é um cachorro inteligente, brincalhão e cheio de energia.',
      imagem: 'https://placedog.net/400/380?id=99'
    },
    {
      id: 7,
      nome: 'Betovem',
      tipo: 'Cachorro',
      raca: 'SRD',
      idade: '1 ano',
      porte: 'Pequeno',
      castrado: false,
      vacinado: true,
      descricao: 'Betovem é um cachorro amigável que exige atenção.',
      imagem: 'https://placedog.net/400/241?id=176'
    }
  ];

  return (
    <AnimalContext.Provider value={{ animais }}>
      {children}
    </AnimalContext.Provider>
  );
};

export { AnimalContext };