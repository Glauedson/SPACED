// Centralizador de todas as imagens do projeto

// === ÍCONES ===
import logo1x1 from './icons/logo1x1.png';
import rocketIcon from './icons/rocketicon.svg';
import spaced02 from './icons/SPACED-02.png';

// === IMAGENS - FASES DA LUA ===
import firstQuarter from './images/fases-da-lua/FIRST_QUARTER.png';
import fullMoon from './images/fases-da-lua/FULL.png';
import lastQuarter from './images/fases-da-lua/LAST_QUARTER.png';
import newMoon from './images/fases-da-lua/NEW.png';
import waningCrescent from './images/fases-da-lua/WANING_CRESCENT.png';
import waningGibbous from './images/fases-da-lua/WANING_GIBBOUS.png';
import waxingCrescent from './images/fases-da-lua/WAXING_CRESCENT.png';
import waxingGibbous from './images/fases-da-lua/WAXING_GIBBOUS.png';

// === IMAGENS GERAIS ===
import apodBanner from './images/ApodBanner.jpg';
import mapaDaLua from './images/mapa-da-lua.jpg';
import moonSurfaceAndEarth from './images/Moon_Surface_and_Earth.jpg';
import profile from './images/profile.png';
import spaceStarsBackground from './images/space-stars-background-abstract-stardust-600nw-2318734487.webp';

// Exporta um objeto organizado com todas as imagens
const assets = {
  // Ícones e logos
  icons: {
    logo1x1,
    rocketIcon,
    spaced02,
  },

  // Fases da lua
  moonPhases: {
    firstQuarter,
    full: fullMoon,
    lastQuarter,
    new: newMoon,
    waningCrescent,
    waningGibbous,
    waxingCrescent,
    waxingGibbous,
  },

  // Imagens gerais
  images: {
    apogBanner: apodBanner,
    mapaDaLua,
    profile,
    spaceStarsBackground,
  },

  // Backgrounds específicos
  backgrounds: {
    spaceStars: spaceStarsBackground,
    apogBanner: apodBanner,
    moonSurfaceAndEarth,
  },

  // Logos e marca
  brand: {
    logo: logo1x1,
    rocket: rocketIcon,
    spaced: spaced02,
  },
};

export default assets;

// Exportações nomeadas para facilitar o uso específico
export const { icons, moonPhases, images, backgrounds, brand } = assets;

// Função helper para obter fase da lua por nome
export const getMoonPhase = (phaseName) => {
  const phases = {
    'new': moonPhases.new,
    'waxing_crescent': moonPhases.waxingCrescent,
    'first_quarter': moonPhases.firstQuarter,
    'waxing_gibbous': moonPhases.waxingGibbous,
    'full': moonPhases.full,
    'waning_gibbous': moonPhases.waningGibbous,
    'last_quarter': moonPhases.lastQuarter,
    'waning_crescent': moonPhases.waningCrescent,
  };
  
  return phases[phaseName] || moonPhases.new;
};

// Função helper para obter imagem com fallback
export const getImage = (category, imageName, fallback = images.profile) => {
  try {
    return assets[category]?.[imageName] || fallback;
  } catch (error) {
    console.warn(`Imagem não encontrada: ${category}.${imageName}`);
    return fallback;
  }
};

// Função para pré-carregar imagens críticas
export const preloadImages = (imageList) => {
  imageList.forEach((imageSrc) => {
    const img = new Image();
    img.src = imageSrc;
  });
};

// Lista de imagens críticas para pré-carregamento
export const criticalImages = [
  brand.logo,
  brand.rocket,
  images.profile,
  backgrounds.spaceStars,
  moonPhases.full,
];

// Mapas úteis para iteração
export const moonPhasesList = Object.entries(moonPhases);
export const iconsList = Object.entries(icons);