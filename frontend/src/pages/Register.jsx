import {useState} from 'react'
function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    })

    const [error, setError] = useState('')

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
         e.preventDefault()
         if (!formData.name || !formData.email || !formData.password) {
             setError('All fields are required')
            return
         }
         if (formData.password.length < 6) {
             setError('Password must be at least 6 characters')
             return
         }
         setError('')
         console.log('Register:', formData)
     }
   return(
   <form onSubmit={handleSubmit}>
      <h1>Register</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input name="name" placeholder="Name" value={formData.name} onChange={handleChange}/>
      <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange}/>
      <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange}/>
      <button type="submit">Register</button>
   </form>
   )
}
export default Register