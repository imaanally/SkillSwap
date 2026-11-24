import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')

const { login } = useAuth()
const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!formData.email || !formData.password) {
      setError('Email and password are required')
      return
    }
    setError('')
     login({ name: 'Jane Doe', email: formData.email })
     navigate('/dashboard')
  }

  return (
   <form onSubmit={handleSubmit}>
        <h1>Login</h1>
         {error && <p style={{ color: 'red' }}>{error}</p>}
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange}/>
        <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange}/>
        <button type="submit">Login</button>
   </form>
  )
}

export default Login

