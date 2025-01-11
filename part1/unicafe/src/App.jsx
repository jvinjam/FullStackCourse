import { useState } from 'react'

const Header = ({title}) => <h1>{title}</h1>

const Button = ({onClick, label}) => <button onClick={onClick}>{label}</button>

const Display = ({label, counter}) => <div>{label} {counter}</div>

const Statistics = ({total, avg, positive}) => {
  return (
    <>
      <div>all {total}</div>
      <div>average {avg}</div>
      <div>positive {positive} %</div>
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
  
  const total = good + neutral + bad
  const average = total > 0 ? (good * 1 + neutral * 0 + bad * -1) / total : 0
  const positive = total > 0 ? (good/total) * 100 : 0

  return (
    <div>
      <Header title='give feedback' />
      <Button onClick={addGood} label='good' />
      <Button onClick={addNeutral} label='neutral' />
      <Button onClick={addBad} label='bad' />
      <Header title='statistics' />
      <Display label='good' counter={good} />
      <Display label='neutral' counter={neutral} />
      <Display label='bad' counter={bad} />
      <Statistics total={total} avg={average} positive={positive} />
    </div>
  )
}

export default App