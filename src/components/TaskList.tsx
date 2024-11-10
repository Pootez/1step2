import { List } from '@mui/material'
import { Task } from '../Task'
import TaskItem from './TaskItem'

const TaskList = ({ children: tasks }: { children: Task[] }) => {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {tasks.map((task, idx) => (
        <TaskItem key={'' + idx}>{task}</TaskItem>
      ))}
    </List>
  )
}

export default TaskList
