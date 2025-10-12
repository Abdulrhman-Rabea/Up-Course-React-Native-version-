
import React from "react";
import { View, Text, FlatList } from "react-native";
import { useSelector } from "react-redux";
import CourseCard from "../components/CourseCard";

export default function WishlistScreen() {
  const wishlist = useSelector((state) => state.wishlist.items);

  if (wishlist.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f8f9fa",
        }}
      >
        <Text style={{ fontSize: 16, color: "#555" }}>
          Your wishlist is empty.
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#f8f9fa" }}>
      <FlatList
        data={wishlist}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <CourseCard
            course={item}
            onEnroll={() => console.log("Enroll:", item.title)}
          />
        )}
      />
    </View>
  );
}
