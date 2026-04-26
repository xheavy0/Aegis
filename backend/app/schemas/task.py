from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from uuid import UUID

from app.models.task import TaskStatus


class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    status: TaskStatus = TaskStatus.UPCOMING
    start_date: Optional[datetime] = None
    due_date: Optional[datetime] = None
    members: Optional[str] = None
    budget: Optional[str] = None


class TaskCreate(TaskBase):
    pass


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[TaskStatus] = None
    start_date: Optional[datetime] = None
    due_date: Optional[datetime] = None
    members: Optional[str] = None
    budget: Optional[str] = None


class TaskOut(TaskBase):
    id: UUID
    created_by: Optional[UUID]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

