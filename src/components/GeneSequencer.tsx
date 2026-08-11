import React from 'react';
import { GeneticTrait } from '../types';
import { Zap } from 'lucide-react';

interface GeneSequencerProps {
  genes: GeneticTrait;
  onChange?: (genes: GeneticTrait) => void;
  readOnly?: boolean;
}

export const GeneSequencer: React.FC<GeneSequencerProps> = ({
  genes,
  onChange,
  readOnly = false,
}) => {
  const traits = Object.entries(genes) as [keyof GeneticTrait, number][];

  const handleChange = (trait: keyof GeneticTrait, value: number) => {
    if (readOnly || !onChange) return;
    onChange({
      ...genes,
      [trait]: Math.max(1, Math.min(10, value)),
    });
  };

  const getColor = (value: number) => {
    if (value <= 3) return 'bg-blue-500';
    if (value <= 6) return 'bg-yellow-500';
    if (value <= 8) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-gray-900 border-2 border-green-400 rounded-lg p-6 font-mono">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="text-green-400" size={20} />
        <h3 className="text-green-400 text-lg font-bold">GENETIC SEQUENCER</h3>
      </div>

      <div className="space-y-4">
        {traits.map(([trait, value]) => (
          <div key={trait} className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-green-300 capitalize text-sm font-semibold">
                {trait}
              </label>
              <span className="text-green-400 font-bold text-lg">{value}/10</span>
            </div>
            <div className="relative h-8 bg-gray-800 border border-green-400 rounded overflow-hidden">
              <div
                className={`h-full ${getColor(value)} transition-all duration-300`}
                style={{ width: `${(value / 10) * 100}%` }}
              />
              {!readOnly && (
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={value}
                  onChange={(e) => handleChange(trait, parseInt(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-green-400">
        <div className="text-green-300 text-xs space-y-1">
          <p>█ WEAK (1-3) █ MODERATE (4-6) █ STRONG (7-9) █ ELITE (10)</p>
        </div>
      </div>
    </div>
  );
};