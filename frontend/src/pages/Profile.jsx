import { useAuth } from '../context/AuthContext'

const fakeSkills = {
  skillsOffered: ['React', 'Guitar'],
  skillsWanted: ['Python', 'Cooking'],
}

function Profile() {
  const { user } = useAuth()

  return (
    <div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>

      <h2>Skills I offer</h2>
      <ul>
        {fakeSkills.skillsOffered.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>

      <h2>Skills I want</h2>
      <ul>
        {fakeSkills.skillsWanted.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </div>
  )
}

export default Profile