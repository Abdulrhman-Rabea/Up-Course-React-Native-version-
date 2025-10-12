import React, { useEffect, useState, useCallback } from "react";
import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    Modal,
    ActivityIndicator,
    StyleSheet,
} from "react-native";
import { Video } from "expo-av";
import { useRoute } from "@react-navigation/native";
import { getData } from "../lib/firebase";
import { fetchPlaylistVideos } from "../lib/CallYoutubeApi";

export default function CourseDetailsScreen() {
    const route = useRoute();
    const { courseId } = route.params || {};

    const [course, setCourse] = useState(null);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [modalVisible, setModalVisible] = useState(false);
    const [activeVideo, setActiveVideo] = useState(null);

    useEffect(() => {
        async function loadCourse() {
            try {
                setLoading(true);
                setError("");

                const data = await getData("courses", courseId);
                if (!data) throw new Error("Course not found");

                setCourse(data);

                if (data.playlistId) {
                    const vids = await fetchPlaylistVideos(data.playlistId, 20);
                    setVideos(vids);
                }
            } catch (err) {
                setError(err.message || "Failed to load course");
            } finally {
                setLoading(false);
            }
        }

        if (courseId) loadCourse();
    }, [courseId]);

    const openVideo = useCallback((video) => {
        setActiveVideo(video);
        setModalVisible(true);
    }, []);

    const closeModal = useCallback(() => {
        setModalVisible(false);
        setActiveVideo(null);
    }, []);

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#007bff" />
            </View>
        );
    }

    if (error || !course) {
        return (
            <View style={styles.centered}>
                <Text style={{ color: "red" }}>{error || "Course not found"}</Text>
            </View>
        );
    }

    return (
        <ScrollView
            contentContainerStyle={{ padding: 16, backgroundColor: "#f8fafc" }}
            showsVerticalScrollIndicator={false}
        >
            {/* Thumbnail */}
            {course.imageUrl && (
                <Image
                    source={{ uri: course.imageUrl }}
                    style={styles.thumbnail}
                    resizeMode="cover"
                />
            )}

            {/* Title & Description */}
            <Text style={styles.title}>{course.title}</Text>
            <Text style={styles.description}>{course.description}</Text>

            {/* Badges */}
            <View style={styles.badgeRow}>
                {course.level && <Text style={styles.badge}>{course.level}</Text>}
                {course.duration && <Text style={styles.badge}>{course.duration}</Text>}
                {course.category && <Text style={styles.badge}>{course.category}</Text>}
            </View>

            {/* Curriculum Section */}
            <Text style={styles.sectionTitle}>Curriculum Preview</Text>

            {videos.length > 0 ? (
                <View style={styles.videoGrid}>
                    {videos.map((v) => (
                        <TouchableOpacity
                            key={v.id}
                            style={styles.videoCard}
                            onPress={() => openVideo(v)}
                            activeOpacity={0.8}
                        >
                            <Image
                                source={{ uri: v.thumbnail }}
                                style={styles.videoThumbnail}
                                resizeMode="cover"
                            />
                            <Text numberOfLines={2} style={styles.videoTitle}>
                                {v.title}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            ) : (
                <Text style={{ color: "#6b7280", fontSize: 14 }}>
                    No videos found for this course.
                </Text>
            )}

            {/* Instructor Info */}
            {course.instructor && (
                <View style={styles.instructorBox}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Image
                            source={{ uri: course.instructor.avatar }}
                            style={styles.instructorAvatar}
                        />
                        <View style={{ marginLeft: 10 }}>
                            <Text style={styles.instructorName}>
                                {course.instructor.name}
                            </Text>
                            {course.instructor.title && (
                                <Text style={styles.instructorTitle}>
                                    {course.instructor.title}
                                </Text>
                            )}
                        </View>
                    </View>
                    {course.instructor.bio && (
                        <Text style={styles.instructorBio}>{course.instructor.bio}</Text>
                    )}
                </View>
            )}

            {/* Modal Video Player */}
            <Modal
                visible={modalVisible}
                animationType="fade"
                transparent
                onRequestClose={closeModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                            <Text style={{ color: "#fff", fontSize: 16 }}>✕</Text>
                        </TouchableOpacity>
                        {activeVideo && (
                            <Video
                                source={{
                                    uri: `https://www.youtube.com/watch?v=${activeVideo.id}`,
                                }}
                                useNativeControls
                                resizeMode="contain"
                                style={{ width: "100%", height: 220, backgroundColor: "black" }}
                            />
                        )}
                        <Text style={styles.modalVideoTitle}>{activeVideo?.title}</Text>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    thumbnail: {
        width: "100%",
        height: 200,
        borderRadius: 12,
        marginBottom: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        color: "#1e293b",
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: "#4b5563",
        marginBottom: 12,
    },
    badgeRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 20,
    },
    badge: {
        backgroundColor: "#e0f2fe",
        color: "#0369a1",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        fontSize: 12,
        fontWeight: "600",
        marginRight: 8,
        marginBottom: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1e293b",
        marginBottom: 10,
    },
    videoGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    videoCard: {
        width: "48%",
        backgroundColor: "#fff",
        borderRadius: 10,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 2,
        overflow: "hidden",
    },
    videoThumbnail: {
        width: "100%",
        height: 100,
    },
    videoTitle: {
        padding: 8,
        fontSize: 13,
        color: "#1f2937",
        fontWeight: "500",
    },
    instructorBox: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 14,
        marginTop: 20,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    instructorAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    instructorName: {
        fontSize: 15,
        fontWeight: "700",
        color: "#111827",
    },
    instructorTitle: {
        fontSize: 12,
        color: "#6b7280",
    },
    instructorBio: {
        marginTop: 10,
        fontSize: 13,
        color: "#4b5563",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
    },
    modalContainer: {
        width: "100%",
        backgroundColor: "#111827",
        borderRadius: 12,
        padding: 12,
    },
    closeButton: {
        position: "absolute",
        right: 10,
        top: 10,
        zIndex: 10,
        backgroundColor: "rgba(0,0,0,0.5)",
        borderRadius: 20,
        padding: 6,
    },
    modalVideoTitle: {
        marginTop: 10,
        color: "#fff",
        fontSize: 14,
        fontWeight: "600",
    },
});
