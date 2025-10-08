
import { React, useRef, useEffect, useState } from 'react';

import { View, Text, TouchableOpacity, Image, ScrollView, Animated, Pressable } from 'react-native'
import { FontAwesome, FontAwesome5, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import Fontisto from '@expo/vector-icons/Fontisto';
import { useVideoPlayer, VideoView } from 'expo-video';
import Card from '../components/card';
import { getLatestCourses } from '../lib/firebase';



const companies = [
    { name: 'Zapier', icon: <Entypo name="flash" size={22} color="#FF8000" /> },
    { name: 'Spotify', icon: <FontAwesome name="spotify" size={22} color="#1DB954" /> },
    { name: 'Zoom', icon: <MaterialCommunityIcons name="video" size={22} color="#2D8CFF" /> },
    { name: 'Amazon', icon: <FontAwesome5 name="amazon" size={22} color="#FF9900" /> },
    { name: 'Adobe', icon: <Fontisto name="adobe" size={24} color="red" /> },
    { name: 'Behance', icon: <Entypo name="behance" size={24} color="#2D8CFF" /> },
    { name: 'Netflix', icon: <Fontisto name="netflix" size={24} color="red" /> },
];


export default function HomeScreen({ navigation }) {


    const [latestCourses, setLatestCourses] = useState([]);
    const [loadingCourses, setLoadingCourses] = useState(true);
    useEffect(() => {
        async function loadCourses() {
            try {
                const courses = await getLatestCourses(3);
                setLatestCourses(courses);
            } catch (error) {
                console.log('Error fetching latest courses:', error);
            } finally {
                setLoadingCourses(false);
            }
        }
        loadCourses();
    }, []);


    const player = useVideoPlayer('https://www.w3schools.com/html/mov_bbb.mp4', (player) => {
        player.loop = true;
        player.play();
    });

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: '#fdfaf6' }}
            contentContainerStyle={{
                alignItems: 'center',
                paddingVertical: 40,
                paddingHorizontal: 20,
            }}
        >

            <Text
                style={{
                    fontSize: 28,
                    fontWeight: '800',
                    color: '#ff9500',
                    textAlign: 'center',
                    marginTop: 10,
                }}
            >
                ⚡ Unlock Your
            </Text>
            <Text
                style={{
                    fontSize: 28,
                    fontWeight: '800',
                    color: '#ff9500',
                    textAlign: 'center',
                    marginBottom: 10,
                }}
            >
                Creative Potential
            </Text>

            {/* Subtitle */}
            <Text
                style={{
                    fontSize: 15,
                    textAlign: 'center',
                    color: '#444',
                    lineHeight: 22,
                    marginBottom: 20,
                }}
            >
                with Online Design and Development Courses. Learn from Industry Experts
                and Enhance Your Skills.
            </Text>

            {/* Buttons */}
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 15,
                    marginBottom: 50,
                }}
            >
                <TouchableOpacity
                    style={{
                        backgroundColor: '#ff9500',
                        paddingVertical: 12,
                        paddingHorizontal: 22,
                        borderRadius: 8,
                    }}
                    onPress={() => navigation.navigate('Courses')}
                >
                    <Text style={{ color: '#fff', fontWeight: '600' }}>Explore Courses</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        backgroundColor: '#ff9500',
                        paddingVertical: 12,
                        paddingHorizontal: 22,
                        borderRadius: 8,
                        opacity: 0.9,
                    }}
                    onPress={() => console.log('View Pricing')}
                >
                    <Text style={{ color: '#fff', fontWeight: '600' }}>View Pricing</Text>
                </TouchableOpacity>
            </View>

            {/* Companies Row */}
            <View
                style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 25,
                    paddingVertical: 10,
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: '#eee',
                    width: '100%',
                }}
            >
                {companies.map((item, index) => {
                    const scaleAnim = useRef(new Animated.Value(1)).current;

                    const handlePressIn = () => {
                        Animated.spring(scaleAnim, {
                            toValue: 2.15,
                            useNativeDriver: true,
                        }).start();
                    };

                    const handlePressOut = () => {
                        Animated.spring(scaleAnim, {
                            toValue: 1,
                            friction: 5,
                            useNativeDriver: true,
                        }).start();
                    };

                    return (
                        <Pressable
                            key={index}
                            onPressIn={handlePressIn}
                            onPressOut={handlePressOut}

                        >
                            <Animated.View
                                style={{
                                    transform: [{ scale: scaleAnim }],
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {item.icon}
                                <Text
                                    style={{
                                        fontSize: 14,
                                        color: '#444',
                                        fontWeight: '500',
                                        marginTop: 3,
                                    }}
                                >
                                    {item.name}
                                </Text>
                            </Animated.View>
                        </Pressable>
                    );
                })}
            </View>



            <View style={{ width: '100%', height: 220, borderRadius: 12, overflow: 'hidden', marginTop: 20 }}
            >
                <View style={{ width: '100%', height: 220, borderRadius: 12, overflow: 'hidden', marginTop: 20 }}>
                    <VideoView
                        player={player}
                        style={{ width: '100%', height: '100%' }}
                        contentFit="cover"
                        allowsFullscreen
                    />
                </View>


            </View>
            <View
                style={{
                    width: '100%',
                    marginTop: 40,
                }}
            >
                <Text
                    style={{
                        fontSize: 22,
                        fontWeight: '800',
                        color: '#001f3f',
                        textAlign: 'center',
                        marginBottom: 6,
                    }}
                >
                    Benefits
                </Text>

                <Text
                    style={{
                        fontSize: 15,
                        color: '#555',
                        textAlign: 'center',
                        marginBottom: 25,
                    }}
                >
                    Learn from industry experts and enhance your skills.
                </Text>
                {/* Benefits sec */}
                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                    }}
                >
                    <Card
                        num="01"
                        title="Flexible Learning Schedule"
                        description="Fit your coursework around your existing commitments."
                    />
                    <Card
                        num="02"
                        title="Expert Instruction"
                        description="Learn from industry experts with real-world experience."
                    />
                    <Card
                        num="03"
                        title="Diverse Course Offerings"
                        description="Explore a wide range of design and development courses."
                    />
                    <Card
                        num="04"
                        title="Updated Curriculum"
                        description="Access up-to-date content reflecting industry trends."
                    />
                    <Card
                        num="05"
                        title="Practical Projects and Assignments"
                        description="Develop a portfolio showcasing your skills and abilities."
                    />
                    <Card
                        num="06"
                        title="Interactive Learning Environment"
                        description="Collaborate and exchange ideas with fellow learners."
                    />
                </View>
            </View>
            <View style={{ width: '100%', marginTop: 40 }}>
                <Text
                    style={{
                        fontSize: 22,
                        fontWeight: '800',
                        color: '#001f3f',
                        textAlign: 'center',
                        marginBottom: 6,
                    }}
                >
                    Latest Courses
                </Text>

                <Text
                    style={{
                        fontSize: 15,
                        color: '#555',
                        textAlign: 'center',
                        marginBottom: 25,
                    }}
                >
                    Explore our newest programming courses.
                </Text>

                {loadingCourses ? (
                    <Text style={{ textAlign: 'center', color: '#777' }}>Loading...</Text>
                ) : latestCourses.length === 0 ? (
                    <Text style={{ textAlign: 'center', color: '#777' }}>No courses found.</Text>
                ) : (
                    <View
                        style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                        }}
                    >
                        {latestCourses.map((course) => (
                            <TouchableOpacity
                                key={course.id}
                                style={{
                                    width: '48%',
                                    backgroundColor: '#fff',
                                    borderRadius: 10,
                                    marginBottom: 15,
                                    shadowColor: '#000',
                                    shadowOpacity: 0.1,
                                    shadowRadius: 4,
                                    elevation: 2,
                                }}
                                onPress={() =>
                                    navigation.navigate('CourseDetails', {
                                        courseId: course.id,
                                        playlistId: course.playlistId,
                                        title: course.title,
                                    })
                                }
                            >
                                <Image
                                    source={{ uri: course.imageUrl }}
                                    style={{ width: '100%', height: 140, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                                />
                                <View style={{ padding: 10 }}>
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            fontWeight: '700',
                                            color: '#001f3f',
                                            marginBottom: 6,
                                        }}
                                    >
                                        {course.title}
                                    </Text>
                                    <Text
                                        numberOfLines={2}
                                        style={{
                                            fontSize: 13,
                                            color: '#555',
                                        }}
                                    >
                                        {course.description}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>

        </ScrollView >
    );
}
