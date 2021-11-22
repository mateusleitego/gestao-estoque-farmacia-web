import React, { createContext, useEffect, useState } from 'react';

import api from '../services/api';

const Context = createContext({});

const MedicinesContext = ({ children }) => {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token');
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;

      await getAllMedicines();
    })();
  }, []);

  async function addMedicine({
    nome,
    descricao,
    categoria,
    preco,
    validade: { dia, mes, ano },
  }) {
    await api.post(`/medicines`, {
      nome,
      descricao,
      categoria,
      preco,
      validade: { dia, mes, ano },
    });

    await getAllMedicines();
  }

  async function getAllMedicines() {
    const { data } = await api.get('/medicines/all');

    localStorage.removeItem('medicines');
    localStorage.setItem('medicines', JSON.stringify(data));

    setMedicines(data);
  }

  async function getMedicine({ nome }) {
    const { data } = await api.get(`/medicines`, { params: { nome } });

    return data;
  }

  async function editarMedicine({
    medicine_id,
    nome,
    descricao,
    categoria,
    preco,
  }) {
    await api.put(`/medicines/${medicine_id}`, {
      nome,
      descricao,
      categoria,
      preco,
    });

    await getAllMedicines();
  }

  async function deleteMedicine({ medicine_id }) {
    await api.delete(`/medicines/${medicine_id}`);

    await getAllMedicines();
  }

  return (
    <Context.Provider
      value={{
        addMedicine,
        medicines,
        getAllMedicines,
        getMedicine,
        editarMedicine,
        deleteMedicine,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, MedicinesContext };
