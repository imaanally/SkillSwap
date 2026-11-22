const fakeUser = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  skillsOffered: ['React', 'Guitar'],
  skillsWanted: ['Python', 'Cooking'],
}


function profile() {
    return(
        <div>
            <h1>Profile</h1>
            <p>Name: {fakeUser.name}</p>
            <p>Email: {fakeUser.email}</p>

            <h1>Skills Offered</h1>
            <ul>
                {fakeUser.skillsOffered.map((skill) => (
                    <li key={skill}>{skill}</li>
                ))}
            </ul>
            <h1>Skills Wanted</h1>
            <ul>
                {fakeUser.skillsWanted.map((skill) => (
                    <li key={skill}>{skill}</li>
                ))}
            </ul>
        </div>
    )
}

export default profile