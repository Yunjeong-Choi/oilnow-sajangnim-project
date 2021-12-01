import { BrowserRouter, Routes, Route } from "react-router-dom";
import Payment from "./containers/Payment";
import PayDetail from "./components/payment/PayDetail";
// import Payment from "@containers/Payment";
// import PayDetail from "@components/payment/PayDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Payment />} />
        <Route path="/pay/:id" element={<PayDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
