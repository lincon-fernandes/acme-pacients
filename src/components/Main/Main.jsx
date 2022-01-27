import React from 'react';
import Form from '../CreateUserForm/Form';
import EditUserForm from '../EditUserForm/EditUserForm';
import { Edit } from '@mui/icons-material';
export default function Main({
  newUserForm,
  setNewUser,
  users,
  setUsers,
  userQuery,
  setUserQuery,
  queryResult,
}) {
  const editUser = (userCpf) => {
    setUsers(
      users.map((user) => {
        if (user.cpf === userCpf) {
          user.editing = !user.editing;
        } else {
          user.editing = false;
        }
        return user;
      })
    );
  };

  const handleClose = (newUser) => {
    const findIndexUser = users.findIndex((user) => user.cpf === newUser.cpf);
    if (findIndexUser === -1) {
      return;
    }

    setUsers((oldUsers) =>
      oldUsers.map((user, index) => (index === findIndexUser ? newUser : user))
    );
  };
  const handleDelete = (newUser) => {
    const updatedUsers = users.filter((user) => user.cpf !== newUser.cpf);
    setUsers(updatedUsers);
    localStorage.removeItem('client');
    localStorage.setItem('clients', JSON.stringify(updatedUsers));
  };
  return (
    <div className="mainContainer">
      {newUserForm ? (
        <Form
          users={users}
          setUsers={setUsers}
          newUser={newUserForm}
          setNewUser={setNewUser}
        />
      ) : queryResult ? (
        <div className="clientsContainer">
          <div className="clientContainer">
            <div className="userEditRow">
              <p className="clientName">{queryResult.name}</p>
              <span className="edit" onClick={() => editUser(queryResult.cpf)}>
                <Edit />
              </span>
            </div>
            <div className="clientInfo">
              <p className="">nascimento: {queryResult.birth}</p>
              <p className="">cpf: {queryResult.cpf}</p>
              <p className="">genero: {queryResult.gender}</p>
            </div>
            <p>endereço:</p>
            <p>
              rua {queryResult.adress.street} n {queryResult.adress.number}
            </p>
            <p>
              {queryResult.adress.district}
              {' - '}
              {queryResult.adress.city}
              {', '}
              {queryResult.adress.state}
            </p>
            <p>{queryResult.status}</p>
          </div>
        </div>
      ) : (
        <div className="clientsContainer">
          {users
            ? users.map((client) =>
                client.editing ? (
                  <EditUserForm
                    key={client.cpf}
                    userName={client.name}
                    userCpf={client.cpf}
                    userBirth={client.birth}
                    userAdress={client.adress}
                    userGender={client.gender}
                    userStatus={client.status}
                    onClose={(newUser) => handleClose(newUser)}
                    onDelete={(newUser) => handleDelete(newUser)}
                  />
                ) : (
                  <div key={client.cpf} className="clientContainer">
                    <div className="userEditRow">
                      <p className="clientName">{client.name}</p>
                      <span
                        className="edit"
                        onClick={() => editUser(client.cpf)}
                      >
                        <Edit />
                      </span>
                    </div>
                    <div className="clientInfo">
                      <p className="">
                        <b>nascimento:</b> {client.birth}
                      </p>
                      <p className="">
                        <b>cpf:</b> {client.cpf}
                      </p>
                      <p className="">
                        <b>genero:</b> {client.gender}
                      </p>
                    </div>
                    <div className="clientInfo">
                      <p>
                        <b>Endereço</b>
                      </p>
                    </div>
                    <div className="clientInfo">
                      <p>
                        <b>Rua:</b> {client.adress.street}{' '}
                      </p>
                      <p>
                        <b>Nº:</b> {client.adress.number}
                      </p>
                      <p>
                        <b>Bairro:</b> {client.adress.district}
                      </p>
                      <p>
                        <b>Cidade: </b>
                        {client.adress.city}
                      </p>
                      <p>
                        <b>UF: </b>
                        {client.adress.state}
                      </p>
                    </div>
                  </div>
                )
              )
            : 'Bem vindo, adicione usuarios atravez da funçao reset ou novo usuario'}
        </div>
      )}
    </div>
  );
}
