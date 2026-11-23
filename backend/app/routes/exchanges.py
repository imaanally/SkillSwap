from fastapi import APIRouter

router = APIRouter(prefix="/api", tags=["Exchanges"])


@router.get("/requests/health")
def exchange_health():
    return {"message": "Exchange routes are working"}
