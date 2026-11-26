from app.database import SessionLocal
from app.models import Skill

SKILLS = [
    ("Python", "Programming with Python"),
    ("Graphic Design", "Visual design, logos and layouts"),
    ("Excel", "Spreadsheets, formulas and charts"),
    ("Photography", "Taking and editing photos"),
    ("Baking", "Breads, cakes and pastries"),
    ("Canva", "Designing with Canva"),
    ("Illustration", "Drawing and digital illustration"),
    ("Public Speaking", "Presenting with confidence"),
    ("JavaScript", "Web programming with JavaScript"),
    ("Swahili", "Speaking and writing Swahili"),
]


def seed():
    db = SessionLocal()
    for name, description in SKILLS:
        if not db.query(Skill).filter_by(name=name).first():
            db.add(Skill(name=name, description=description))
    db.commit()
    db.close()
    print("Skills seeded")


if __name__ == "__main__":
    seed()