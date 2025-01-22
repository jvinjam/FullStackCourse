import Course from "./Course"

const Courses = ({courses}) => {
    return (
        <div>
            <h2>Web development curriculum</h2>
            <div>{courses.map(course => <Course key={course.id} course={course} />)}</div>
        </div>
    )
}

export default Courses