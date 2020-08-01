import 'typeface-anton';

function fontStack(fonts: string[]) {
    return fonts.map(font => (font.includes(' ') ? `"${font}"` : font)).join(', ')
}

const theme = {
  space: [ 0, 4, 8, 16, 32, 64],

  fonts: {
    body: fontStack([
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Helvetica',
      'Arial',
      'sans-serif',
      'Apple Color Emoji',
      'Segoe UI Emoji'
    ]),
    heading: fontStack(['Anton', 'Arial', 'sans-serif']),
    monospace: 'Menlo, monospace',
  },
  fontSizes: [14, 18, 24, 36, 48, 72, 96],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  borderWidths: [0, 1, 2, 4],

  colors: {
  },

  // Theming by seat number.
  seats: [
    // 0 => Red
    {
      paint: "#c62828",
      diceBg: "#c62828",
      diceFg: "#f0f0f0",
    },
    // 1 => Blue
    {
      paint: "#1565c0",
      diceBg: "#1565c0",
      diceFg: "#f0f0f0",
    },
    // 2 => Yellow
    {
      paint: "#ffab00",
      diceBg: "#ffab00",
      diceFg: "#f0f0f0",
    },
    // 3 => Green
    {
      paint: "#388e3c",
      diceBg: "#388e3c",
      diceFg: "#f0f0f0",
    },
  ],
};

export default theme;

export type Theme = typeof theme;
