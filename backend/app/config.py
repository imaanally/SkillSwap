
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://skillswap:skillswap@localhost:5432/skillswap"
)

# Local development fallback only.
# Set a unique SECRET_KEY environment variable in production.
SECRET_KEY = os.getenv(
    "SECRET_KEY",
    "local-development-secret-key-change-before-deployment"
)

ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = int(
    os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60")
)

FRONTEND_URL = os.getenv(
    "FRONTEND_URL",
    "http://localhost:5173"
)
