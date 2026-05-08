import FilterBar from "../../components/filter/FilterBar";
import FilterModal from "../../components/filter/FilterModal";
import ProductList from "../../components/product/ProductList";
import { useState } from "react";
import SortDropdown from "../../components/sort/SortDropdown";

export default function Main(){
  const [modalType, setModalType] = useState(null);

  return (
    <div>
      <FilterBar openModal={setModalType}/>
      <SortDropdown />
      <ProductList />

      {modalType && (
        <FilterModal modalType={modalType} closeModal={() => setModalType(null)} />
      )}
    </div>
  );
}