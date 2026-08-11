import { create } from 'zustand';
import { Dinosaur, GeneticTrait } from '../types';
import { baseDinosaurs } from '../data/baseDinosaurs';

interface DinosaurStore {
  dinosaurs: Dinosaur[];
  selectedDinosaur: Dinosaur | null;
  addDinosaur: (dinosaur: Omit<Dinosaur, 'id' | 'dateCreated'>) => void;
  updateDinosaur: (id: string, updates: Partial<Dinosaur>) => void;
  deleteDinosaur: (id: string) => void;
  selectDinosaur: (id: string | null) => void;
  breedDinosaurs: (parent1Id: string, parent2Id: string, name: string) => void;
  progressIncubation: (id: string, amount: number) => void;
  getDinosaur: (id: string) => Dinosaur | undefined;
  getBaseDinosaurs: () => Omit<Dinosaur, 'id' | 'dateCreated'>[];
  createFromBase: (baseDino: Omit<Dinosaur, 'id' | 'dateCreated'>, name: string) => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

const averageGenes = (genes1: GeneticTrait, genes2: GeneticTrait): GeneticTrait => {
  return {
    size: Math.round((genes1.size + genes2.size) / 2 + (Math.random() - 0.5) * 2),
    speed: Math.round((genes1.speed + genes2.speed) / 2 + (Math.random() - 0.5) * 2),
    intelligence: Math.round((genes1.intelligence + genes2.intelligence) / 2 + (Math.random() - 0.5) * 2),
    aggression: Math.round((genes1.aggression + genes2.aggression) / 2 + (Math.random() - 0.5) * 2),
    vision: Math.round((genes1.vision + genes2.vision) / 2 + (Math.random() - 0.5) * 2),
    strength: Math.round((genes1.strength + genes2.strength) / 2 + (Math.random() - 0.5) * 2),
  };
};

const clampGenes = (genes: GeneticTrait): GeneticTrait => ({
  size: Math.max(1, Math.min(10, genes.size)),
  speed: Math.max(1, Math.min(10, genes.speed)),
  intelligence: Math.max(1, Math.min(10, genes.intelligence)),
  aggression: Math.max(1, Math.min(10, genes.aggression)),
  vision: Math.max(1, Math.min(10, genes.vision)),
  strength: Math.max(1, Math.min(10, genes.strength)),
});

export const useDinosaurStore = create<DinosaurStore>((set, get) => ({
  dinosaurs: [],
  selectedDinosaur: null,

  addDinosaur: (dinosaur) =>
    set((state) => ({
      dinosaurs: [
        ...state.dinosaurs,
        {
          ...dinosaur,
          id: generateId(),
          dateCreated: new Date(),
        },
      ],
    })),

  updateDinosaur: (id, updates) =>
    set((state) => ({
      dinosaurs: state.dinosaurs.map((d) => (d.id === id ? { ...d, ...updates } : d)),
      selectedDinosaur:
        state.selectedDinosaur?.id === id
          ? { ...state.selectedDinosaur, ...updates }
          : state.selectedDinosaur,
    })),

  deleteDinosaur: (id) =>
    set((state) => ({
      dinosaurs: state.dinosaurs.filter((d) => d.id !== id),
      selectedDinosaur: state.selectedDinosaur?.id === id ? null : state.selectedDinosaur,
    })),

  selectDinosaur: (id) =>
    set((state) => ({
      selectedDinosaur: id ? state.dinosaurs.find((d) => d.id === id) || null : null,
    })),

  breedDinosaurs: (parent1Id, parent2Id, name) => {
    const state = get();
    const parent1 = state.dinosaurs.find((d) => d.id === parent1Id);
    const parent2 = state.dinosaurs.find((d) => d.id === parent2Id);

    if (!parent1 || !parent2) return;

    const newGenes = clampGenes(averageGenes(parent1.genes, parent2.genes));
    const newDino: Omit<Dinosaur, 'id' | 'dateCreated'> = {
      name,
      species: `${parent1.species} × ${parent2.species}`,
      genes: newGenes,
      dnaSequence: parent1.dnaSequence.slice(0, 50) + parent2.dnaSequence.slice(0, 50),
      incubationProgress: 0,
      status: 'egg',
      parentIds: [parent1Id, parent2Id],
      notes: `Hybrid offspring of ${parent1.name} and ${parent2.name}`,
    };

    state.addDinosaur(newDino);
  },

  progressIncubation: (id, amount) =>
    set((state) => {
      const dinosaur = state.dinosaurs.find((d) => d.id === id);
      if (!dinosaur) return state;

      const newProgress = Math.min(100, dinosaur.incubationProgress + amount);
      const newStatus = newProgress === 100 ? 'hatching' : dinosaur.status;

      return {
        dinosaurs: state.dinosaurs.map((d) =>
          d.id === id
            ? { ...d, incubationProgress: newProgress, status: newStatus }
            : d
        ),
      };
    }),

  getDinosaur: (id) => get().dinosaurs.find((d) => d.id === id),

  getBaseDinosaurs: () => baseDinosaurs,

  createFromBase: (baseDino, name) => {
    const dino: Omit<Dinosaur, 'id' | 'dateCreated'> = {
      ...baseDino,
      name,
    };
    get().addDinosaur(dino);
  },
}));