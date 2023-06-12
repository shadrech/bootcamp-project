let incrementor = 0

let students = []

const getStudents = () => {
    return {
       students
    }
}

const createStudents = ( student ) => {
    const newStudent = {
        id: incrementor,
        name: student.name
    }

    students.push(newStudent)

    incrementor++

    return { students }
}

const updateStudent = (id, params) => {
    const index = students.findIndex((student) => student.id === id)

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

const deleteStudent = (id, params) => {
    const index = students.findIndex((student) => student.id === id)

    //delete students[index]

    const deleteStudent = {
        ...delete students[index]
    }

    students = [
        ...students.slice(0, index),
        deleteStudent,
        ...students.slice(index + 1)
    ]

    students = students.filter(value => Object.keys(value).length !== 0)

    return console.log("Succesfully Deleted User!")
    
}

module.exports = { getStudents, createStudents, updateStudent, deleteStudent }