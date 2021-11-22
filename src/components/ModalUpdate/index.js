import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Modal } from 'react-bootstrap';

import { Context } from '../../context/medicinesContext';

export default function ModalUpdate({ medicine }) {
  const [nome, setNome] = useState(`${medicine.nome}`);
  const [descricao, setDescricao] = useState(`${medicine.descricao}`);
  const [categoria, setCategoria] = useState(`${medicine.categoria}`);
  const [preco, setPreco] = useState(`${medicine.preco}`);

  const [show, setShow] = useState(false);
  const { register, handleSubmit } = useForm();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { editarMedicine } = useContext(Context);

  async function handleUpdateMedicine({ nome, descricao, categoria, preco }) {
    console.log({
      medicine_id: medicine._id,
      nome,
      descricao,
      categoria,
      preco,
    });
    await editarMedicine({
      medicine_id: medicine._id,
      nome,
      descricao,
      categoria,
      preco,
    });
  }

  return (
    <>
      <i className="bi bi-pencil-square" onClick={handleShow}></i>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Medicamento</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(handleUpdateMedicine)}>
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
          </Modal.Body>
          <Modal.Footer>
            <Button
              style={{ marginBottom: '10px' }}
              type="submit"
              variant="primary"
              onClick={handleClose}
            >
              Salvar Alterações
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
