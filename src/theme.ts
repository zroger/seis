const theme = {
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
