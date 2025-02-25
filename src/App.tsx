import { createContext, useState } from 'react'
import TaskList from './components/TaskList'
import { Task } from './Task'
import { Box, Button } from '@mui/material'
import NewTaskInput from './components/NewTaskInput'
import TaskDrawer from './components/TaskDrawer'

export const TasksContext = createContext<{
  tasks: Task[]
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
  selectedTask: number
  setSelectedTask: React.Dispatch<React.SetStateAction<number>>
} | null>(null)

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [selectedTask, setSelectedTask] = useState(0)

  return (
    <TasksContext.Provider value={{ tasks, setTasks, selectedTask, setSelectedTask }}>
      <Box px={2}>
        <Button
          variant="outlined"
          size="large"
          sx={{ m: 4 }}
          onClick={() => {
            const newTask = new Task()
            let newTasks = [...tasks, newTask]
            newTasks = !!selectedTask ? newTasks.map(task => task.id === selectedTask ? {...task, children: [...task.children, newTask.id]} : task) : newTasks
            setTasks(newTasks)
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
      <TaskDrawer taskId={selectedTask} />
    </TasksContext.Provider>
  )
}

export default App
