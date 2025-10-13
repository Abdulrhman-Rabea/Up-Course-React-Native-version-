import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    Dimensions,
} from "react-native";
import { getUserEnrolledCourses } from "../lib/firebase";
import { getCurrentUser } from "../lib/firebase";
import MyCourseCard from "../components/MyCoursesCard";
import { useNavigation } from "@react-navigation/native";


const { width } = Dimensions.get("window");
const cardWidth = width / 2;

export default function MyCoursesScreen() {
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation()
    useEffect(() => {
        async function loadUserCourses() {
            try {
                const user = getCurrentUser();
                if (!user) {
                    console.warn("User not logged in");
                    setEnrolledCourses([]);
                    return;
                }

                const courses = await getUserEnrolledCourses(user.uid);
                setEnrolledCourses(courses);
            } catch (error) {
                console.error("Error loading enrolled courses:", error);
            } finally {
                setLoading(false);
            }
        }

        loadUserCourses();
    }, []);

    if (loading) {
        return (
            <View style={styles.spinnerContainer}>
                <ActivityIndicator size="large" color="#FF9500" />
            </View>
        );
    }

    if (enrolledCourses.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>You haven’t enrolled in any courses yet.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Sticky Header */}
            <View style={styles.headerWrapper}>
                <Text style={styles.header}>My Courses</Text>
            </View>

            <FlatList
                data={enrolledCourses}
                keyExtractor={(item, index) => item.id || index.toString()}
                numColumns={2}
                contentContainerStyle={styles.gridContainer}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={{ width: cardWidth }}>
                        <MyCourseCard
                            course={item}
                            onShowDetails={() =>
                                navigation.navigate("Courses", {
                                    screen: "CourseDetails",
                                    params: { courseId: item.id },
                                })
                            }
                        />
                    </View>
                )}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    headerWrapper: {
        backgroundColor: "#fff",
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    header: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#FF9500",
    },
    gridContainer: {
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 30,
    },
    spinnerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    emptyText: {
        fontSize: 16,
        color: "#555",
    },
});
