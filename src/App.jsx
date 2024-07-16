import { Outlet } from "react-router-dom";
import Header from "./compenents/Header/Header";
import UserProvider from "./Provider/UserProvider";
import AllUsersProviders from "./Provider/AllUserProvider";
import GameProvider from "./Provider/GameProvider";
import SocketProvider from "./Provider/SocketProvider";

function App() {
  return (
    <div className={`d-flex flex-column flex-fill mhFull`}>
      <UserProvider>
        <AllUsersProviders>
          <GameProvider>
            <SocketProvider>
              <Header />
              <Outlet />
            </SocketProvider>
          </GameProvider>
        </AllUsersProviders>
      </UserProvider>
    </div>
  );
}

export default App;
