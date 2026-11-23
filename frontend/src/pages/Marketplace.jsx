import { useState } from "react";
import SkillCard from "../components/SkillCard";
import "../styles/pages.css";

function Marketplace() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All categories");

  const people = [
    {
      id: 1,
      name: "Amina Mohamed",
      teachSkill: "Graphic Design",
      learnSkill: "Python",
    },
    {
      id: 2,
      name: "Hassan K.",
      teachSkill: "Python",
      learnSkill: "Excel",
    },
    {
      id: 3,
      name: "Mika K.",
      teachSkill: "Photography",
      learnSkill: "Canva",
    },
    {
      id: 4,
      name: "Fatima A.",
      teachSkill: "Baking",
      learnSkill: "Marketing",
    },
    {
      id: 5,
      name: "Yusuf O.",
      teachSkill: "Excel",
      learnSkill: "Photography",
    },
    {
      id: 6,
      name: "Sara N.",
      teachSkill: "Illustration",
      learnSkill: "Arabic",
    },
  ];

  const filteredPeople = people.filter((person) => {
    const matchesSearch =
      person.name.toLowerCase().includes(search.toLowerCase()) ||
      person.teachSkill.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All categories" || person.teachSkill === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="marketplace-page">
      <p className="welcome-text">
        Good things happen when we learn together ✨
      </p>

      <h1>Find your next skill swap</h1>

      <p>Search for a skill, meet a person, start learning.</p>

      <div className="marketplace-search">
        <input
          type="text"
          placeholder="Search skills or people..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>All categories</option>
          <option>Graphic Design</option>
          <option>Python</option>
          <option>Photography</option>
          <option>Baking</option>
          <option>Excel</option>
          <option>Illustration</option>
        </select>

        <button type="button">Search</button>
      </div>

      <div className="marketplace-heading">
        <h2>A few people to learn with</h2>
        <button type="button">See everyone →</button>
      </div>

      <div className="skill-card-grid">
        {filteredPeople.length > 0 ? (
          filteredPeople.map((person) => (
            <SkillCard
              key={person.id}
              name={person.name}
              teachSkill={person.teachSkill}
              learnSkill={person.learnSkill}
            />
          ))
        ) : (
          <p>No matching people found.</p>
        )}
      </div>
    </div>
  );
}

export default Marketplace;
