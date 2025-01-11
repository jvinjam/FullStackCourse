import { useState } from 'react'

const Header = ({ title }) => <h1>{title}</h1>

const Button = ({ onClick, label }) => <button onClick={onClick}>{label}</button>

const StatisticLine = ({ text, value }) => {
  return (
    <div>
      {text === 'positive' ? <span>{text} {value} %</span> : <span>{text} {value}</span>}
    </div>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad

  if (total > 0) {
    const average = (good * 1 + neutral * 0 + bad * -1) / total
    const positive = (good / total) * 100

    return (
      <>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive} />
      </>
    )
  }

  return <h4>No feedback given</h4>
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
      <Header title='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App