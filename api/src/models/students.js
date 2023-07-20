const { studentDbModel } = require('../db/models/students')

const getStudents = () => {
    return {
       students
    }
}

const createStudent = async ( params ) => {
    const insertId = await studentDbModel.create(params)
    const student = await studentDbModel.fetchById(insertId)

    return { student }
}

const updateStudent = (id, params) => {
    const index = students.findIndex((student) => student.id === id)

    const newStudent = {
        ...students[index],
        name: params.name,
        email: params.email,
        age: parseInt(params.age),
    } 

    students = [
        ...students.slice(0, index),
        newStudent,
        ...students.slice(index + 1)
    ]

    return { newstudent: newStudent }
}

const deleteStudent = (id) => {
    const index = students.findIndex((student) => student.id === id)

    students = [
        ...students.slice(0, index),
        ...students.slice(index + 1)
    ]

    return { students }
    
}

module.exports = { getStudents, createStudent, updateStudent, deleteStudent }