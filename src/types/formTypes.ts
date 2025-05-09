// Equipment component type (PC, Monitor, Mouse, Keyboard)
export interface EquipmentItem {
  serialNumber: string;
  inventoryNumber: string;
  model?: string;
  brand?: string;
}

// Equipment section containing all components
export interface Equipment {
  pc: EquipmentItem;
  monitor: EquipmentItem;
  mouse: EquipmentItem;
  keyboard: EquipmentItem;
}

// PC Details section
export interface PCDetails {
  processor: string;
  ram: string;
  storage: string;
  operatingSystem: string;
  office: string;
  extraApp1?: string;
  extraApp2?: string;
  extraApp3?: string;
}

// Main form data structure
export interface FormData {
  orderId: number;
  institution: string;
  date: string;
  address: string;
  department: string;
  responsibleUser: string;
  equipment: Equipment;
  pcDetails: PCDetails;
  withdrawnEquipment: {
    pc: Pick<EquipmentItem, 'serialNumber' | 'inventoryNumber'>;
    monitor: Pick<EquipmentItem, 'serialNumber' | 'inventoryNumber'>;
    mouse: Pick<EquipmentItem, 'serialNumber' | 'inventoryNumber'>;
    keyboard: Pick<EquipmentItem, 'serialNumber' | 'inventoryNumber'>;
  };
  itSignature: string;
  userSignature: string;
}

// API response format
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}