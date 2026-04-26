from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from uuid import UUID

from app.database import get_db
from app.models.task import Task
from app.core.deps import get_current_user, require_analyst_or_above, log_action
from app.schemas.task import TaskCreate, TaskUpdate, TaskOut

router = APIRouter()


@router.get("", response_model=List[TaskOut])
def list_tasks(
    skip: int = 0,
    limit: int = 100,
    status_filter: Optional[str] = None,
    db: Session = Depends(get_db),
    _=Depends(get_current_user),
):
    q = db.query(Task)
    if status_filter:
        q = q.filter(Task.status == status_filter)
    return q.order_by(Task.created_at.desc()).offset(skip).limit(limit).all()


@router.post("", response_model=TaskOut, status_code=status.HTTP_201_CREATED)
def create_task(payload: TaskCreate, db: Session = Depends(get_db), current=Depends(require_analyst_or_above)):
    task = Task(**payload.model_dump(), created_by=current.id)
    db.add(task)
    db.commit()
    db.refresh(task)
    log_action(db, current.id, "CREATE", "task", task.id, f"Created task: {task.title}")
    return task


@router.get("/{task_id}", response_model=TaskOut)
def get_task(task_id: UUID, db: Session = Depends(get_db), _=Depends(get_current_user)):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@router.patch("/{task_id}", response_model=TaskOut)
def update_task(task_id: UUID, payload: TaskUpdate, db: Session = Depends(get_db), current=Depends(require_analyst_or_above)):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    for field, val in payload.model_dump(exclude_none=True).items():
        setattr(task, field, val)
    db.commit()
    db.refresh(task)
    log_action(db, current.id, "UPDATE", "task", task.id)
    return task


@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(task_id: UUID, db: Session = Depends(get_db), current=Depends(require_analyst_or_above)):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(task)
    db.commit()
    log_action(db, current.id, "DELETE", "task", task_id)

