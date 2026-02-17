export function getDeterministicRandom(seed: string | number, min: number, max: number): number {
  const strSeed = String(seed);
  let hash = 0;
  for (let i = 0; i < strSeed.length; i++) {
    const char = strSeed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  const range = max - min + 1;
  const randomValue = Math.abs(hash) % range;
  return min + randomValue;
}
