export interface GeneticTrait {
  size: number; // 1-10
  speed: number; // 1-10
  intelligence: number; // 1-10
  aggression: number; // 1-10
  vision: number; // 1-10
  strength: number; // 1-10
}

export interface Dinosaur {
  id: string;
  name: string;
  species: string;
  genes: GeneticTrait;
  dnaSequence: string;
  incubationProgress: number; // 0-100
  status: 'egg' | 'hatching' | 'alive' | 'adult';
  dateCreated: Date;
  parentIds?: string[];
  notes: string;
  image?: string;
}

export interface BreedingPair {
  parent1Id: string;
  parent2Id: string;
  expectedTraits: GeneticTrait;
}

export interface ResearchUnlock {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  requirement: number; // number of dinosaurs created
}