import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function MyCourseCard({ course, onShowDetails }) {
    return (
        <View
            style={{
                flex: 1, // fill available space from FlatList column
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
                    width: '88%',
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

                {/* Show Details */}
                <TouchableOpacity
                    onPress={onShowDetails}
                    style={{
                        backgroundColor: '#ff9500',
                        borderRadius: 8,
                        paddingVertical: 6,
                        alignItems: 'center',
                        marginTop: 6,
                    }}
                >
                    <Text style={{ color: '#fff', fontWeight: '600', fontSize: 13 }}>Show Details</Text>
                </TouchableOpacity>
            </View>

            {/* Favorite icon */}
            <View style={{ position: 'absolute', top: 8, right: 8 }}>
                <FontAwesome name="heart-o" size={18} color="#555" />
            </View>
        </View>
    );
}
