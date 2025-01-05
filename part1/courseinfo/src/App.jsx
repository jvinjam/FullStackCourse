const Header = ({coursename}) => {
  console.log("Header: " + coursename)
  return <h1>{coursename}</h1>
}

const Part = ({part}) => {
  console.log(part)
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Content = ({parts}) => {
   console.log({parts})
   return (
    <div>
      <Part part={parts[0]} />
      <Part part={parts[1]} />
      <Part part={parts[2]} />
    </div>
  )
}

const Total = ({parts}) => {
  console.log("Total: " + {parts})
  return (
    <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  
  return (
    <div>
      <Header coursename={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
    // <div>
    //   <Header course={course} />
    //   <Content part1={part1} part2={part2} part3={part3} />
    //   <Total exercises={part1.exercises + part2.exercises + part3.exercises} />
    // </div>
  )
}

export default App
