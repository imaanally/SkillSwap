function Register() {
   return(
   <form>
      <h1>Register</h1>
      <input name="name" placeholder="Name" />
      <input name="email" type="email" placeholder="Email" />
      <input name="password" type="password" placeholder="Password" />
      <button type="submit">Register</button>
   </form>
   )
}
export default Register