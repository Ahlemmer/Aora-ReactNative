import { Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import Animated, { FadeInRight } from "react-native-reanimated";
import { capitalize } from "../constants/common";

const CategoryItem = ({ title, index, isActive, handleChangeCategory }) => {
  return (
    <Animated.View
      entering={FadeInRight.delay(index * 200)
        .duration(1000)
        .springify()
        .damping(14)}
    >
      <TouchableOpacity
        className={`p-3 px-4 border border-slate-50 rounded-full ${
          isActive ? "bg-secondary-100" : "bg-white"
        }`}
        onPress={() => handleChangeCategory(isActive ? null : title)}
      >
        <Text className="text-black-100 font-pregular">
          {capitalize(title)}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const Categories = ({ active, handleChangeCategory, categories }) => {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: "4%",
        gap: 8,
      }}
      data={categories}
      keyExtractor={(item) => item}
      renderItem={({ item, index }) => {
        return (
          <CategoryItem
            index={item}
            title={item}
            isActive={active === item}
            handleChangeCategory={handleChangeCategory}
          />
        );
      }}
    />
  );
};

export default Categories;
