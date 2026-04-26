from sqlalchemy import Column, String, Text, DateTime, Enum
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime, timezone
import uuid
import enum

from app.database import Base


class CalendarEventType(str, enum.Enum):
    AUDIT = "audit"
    MEETING = "meeting"
    SYNC = "sync"
    DEADLINE = "deadline"
    OTHER = "other"


class CalendarEvent(Base):
    __tablename__ = "calendar_events"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String(500), nullable=False)
    event_type = Column(Enum(CalendarEventType), default=CalendarEventType.OTHER, nullable=False)
    event_date = Column(DateTime(timezone=True), nullable=False)
    people = Column(Text, nullable=True)
    notes = Column(Text, nullable=True)
    created_by = Column(UUID(as_uuid=True), nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

