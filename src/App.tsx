import React, { useEffect } from 'react';
import { Header } from './components/Header';
import { LabPage } from './pages/LabPage';
import { useDinosaurStore } from './store/dinosaurStore';

function App() {
  const dinosaurs = useDinosaurStore((state) => state.dinosaurs);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('dinosaurs', JSON.stringify(dinosaurs));
  }, [dinosaurs]);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('dinosaurs');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        data.forEach((dino: any) => {
          useDinosaurStore.setState((state) => ({
            dinosaurs: [...state.dinosaurs, dino],
          }));
        });
      } catch (e) {
        console.error('Failed to load saved dinosaurs');
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      <LabPage />
    </div>
  );
}

export default App;