import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Modal } from 'react-bootstrap';

import { Context } from '../../context/medicinesContext';

export default function ModalAdicionar() {
  const [nome, setNome] = useState(``);
  const [descricao, setDescricao] = useState(``);
  const [categoria, setCategoria] = useState(``);
  const [preco, setPreco] = useState(``);
  const [dia, setDia] = useState(``);
  const [mes, setMes] = useState(``);
  const [ano, setAno] = useState(``);

  const [show, setShow] = useState(false);
  const { register, handleSubmit } = useForm();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { addMedicine } = useContext(Context);

  async function handleAddMedicine({
    nome,
    descricao,
    categoria,
    preco,
    dia,
    mes,
    ano,
  }) {
    await addMedicine({
      nome,
      descricao,
      categoria,
      preco,
      validade: { dia, mes, ano },
    });

    window.location.reload();
  }

  return (
    <>
      <button className="btn btn-success" onClick={handleShow}>
        <i className="bi bi-plus"></i>
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Medicamento</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(handleAddMedicine)}>
          <Modal.Body>
            <div className="mb-3">
              <label for="nome" className="form-label">
                Nome do Medicamento
              </label>
              <input
                type="text"
                className="form-control"
                id="nome"
                {...register('nome')}
                value={nome}
                onChange={() => setNome()}
              />
            </div>

            <div className="mb-3">
              <label for="nome" className="form-label">
                Descrição
              </label>
              <input
                type="text"
                className="form-control"
                id="descricao"
                {...register('descricao')}
                value={descricao}
                onChange={() => setDescricao()}
              />
            </div>

            <div className="mb-3">
              <label for="nome" className="form-label">
                Categoria
              </label>
              <input
                type="text"
                className="form-control"
                id="categoria"
                {...register('categoria')}
                value={categoria}
                onChange={() => setCategoria()}
              />
            </div>

            <div className="mb-3">
              <label for="nome" className="form-label">
                Preço
              </label>
              <input
                type="text"
                className="form-control"
                id="preco"
                {...register('preco')}
                value={preco}
                onChange={() => setPreco()}
              />
            </div>

            <div className="mb-3">
              <label for="nome" className="form-label">
                Dia da Validade (DD / mm / aaaa)
              </label>

              <input
                type="text"
                className="form-control"
                id="dia"
                {...register('dia')}
                value={dia}
                onChange={() => setDia()}
              />
            </div>

            <div className="mb-3">
              <label for="nome" className="form-label">
                Mes da Validade (dd / MM / aaaa)
              </label>
              <input
                type="text"
                className="form-control"
                id="mes"
                {...register('mes')}
                value={mes}
                onChange={() => setMes()}
              />
            </div>

            <div className="mb-3">
              <label for="nome" className="form-label">
                Ano da Validade (dd / mm / AAAA)
              </label>
              <input
                type="text"
                className="form-control"
                id="ano"
                {...register('ano')}
                value={ano}
                onChange={() => setAno()}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              style={{ marginBottom: '10px' }}
              type="submit"
              variant="primary"
              onClick={handleClose}
            >
              Adicionar
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}
