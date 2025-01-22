const Part = ({ part }) => <p><strong>{part.name} {part.exercises > 0 ? part.exercises : ''} </strong></p>

export default Part