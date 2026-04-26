from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from uuid import UUID

from app.models.calendar_event import CalendarEventType


class CalendarEventBase(BaseModel):
    title: str
    event_type: CalendarEventType = CalendarEventType.OTHER
    event_date: datetime
    people: Optional[str] = None
    notes: Optional[str] = None


class CalendarEventCreate(CalendarEventBase):
    pass


class CalendarEventUpdate(BaseModel):
    title: Optional[str] = None
    event_type: Optional[CalendarEventType] = None
    event_date: Optional[datetime] = None
    people: Optional[str] = None
    notes: Optional[str] = None


class CalendarEventOut(CalendarEventBase):
    id: UUID
    created_by: Optional[UUID]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

