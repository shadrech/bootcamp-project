const { response, request } = require('express');
const {courseDbModel} = require('../../db/models/courses');
const { studentDbModel } = require('../../db/models/students');
const { enrollmentDbModel } = require('../../db/models/enrollment');



const courseController = {
    async createCourse(request, response) {
        const id = await courseDbModel.create(request.body);
        const course = await courseDbModel.fecthById(id);

        response.json({ course });
    },
        getCourses: async (request, response) => {
            const courses = await courseDbModel.fetchAll()
    
            response.json({ courses })
        },
//get one course by id

        getOneCourse: async (request, response)=>{

          const course = await courseDbModel.fetchById(request.params.id)
    
          response.json({ course })

        },
        async linkStudentToCourse(req, res) {
          const { id } = req.body; // This is the student ID
          const { courseId } = req.params;

        console.log(courseId)
        
            try {
              
              const student = await studentDbModel.fetchById(id);
              const course = await courseDbModel.fetchById(courseId);
        
              
              if (!student) {
                return res.status(404).json({ error: 'Student not found' });
              }
        
              if (!course) {
                return res.status(404).json({ error: 'Course not found' });
              }
        
             
              const enrollmentId = await enrollmentDbModel.createEnrollment(student.id, course.id);
        
              
              return res.json({ message: 'Student linked to course', enrollmentId });
            } catch (error) {
            
              console.error('Error linking student to course:', error);
              return res.status(500).json({ error: 'An error occurred while linking student to course' });
            }
          },
    
}

module.exports = {
    courseController
  }