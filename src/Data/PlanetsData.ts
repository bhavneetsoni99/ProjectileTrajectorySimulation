export interface Planet {
  planet: string;
  diameter: number; // KM
  density: number; // KG/M3
  g: number; // M/SEC2
  ev: number; // KM/SEC
}

export const PLANETARY_BODIES = [
  {
    planet: 'EARTH',
    diameter: 12756,
    density: 5514,
    g: 9.82,
    ev: 11.2,
  },
  {
    planet: 'MERCURY',
    diameter: 4879,
    density: 5427,
    g: 3.7,
    ev: 4.3,
  },
  {
    planet: 'VENUS',
    diameter: 12104,
    density: 5243,
    g: 8.9,
    ev: 10.4,
  },
  {
    planet: 'MOON',
    diameter: 3475,
    density: 3340,
    g: 1.6,
    ev: 2.4,
  },
  {
    planet: 'MARS',
    diameter: 6792,
    density: 3933,
    g: 3.7,
    ev: 5,
  },
  {
    planet: 'JUPITER',
    diameter: 142984,
    density: 1326,
    g: 23.1,
    ev: 59.5,
  },
  {
    planet: 'SATURN',
    diameter: 120536,
    density: 687,
    g: 9,
    ev: 35.5,
  },
  {
    planet: 'URANUS',
    diameter: 51118,
    density: 1271,
    g: 8.7,
    ev: 21.3,
  },
  {
    planet: 'NEPTUNE',
    diameter: 49528,
    density: 1638,
    g: 11,
    ev: 23.5,
  },
  {
    planet: 'PLUTO',
    diameter: 2370,
    density: 2095,
    g: 0.7,
    ev: 1.3,
  },
];
