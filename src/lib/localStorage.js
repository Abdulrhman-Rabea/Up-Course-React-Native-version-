const key = (uid) => `enrolledCourses:${uid}`;

export function getCoursesFromLocal(uid) {
  const raw = localStorage.getItem(key(uid));
  return raw ? JSON.parse(raw) : [];
}

export function setCoursesToLocal(uid, courses) {
  localStorage.setItem(key(uid), JSON.stringify(courses || []));
}

export function addCourseToLocal(uid, course) {
  const current = getCoursesFromLocal(uid);
  const exists = current.some((c) => c.courseId === course.courseId);
  if (!exists) {
    current.push(course);
    setCoursesToLocal(uid, current);
  }
}
