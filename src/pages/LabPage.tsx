import React, { useState } from 'react';
import { useDinosaurStore } from '../store/dinosaurStore';
import { DinosaurCard } from '../components/DinosaurCard';
import { GeneSequencer } from '../components/GeneSequencer';
import { Plus, Beaker } from 'lucide-react';

export const LabPage: React.FC = () => {
  const {
    dinosaurs,
    selectedDinosaur,
    addDinosaur,
    updateDinosaur,
    deleteDinosaur,
    selectDinosaur,
    getBaseDinosaurs,
    createFromBase,
  } = useDinosaurStore();

  const [showBaseDinos, setShowBaseDinos] = useState(false);
  const [newDinoName, setNewDinoName] = useState('');

  const handleCreateFromBase = (baseDino: any, name: string) => {
    createFromBase(baseDino, name || baseDino.name);
    setNewDinoName('');
    setShowBaseDinos(false);
  };

  const handleProgressIncubation = () => {
    if (selectedDinosaur) {
      updateDinosaur(selectedDinosaur.id, {
        incubationProgress: Math.min(100, selectedDinosaur.incubationProgress + 20),
        status: selectedDinosaur.incubationProgress + 20 >= 100 ? 'hatching' : 'egg',
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-900 border-2 border-green-400 p-4 rounded-lg">
          <p className="text-green-400 text-sm font-mono">TOTAL SPECIMENS</p>
          <p className="text-white text-3xl font-bold font-mono">{dinosaurs.length}</p>
        </div>
        <div className="bg-gray-900 border-2 border-blue-400 p-4 rounded-lg">
          <p className="text-blue-400 text-sm font-mono">EGGS INCUBATING</p>
          <p className="text-white text-3xl font-bold font-mono">
            {dinosaurs.filter((d) => d.status === 'egg').length}
          </p>
        </div>
        <div className="bg-gray-900 border-2 border-yellow-400 p-4 rounded-lg">
          <p className="text-yellow-400 text-sm font-mono">ALIVE</p>
          <p className="text-white text-3xl font-bold font-mono">
            {dinosaurs.filter((d) => d.status === 'alive' || d.status === 'adult').length}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Collection */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-green-400 font-mono flex items-center gap-2">
              <Beaker size={24} />
              Specimen Collection
            </h2>
          </div>

          <button
            onClick={() => setShowBaseDinos(!showBaseDinos)}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            New Specimen
          </button>

          {showBaseDinos && (
            <div className="bg-gray-900 border-2 border-green-400 p-4 rounded-lg space-y-3">
              <p className="text-green-400 text-sm font-mono">Select base species:</p>
              {getBaseDinosaurs().map((baseDino, idx) => (
                <div key={idx} className="space-y-2">
                  <input
                    type="text"
                    placeholder={`Name your ${baseDino.species}...`}
                    value={newDinoName}
                    onChange={(e) => setNewDinoName(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-sm"
                  />
                  <button
                    onClick={() =>
                      handleCreateFromBase(baseDino, newDinoName || baseDino.name)
                    }
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-sm font-semibold transition-colors"
                  >
                    Create {baseDino.name}
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 max-h-96 overflow-y-auto">
            {dinosaurs.map((dino) => (
              <DinosaurCard
                key={dino.id}
                dinosaur={dino}
                onSelect={selectDinosaur}
                onDelete={deleteDinosaur}
                isSelected={selectedDinosaur?.id === dino.id}
              />
            ))}
          </div>
        </div>

        {/* Details Panel */}
        <div className="lg:col-span-2">
          {selectedDinosaur ? (
            <div className="space-y-6">
              {/* Header */}
              <div className="bg-gray-900 border-2 border-green-400 p-6 rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-5xl mb-2">{selectedDinosaur.image || '🦖'}</div>
                    <h2 className="text-3xl font-bold text-white">{selectedDinosaur.name}</h2>
                    <p className="text-green-400 text-lg font-mono">{selectedDinosaur.species}</p>
                  </div>
                  <div className="bg-gray-800 border border-green-400 px-4 py-2 rounded">
                    <p className="text-green-400 text-xs font-mono">STATUS</p>
                    <p className="text-white font-bold capitalize">{selectedDinosaur.status}</p>
                  </div>
                </div>

                <p className="text-gray-300 text-sm">{selectedDinosaur.notes}</p>
              </div>

              {/* Incubation Progress */}
              {selectedDinosaur.status === 'egg' && (
                <div className="bg-gray-900 border-2 border-blue-400 p-6 rounded-lg space-y-4">
                  <h3 className="text-green-400 font-bold font-mono">Incubation Chamber</h3>
                  <div className="w-full bg-gray-800 rounded-full h-6 overflow-hidden border border-blue-400">
                    <div
                      className="bg-gradient-to-r from-blue-400 to-cyan-400 h-full transition-all flex items-center justify-end pr-2"
                      style={{ width: `${selectedDinosaur.incubationProgress}%` }}
                    >
                      {selectedDinosaur.incubationProgress > 20 && (
                        <span className="text-xs font-bold text-blue-900">
                          {selectedDinosaur.incubationProgress}%
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={handleProgressIncubation}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
                  >
                    {selectedDinosaur.incubationProgress === 100
                      ? '🐣 READY TO HATCH'
                      : '+ Accelerate Growth'}
                  </button>
                </div>
              )}

              {/* Gene Sequencer */}
              <GeneSequencer genes={selectedDinosaur.genes} readOnly />
            </div>
          ) : (
            <div className="bg-gray-900 border-2 border-gray-600 p-12 rounded-lg flex items-center justify-center h-full">
              <div className="text-center">
                <div className="text-4xl mb-4">🔬</div>
                <p className="text-gray-400 font-mono">
                  Select a specimen to view details and manage genetics
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};