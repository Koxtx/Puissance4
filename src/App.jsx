import { Outlet } from "react-router-dom";
import Header from "./compenents/Header/Header";
import UserProvider from "./Provider/UserProvider";
import GameProvider from "./Provider/GameProvider";
import GameSocketProvider from "./Provider/GameSocketProvider";
import SocketProvider from "./Provider/SocketProvider";
import style from "./App.module.scss";

function App() {
  return (
    <div className={`d-flex flex-column flex-fill mhFull ${style.app}`}>
      <UserProvider>
        <GameProvider>
          <SocketProvider>
            <GameSocketProvider>
              <Header />
              <Outlet />
            </GameSocketProvider>
          </SocketProvider>
        </GameProvider>
      </UserProvider>
    </div>
  );
}

export default App;
