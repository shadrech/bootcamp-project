let incrementor = 0
let students = [

]

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

const updateStudent = (id, params) => {
  const index = students.findIndex((student) => student.id === id)
  // const newStudent = {
  //   id: students[index].id,
  //   name: students[index].name,
  //   name: params.name
  // }
  const newStudent = {
    ...students[index],
    name: params.name
  }

  students = [
    ...students.slice(0, index),
    newStudent,
    ...students.slice(index + 1)
  ]

  return { student: newStudent }
}

const deleteStudent = (id) => {
  const index = students.findIndex((student) => student.id === id)

  students = [
    ...students.slice(0, index),
    ...students.slice(index + 1)
  ]

  return { students }
}

module.exports = {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent
}
