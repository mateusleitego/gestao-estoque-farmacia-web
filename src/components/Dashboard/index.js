import React, { useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { Context } from '../../context/medicinesContext';
import { Context as AuthContext } from '../../context/authContext';

import ModalUpdate from '../ModalUpdate';
import ModalAdicionar from '../ModalAdicionar';

import './style.css';

export default function Dashboard() {
  const [list, setList] = useState([]);

  const { register, handleSubmit } = useForm();

  const { setAuthenticated } = useContext(AuthContext);
  const { medicines, getMedicine, getAllMedicines, deleteMedicine } =
    useContext(Context);

  useEffect(() => {
    (async () => {
      setList([...medicines]);
    })();
  }, [medicines]);

  async function handleMedicine(nome) {
    const medicine = await getMedicine(nome);

    setList([medicine]);
  }

  function handleDate(item) {
    const day = new Date(item).getDay();
    const month = new Date(item).getMonth();
    const year = new Date(item).getFullYear();

    return `${day > 0 && day < 10 ? `0${day}` : day}/${
      month > 0 && month < 10 ? `0${month}` : day
    }/${year}`;
  }

  function handleCurrent(item) {
    return `R$ ${item}`;
  }

  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <i className="bi bi-activity"></i>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <Link
                  className="nav-link active"
                  to="/dashboard"
                  aria-current="page"
                  onClick={() => getAllMedicines()}
                >
                  Medicamentos
                </Link>
                <Link className="nav-link" to="/dashboard">
                  Usuarios
                </Link>
              </div>
              <form className="d-flex" onSubmit={handleSubmit(handleMedicine)}>
                <input
                  className="search form-control me-1"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  id="nome"
                  {...register('nome')}
                />
                <button className="btn btn-outline-success" type="submit">
                  <i className="bi bi-search"></i>
                </button>

                <ModalAdicionar />

                <Link
                  className="nav-link"
                  onClick={() => {
                    localStorage.clear() && setAuthenticated(false);
                    setTimeout(() => {
                      window.location.reload();
                    }, 1000);
                  }}
                  to="/"
                >
                  <i
                    className="bi bi-box-arrow-right"
                    style={{ color: '#bb2d3b' }}
                  ></i>
                </Link>
              </form>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nome</th>
              <th scope="col">Descrição</th>
              <th scope="col">Categoria</th>
              <th scope="col">Preço</th>
              <th scope="col">Validade</th>
              <th scope="col">Editar</th>
              <th scope="col">Excluir</th>
            </tr>
          </thead>
          <tbody>
            {list.map((medicine, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{medicine.nome}</td>
                <td>{medicine.descricao}</td>
                <td>{medicine.categoria}</td>
                <td>{handleCurrent(medicine.preco)}</td>
                <td>{handleDate(medicine.validade)}</td>
                <td className="editar">
                  <ModalUpdate medicine={medicine} />
                </td>
                <td
                  className="excluir"
                  onClick={() => deleteMedicine({ medicine_id: medicine._id })}
                >
                  <i className="bi bi-trash"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
