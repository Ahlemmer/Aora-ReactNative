import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { capitalize } from "../constants/common";
import { EvilIcons } from "@expo/vector-icons";

const SectionView = ({ title, content }) => {
  return (
    <View className="gap-2">
      <Text className="text-xl font-semibold text-black-">
        {capitalize(title)}
      </Text>
      <View>{content}</View>
    </View>
  );
};
export const CommonFilterRow = ({ data, filterName, filter, setFilter }) => {
  const onSelect = (item) => {
    setFilter({ ...filter, [filterName]: item });
  };
  return (
    <View className="gap-3 flex-row flex-wrap">
      {data &&
        data.map((item, index) => {
          let isActive = filter && filter[filterName] == item;
          let backgroundColor = isActive ? "bg-secondary" : "bg-white";

          return (
            <TouchableOpacity
              key={index}
              onPress={() => onSelect(item)}
              className={`p-2 px-3 border border-gray-300 rounded-xl   ${backgroundColor} `}
            >
              <Text className={"text-black-100 font-pmedium"}>
                {capitalize(item)}
              </Text>
            </TouchableOpacity>
          );
        })}
    </View>
  );
};
export default SectionView;
