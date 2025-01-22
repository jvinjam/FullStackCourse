const Part = ({ part }) => <p>{part.name} {part.exercises > 0 ? part.exercises : ''} </p>

export default Part