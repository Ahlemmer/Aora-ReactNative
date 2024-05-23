import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";

import { ModalComponent } from "../../components";
import { useState } from "react";
import { Image } from "expo-image";
import {
  createProduct,
  DeleteProduct,
  getAllProducts,
  updateProduct,
} from "../../lib/api";
import useApi from "../../lib/useApI";
import { capitalize, formatPrice } from "../../constants/common";

const Create = () => {
  const { data: Products } = useApi(getAllProducts);
  const [visible, setVisible] = useState(false);

  const [product, setProduct] = useState({
    title: "",
    price: 0,
    category: "",
    image: "",
    description: "",
  });
  const [hideId, setHideId] = useState(null);
  const handleVisibleModal = () => {
    setVisible(!visible);
    setHideId(null);
  };

  const handelDelete = async (item) => {
    try {
      if (item) {
        await DeleteProduct(item.id);
        Alert.alert("Success", "Product deleted successfully");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to delete product");
      console.error(error);
    }
  };

  const handelSave = async () => {
    if (
      !product.title ||
      !product.price ||
      !product.description ||
      !product.category ||
      !product.image
    ) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    const productData = {
      title: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category,
    };
    try {
      const response = await createProduct(productData);
      Alert.alert("Success", "Product created successfully");
      console.log(response.data);
    } catch (error) {
      Alert.alert("Error", "Failed to create product");
      console.error(error);
    }
  };

  const handleEdit = async () => {
    if (
      !product.title ||
      !product.price ||
      !product.description ||
      !product.category ||
      !product.image
    ) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    const productData = {
      title: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category,
    };
    try {
      if (hideId) {
        const response = await updateProduct(productData, hideId);
        Alert.alert("Success", "Product updated successfully");
        console.log("Updated product:", response.data);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to save product");
      console.error(error);
    }
  };
  const openEditModal = (item) => {
    setVisible(true);
    setHideId(item.id);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-2">
        <View className="flex justify-between items-start flex-row mb-6">
          <TouchableOpacity activeOpacity={0.7}>
            <Text className="text-black-200 font-psemibold text-2xl">
              Product
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleVisibleModal}
            className="flex p-4 bg-black"
          >
            <Text className="text-white  font-psemibold">New Product</Text>
          </TouchableOpacity>
        </View>
        <ModalComponent
          visible={visible}
          handleVisibleModal={handleVisibleModal}
          buttonTitle={hideId == null ? "Save" : "Update"}
          product={product}
          setProduct={setProduct}
          saveButton={hideId ? handleEdit : handelSave}
        />
        <ScrollView>
          {Products.map((item, index) => {
            return (
              <View
                className="flex-row justify-between p-4 border border-gray-200 mb-2"
                key={index}
              >
                <View className="flex-row items-center">
                  <Image
                    source={{ uri: item?.image }}
                    className="w-12 h-12 mr-2"
                  />
                  <View>
                    <Text className="font-bold text-lg mt-1 flex-wrap w-48">
                      {item.title}
                    </Text>
                    <Text className="mt-1">{formatPrice(item.price)} $</Text>
                    <Text className="mt-2 text-secondary-200 font-psemibold">
                      {capitalize(item.category)}
                    </Text>
                  </View>
                </View>
                <View>
                  <TouchableOpacity onPress={() => handelDelete(item)}>
                    <Text className="font-bold text-green-800 text-sm">
                      Delete
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => openEditModal(item)}>
                    <Text className="font-bold text-blue-800 text-sm mt-1">
                      Edit
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
