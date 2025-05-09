import React from 'react';
import { Link } from 'react-router-dom';
import { Computer } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Computer size={28} />
            <span className="text-xl font-semibold">Municipalidad de Lo Prado</span>
          </Link>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link 
                  to="/" 
                  className="hover:text-blue-200 transition-colors"
                >
                  Registros
                </Link>
              </li>
              <li>
                <Link 
                  to="/new" 
                  className="bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded-md transition-colors"
                >
                  Nuevo Registro
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;