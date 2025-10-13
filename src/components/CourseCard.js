// src/components/CourseCard.js
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistSlice";

import { View, Text, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function CourseCard({ course, onEnroll }) {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
   const dispatch = useDispatch();
const wishlist = useSelector((state) => state.wishlist.items);

const isWishlisted = wishlist.some((item) => item.id === course.id);

const toggleWishlist = () => {
    if (isWishlisted) {
        dispatch(removeFromWishlist(course.id));
    } else {
        dispatch(addToWishlist(course));
    }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <View
            style={{
                width: '48%',
                backgroundColor: '#fff',
                borderRadius: 12,
                marginBottom: 20,
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2,
                overflow: 'hidden',
            }}
        >
            {/* Thumbnail */}
            <Image
                source={{ uri: course.imageUrl }}
                style={{
                    width: '100%',
                    height: 140,
                }}
                resizeMode="cover"
            />

            {/* Body */}
            <View style={{ padding: 10 }}>
                {/* Title */}
                <Text
                    numberOfLines={1}
                    style={{
                        fontSize: 16,
                        fontWeight: '700',
                        color: '#001f3f',
                        marginBottom: 4,
                    }}
                >
                    {course.title}
                </Text>

                {/* Category */}
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 4,
                    }}
                >
                    <View
                        style={{
                            width: 8,
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: '#ff9500',
                            marginRight: 5,
                        }}
                    />
                    <Text style={{ fontSize: 13, color: '#777' }}>{course.category}</Text>
                </View>

                {/* Description */}
                <Text
                    numberOfLines={2}
                    style={{
                        fontSize: 13,
                        color: '#555',
                        marginBottom: 8,
                    }}
                >
                    {course.description}
                </Text>

                {/* Price + Enroll */}
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 6,
                    }}
                >
                    <Text style={{ fontWeight: '600', color: '#555' }}>
                        Price: <Text style={{ color: '#ff9500' }}>${course.price}</Text>
                    </Text>

                    <TouchableOpacity
                        onPress={onEnroll}
                        style={{
                            backgroundColor: '#ff9500',
                            borderRadius: 8,
                            paddingVertical: 6,
                            paddingHorizontal: 14,
                        }}
                    >
                        <Text style={{ color: '#fff', fontWeight: '600', fontSize: 13 }}>Enroll</Text>
                    </TouchableOpacity>
                </View>
            </View>




            {/* Wishlist Icon */}
         <TouchableOpacity
                onPress={toggleWishlist}
                style={{ position: 'absolute', top: 8, right: 8 }}
            >
                <FontAwesome
                    name={isWishlisted ? "heart" : "heart-o"}
                    size={20}
                    color={isWishlisted ? "red" : "#555"}
                />
        </TouchableOpacity>




            {/* Favorite icon
            <View style={{ position: 'absolute', top: 8, right: 8 }}>
                <FontAwesome name="heart-o" size={18} color="#555" />
            </View> */}

        </View>
    );
}
