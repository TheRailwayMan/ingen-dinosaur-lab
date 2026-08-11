import React from 'react';
import { Dinosaur } from '../types';
import { Zap, Heart, Trash2 } from 'lucide-react';

interface DinosaurCardProps {
  dinosaur: Dinosaur;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  isSelected: boolean;
}

export const DinosaurCard: React.FC<DinosaurCardProps> = ({
  dinosaur,
  onSelect,
  onDelete,
  isSelected,
}) => {
  const avgGene =
    Object.values(dinosaur.genes).reduce((a, b) => a + b, 0) / 6;

  return (
    <div
      onClick={() => onSelect(dinosaur.id)}
      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
        isSelected
          ? 'border-green-400 bg-gray-800 shadow-lg shadow-green-400/50'
          : 'border-gray-600 bg-gray-900 hover:border-gray-500'
      }`}
    >
      <div className="text-3xl text-center mb-2">{dinosaur.image || '🦖'}</div>

      <h3 className="font-bold text-white text-lg truncate">{dinosaur.name}</h3>
      <p className="text-green-400 text-sm mb-3">{dinosaur.species}</p>

      <div className="space-y-2 mb-3">
        <div className="flex justify-between text-xs text-gray-400">
          <span>STATUS:</span>
          <span className="text-green-400 capitalize">{dinosaur.status}</span>
        </div>

        {dinosaur.status === 'egg' && (
          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
            <div
              className="bg-green-400 h-full transition-all"
              style={{ width: `${dinosaur.incubationProgress}%` }}
            />
          </div>
        )}

        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-400">AVG GENE</span>
          <div className="flex items-center gap-1">
            <Zap size={12} className="text-yellow-400" />
            <span className="text-yellow-400 font-bold text-sm">
              {avgGene.toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(dinosaur.id);
          }}
          className="flex-1 bg-red-900 hover:bg-red-800 text-red-100 py-1 px-2 rounded text-xs font-semibold transition-colors flex items-center justify-center gap-1"
        >
          <Trash2 size={12} />
          DELETE
        </button>
      </div>
    </div>
  );
};