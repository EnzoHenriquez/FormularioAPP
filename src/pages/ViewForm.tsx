import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { 
  ArrowLeft, 
  FileOutput, 
  Printer,
  Computer, 
  Monitor, 
  MousePointer, 
  Keyboard 
} from 'lucide-react';
import { FormData } from '../types/formTypes';

// Mock data for demonstration purposes
const MOCK_FORM: FormData = {
  orderId: 1001,
  institution: 'Municipalidad de Lo Prado',
  date: '2025-05-15',
  address: 'San Pablo 7777',
  department: 'Recursos Humanos',
  responsibleUser: 'María González',
  equipment: {
    pc: { 
      serialNumber: 'SN12345678', 
      inventoryNumber: 'INV-PC-001', 
      model: 'OptiPlex 7090', 
      brand: 'Dell' 
    },
    monitor: { 
      serialNumber: 'MONSN87654321', 
      inventoryNumber: 'INV-MON-001', 
      model: 'P2419H', 
      brand: 'Dell' 
    },
    mouse: { 
      serialNumber: 'MSESN11223344', 
      inventoryNumber: 'INV-MSE-001', 
      model: 'MS116', 
      brand: 'Dell' 
    },
    keyboard: { 
      serialNumber: 'KBDSN99887766', 
      inventoryNumber: 'INV-KBD-001', 
      model: 'KB216', 
      brand: 'Dell' 
    }
  },
  pcDetails: {
    processor: 'Intel Core i5-10500',
    ram: '16GB DDR4',
    storage: 'SSD 512GB',
    operatingSystem: 'Windows 11 Pro',
    office: 'Microsoft Office 2021',
    extraApp1: 'Adobe Acrobat Reader',
    extraApp2: 'Google Chrome',
    extraApp3: 'Zoom'
  },
  withdrawnEquipment: {
    pc: { serialNumber: 'OLD-SN12345', inventoryNumber: 'OLD-INV-PC-001' },
    monitor: { serialNumber: 'OLD-MONSN54321', inventoryNumber: 'OLD-INV-MON-001' },
    mouse: { serialNumber: 'OLD-MSESN11111', inventoryNumber: 'OLD-INV-MSE-001' },
    keyboard: { serialNumber: 'OLD-KBDSN99999', inventoryNumber: 'OLD-INV-KBD-001' }
  },
  itSignature: 'data:image/png;base64,...', // Would contain actual signature data
  userSignature: 'data:image/png;base64,...' // Would contain actual signature data
};

const ViewForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // This would be replaced with an API call in a production environment
    // Example: fetchFormData(id)
    const fetchData = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setFormData(MOCK_FORM);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching form data:', error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy');
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
      </div>
    );
  }
  
  if (!formData) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-red-600 mb-4">No se encontró el formulario con ID: {id}</p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-md transition-colors flex items-center mx-auto"
        >
          <ArrowLeft size={18} className="mr-2" /> Volver a la lista
        </button>
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <button
          onClick={() => navigate('/')}
          className="text-blue-800 hover:text-blue-900 flex items-center"
        >
          <ArrowLeft size={18} className="mr-1" /> Volver a la lista
        </button>
        
        <div className="flex space-x-3">
          <button
            className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors flex items-center"
          >
            <Printer size={18} className="mr-2" /> Imprimir
          </button>
          
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center"
          >
            <FileOutput size={18} className="mr-2" /> Exportar PDF
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-900 text-white p-6">
          <h1 className="text-2xl font-bold">Recepción Equipo Institucional</h1>
          <p className="text-blue-200">Orden de Trabajo: #{formData.orderId}</p>
          <p className="text-blue-200 mt-1">Fecha: {formatDate(formData.date)}</p>
        </div>
        
        <div className="p-6">
          {/* Institution Data */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-blue-900 mb-4 pb-2 border-b border-gray-200">
              Datos de la Institución
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500">Institución</p>
                <p className="font-medium">{formData.institution}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Dirección</p>
                <p className="font-medium">{formData.address}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Unidad / Depto.</p>
                <p className="font-medium">{formData.department}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Usuario Responsable</p>
                <p className="font-medium">{formData.responsibleUser}</p>
              </div>
            </div>
          </section>
          
          {/* Equipment Delivered */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-blue-900 mb-4 pb-2 border-b border-gray-200">
              Equipo Entregado
            </h2>
            
            {/* PC */}
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <Computer className="text-blue-800 mr-2" size={20} />
                <h3 className="font-medium text-lg">PC</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Número de Serie</p>
                  <p className="font-medium">{formData.equipment.pc.serialNumber}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Número de Inventario</p>
                  <p className="font-medium">{formData.equipment.pc.inventoryNumber}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Modelo</p>
                  <p className="font-medium">{formData.equipment.pc.model}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Marca</p>
                  <p className="font-medium">{formData.equipment.pc.brand}</p>
                </div>
              </div>
            </div>
            
            {/* Monitor */}
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <Monitor className="text-blue-800 mr-2" size={20} />
                <h3 className="font-medium text-lg">Monitor</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Número de Serie</p>
                  <p className="font-medium">{formData.equipment.monitor.serialNumber}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Número de Inventario</p>
                  <p className="font-medium">{formData.equipment.monitor.inventoryNumber}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Modelo</p>
                  <p className="font-medium">{formData.equipment.monitor.model}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Marca</p>
                  <p className="font-medium">{formData.equipment.monitor.brand}</p>
                </div>
              </div>
            </div>
            
            {/* Mouse */}
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <MousePointer className="text-blue-800 mr-2" size={20} />
                <h3 className="font-medium text-lg">Mouse</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Número de Serie</p>
                  <p className="font-medium">{formData.equipment.mouse.serialNumber}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Número de Inventario</p>
                  <p className="font-medium">{formData.equipment.mouse.inventoryNumber}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Modelo</p>
                  <p className="font-medium">{formData.equipment.mouse.model}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Marca</p>
                  <p className="font-medium">{formData.equipment.mouse.brand}</p>
                </div>
              </div>
            </div>
            
            {/* Keyboard */}
            <div>
              <div className="flex items-center mb-3">
                <Keyboard className="text-blue-800 mr-2" size={20} />
                <h3 className="font-medium text-lg">Teclado</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Número de Serie</p>
                  <p className="font-medium">{formData.equipment.keyboard.serialNumber}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Número de Inventario</p>
                  <p className="font-medium">{formData.equipment.keyboard.inventoryNumber}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Modelo</p>
                  <p className="font-medium">{formData.equipment.keyboard.model}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Marca</p>
                  <p className="font-medium">{formData.equipment.keyboard.brand}</p>
                </div>
              </div>
            </div>
          </section>
          
          {/* PC Details */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-blue-900 mb-4 pb-2 border-b border-gray-200">
              Datos del PC
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500">Procesador</p>
                <p className="font-medium">{formData.pcDetails.processor}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">RAM</p>
                <p className="font-medium">{formData.pcDetails.ram}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Almacenamiento</p>
                <p className="font-medium">{formData.pcDetails.storage}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Sistema Operativo</p>
                <p className="font-medium">{formData.pcDetails.operatingSystem}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Office</p>
                <p className="font-medium">{formData.pcDetails.office}</p>
              </div>
              
              {formData.pcDetails.extraApp1 && (
                <div>
                  <p className="text-sm text-gray-500">Aplicación Extra (1)</p>
                  <p className="font-medium">{formData.pcDetails.extraApp1}</p>
                </div>
              )}
              
              {formData.pcDetails.extraApp2 && (
                <div>
                  <p className="text-sm text-gray-500">Aplicación Extra (2)</p>
                  <p className="font-medium">{formData.pcDetails.extraApp2}</p>
                </div>
              )}
              
              {formData.pcDetails.extraApp3 && (
                <div>
                  <p className="text-sm text-gray-500">Aplicación Extra (3)</p>
                  <p className="font-medium">{formData.pcDetails.extraApp3}</p>
                </div>
              )}
            </div>
          </section>
          
          {/* Withdrawn Equipment */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-blue-900 mb-4 pb-2 border-b border-gray-200">
              Equipo Retirado
            </h2>
            
            {/* Only show if there's withdrawn equipment */}
            {(formData.withdrawnEquipment.pc.serialNumber || 
              formData.withdrawnEquipment.monitor.serialNumber ||
              formData.withdrawnEquipment.mouse.serialNumber ||
              formData.withdrawnEquipment.keyboard.serialNumber) ? (
              <>
                {/* PC */}
                {formData.withdrawnEquipment.pc.serialNumber && (
                  <div className="mb-6">
                    <div className="flex items-center mb-3">
                      <Computer className="text-blue-800 mr-2" size={20} />
                      <h3 className="font-medium text-lg">PC</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Número de Serie</p>
                        <p className="font-medium">{formData.withdrawnEquipment.pc.serialNumber}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Número de Inventario</p>
                        <p className="font-medium">{formData.withdrawnEquipment.pc.inventoryNumber}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Monitor */}
                {formData.withdrawnEquipment.monitor.serialNumber && (
                  <div className="mb-6">
                    <div className="flex items-center mb-3">
                      <Monitor className="text-blue-800 mr-2" size={20} />
                      <h3 className="font-medium text-lg">Monitor</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Número de Serie</p>
                        <p className="font-medium">{formData.withdrawnEquipment.monitor.serialNumber}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Número de Inventario</p>
                        <p className="font-medium">{formData.withdrawnEquipment.monitor.inventoryNumber}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Mouse */}
                {formData.withdrawnEquipment.mouse.serialNumber && (
                  <div className="mb-6">
                    <div className="flex items-center mb-3">
                      <MousePointer className="text-blue-800 mr-2" size={20} />
                      <h3 className="font-medium text-lg">Mouse</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Número de Serie</p>
                        <p className="font-medium">{formData.withdrawnEquipment.mouse.serialNumber}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Número de Inventario</p>
                        <p className="font-medium">{formData.withdrawnEquipment.mouse.inventoryNumber}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Keyboard */}
                {formData.withdrawnEquipment.keyboard.serialNumber && (
                  <div>
                    <div className="flex items-center mb-3">
                      <Keyboard className="text-blue-800 mr-2" size={20} />
                      <h3 className="font-medium text-lg">Teclado</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Número de Serie</p>
                        <p className="font-medium">{formData.withdrawnEquipment.keyboard.serialNumber}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Número de Inventario</p>
                        <p className="font-medium">{formData.withdrawnEquipment.keyboard.inventoryNumber}</p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <p className="text-gray-500 italic">No se registró retiro de equipos.</p>
            )}
          </section>
          
          {/* Signatures */}
          <section>
            <h2 className="text-xl font-semibold text-blue-900 mb-4 pb-2 border-b border-gray-200">
              Firmas
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-sm text-gray-500 mb-2">Firma del encargado de informática</p>
                <div className="border border-gray-300 rounded-md bg-gray-50 p-4 h-[150px] flex items-center justify-center">
                  {formData.itSignature ? (
                    <img 
                      src={formData.itSignature} 
                      alt="Firma de encargado de informática" 
                      className="max-h-full"
                    />
                  ) : (
                    <p className="text-gray-400 italic">Sin firma</p>
                  )}
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-2">Firma del funcionario receptor</p>
                <div className="border border-gray-300 rounded-md bg-gray-50 p-4 h-[150px] flex items-center justify-center">
                  {formData.userSignature ? (
                    <img 
                      src={formData.userSignature} 
                      alt="Firma del funcionario receptor" 
                      className="max-h-full"
                    />
                  ) : (
                    <p className="text-gray-400 italic">Sin firma</p>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ViewForm;