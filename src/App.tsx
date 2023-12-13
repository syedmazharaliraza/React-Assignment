import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Common/Sidebar";
import HomePage from "./pages/Home";
import CustomerDetailsPage from "./pages/CustomerDetails";

const App = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="bg-gray-50 min-h-screen w-full">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:id" element={<CustomerDetailsPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
