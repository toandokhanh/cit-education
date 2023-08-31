### class-validator

xử lý các nghiệp vụ validate cho dử liệu từ clients gửi lên server (POST)

### class-transformer

trách việc đưa dử liệu thừa lên server



### API
#### Users (http://localhost:3002/user)

- Get user details (/me) GET => ok

- Get all users () GET => ok

- Login user (/login) POST => ok

- Register user (/register) POST => ok

#### Courses (http://localhost:3002/course)
- Get all courses () GET => ok

- Get courses based on category (/:IdCate) GET => ok

- Create a new course () POST => ok

- Get course details (/:idCourse) GET => ok

- Update course (/:idCourse) PUT

- Delete course (/:idCourse) DELETE

- Get all created courses by myself ()

#### Lessons  (http://localhost:3002/:idCourse/lesson)
- Get lessons based on course () GET

- Create a new lesson () POST => doing

- Update lesson (/:IdLesson) PUT

- Delete lesson (/:IdLesson) DELETE

- Get lesson details (/:IdLesson) GET

- ....

- ......




#### Videos (http://localhost:3002/)
- Create a new video () POST
