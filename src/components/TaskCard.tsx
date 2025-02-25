import { Card, CardContent } from '@mui/material'
import { Task } from '../Task'
import { useContext } from 'react'
import { TasksContext } from '../App'
import TaskList from './TaskList'

export const TaskCard = ({ children: task }: { children: Task }) => {
  const context = useContext(TasksContext)
  if (!context) return
  const { tasks } = context

  return (
    <Card variant="outlined">
      <CardContent>
        <h2>{task.title}</h2>
        <TaskList>
          {task.children.map(childId => tasks.find(t => t.id === childId)).filter(t  => !!t)}
        </TaskList>
      </CardContent>
    </Card>
  )
}
