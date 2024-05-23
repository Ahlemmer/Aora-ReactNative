import { View, Text, StyleSheet } from "react-native";
import React, { useMemo } from "react";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";

import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";
import SectionView, { CommonFilterRow } from "./FilterSection";
import { capitalize } from "../constants/common";
import CustomButton from "./CustomButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

const FilterModal = ({
  modalRef,
  filter,
  setFilter,
  onClose,
  applyFilter,
  onReset,
}) => {
  const snapPoints = useMemo(() => ["40%"], []);
  const filters = {
    order: ["popular", "latest"],
  };

  return (
    <BottomSheetModal
      ref={modalRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={CustomBackdrop}
    >
      <BottomSheetView className="flex-1 items-center">
        <View className=" gap-4 py-3 px-5 ">
          <View className=" flex-row items-center gap-3 ">
            <Text className="text-2xl font-semibold text-black-100 flex-1  ">
              Filters
            </Text>
            <TouchableOpacity onPress={onClose}>
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>

          {Object.keys(section).map((sectionName, index) => {
            let sectionView = section[sectionName];

            let title = capitalize(sectionName);
            let sectionData = filters[sectionName];
            return (
              <View key={sectionName}>
                <SectionView
                  title={title}
                  content={sectionView({
                    data: sectionData,
                    filter,
                    setFilter,
                    filterName: sectionName,
                  })}
                />
              </View>
            );
          })}
        </View>
        <View className=" flex-row items-center gap-3 mx-4 my-2  ">
          <CustomButton
            title={"Reset"}
            handlePress={onReset}
            containerStyles={"flex-[0.5] mr-3 bg-black-200"}
            textStyles={"text-white"}
          />
          <CustomButton
            title={"Apply"}
            handlePress={applyFilter}
            containerStyles={"flex-[0.5]"}
          />
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};
const CustomBackdrop = ({ animatedIndex, style }) => {
  const containerAnimatedStyle = useAnimatedStyle(() => {
    let opacity = interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 1],
      Extrapolation.CLAMP
    );
    return {
      opacity,
    };
  });
  const containerStyle = [
    StyleSheet.absoluteFill,
    style,
    containerAnimatedStyle,
  ];
  return (
    <Animated.View
      style={[containerStyle, { backgroundColor: "rgba(0, 0, 0, 0.5)" }]}
    >
      <BlurView style={[StyleSheet.absoluteFill]} tint="dark" intensity={25} />
    </Animated.View>
  );
};

const section = {
  order: (props) => <CommonFilterRow {...props} />,
};

export default FilterModal;
