import React from 'react';
import { DNA } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-950 border-b-4 border-green-400 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <DNA className="text-green-400" size={32} />
          <h1 className="text-4xl font-bold text-green-400 font-mono">
            InGen Dinosaur Lab
          </h1>
        </div>
        <p className="text-gray-400 font-mono text-sm">
          Dr. Henry Wu's Genetic Engineering Division - Create. Breed. Evolve.
        </p>
      </div>
    </header>
  );
};