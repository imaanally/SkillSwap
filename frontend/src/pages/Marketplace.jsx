import { useEffect, useState } from "react";
import SkillCard from "../components/SkillCard";
import { useAuth } from "../context/AuthContext";
import { apiRequest } from "../services/api";
import "../styles/marketplace.css";

function Marketplace() {
  const { user } = useAuth();

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All categories");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchUsers() {
      try {
        setLoading(true);
        setError("");

        const data = await apiRequest("/api/users");

        if (!cancelled) {
          setUsers(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchUsers();

    return () => {
      cancelled = true;
    };
  }, []);

  const otherMembers = users
    .filter((member) => member.id !== user?.id)
    .map((member) => {
      const teachingSkills =
        member.user_skills
          ?.filter((item) => item.type === "teach")
          .map((item) => item.skill.name) || [];

      const learningSkills =
        member.user_skills
          ?.filter((item) => item.type === "learn")
          .map((item) => item.skill.name) || [];

      return {
        id: member.id,
        name: member.name,
        bio: member.bio,
        teachingSkills,
        learningSkills,
        teachSkill: teachingSkills.join(", ") || "No teaching skills added yet",
        learnSkill: learningSkills.join(", ") || "No learning skills added yet",
        location: member.location || "Location not added",
      };
    });

  const filteredPeople = otherMembers.filter((person) => {
    const searchTerm = search.toLowerCase();

    const matchesSearch =
      person.name.toLowerCase().includes(searchTerm) ||
      person.teachingSkills.some((skill) =>
        skill.toLowerCase().includes(searchTerm),
      ) ||
      person.learningSkills.some((skill) =>
        skill.toLowerCase().includes(searchTerm),
      );

    const matchesCategory =
      category === "All categories" || person.teachingSkills.includes(category);

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

        <button type="button" onClick={() => setSearch(search.trim())}>
          Search
        </button>
      </div>

      <div className="marketplace-heading">
        <h2>People to learn with</h2>

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
        {loading ? (
          <p>Finding SkillSwap members...</p>
        ) : error ? (
          <p>Couldn't load members: {error}</p>
        ) : filteredPeople.length > 0 ? (
          filteredPeople.map((person) => (
            <SkillCard key={person.id} person={person} />
          ))
        ) : otherMembers.length === 0 ? (
          <p>No other members yet. Invite your teammates to join SkillSwap!</p>
        ) : (
          <p>No matching members found. Try another search.</p>
        )}
      </div>
    </div>
  );
}

export default Marketplace;
