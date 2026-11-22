const fakeUser = { name: 'Jane Doe' }

const cards = [
  { id: 1, title: 'Recent matches', text: 'No matches yet' },
  { id: 2, title: 'Upcoming swaps', text: 'No swaps scheduled' },
  { id: 3, title: 'Pending requests', text: 'No requests yet' },
]

function Dashboard() {
    return (
    <div>
         <h1>Dashboard</h1>
         <h1>Welcome, {fakeUser.name}</h1>

         cards.map((card) => (
            <div key={card.id}>
                <h2>{card.title}</h2>
                <p>{card.text}</p>
            </div>
         ))

    </div>
    )
}
export default Dashboard    