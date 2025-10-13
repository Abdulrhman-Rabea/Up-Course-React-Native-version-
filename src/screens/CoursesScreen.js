import React, { useState, useEffect } from 'react'; CustomModal
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import CourseCard from '../components/CourseCard';
import RNPickerSelect from 'react-native-picker-select';
import { getAllData, enrollCourseForUser, auth, getCurrentUser } from '../lib/firebase';
import CustomModal from '../components/Modal.js'
import { useNavigation } from '@react-navigation/native';

export default function CoursesScreen() {
    const [courses, setCourses] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation();


    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState({ title: "", subtitle: "" })

    // Pagination
    const [page, setPage] = useState(1);
    const [perPage] = useState(6);

    const categories = ["Programming",
        "Graphic Design",
        "Social Media",
        "Marketing",
        "Ui/UX",];

    useEffect(() => {
        async function fetchCourses() {
            try {
                const data = await getAllData('courses');
                setCourses(data);
                setFiltered(data);
            } catch (e) {
                console.log('Error fetching courses:', e);
            } finally {
                setLoading(false);
            }
        }
        fetchCourses();
    }, []);

    // Search & Filter logic
    useEffect(() => {
        let list = [...courses];

        if (category !== 'All') {
            list = list.filter((c) => c.category === category);
        }

        if (search.trim()) {
            const term = search.toLowerCase();
            list = list.filter((c) => c.title.toLowerCase().includes(term));
        }

        setFiltered(list);
        setPage(1); // Reset to first page on filter/search change
    }, [search, category, courses]);

    // Pagination logic
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const currentCourses = filtered.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filtered.length / perPage);

    async function handleEnroll(course) {
        const user = auth.currentUser
        if (!user) {
            setModalData({
                title: "Login Required",
                subtitle: "Please login or create an account to enroll in this course.",
                primaryLabel: "Login",
                onPrimaryPress: () => {
                    setModalVisible(false);
                    navigation.navigate("Login", { redirectTo: "CourseDetails", courseId: course.id });
                },
            });
            setModalVisible(true);
            return;
        }

        navigation.navigate("PayPalCheckout", {
            course: {
                id: course.id,
                title: course.title,
                imageUrl: course.imageUrl || null,
                price: Number(course.price) || 0,
            },
        });
        await enrollCourseForUser(user.uid, course);

    }

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: '#fdfaf6' }}
            contentContainerStyle={{
                paddingHorizontal: 20,
                paddingVertical: 20,
            }}
        >
            {/* Page title */}
            <Text
                style={{
                    fontSize: 22,
                    fontWeight: '800',
                    color: '#001f3f',
                    marginBottom: 5,
                }}
            >
                All Courses
            </Text>
            <Text style={{ color: '#555', marginBottom: 20 }}>
                Find your next course and start learning today.
            </Text>

            {/* Search + Filter Row */}
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 20,
                }}
            >
                {/* Search Input */}
                <TextInput
                    placeholder="Search courses..."
                    value={search}
                    onChangeText={setSearch}
                    style={{
                        flex: 1,
                        backgroundColor: '#fff',
                        borderRadius: 10,
                        paddingHorizontal: 15,
                        height: 40,
                        marginRight: 10,
                        borderWidth: 1,
                        borderColor: '#eee',
                    }}
                />

                {/* Dropdown Filter */}
                <View
                    style={{
                        flex: 0.8,
                        backgroundColor: '#fff',
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: '#eee',
                    }}
                >
                    <RNPickerSelect
                        onValueChange={(value) => setCategory(value || 'All')}
                        placeholder={{ label: 'Filter by category: All', value: 'All' }}
                        items={categories.map((cat) => ({
                            label: cat,
                            value: cat,
                        }))}
                        style={{
                            inputIOS: {
                                padding: 10,
                                fontSize: 14,
                                color: '#333',
                            },
                            inputAndroid: {
                                padding: 8,
                                fontSize: 14,
                                color: '#333',
                            },
                        }}
                        value={category}
                    />
                </View>
            </View>

            {/* Courses Grid */}
            {loading ? (
                <ActivityIndicator size="large" color="#ff9500" style={{ marginTop: 40 }} />
            ) : filtered.length === 0 ? (
                <Text style={{ textAlign: 'center', color: '#777' }}>No courses found.</Text>
            ) : (
                <>
                    {/* Courses Grid */}
                    <View
                        style={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                        }}
                    >
                        {currentCourses.map((course) => (
                            <CourseCard key={course.id} course={course} onEnroll={() => handleEnroll(course)} />
                        ))}
                    </View>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                marginVertical: 20,
                            }}
                        >
                            <TouchableOpacity
                                disabled={page === 1}
                                onPress={() => setPage(page - 1)}
                                style={{
                                    backgroundColor: page === 1 ? "#ccc" : "#ff9500",
                                    paddingVertical: 8,
                                    paddingHorizontal: 16,
                                    borderRadius: 8,
                                    marginHorizontal: 5,
                                }}
                            >
                                <Text style={{ color: "#fff", fontWeight: "600" }}>Prev</Text>
                            </TouchableOpacity>

                            <Text style={{ fontWeight: "700", color: "#333" }}>
                                {page} / {totalPages}
                            </Text>

                            <TouchableOpacity
                                disabled={page === totalPages}
                                onPress={() => setPage(page + 1)}
                                style={{
                                    backgroundColor: page === totalPages ? "#ccc" : "#ff9500",
                                    paddingVertical: 8,
                                    paddingHorizontal: 16,
                                    borderRadius: 8,
                                    marginHorizontal: 5,
                                }}
                            >
                                <Text style={{ color: "#fff", fontWeight: "600" }}>Next</Text>
                            </TouchableOpacity>
                        </View>
                    )}


                </>
            )}
        </ScrollView>
    );
}
