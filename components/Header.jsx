import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { images } from "../constants";
import { FontAwesome6 } from "@expo/vector-icons";

const Header = ({ openFilterModal }) => {
  return (
    <View className="flex justify-between items-start flex-row mb-6">
      <TouchableOpacity activeOpacity={0.7}>
        <Text className="text-secondary-200 font-psemibold text-2xl">Aora</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7} onPress={() => openFilterModal()}>
        <FontAwesome6 name="bars-staggered" size={22} color="#161622" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
