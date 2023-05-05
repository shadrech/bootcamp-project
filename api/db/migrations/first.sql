CREATE TABLE enrollment (
  id varchar(36) NOT NULL,
  score int NULL,
  grade enum ('A', 'B', 'C', 'D', 'E', 'F') NULL,
  studentId int NOT NULL,
  courseId varchar(36) NOT NULL,
  created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE student (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  email varchar(255) NOT NULL UNIQUE,
  created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX IDX_student_name (name),
);

CREATE TABLE course (
  id varchar(36) NOT NULL,
  title varchar(255) NOT NULL,
  description text NULL,
  imageUrl varchar(255) NULL,
  created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

ALTER TABLE enrollment ADD CONSTRAINT FK_grade_studentId FOREIGN KEY (studentId) REFERENCES student(id) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE enrollment ADD CONSTRAINT FK_grade_courseId FOREIGN KEY (courseId) REFERENCES course(id) ON DELETE CASCADE ON UPDATE NO ACTION;
