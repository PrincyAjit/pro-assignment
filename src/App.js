import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { CustomerRoute, AdminRoute } from './routes';
import Homepage from './pages/Homepage';

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/customer/*" element={<CustomerRoute />} />
        <Route path="/admin/*" element={<AdminRoute />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
