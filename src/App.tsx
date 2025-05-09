import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import EquipmentForm from './pages/EquipmentForm';
import FormList from './pages/FormList';
import ViewForm from './pages/ViewForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<FormList />} />
          <Route path="/new" element={<EquipmentForm />} />
          <Route path="/view/:id" element={<ViewForm />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;