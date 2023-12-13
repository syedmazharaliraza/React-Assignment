import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Common/Sidebar";
import HomePage from "./pages/Home";
import CustomerDetailsPage from "./pages/CustomerDetails";

const App = () => {
  return (
    <div>
      <Sidebar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:customerId" element={<CustomerDetailsPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
