export const transformJoinedEnrollmentRow = (row) => ({
  id: row.e_id,
  score: row.e_score,
  grade: row.e_grade,
  courseId: row.e_courseId,
  courseTitle: row.c_title,
  createdAt: row.e_created_at
})
