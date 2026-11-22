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
        </div>
    )
}

export default profile