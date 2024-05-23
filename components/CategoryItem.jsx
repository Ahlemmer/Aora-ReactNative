import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Animated, { FadeInRight } from "react-native-reanimated";

const CategoryItem = ({ title, index, isActive, handelChangeCategory }) => {
  return (
    <Animated.View
      entering={FadeInRight.delay(index * 200)
        .duration(1000)
        .springify()
        .damping(14)}
    >
      <TouchableOpacity
        className={`p-3 px-4 border border-green-50 rounded-full ${
          isActive ? "bg-secondary-100" : "bg-white"
        }`}
        onPress={() => handelChangeCategory(isActive ? null : title)}
      >
        <Text className="text-black-100">{title}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default CategoryItem;
