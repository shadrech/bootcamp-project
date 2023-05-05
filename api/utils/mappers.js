export const transformJoinedEnrollmentRow = (row) => ({
  id: row.e_id,
  score: row.e_score,
  grade: row.e_grade,
  courseId: row.e_courseId,
  created_at: row.e_created_at
})
