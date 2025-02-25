import { Box, IconButton, Drawer } from '@mui/material'
import { ChevronRight } from '@mui/icons-material'
import { useContext } from 'react'
import { DrawerHeader, TasksContext, drawerWidth } from '../App'
import { TaskCard } from './TaskCard'

const TaskDrawer = ({ taskId = 0 }: { taskId?: number }) => {
  const context = useContext(TasksContext)
  if (!context) return
  const { tasks, setSelectedTask } = context

  const task = tasks.find((t) => t.id === taskId)
  if (!task) return

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
        },
      }}
      variant="persistent"
      anchor="right"
      open={!!taskId}
    >
      <DrawerHeader>
        <IconButton onClick={() => setSelectedTask(0)}>
          <ChevronRight />
        </IconButton>
      </DrawerHeader>
      <Box p={2}>
        <TaskCard>{task}</TaskCard>
      </Box>
    </Drawer>
  )
}

export default TaskDrawer
