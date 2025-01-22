const Header = ({ coursename }) => <h3>{coursename}</h3>

const Part = ({ part }) => <p>{part.name} {part.exercises > 0 ? part.exercises : ''} </p>

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part =>
                <Part key={part.id} part={part} />
            )}
        </div>
    )
}

const Course = ({ course: { name, parts } }) => {
    const total = parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)

    return (
        <div>
            <Header coursename={name} />
            <Content parts={parts} />
            <h4>total of {total} exercises</h4>
        </div>
    )
}

export default Course