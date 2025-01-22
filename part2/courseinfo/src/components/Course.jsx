import Content from "./Content"
import Total from "./Total"

const Header = ({ coursename }) => <h3>{coursename}</h3>

const Course = ({ course }) => {
    return (
        <div>
            <Header coursename={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course