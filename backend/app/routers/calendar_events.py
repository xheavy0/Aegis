from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from uuid import UUID

from app.database import get_db
from app.models.calendar_event import CalendarEvent
from app.core.deps import get_current_user, require_analyst_or_above, log_action
from app.schemas.calendar_event import CalendarEventCreate, CalendarEventUpdate, CalendarEventOut

router = APIRouter()


@router.get("", response_model=List[CalendarEventOut])
def list_calendar_events(
    skip: int = 0,
    limit: int = 200,
    event_type: Optional[str] = None,
    db: Session = Depends(get_db),
    _=Depends(get_current_user),
):
    q = db.query(CalendarEvent)
    if event_type:
        q = q.filter(CalendarEvent.event_type == event_type)
    return q.order_by(CalendarEvent.event_date.asc()).offset(skip).limit(limit).all()


@router.post("", response_model=CalendarEventOut, status_code=status.HTTP_201_CREATED)
def create_calendar_event(payload: CalendarEventCreate, db: Session = Depends(get_db), current=Depends(require_analyst_or_above)):
    event = CalendarEvent(**payload.model_dump(), created_by=current.id)
    db.add(event)
    db.commit()
    db.refresh(event)
    log_action(db, current.id, "CREATE", "calendar_event", event.id, f"Created calendar event: {event.title}")
    return event


@router.get("/{event_id}", response_model=CalendarEventOut)
def get_calendar_event(event_id: UUID, db: Session = Depends(get_db), _=Depends(get_current_user)):
    event = db.query(CalendarEvent).filter(CalendarEvent.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Calendar event not found")
    return event


@router.patch("/{event_id}", response_model=CalendarEventOut)
def update_calendar_event(event_id: UUID, payload: CalendarEventUpdate, db: Session = Depends(get_db), current=Depends(require_analyst_or_above)):
    event = db.query(CalendarEvent).filter(CalendarEvent.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Calendar event not found")
    for field, val in payload.model_dump(exclude_none=True).items():
        setattr(event, field, val)
    db.commit()
    db.refresh(event)
    log_action(db, current.id, "UPDATE", "calendar_event", event.id)
    return event


@router.delete("/{event_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_calendar_event(event_id: UUID, db: Session = Depends(get_db), current=Depends(require_analyst_or_above)):
    event = db.query(CalendarEvent).filter(CalendarEvent.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Calendar event not found")
    db.delete(event)
    db.commit()
    log_action(db, current.id, "DELETE", "calendar_event", event_id)

