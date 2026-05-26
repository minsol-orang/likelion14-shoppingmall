import FilterBar from "../../components/filter/FilterBar";
import FilterModal from "../../components/filter/FilterModal";
import ProductList from "../../components/product/ProductList";
import SortDropdown from "../../components/sort/SortDropdown";
import { useEffect, useState } from "react";
import { getItems } from "../../api/shop";

export default function Main() {
  const [modalType, setModalType] = useState(null);

  // 현재 보고 있는 큰 카테고리: clothes 또는 shoes
  const [selectedCategory, setSelectedCategory] = useState("clothes");

  // 서버에서 받아온 상품 목록
  const [products, setProducts] = useState([]);

  // API query parameter로 보낼 필터들
  const [filters, setFilters] = useState({});

  // 가격대는 Swagger GET 목록 조회 query에 없으니까 프론트에서 따로 처리
  const [priceRange, setPriceRange] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getItems(selectedCategory, filters);
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("상품 목록 조회 실패:", error);
        setProducts([]);
      }
    }

    fetchProducts();
  }, [selectedCategory, filters]);

  const handleSelectFilter = (filterType, option) => {
    // 종류는 path parameter를 바꾸는 필터
    if (filterType === "종류") {
      const category = option === "의류" ? "clothes" : "shoes";

      setSelectedCategory(category);

      // 카테고리 바뀌면 기존 필터 초기화하는 게 안전함
      setFilters({});
      setPriceRange("");
      setModalType(null);
      return;
    }

    // 성별은 API가 male, female, unisex를 원함
    if (filterType === "성별") {
      const genderValue =
        option === "남성" ? "male" : option === "여성" ? "female" : "unisex";

      setFilters((prev) => ({
        ...prev,
        gender: genderValue,
      }));

      setModalType(null);
      return;
    }

    // 색상은 API 값과 버튼 값이 같음
    if (filterType === "색상") {
      setFilters((prev) => ({
        ...prev,
        color: option,
      }));

      setModalType(null);
      return;
    }

    // 사이즈도 API 값과 버튼 값이 같음
    if (filterType === "사이즈") {
      setFilters((prev) => ({
        ...prev,
        size: option,
      }));

      setModalType(null);
      return;
    }

    // Swagger 목록 조회 API에는 가격대 query가 없어서 프론트에서 따로 처리
    if (filterType === "가격대") {
      setPriceRange(option);
      setModalType(null);
      return;
    }
  };

  const filteredProducts = products.filter((product) => {
    if (!priceRange) return true;

    const price = Number(product.price);

    if (priceRange === "0~30") {
      return price >= 0 && price <= 30;
    }

    if (priceRange === "31~60") {
      return price >= 31 && price <= 60;
    }

    if (priceRange === "60~90") {
      return price >= 60 && price <= 90;
    }

    return true;
  });

  return (
    <div>
      <FilterBar openModal={setModalType} />
      <SortDropdown />

      <ProductList
        products={filteredProducts}
        categoryType={selectedCategory}
      />

      {modalType && (
        <FilterModal
          modalType={modalType}
          closeModal={() => setModalType(null)}
          onSelectFilter={handleSelectFilter}
        />
      )}
    </div>
  );
}