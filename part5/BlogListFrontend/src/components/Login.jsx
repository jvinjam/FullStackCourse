const Login = ({ userName, setUserName, password, setPassword, handleLogin}) => {
  return (
    <form onSubmit={handleLogin}>
    <div>
      User name 
      <input type='text' value={userName} onChange={ (event) => setUserName(event.target.value) } />
    </div>
    <div>
      Password  
      <input type='password' value={password} onChange={ (event) => setPassword(event.target.value) } />
    </div>
    <br/>
    <button type='submit'>Login</button>
  </form>
  )
}

export default Login