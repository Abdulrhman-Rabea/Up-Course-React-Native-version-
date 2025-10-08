import React from 'react';
import { View, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default function Card({ num, title, description }) {
    return (
        <View
            style={{
                flexBasis: '47%',
                backgroundColor: '#fff',
                borderRadius: 12,
                padding: 20,
                marginVertical: 8,
                elevation: 2,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                justifyContent: 'space-between',
            }}
        >
            <Text
                style={{
                    fontSize: 22,
                    fontWeight: '800',
                    color: '#001f3f',
                    marginBottom: 10,
                }}
            >
                {num}
            </Text>

            <Text
                style={{
                    fontSize: 16,
                    fontWeight: '700',
                    color: '#001f3f',
                    marginBottom: 6,
                }}
            >
                {title}
            </Text>

            <Text
                style={{
                    fontSize: 14,
                    color: '#555',
                    lineHeight: 20,
                    marginBottom: 20,
                }}
            >
                {description}
            </Text>

            <View
                style={{
                    alignSelf: 'flex-end',
                    backgroundColor: '#fff4e0',
                    padding: 6,
                    borderRadius: 8,
                }}
            >
                <Entypo name="export" size={16} color="#ff9500" />
            </View>
        </View>
    );
}