import React, { useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator, Text } from "react-native";
import { db } from "../../lib/firebase";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useTranslation } from "react-i18next";
import CourseRow from "./CourseRow";
import { useTheme } from 'react-native-paper';

export default function CoursesTable() {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (!currentUser) {
      setIsLoading(false);
      return;
    }
    setUser(currentUser);

    const fetchRole = async () => {
      try {
        const userRef = doc(db, "users", currentUser.uid);
        const snap = await getDoc(userRef);
        if (snap.exists()) {
          setRole(snap.data().role);
        }
      } catch (err) {
        console.error("Error fetching role:", err);
      }
    };

    fetchRole();
  }, []);

  useEffect(() => {
    if (!role || !user) return;

    const fetchCourses = async () => {
      try {
        const coursesCollection = collection(db, "courses");
        let q;

        if (role === "admin") {
          q = query(
            coursesCollection,
            where("ownerUid", "==", user.uid),
            orderBy("createdAt", "desc")
          );
        } else {
          q = query(coursesCollection, orderBy("createdAt", "desc"));
        }

        const querySnapshot = await getDocs(q);
        const coursesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCourses(coursesData);
      } catch (error) {
        console.error("Error fetching courses: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [role, user]);

  const handleDeleteCourse = (idToDelete) => {
    setCourses((prev) => prev.filter((c) => c.id !== idToDelete));
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 20 }}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text>{t("myCourses.loading")}</Text>
      </View>
    );
  }

  if (courses.length === 0) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 20 }}>
        <Text style={{ color: colors.disabled }}>{t("coursesTable.empty")}</Text>
      </View>
    );
  }

  return (
    <View style={{ backgroundColor: colors.surface, margin: 6, padding: 6, borderRadius: 8, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 }}>
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CourseRow course={item} onDelete={handleDeleteCourse} />}
      />
    </View>
  );
}
