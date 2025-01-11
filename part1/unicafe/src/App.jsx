import { useState } from 'react'

const Header = ({ title }) => <h1>{title}</h1>

const Button = ({ onClick, label }) => <button onClick={onClick}>{label}</button>

const Display = ({ label, counter }) => <div>{label} {counter}</div>

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad

  if (total > 0) {
    const average = (good * 1 + neutral * 0 + bad * -1) / total
    const positive = (good / total) * 100

    return (
      <>
        <Header title='statistics' />
        <Display label='good' counter={good} />
        <Display label='neutral' counter={neutral} />
        <Display label='bad' counter={bad} />
        <div>all {total}</div>
        <div>average {average}</div>
        <div>positive {positive} %</div>
      </>
    )
  }

  return (
    <>
      <Header title='statistics' />
      <h4>No feedback given</h4>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => setGood(prevGood => prevGood + 1)
  const addNeutral = () => setNeutral(prevNeutral => prevNeutral + 1)
  const addBad = () => setBad(prevBad => prevBad + 1)

  return (
    <div>
      <Header title='give feedback' />
      <Button onClick={addGood} label='good' />
      <Button onClick={addNeutral} label='neutral' />
      <Button onClick={addBad} label='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App