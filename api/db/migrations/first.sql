CREATE TABLE grade (
  id varchar(36) NOT NULL,
  score int NOT NULL DEFAULT '0',
  grade enum ('A', 'B', 'C', 'D', 'E', 'F') NOT NULL,
  created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  studentId int NULL,
  PRIMARY KEY (id)
);

CREATE TABLE student (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (id)
);

CREATE TABLE course (
  id varchar(36) NOT NULL,
  title varchar(255) NOT NULL,
  description text NULL,
  imageUrl varchar(255) NOT NULL,
  created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (id)
);

CREATE TABLE student_course (
  courseId varchar(36) NOT NULL,
  studentId int NOT NULL,
  INDEX IDX_student_course_courseId (courseId),
  INDEX IDX_student_course_studentId (studentId),
  PRIMARY KEY (courseId, studentId)
);

ALTER TABLE grade ADD CONSTRAINT FK_grade_studentId FOREIGN KEY (studentId) REFERENCES student(id) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE student_course ADD CONSTRAINT FK_student_course_courseId FOREIGN KEY (courseId) REFERENCES course(id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE student_course ADD CONSTRAINT FK_student_course_studentId FOREIGN KEY (studentId) REFERENCES student(id) ON DELETE NO ACTION ON UPDATE NO ACTION;
