import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 text-sm">
              © {currentYear} Municipalidad de Lo Prado. Todos los derechos reservados.
            </p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-blue-800 text-sm">
              Políticas de Privacidad
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-800 text-sm">
              Soporte Técnico
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;