const Total = ({parts}) => {
    return (
        <h4>total of {parts.reduce(
            (accumulator, currentValue) => accumulator + currentValue.exercises,0)} exercises</h4>
    )
}

export default Total
