import Content from "./Content"

const Header = ({ coursename }) => <h1>{coursename}</h1>

const Course = ({ course }) => {
    return (
        <div>
            <Header coursename={course.name} />
            <Content parts={course.parts} />
        </div>
    )
}

export default Course