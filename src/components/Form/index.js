import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';

import { Context } from '../../context/authContext';

import './style.css';

export default function Form() {
  const { register, handleSubmit } = useForm();
  const { signIn } = useContext(Context);

  <button className="btn btn-primary" type="submit"></button>;

  async function handleSignIn({ emailOrAccessCode, password }) {
    await signIn(emailOrAccessCode, password);
  }

  return (
    <main className="form container-fluid">
      <form className="content" onSubmit={handleSubmit(handleSignIn)}>
        <h2>Faça o seu login com sua Conta aqui agora!</h2>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="emailOrAccessCode"
            {...register('emailOrAccessCode')}
            placeholder="example@email.com"
            required
          />
          <label for="email" className="form-label">
            Email ou Código de Acesso
          </label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="password"
            {...register('password')}
            placeholder="Sua senha..."
            required
          />
          <label for="password" className="form-label">
            Senha
          </label>
        </div>

        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </form>
    </main>
  );
}
