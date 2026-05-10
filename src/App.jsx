import {BrowserRouter, Routes, Route} from "react-router-dom";
import RootLayout from "../src/layout/RootLayout.jsx";
import Main from "../src/pages/Main/Main.jsx"
import ProductDetail from "./pages/ProductDetail/ProductDetail.jsx";
import AddProduct from "./pages/AddProduct/AddProduct.jsx";
import DeleteProduct from "./pages/DeleteProduct/DeleteProduct.jsx";
import EditProduct from "./pages/EditProduct/EditProduct.jsx";

function App() {
  return (
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Main />} />
          <Route path="/item/:id" element={<ProductDetail />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/delete/:id" element={<DeleteProduct />} />
          <Route path="/edit/:id" element={<EditProduct />} />
        </Route>
      </Routes>
  );
}

export default App;
