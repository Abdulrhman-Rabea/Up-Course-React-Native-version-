<!-- 1. addData(colName, data) → Create

Adds a new document to a Firestore collection.

import { addData } from "../firebase";

async function handleAddCourse() {
  const id = await addData("courses", {
    title: "React Basics",
    level: "Beginner",
    createdAt: new Date(),
  });
  console.log("New course ID:", id);
}

 2. getAllData(colName) → Read All

Fetches all documents from a collection.

import { getAllData } from "../firebase";
import { useEffect, useState } from "react";

function CoursesList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function loadCourses() {
      const data = await getAllData("courses");
      setCourses(data);
    }
    loadCourses();
  }, []);

  return (
    <ul>
      {courses.map(course => (
        <li key={course.id}>{course.title} - {course.level}</li>
      ))}
    </ul>
  );
}

 3. getData(colName, id) → Read One

Fetches a single document by its ID.

import { getData } from "../firebase";
import { useEffect, useState } from "react";

function CourseDetails({ courseId }) {
  const [course, setCourse] = useState(null);

  useEffect(() => {
    async function loadCourse() {
      const data = await getData("courses", courseId);
      setCourse(data);
    }
    loadCourse();
  }, [courseId]);

  return (
    <div>
      {course ? (
        <p>{course.title} - {course.level}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

 4. updateData(colName, id, newData) → Update

Updates fields of an existing document.

import { updateData } from "../firebase";

async function handleUpdateCourse(courseId) {
  await updateData("courses", courseId, {
    level: "Intermediate",
    updatedAt: new Date(),
  });
  console.log("Course updated!");
}
 5. deleteData(colName, id) → Delete

Deletes a document from a collection.

import { deleteData } from "../firebase";

async function handleDeleteCourse(courseId) {
  await deleteData("courses", courseId);
  console.log("Course deleted!");
} -->
