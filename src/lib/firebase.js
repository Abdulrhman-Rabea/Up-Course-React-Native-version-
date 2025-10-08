// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs, getDoc, doc, updateDoc, deleteDoc, setDoc, arrayUnion, arrayRemove, query, orderBy, limit } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6bGGDpOwsoLi3zie8G3wYQg6nd5e0wjc",
  authDomain: "e-learning-35aa2.firebaseapp.com",
  projectId: "e-learning-35aa2",
  storageBucket: "e-learning-35aa2.firebasestorage.app",
  messagingSenderId: "964443659733",
  appId: "1:964443659733:web:40b05999b373cd3315315c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);







//CRUD operations Developer ==> AbdulrhmanR

// look in (How-to-use-fb-functions.md) file to see how to use this functions >>

//create function already developed by by ENG : Ahmed Shaban


// Read all data
export async function getAllData(colName) {
  const colRef = collection(db, colName);
  const snapshot = await getDocs(colRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Read one doc
export async function getData(colName, id) {
  const docRef = doc(db, colName, id);
  const snapshot = await getDoc(docRef);
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
}

// Update
export async function updateData(colName, id, newData) {
  const docRef = doc(db, colName, id);
  await updateDoc(docRef, newData);
}

// Delete , i will use this to UNroll courses or can use updateData() >> not sure yet 
export async function deleteData(colName, id) {
  const docRef = doc(db, colName, id);
  await deleteDoc(docRef);
}




//function to get current user 

export function getCurrentUser() {
  //get current user
  return auth.currentUser;
}

//function enroll course for user use UId
export async function enrollCourseForUser(uid, enrolledCourse) {
  //doc ref
  const userRef = doc(db, "users", uid);

  //ensure doc exixts and if not exist do create 
  const snap = await getDoc(userRef);
  if (!snap.exists()) {
    await setDoc(
      userRef,
      {
        createdAt: new Date().toISOString(),
        // when login fill
        enrolledCourses: [],
      },
      { merge: true }
    );
  }

  // added courses to enrolledCourses use arrayUnion
  await updateDoc(userRef, {
    enrolledCourses: arrayUnion(enrolledCourse),
  });
}

// function get courses that user enrolled
export async function getUserEnrolledCourses(uid) {
  // doc ref
  const userRef = doc(db, "users", uid);
  // Read doc 
  const snap = await getDoc(userRef);
  //return array or empty array
  return snap.exists() ? snap.data().enrolledCourses || [] : [];
}
async function ensureUserDoc(uid) {
  const userRef = doc(db, "users", uid);
  const snap = await getDoc(userRef);
  if (!snap.exists()) {
    await setDoc(
      userRef,
      {
        createdAt: new Date().toISOString(),
        enrolledCourses: [],
        favCourses: [],
      },
      { merge: true }
    );
  }
  return userRef;
}

export async function addCourseToFav(uid, courseId) {
  const userRef = await ensureUserDoc(uid);
  await updateDoc(userRef, { favCourses: arrayUnion(courseId) });
}

export async function removeCourseFromFav(uid, courseId) {
  const userRef = await ensureUserDoc(uid);
  await updateDoc(userRef, { favCourses: arrayRemove(courseId) });
}

export async function getUserFavCourses(uid) {
  const userRef = doc(db, "users", uid);
  const snap = await getDoc(userRef);
  return snap.exists() ? snap.data().favCourses || [] : [];
}

export async function getCoursesByIds(ids = []) {
  if (!ids?.length) return [];
  const all = await getAllData("courses");
  const setIds = new Set(ids);
  return all.filter((c) => setIds.has(c.id));
}



// specific for courses in home page
export async function getLatestCourses(count = 3) {
  const q = query(collection(db, "courses"), orderBy("createdAt", "desc"), limit(count));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}