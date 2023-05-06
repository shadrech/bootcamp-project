export const transformJoinedEnrollmentRow = (row) => ({
  id: row.e_id,
  score: row.e_score,
  grade: row.e_grade,
  createdAt: row.e_createdAt,
  course: {
    id: row.c_id,
    title: row.c_title,
    description: row.c_description,
    imageUrl: row.c_imageUrl,
  }
})
