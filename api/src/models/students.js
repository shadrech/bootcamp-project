const students = [
    {
      id: 1,

      name: 'Mthabisi Nyathi',
      age: 15,
      email: 'mtha@gmail.com',
    },
    {
      id: 3,
      name: 'Mtha Nyathi',
      age: 15,
      email: 'mtha@gmail.com',
    },
  ];
  
  let incrementor = 2;
  //query students
  const getStudents = () => {
    return {
      students,
    };
  };
//add new student & autou iincrement id
  const postStudents = (newStudent) => {
    const student = {
      id: incrementor,
      name: newStudent.name,
      age: newStudent.age,
      email: newStudent.email
    };
  
    students.push(student);
  
    incrementor++;
  
    return students; 
  };

  //find id and change name
  const putStudents = (id, newStudent) => {
  const studentIndex = students.findIndex(student => student.id === id);

  if (studentIndex !== -1) {
    students[studentIndex].name = newStudent.name;
  }

  return students;
};

//delete student
const deleteStudents = (id) => {
  const studentIndex = students.findIndex(student => student.id === id);

  if (studentIndex !== -1) {
    students.splice(studentIndex, 1);
  }

  return students;
};

  module.exports = {
    getStudents,
    putStudents,
    postStudents,
    deleteStudents,
  };
  