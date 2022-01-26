import { clients } from './utils/cientsData';
import { useEffect, useState } from 'react';
import Form from './components/Form';
import EditUserForm from './components/EditUserForm';
import Sidebar from './components/Sidebar';
import { Edit } from '@mui/icons-material';
function App() {
  const [userQuery, setUserQuery] = useState('');
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem('clients'))
  );
  const [newUserForm, setNewUser] = useState(false);
  const [queryResult, setQueryResult] = useState(null);
  const findUser = (userName) => {
    if (!userName) {
      setQueryResult(null);
      setUserQuery('');
      return;
    }
    const user = users.find((user) => user.name === userName);
    setUserQuery('');
    setQueryResult(user);
  };
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
  const setLocalData = () => {
    localStorage.setItem('clients', JSON.stringify(clients));
    setUsers(clients);
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
    <>
      <header className="header">ACME</header>
      <div className="main">
        <Sidebar
          setUserQuery={setUserQuery}
          userQuery={userQuery}
          findUser={findUser}
          setNewUser={setNewUser}
          newUser={newUserForm}
          setLocalData={setLocalData}
        />

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
                <span
                  className="edit"
                  onClick={() => editUser(queryResult.cpf)}
                >
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
                rua: {queryResult.adress.street} numero:{' '}
                {queryResult.adress.number}
                bairo: {queryResult.adress.district}
                cidade: {queryResult.adress.city}
                estado: {queryResult.adress.state}
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
                        <p className="">nascimento: {client.birth}</p>
                        <p className="">cpf: {client.cpf}</p>
                        <p className="">genero: {client.gender}</p>
                      </div>
                      <p>endereço:</p>
                      <p>
                        rua: {client.adress.street} numero:{' '}
                        {client.adress.number}
                        bairo: {client.adress.district}
                        cidade: {client.adress.city}
                        estado: {client.adress.state}
                      </p>
                      <p>{client.status}</p>
                    </div>
                  )
                )
              : 'ola'}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
