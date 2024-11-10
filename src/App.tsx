import { createContext, useState } from 'react'
import TaskList from './components/TaskList'
import { Task } from './Task'
import { Box, Button } from '@mui/material'
import NewTaskInput from './components/NewTaskInput'

export const TasksContext = createContext<{
  tasks: Task[]
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
} | null>(null)

function App() {
  const [tasks, setTasks] = useState<Task[]>([])

  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      <Box px={2}>
        <Button
          variant="outlined"
          size="large"
          sx={{ m: 4 }}
          onClick={() => {
            setTasks([...tasks, new Task()])
          }}
        >
          1step2
        </Button>
      </Box>
      <Box sx={{ width: '100%', px: 3 }}>
        <NewTaskInput />
      </Box>
      <Box sx={{ width: '100%', px: 3 }}>
        <TaskList>{tasks.filter(task => tasks.filter(t => t.children.includes(task.id)).length == 0)}</TaskList>
      </Box>
    </TasksContext.Provider>
  )
}

export default App
