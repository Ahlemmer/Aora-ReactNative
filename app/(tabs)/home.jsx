import { memo, useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, RefreshControl, View } from "react-native";

import useApi from "../../lib/useApI";
import {
  Categories,
  EmptyState,
  FilterModal,
  Header,
  SearchInput,
} from "../../components";
import { getAllProducts, sortProducts } from "../../lib/api";
import Card from "../../components/Card";
import { debounce } from "lodash";

const Home = () => {
  const { data: Products, refetch } = useApi(getAllProducts);

  const [refreshing, setRefreshing] = useState(false);
  const [active, setActive] = useState(null);
  const [filter, setFilter] = useState(null);

  const [product, setProduct] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (Products) {
      setProduct(Products);
    }
  }, [Products]);

  useEffect(() => {
    if (query.length === 0) {
      if (active) {
        handleChangeCategory(active);
      } else {
        setProduct(Products);
      }
    }
  }, [query, Products, active]);

  const handleChangeCategory = useCallback(
    (cat) => {
      setActive(cat);
      setQuery("");
      if (cat) {
        const filteredResults = Products.filter(
          (item) => item.category.toLowerCase() === cat.toLowerCase()
        );
        setProduct(filteredResults);
      } else {
        setProduct(Products);
      }
    },
    [Products]
  );

  const modalRef = useRef(null);

  const openFilterModal = useCallback(() => {
    modalRef.current?.present();
  }, []);

  const closeFilterModal = useCallback(() => {
    modalRef.current?.close();
  }, []);

  const applyFilter = useCallback(async () => {
    if (filter) {
      if (filter.order) {
        const sort = filter.order === "popular" ? "desc" : "asc";
        const response = await sortProducts(sort);
        setProduct(response);
      }
    }
    closeFilterModal();
  }, [closeFilterModal, filter]);

  const resetFilter = useCallback(() => {
    setProduct(Products);
    setActive(null);
    setFilter(null);
    closeFilterModal();
  }, [closeFilterModal]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const handleSearch = useCallback(
    debounce((text) => {
      setQuery(text);

      if (text.length > 2) {
        const filteredResults = Products.filter((item) => {
          return (
            item.title.toLowerCase().includes(text.toLowerCase()) ||
            item.description.toLowerCase().includes(text.toLowerCase()) ||
            item.category.toLowerCase().includes(text.toLowerCase()) ||
            item.price.toString().includes(text) ||
            item.rating.rate.toString().includes(text)
          );
        });
        setProduct(filteredResults);
      }
    }, 400),
    [Products]
  );

  const backToHomePage = useCallback(() => {
    setProduct(Products);
    setQuery("");
  }, [Products]);

  const renderItem = useCallback(
    ({ item }) => (
      <Card
        image={item?.image}
        title={item?.title}
        rating={item?.rating?.rate}
        id={item?.id}
      />
    ),
    []
  );

  const uniqueCategories = [
    ...new Set(Products?.map((product) => product.category)),
  ];

  return (
    <SafeAreaView className="h-full bg-primary">
      <View className="flex px-4 space-y-6 pt-2">
        <Header openFilterModal={openFilterModal} />
        <SearchInput
          setQuery={setQuery}
          handleSearch={handleSearch}
          query={query}
        />

        {!query && (
          <View className="w-full pt-2 pb-2">
            <Categories
              active={active}
              handleChangeCategory={handleChangeCategory}
              categories={uniqueCategories}
            />
          </View>
        )}
      </View>
      <FlatList
        data={product}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        initialNumToRender={10}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: "center",
          paddingHorizontal: 10,
        }}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Product Found"
            subtitle="No Product added yet"
            backToHome={backToHomePage}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <FilterModal
        modalRef={modalRef}
        filter={filter}
        setFilter={setFilter}
        onClose={closeFilterModal}
        applyFilter={applyFilter}
        onReset={resetFilter}
      />
    </SafeAreaView>
  );
};

export default memo(Home);
