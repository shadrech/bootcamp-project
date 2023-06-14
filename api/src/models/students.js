const students = [
    {
      id: 1,
      name: 'Mthabisi Nyathi',
    },
    {
      id: 2,
      name: 'Mtha Nyathi',
    },
  ];
  
  let incrementor = 2;
  
  const getStudents = () => {
    return {
      students,
    };
  };
  
  const postStudents = (newStudent) => {
    const student = {
      id: incrementor,
      name: newStudent.name
    };
  
    students.push(student);
  
    incrementor++;
  
    return students; 
  };

  const putStudents = (id, newStudent) => {
  const studentIndex = students.findIndex(student => student.id === id);

  if (studentIndex !== -1) {
    students[studentIndex].name = newStudent.name;
  }

  return students;
};

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
  