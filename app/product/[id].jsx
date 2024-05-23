import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import useApi from "../../lib/useApI";
import { getProductById } from "../../lib/api";

const ProductDetails = () => {
  const { id } = useLocalSearchParams();
  const { data: Product } = useApi(() => getProductById(id));
  return (
    <View style={styles.container}>
      <Image source={{ uri: Product.image }} style={styles.image} />
      <Text style={styles.title}>{Product.title}</Text>
      <Text style={styles.rating}>Rating: {Product.rating?.rate}</Text>
      <Text style={styles.rating}>Price: {Product.price}</Text>
      <Text style={styles.description}>{Product.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  rating: {
    fontSize: 20,
    color: "#777",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#333",
  },
});

export default ProductDetails;
