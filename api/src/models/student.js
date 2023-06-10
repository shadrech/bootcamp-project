let incrementor = 0
const students = []

const getStudents = () => {
  return {
    students
  }
}

const createStudent = (student) => {
  const newStudent = {
    id: incrementor,
    name: student.name
  }

  students.push(newStudent)

  // incrementor = incrementor + 1
  incrementor++

  return { students }
}

module.exports = {
  getStudents,
  createStudent
}
