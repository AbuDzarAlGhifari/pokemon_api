// src/services/colorThiefService.js
import ColorThief from 'colorthief';

const colorThief = new ColorThief();

export const getColorFromImage = (image) => {
  return new Promise((resolve, reject) => {
    if (image.complete && image.naturalHeight !== 0) {
      try {
        const color = colorThief.getColor(image);
        resolve(`rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.9)`);
      } catch (error) {
        reject('Error extracting color: ' + error);
      }
    } else {
      reject('Image not loaded yet.');
    }
  });
};

// Darken color function
export const darkenColor = (color) => {
  if (!color) return 'rgb(128, 128, 128)';
  const rgb = color.match(/\d+/g).map(Number);
  const [r, g, b] = rgb;
  return `rgb(${Math.max(r - 50, 0)}, ${Math.max(g - 50, 0)}, ${Math.max(
    b - 50,
    0
  )})`;
};
