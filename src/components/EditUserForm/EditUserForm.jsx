import { Close, Delete } from '@mui/icons-material';
import React, { useState } from 'react';
import './editUser.css';
export default function EditUserForm({
  userName,
  userCpf,
  userBirth,
  userAdress,
  userGender,
  userStatus,
  onClose,
  onDelete,
}) {
  const [name, setName] = useState(userName);
  const [birth, setBirth] = useState(userBirth);
  const [adress, setAdress] = useState(userAdress);
  const [gender, setGender] = useState(userGender);
  const [status, setStatus] = useState(userStatus);
  return (
    <div className={`clientContainer borderRed`}>
      <div className="userEditRow" style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          onChange={({ target: { value } }) => setName(value)}
          value={name}
        />
        <span className="editOptions">
          <Close
            color="success"
            onClick={() =>
              onClose({ name, cpf: userCpf, birth, adress, gender, status })
            }
            style={{ cursor: 'pointer' }}
          />
          <Delete
            color="error"
            style={{ cursor: 'pointer' }}
            onClick={() => onDelete({ cpf: userCpf })}
          />
        </span>
      </div>
      <div className="userEditRow">
        <input
          onChange={({ target: { value } }) => setBirth(value)}
          type="date"
          value={birth}
        ></input>
        <input disabled value={userCpf}></input>
      </div>
      <div className="userEditRow">
        <div className="editInputWrapper">
          <label>rua</label>
          <input
            value={adress.street}
            onChange={({ target: { value } }) =>
              setAdress({ ...adress, street: value })
            }
          />
        </div>
        <div className="editInputWrapper">
          <label>numero</label>
          <input
            onChange={({ target: { value } }) =>
              setAdress({ ...adress, number: value })
            }
            value={adress.number}
          />
        </div>
        <div className="editInputWrapper">
          <label>bairro</label>
          <input
            onChange={({ target: { value } }) =>
              setAdress({ ...adress, district: value })
            }
            value={adress.district}
          />
        </div>
        <div className="editInputWrapper">
          <label>cidade</label>
          <input
            onChange={({ target: { value } }) =>
              setAdress({ ...adress, city: value })
            }
            value={adress.city}
          />
        </div>
        <div className="editInputWrapper">
          <label>estado</label>
          <input
            onChange={({ target: { value } }) =>
              setAdress({ ...adress, state: value })
            }
            value={adress.state}
          />
        </div>
      </div>

      <div className="userEditRow">
        <div>
          <div className="editInputWrapper">
            <label style={{ marginRight: ' 15px' }}>genero</label>
            <select
              name="select"
              onChange={({ target: { value } }) => setGender(value)}
              value={gender}
            >
              <option value="masculino">masculino</option>
              <option value="feminino">feminino</option>
              <option value="nao informado">nao informado</option>
            </select>
          </div>
        </div>
        <div>
          <div className="editInputWrapper">
            <label style={{ marginRight: ' 15px' }}>status</label>
            <select
              onChange={({ target: { value } }) => setStatus(value)}
              value={status}
            >
              <option value="ativo">ativo</option>
              <option value="inativo">inativo</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
