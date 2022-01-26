import { clients } from './utils/cientsData';
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Main from './components/Main/Main';
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
  const setLocalData = () => {
    localStorage.setItem('clients', JSON.stringify(clients));
    setUsers(clients);
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
        <Main
          queryResult={queryResult}
          setQueryResult={setQueryResult}
          newUserForm={newUserForm}
          setNewUser={setNewUser}
          users={users}
          setUsers={setUsers}
          userQuery={userQuery}
          setUserQuery={setUserQuery}
        />
      </div>
    </>
  );
}

export default App;
