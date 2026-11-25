
import { useState } from "react";
import SkillCard from "../components/SkillCard";
import people from "../data/people";
import "../styles/marketplace.css";

function Marketplace() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All categories");

  const filteredPeople = people.filter((person) => {
    const matchesSearch =
      person.name.toLowerCase().includes(search.toLowerCase()) ||
      person.teachSkill.toLowerCase().includes(search.toLowerCase()) ||
      person.learnSkill.toLowerCase().includes(search.toLowerCase());

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
        <button
          type="button"
          onClick={() => {
            setSearch("");
            setCategory("All categories");
          }}
        >
          See everyone →
        </button>
      </div>

      <div className="skill-card-grid">
        {filteredPeople.length > 0 ? (
          filteredPeople.map((person) => (
            <SkillCard key={person.id} person={person} />
          ))
        ) : (
          <p>No matching people found.</p>
        )}
      </div>
    </div>
  );
}

export default Marketplace;

