import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { Link, router } from "expo-router";

const Card = ({ image, title, rating, id }) => {
  const animation = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(animation, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const cardStyle = {
    transform: [{ scale: animation }],
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View href={`/product/${id}`} style={[styles.card, cardStyle]}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.rating}>Rating: {rating}</Text>
          <Link
            href={`/product/${id}`}
            className="p-3 px-4 border border-green-50 rounded-full bg-secondary-200  text-center mt-4 items-center justify-center"
          >
            <Text className="font-psemibold text-black-200">Show Detail</Text>
          </Link>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  infoContainer: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  rating: {
    fontSize: 16,
    color: "#777",
  },
});

export default Card;
