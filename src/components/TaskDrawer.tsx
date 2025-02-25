import { Box, Button, Drawer } from '@mui/material'
import { useContext } from 'react'
import { TasksContext } from '../App'
import { TaskCard } from './TaskCard'

const TaskDrawer = ({ taskId = 0 }: { taskId?: number }) => {
  const context = useContext(TasksContext)
  if (!context) return
  const { tasks, setSelectedTask } = context

  const task = tasks.find((t) => t.id === taskId)
  if (!task) return

  return (
    <Drawer variant="persistent" anchor="right" open={!!taskId}>
      <Button onClick={() => setSelectedTask(0)}>Exit</Button>
      <Box p={2}>
        <TaskCard>{task}</TaskCard>
      </Box>
    </Drawer>
  )
}

export default TaskDrawer
