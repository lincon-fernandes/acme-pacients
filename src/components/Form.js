import React, { useState } from 'react';
import './form.css';
export default function Form({ newUser, setUsers, setNewUser, users }) {
  const [name, setName] = useState('');
  const [birth, setbirth] = useState('');
  const [cpf, setcpf] = useState('');
  const [gender, setGender] = useState('masculino');
  const [adress, setAdress] = useState({});
  const [status, setStatus] = useState('ativo');

  const handleCpf = (e) => {
    let inputed = e.target.value;
    inputed = inputed.replace(/\D/g, ''); // substitui qualquer caracter que nao seja numero por nada
    inputed = inputed.replace(/(\d{3})(\d)/, '$1.$2'); // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
    inputed = inputed.replace(/(\d{3})(\d)/, '$1.$2');
    inputed = inputed.replace(/(\d{3})(\d{1,2})/, '$1-$2');
    inputed = inputed.replace(/(-\d{2})\d+?$/, '$1'); // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
    setcpf(inputed);
  };
  const handleGender = (e) => {
    setGender(e.target.value);
  };
  const handleStatus = (e) => {
    setStatus(e.target.value);
  };
  const handleAdressStreet = (e) => {
    adress.street = e.target.value;
    setAdress(adress);
    console.log(adress);
  };
  const handleAdressStreetNumber = (e) => {
    adress.number = e.target.value;
    setAdress(adress);
    console.log(adress);
  };
  const handleAdressDistrict = (e) => {
    adress.district = e.target.value;
    setAdress(adress);
    console.log(adress);
  };
  const handleAdressCity = (e) => {
    adress.city = e.target.value;
    setAdress(adress);
    console.log(adress);
  };
  const handleAdressState = (e) => {
    adress.state = e.target.value;
    setAdress(adress);
    console.log(adress);
  };

  const submitHandler = (e, cpf) => {
    const clients = JSON.parse(localStorage.getItem('clients'));
    e.preventDefault();
    if (!name || !birth) {
      window.alert('preencha todos os campos');
      return;
    }
    console.log(birth);
    console.log(cpf.replace(/[^\d]/g, ''));
    const strCPF = cpf.replace(/[^\d]/g, '').toString();
    const testaCPF = () => {
      var Soma;
      var Resto;
      Soma = 0;
      const existCpf = clients.find((client) => client.cpf === strCPF);
      if (existCpf) {
        return false;
      }
      if (strCPF === '00000000000') return false;

      for (let i = 1; i <= 9; i++)
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
      Resto = (Soma * 10) % 11;

      if (Resto === 10 || Resto === 11) Resto = 0;
      if (Resto !== parseInt(strCPF.substring(9, 10))) return false;

      Soma = 0;
      for (let i = 1; i <= 10; i++)
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
      Resto = (Soma * 10) % 11;

      if (Resto === 10 || Resto === 11) Resto = 0;
      if (Resto !== parseInt(strCPF.substring(10, 11))) return false;
      return true;
    };
    if (testaCPF()) {
      const newUser = {
        name,
        birth,
        cpf,
        gender,
        adress,
        status,
      };

      clients.push(newUser);
      localStorage.setItem('clients', JSON.stringify(clients));
      setNewUser(!newUser);

      setUsers(JSON.parse(localStorage.getItem('clients')));
    } else {
      window.alert('cpf invalido');
    }
  };

  return (
    <form onSubmit={(e) => submitHandler(e, cpf)} className="newUserForm">
      <div className="formRow">
        <div className="inputWrapper">
          <label>nome *</label>
          <input onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="inputWrapper">
          <label>birth *</label>
          <input type="date" onChange={(e) => setbirth(e.target.value)} />
        </div>
      </div>
      <div className="inputWrapper">
        <label>cpf *</label>
        <input value={cpf} maxLength={14} onChange={(e) => handleCpf(e)} />
      </div>
      <div className="inputWrapper">
        <label>genero *</label>
        <select name="select" onChange={(e) => handleGender(e)}>
          <option value="masculino" defaultValue>
            masculino
          </option>
          <option value="feminino">feminino</option>
          <option value="nao informado">nao informado</option>
        </select>
      </div>
      <div className="formRow">
        <div className="inputWrapper">
          <label>rua</label>
          <input
            id="ad"
            value={adress.rua}
            onChange={(e) => handleAdressStreet(e)}
          />
        </div>
        <div className="inputWrapper">
          <label>numero</label>
          <input onChange={(e) => handleAdressStreetNumber(e)} />
        </div>
        <div className="inputWrapper">
          <label>bairro</label>
          <input onChange={(e) => handleAdressDistrict(e)} />
        </div>
        <div className="inputWrapper">
          <label>cidade</label>
          <input onChange={(e) => handleAdressCity(e)} />
        </div>
        <div style={{ gridColumn: ' span 2' }} className="inputWrapper">
          <label>estado</label>
          <input onChange={(e) => handleAdressState(e)} />
        </div>
      </div>

      <div className="inputWrapper">
        <label>status *</label>
        <select onChange={(e) => handleStatus(e)} name="select">
          <option value="ativo" defaultValue>
            ativo
          </option>
          <option value="inativo">inativo</option>
        </select>
      </div>

      <button className="formSubmit" type="submit">
        submit
      </button>
    </form>
  );
}
