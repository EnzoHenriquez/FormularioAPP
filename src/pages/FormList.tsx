import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { 
  Plus, 
  FileText, 
  FileOutput, 
  Search, 
  Filter, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

// Mock data for demonstration
const MOCK_FORMS = [
  {
    id: 1001,
    date: '2025-05-15',
    department: 'Recursos Humanos',
    responsibleUser: 'María González',
    status: 'completed'
  },
  {
    id: 1002,
    date: '2025-05-14',
    department: 'Tesorería',
    responsibleUser: 'Juan Pérez',
    status: 'completed'
  },
  {
    id: 1003,
    date: '2025-05-12',
    department: 'Atención Ciudadana',
    responsibleUser: 'Ana Silva',
    status: 'pending'
  },
  {
    id: 1004,
    date: '2025-05-10',
    department: 'Dirección de Obras',
    responsibleUser: 'Roberto Fernández',
    status: 'completed'
  },
  {
    id: 1005,
    date: '2025-05-05',
    department: 'Secretaría Municipal',
    responsibleUser: 'Patricia Rojas',
    status: 'completed'
  },
];

const FormList: React.FC = () => {
  const [forms, setForms] = useState(MOCK_FORMS);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const formsPerPage = 10;
  
  // Filter forms based on search term
  const filteredForms = forms.filter(form => 
    form.responsibleUser.toLowerCase().includes(searchTerm.toLowerCase()) ||
    form.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    form.id.toString().includes(searchTerm)
  );
  
  // Pagination
  const indexOfLastForm = currentPage * formsPerPage;
  const indexOfFirstForm = indexOfLastForm - formsPerPage;
  const currentForms = filteredForms.slice(indexOfFirstForm, indexOfLastForm);
  const totalPages = Math.ceil(filteredForms.length / formsPerPage);
  
  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy');
  };
  
  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    if (status === 'completed') {
      return (
        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
          Completado
        </span>
      );
    }
    return (
      <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
        Pendiente
      </span>
    );
  };
  
  useEffect(() => {
    // This would be replaced with an API call in a real application
    // fetchForms();
  }, []);
  
  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
          Registros de Recepción de Equipos
        </h1>
        
        <Link 
          to="/new" 
          className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-md transition-colors flex items-center"
        >
          <Plus size={18} className="mr-2" /> Nuevo Registro
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Search size={18} className="text-gray-400" />
              </span>
              <input
                type="text"
                placeholder="Buscar por ID, departamento o usuario..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center self-start">
              <Filter size={18} className="mr-2" /> Filtrar
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Departamento
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuario Responsable
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentForms.length > 0 ? (
                currentForms.map((form) => (
                  <tr key={form.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium">#{form.id}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatDate(form.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {form.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {form.responsibleUser}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={form.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link 
                          to={`/view/${form.id}`}
                          className="text-blue-600 hover:text-blue-900 flex items-center"
                        >
                          <FileText size={18} className="mr-1" /> Ver
                        </Link>
                        <button className="text-green-600 hover:text-green-900 flex items-center">
                          <FileOutput size={18} className="mr-1" /> PDF
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    No se encontraron registros.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {filteredForms.length > formsPerPage && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Mostrando {indexOfFirstForm + 1} a {Math.min(indexOfLastForm, filteredForms.length)} de {filteredForms.length} registros
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                } border border-gray-300 flex items-center`}
              >
                <ChevronLeft size={16} />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === page
                      ? 'bg-blue-800 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  } border border-gray-300`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                } border border-gray-300 flex items-center`}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormList;