import './sidebar.css';
import { Search, PlusOne, Refresh } from '@mui/icons-material';

export default function Sidebar({
  setUserQuery,
  userQuery,
  findUser,
  setNewUser,
  newUser,
  setLocalData,
}) {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <input
              className="inputSearch"
              placeholder="buscar pelo nome"
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  findUser(userQuery);
                }
              }}
              onChange={(e) => {
                setUserQuery(e.target.value);
              }}
              value={userQuery}
            ></input>
          </li>
          <li onClick={() => findUser(userQuery)} className="sidebarListItem">
            <Search className="sidebarIcon" />
            <span className="sidebarListItemText">Procurar usuario</span>
          </li>
          <li onClick={() => setNewUser(!newUser)} className="sidebarListItem">
            <PlusOne className="sidebarIcon" />
            <span className="sidebarListItemText">
              {!newUser ? 'novo usuario' : 'ver usuarios'}
            </span>
          </li>
          <li onClick={setLocalData} className="sidebarListItem">
            <Refresh className="sidebarIcon" />
            <span className="sidebarListItemText">reset users</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
