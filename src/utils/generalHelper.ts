export const generateFormatNumber = (number: number = 0) => {
  return number.toLocaleString("en-US", {
    maximumFractionDigits: 5,
  });
};

export const adjustHexOpacity = (hex: string, opacity: string) => {
  if (!hex) return "";
  // Elimina el carácter "#" si está presente
  hex = hex.replace(/^#/, "");

  // Convierte el color hexadecimal en componentes RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Crea una cadena rgba con la opacidad deseada
  const rgbaColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;

  return rgbaColor;
};

export const generateHomeStats = () => {};
