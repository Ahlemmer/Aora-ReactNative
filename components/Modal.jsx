import { View, Text, Modal, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import FormField from "./FormField";
import CustomButton from "./CustomButton";

const ModalComponent = ({
  visible,
  handleVisibleModal,
  buttonTitle,
  product,
  setProduct,
  saveButton,
}) => {
  return (
    <Modal animationType="slide" visible={visible}>
      <SafeAreaView className="bg-primary h-full">
        <ScrollView className="p-4 mt-3">
          <TouchableOpacity onPress={handleVisibleModal}>
            <Text
              className="font-pbold my-4 text-right"
              onPress={handleVisibleModal}
            >
              Close
            </Text>
          </TouchableOpacity>

          <FormField
            title={"title"}
            otherStyles="mt-4"
            placeholder={"title"}
            value={product?.title}
            handleChangeText={(e) => setProduct({ ...product, title: e })}
          />
          <FormField
            title={"Price"}
            otherStyles="mt-4"
            placeholder={"Price"}
            value={product?.price}
            handleChangeText={(e) => setProduct({ ...product, price: e })}
          />
          <FormField
            title="Category"
            otherStyles="mt-7"
            placeholder={"Category"}
            value={product?.category}
            handleChangeText={(e) => setProduct({ ...product, category: e })}
          />
          <FormField
            title={"Image"}
            otherStyles="mt-4"
            placeholder={"Image URL"}
            value={product?.image}
            handleChangeText={(e) => setProduct({ ...product, image: e })}
          />
          <FormField
            title={"Description"}
            otherStyles="mt-4"
            placeholder={"Description"}
            value={product?.image}
            handleChangeText={(e) => setProduct({ ...product, description: e })}
          />

          <CustomButton
            title={buttonTitle}
            containerStyles={"mt-4"}
            handlePress={saveButton}
          />
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

export default ModalComponent;
