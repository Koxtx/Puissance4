import { Outlet } from "react-router-dom";
import Header from "./compenents/Header/Header";

function App() {
  return (
    <div className={`mhFull`}>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
