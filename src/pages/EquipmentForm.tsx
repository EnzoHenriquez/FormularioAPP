import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import SignatureCanvas from 'react-signature-canvas';
import { 
  Save, 
  Trash2, 
  FileOutput, 
  Printer, 
  Computer, 
  Monitor, 
  MousePointer, 
  Keyboard
} from 'lucide-react';

// Types
import { FormData, Equipment, PCDetails } from '../types/formTypes';

const EquipmentForm: React.FC = () => {
  const navigate = useNavigate();
  const itSignatureRef = useRef<SignatureCanvas>(null);
  const userSignatureRef = useRef<SignatureCanvas>(null);
  
  const [formData, setFormData] = useState<FormData>({
    orderId: Math.floor(1000 + Math.random() * 9000), // Simulated auto-generated ID
    institution: 'Municipalidad de Lo Prado',
    date: format(new Date(), 'yyyy-MM-dd'),
    address: '',
    department: '',
    responsibleUser: '',
    equipment: {
      pc: { serialNumber: '', inventoryNumber: '', model: '', brand: '' },
      monitor: { serialNumber: '', inventoryNumber: '', model: '', brand: '' },
      mouse: { serialNumber: '', inventoryNumber: '', model: '', brand: '' },
      keyboard: { serialNumber: '', inventoryNumber: '', model: '', brand: '' }
    },
    pcDetails: {
      processor: '',
      ram: '',
      storage: '',
      operatingSystem: '',
      office: '',
      extraApp1: '',
      extraApp2: '',
      extraApp3: ''
    },
    withdrawnEquipment: {
      pc: { serialNumber: '', inventoryNumber: '' },
      monitor: { serialNumber: '', inventoryNumber: '' },
      mouse: { serialNumber: '', inventoryNumber: '' },
      keyboard: { serialNumber: '', inventoryNumber: '' }
    },
    itSignature: '',
    userSignature: ''
  });

  // Update form field handler
  const handleChange = (
    section: keyof FormData, 
    field: string, 
    value: string,
    equipmentType?: keyof Equipment
  ) => {
    if (section === 'equipment' && equipmentType) {
      setFormData({
        ...formData,
        [section]: {
          ...formData[section],
          [equipmentType]: {
            ...formData[section][equipmentType],
            [field]: value
          }
        }
      });
    } else if (section === 'pcDetails') {
      setFormData({
        ...formData,
        [section]: {
          ...formData.pcDetails,
          [field]: value
        }
      });
    } else if (section === 'withdrawnEquipment' && equipmentType) {
      setFormData({
        ...formData,
        [section]: {
          ...formData[section],
          [equipmentType]: {
            ...formData[section][equipmentType],
            [field]: value
          }
        }
      });
    } else {
      setFormData({
        ...formData,
        [field]: value
      });
    }
  };

  // Clear signature pads
  const clearSignature = (type: 'it' | 'user') => {
    if (type === 'it' && itSignatureRef.current) {
      itSignatureRef.current.clear();
    } else if (type === 'user' && userSignatureRef.current) {
      userSignatureRef.current.clear();
    }
  };

  // Save signatures as data URLs
  const saveSignatures = () => {
    if (itSignatureRef.current) {
      const itSig = itSignatureRef.current.isEmpty() 
        ? '' 
        : itSignatureRef.current.toDataURL('image/png');
      setFormData({...formData, itSignature: itSig});
    }
    
    if (userSignatureRef.current) {
      const userSig = userSignatureRef.current.isEmpty() 
        ? '' 
        : userSignatureRef.current.toDataURL('image/png');
      setFormData({...formData, userSignature: userSig});
    }
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    saveSignatures();
    
    // Here we would call an API to save the form data
    console.log('Form data to be submitted:', formData);
    
    try {
      // Simulate API call - would be replaced with actual fetch to API
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Formulario guardado con éxito!');
      // Redirect to the form list page
      navigate('/');
    } catch (error) {
      console.error('Error saving form:', error);
      alert('Error al guardar el formulario. Por favor intente nuevamente.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md overflow-hidden transition-all">
      <div className="bg-blue-900 text-white p-6">
        <h1 className="text-2xl font-bold">Recepción Equipo Institucional</h1>
        <p className="text-blue-200">Orden de Trabajo: #{formData.orderId}</p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6">
        {/* Institution Data */}
        <section className="mb-8 bg-gray-50 p-6 rounded-md border border-gray-200">
          <h2 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
            <span className="bg-blue-100 text-blue-800 p-1 rounded-full w-8 h-8 flex items-center justify-center mr-2">1</span>
            Datos de la Institución
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Institución
              </label>
              <input
                type="text"
                value={formData.institution}
                readOnly
                className="w-full rounded-md border-gray-300 bg-gray-100 text-gray-700"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dirección
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unidad / Depto.
              </label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({...formData, department: e.target.value})}
                className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Usuario Responsable
              </label>
              <input
                type="text"
                value={formData.responsibleUser}
                onChange={(e) => setFormData({...formData, responsibleUser: e.target.value})}
                className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                required
              />
            </div>
          </div>
        </section>
        
        {/* Equipment Delivered */}
        <section className="mb-8 bg-gray-50 p-6 rounded-md border border-gray-200">
          <h2 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
            <span className="bg-blue-100 text-blue-800 p-1 rounded-full w-8 h-8 flex items-center justify-center mr-2">2</span>
            Equipo Entregado
          </h2>
          
          {/* PC */}
          <div className="mb-6 border-b border-gray-200 pb-6">
            <div className="flex items-center mb-4">
              <Computer className="text-blue-800 mr-2" size={20} />
              <h3 className="font-medium text-lg">PC</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Número de Serie
                </label>
                <input
                  type="text"
                  value={formData.equipment.pc.serialNumber}
                  onChange={(e) => handleChange('equipment', 'serialNumber', e.target.value, 'pc')}
                  className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Número de Inventario
                </label>
                <input
                  type="text"
                  value={formData.equipment.pc.inventoryNumber}
                  onChange={(e) => handleChange('equipment', 'inventoryNumber', e.target.value, 'pc')}
                  className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Modelo
                </label>
                <input
                  type="text"
                  value={formData.equipment.pc.model}
                  onChange={(e) => handleChange('equipment', 'model', e.target.value, 'pc')}
                  className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Marca
                </label>
                <input
                  type="text"
                  value={formData.equipment.pc.brand}
                  onChange={(e) => handleChange('equipment', 'brand', e.target.value, 'pc')}
                  className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                />
              </div>
            </div>
          </div>
          
          {/* Monitor */}
          <div className="mb-6 border-b border-gray-200 pb-6">
            <div className="flex items-center mb-4">
              <Monitor className="text-blue-800 mr-2" size={20} />
              <h3 className="font-medium text-lg">Monitor</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Número de Serie
                </label>
                <input
                  type="text"
                  value={formData.equipment.monitor.serialNumber}
                  onChange={(e) => handleChange('equipment', 'serialNumber', e.target.value, 'monitor')}
                  className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Número de Inventario
                </label>
                <input
                  type="text"
                  value={formData.equipment.monitor.inventoryNumber}
                  onChange={(e) => handleChange('equipment', 'inventoryNumber', e.target.value, 'monitor')}
                  className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Modelo
                </label>
                <input
                  type="text"
                  value={formData.equipment.monitor.model}
                  onChange={(e) => handleChange('equipment', 'model', e.target.value, 'monitor')}
                  className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Marca
                </label>
                <input
                  type="text"
                  value={formData.equipment.monitor.brand}
                  onChange={(e) => handleChange('equipment', 'brand', e.target.value, 'monitor')}
                  className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                />
              </div>
            </div>
          </div>
          
          {/* Mouse */}
          <div className="mb-6 border-b border-gray-200 pb-6">
            <div className="flex items-center mb-4">
              <MousePointer className="text-blue-800 mr-2" size={20} />
              <h3 className="font-medium text-lg">Mouse</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Número de Serie
                </label>
                <input
                  type="text"
                  value={formData.equipment.mouse.serialNumber}
                  onChange={(e) => handleChange('equipment', 'serialNumber', e.target.value, 'mouse')}
                  className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Número de Inventario
                </label>
                <input
                  type="text"
                  value={formData.equipment.mouse.inventoryNumber}
                  onChange={(e) => handleChange('equipment', 'inventoryNumber', e.target.value, 'mouse')}
                  className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Modelo
                </label>
                <input
                  type="text"
                  value={formData.equipment.mouse.model}
                  onChange={(e) => handleChange('equipment', 'model', e.target.value, 'mouse')}
                  className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Marca
                </label>
                <input
                  type="text"
                  value={formData.equipment.mouse.brand}
                  onChange={(e) => handleChange('equipment', 'brand', e.target.value, 'mouse')}
                  className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                />
              </div>
            </div>
          </div>
          
          {/* Keyboard */}
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <Keyboard className="text-blue-800 mr-2" size={20} />
              <h3 className="font-medium text-lg">Teclado</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Número de Serie
                </label>
                <input
                  type="text"
                  value={formData.equipment.keyboard.serialNumber}
                  onChange={(e) => handleChange('equipment', 'serialNumber', e.target.value, 'keyboard')}
                  className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Número de Inventario
                </label>
                <input
                  type="text"
                  value={formData.equipment.keyboard.inventoryNumber}
                  onChange={(e) => handleChange('equipment', 'inventoryNumber', e.target.value, 'keyboard')}
                  className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Modelo
                </label>
                <input
                  type="text"
                  value={formData.equipment.keyboard.model}
                  onChange={(e) => handleChange('equipment', 'model', e.target.value, 'keyboard')}
                  className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Marca
                </label>
                <input
                  type="text"
                  value={formData.equipment.keyboard.brand}
                  onChange={(e) => handleChange('equipment', 'brand', e.target.value, 'keyboard')}
                  className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* PC Details */}
        <section className="mb-8 bg-gray-50 p-6 rounded-md border border-gray-200">
          <h2 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
            <span className="bg-blue-100 text-blue-800 p-1 rounded-full w-8 h-8 flex items-center justify-center mr-2">3</span>
            Datos del PC
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Procesador
              </label>
              <input
                type="text"
                value={formData.pcDetails.processor}
                onChange={(e) => handleChange('pcDetails', 'processor', e.target.value)}
                className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                RAM
              </label>
              <input
                type="text"
                value={formData.pcDetails.ram}
                onChange={(e) => handleChange('pcDetails', 'ram', e.target.value)}
                className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                placeholder="Ej: 8GB DDR4"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Almacenamiento
              </label>
              <input
                type="text"
                value={formData.pcDetails.storage}
                onChange={(e) => handleChange('pcDetails', 'storage', e.target.value)}
                className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                placeholder="Ej: SSD 256GB"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sistema Operativo
              </label>
              <input
                type="text"
                value={formData.pcDetails.operatingSystem}
                onChange={(e) => handleChange('pcDetails', 'operatingSystem', e.target.value)}
                className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                placeholder="Ej: Windows 11 Pro"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Office
              </label>
              <input
                type="text"
                value={formData.pcDetails.office}
                onChange={(e) => handleChange('pcDetails', 'office', e.target.value)}
                className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                placeholder="Ej: Microsoft Office 2021"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Aplicación Extra (1)
              </label>
              <input
                type="text"
                value={formData.pcDetails.extraApp1}
                onChange={(e) => handleChange('pcDetails', 'extraApp1', e.target.value)}
                className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Aplicación Extra (2)
              </label>
              <input
                type="text"
                value={formData.pcDetails.extraApp2}
                onChange={(e) => handleChange('pcDetails', 'extraApp2', e.target.value)}
                className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Aplicación Extra (3)
              </label>
              <input
                type="text"
                value={formData.pcDetails.extraApp3}
                onChange={(e) => handleChange('pcDetails', 'extraApp3', e.target.value)}
                className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
          </div>
        </section>
        
        {/* Withdrawn Equipment */}
        <section className="mb-8 bg-gray-50 p-6 rounded-md border border-gray-200">
          <h2 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
            <span className="bg-blue-100 text-blue-800 p-1 rounded-full w-8 h-8 flex items-center justify-center mr-2">4</span>
            Equipo Retirado
          </h2>
          
          <div className="grid grid-cols-1 gap-6">
            {/* PC */}
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center mb-4">
                <Computer className="text-blue-800 mr-2" size={20} />
                <h3 className="font-medium text-lg">PC</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Número de Serie
                  </label>
                  <input
                    type="text"
                    value={formData.withdrawnEquipment.pc.serialNumber}
                    onChange={(e) => handleChange('withdrawnEquipment', 'serialNumber', e.target.value, 'pc')}
                    className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Número de Inventario
                  </label>
                  <input
                    type="text"
                    value={formData.withdrawnEquipment.pc.inventoryNumber}
                    onChange={(e) => handleChange('withdrawnEquipment', 'inventoryNumber', e.target.value, 'pc')}
                    className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  />
                </div>
              </div>
            </div>
            
            {/* Monitor */}
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center mb-4">
                <Monitor className="text-blue-800 mr-2" size={20} />
                <h3 className="font-medium text-lg">Monitor</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Número de Serie
                  </label>
                  <input
                    type="text"
                    value={formData.withdrawnEquipment.monitor.serialNumber}
                    onChange={(e) => handleChange('withdrawnEquipment', 'serialNumber', e.target.value, 'monitor')}
                    className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Número de Inventario
                  </label>
                  <input
                    type="text"
                    value={formData.withdrawnEquipment.monitor.inventoryNumber}
                    onChange={(e) => handleChange('withdrawnEquipment', 'inventoryNumber', e.target.value, 'monitor')}
                    className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  />
                </div>
              </div>
            </div>
            
            {/* Mouse */}
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center mb-4">
                <MousePointer className="text-blue-800 mr-2" size={20} />
                <h3 className="font-medium text-lg">Mouse</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Número de Serie
                  </label>
                  <input
                    type="text"
                    value={formData.withdrawnEquipment.mouse.serialNumber}
                    onChange={(e) => handleChange('withdrawnEquipment', 'serialNumber', e.target.value, 'mouse')}
                    className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Número de Inventario
                  </label>
                  <input
                    type="text"
                    value={formData.withdrawnEquipment.mouse.inventoryNumber}
                    onChange={(e) => handleChange('withdrawnEquipment', 'inventoryNumber', e.target.value, 'mouse')}
                    className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  />
                </div>
              </div>
            </div>
            
            {/* Keyboard */}
            <div>
              <div className="flex items-center mb-4">
                <Keyboard className="text-blue-800 mr-2" size={20} />
                <h3 className="font-medium text-lg">Teclado</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Número de Serie
                  </label>
                  <input
                    type="text"
                    value={formData.withdrawnEquipment.keyboard.serialNumber}
                    onChange={(e) => handleChange('withdrawnEquipment', 'serialNumber', e.target.value, 'keyboard')}
                    className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Número de Inventario
                  </label>
                  <input
                    type="text"
                    value={formData.withdrawnEquipment.keyboard.inventoryNumber}
                    onChange={(e) => handleChange('withdrawnEquipment', 'inventoryNumber', e.target.value, 'keyboard')}
                    className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Signatures */}
        <section className="mb-8 bg-gray-50 p-6 rounded-md border border-gray-200">
          <h2 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
            <span className="bg-blue-100 text-blue-800 p-1 rounded-full w-8 h-8 flex items-center justify-center mr-2">5</span>
            Firmas
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Firma del encargado de informática
              </label>
              <div className="border border-gray-300 rounded-md bg-white p-2 mb-2">
                <SignatureCanvas
                  ref={itSignatureRef}
                  canvasProps={{
                    width: 500,
                    height: 150,
                    className: 'w-full h-[150px] cursor-crosshair'
                  }}
                  backgroundColor="white"
                />
              </div>
              <button
                type="button"
                onClick={() => clearSignature('it')}
                className="text-sm text-red-600 hover:text-red-800 flex items-center"
              >
                <Trash2 size={16} className="mr-1" /> Borrar firma
              </button>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Firma del funcionario receptor
              </label>
              <div className="border border-gray-300 rounded-md bg-white p-2 mb-2">
                <SignatureCanvas
                  ref={userSignatureRef}
                  canvasProps={{
                    width: 500,
                    height: 150,
                    className: 'w-full h-[150px] cursor-crosshair'
                  }}
                  backgroundColor="white"
                />
              </div>
              <button
                type="button"
                onClick={() => clearSignature('user')}
                className="text-sm text-red-600 hover:text-red-800 flex items-center"
              >
                <Trash2 size={16} className="mr-1" /> Borrar firma
              </button>
            </div>
          </div>
        </section>
        
        {/* Form Actions */}
        <div className="flex flex-wrap justify-end gap-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors flex items-center"
            onClick={() => navigate('/')}
          >
            Cancelar
          </button>
          
          <button
            type="button"
            className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors flex items-center"
          >
            <Printer size={18} className="mr-2" /> Vista Previa
          </button>
          
          <button
            type="button"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center"
          >
            <FileOutput size={18} className="mr-2" /> Exportar PDF
          </button>
          
          <button
            type="submit"
            className="px-6 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900 transition-colors flex items-center"
          >
            <Save size={18} className="mr-2" /> Guardar Formulario
          </button>
        </div>
      </form>
    </div>
  );
};

export default EquipmentForm;