export interface Coord {
  x: number,
  y: number,
}

export const Geo: Record<string, Coord> = {
  S00: {x: 180, y: -120},
  S01: {x: 160, y: -140},
  S02: {x: 140, y: -160},
  S03: {x: 120, y: -180},

  S10: {x: 120, y: 180},
  S11: {x: 140, y: 160},
  S12: {x: 160, y: 140},
  S13: {x: 180, y: 120},

  S20: {x: -180, y: 120},
  S21: {x: -160, y: 140},
  S22: {x: -140, y: 160},
  S23: {x: -120, y: 180},

  S30: {x: -120, y: -180},
  S31: {x: -140, y: -160},
  S32: {x: -160, y: -140},
  S33: {x: -180, y: -120},

  C00: {x: 30,  y: -180},
  C01: {x: 30,  y: -150},
  C02: {x: 30,  y: -120},
  C03: {x: 30,  y: -90 },
  C04: {x: 30,  y: -60 },
  C05: {x: 30,  y: -30 },
  C06: {x: 60,  y: -30 },
  C07: {x: 90,  y: -30 },
  C08: {x: 120, y: -30 },
  C09: {x: 150, y: -30 },
  C0A: {x: 180, y: -30 },
  C0B: {x: 180, y: 0   },

  C10: {x: 180, y: 30 },
  C11: {x: 150, y: 30 },
  C12: {x: 120, y: 30 },
  C13: {x: 90,  y: 30 },
  C14: {x: 60,  y: 30 },
  C15: {x: 30,  y: 30 },
  C16: {x: 30,  y: 60 },
  C17: {x: 30,  y: 90 },
  C18: {x: 30,  y: 120},
  C19: {x: 30,  y: 150},
  C1A: {x: 30,  y: 180},
  C1B: {x: 0,   y: 180},

  C20: {x: -30,  y: 180},
  C21: {x: -30,  y: 150},
  C22: {x: -30,  y: 120},
  C23: {x: -30,  y: 90 },
  C24: {x: -30,  y: 60 },
  C25: {x: -30,  y: 30 },
  C26: {x: -60,  y: 30 },
  C27: {x: -90,  y: 30 },
  C28: {x: -120, y: 30 },
  C29: {x: -150, y: 30 },
  C2A: {x: -180, y: 30 },
  C2B: {x: -180, y: 0  },

  C30: {x: -180, y: -30},
  C31: {x: -150, y: -30},
  C32: {x: -120, y: -30},
  C33: {x: -90,  y: -30},
  C34: {x: -60,  y: -30},
  C35: {x: -30,  y: -30},
  C36: {x: -30,  y: -60},
  C37: {x: -30,  y: -90},
  C38: {x: -30,  y: -120},
  C39: {x: -30,  y: -150},
  C3A: {x: -30,  y: -180},
  C3B: {x: 0,    y: -180},

  H00: {x: 0, y: -150},
  H01: {x: 0, y: -120},
  H02: {x: 0, y: -90},
  H03: {x: 0, y: -60},

  H10: {x: 150, y: 0},
  H11: {x: 120, y: 0},
  H12: {x: 90,  y: 0},
  H13: {x: 60,  y: 0},

  H20: {x: 0, y: 150},
  H21: {x: 0, y: 120},
  H22: {x: 0, y: 90 },
  H23: {x: 0, y: 60 },

  H30: {x: -150, y: 0},
  H31: {x: -120, y: 0},
  H32: {x: -90,  y: 0},
  H33: {x: -60,  y: 0},
};

export type GeoPosition = keyof typeof Geo;
