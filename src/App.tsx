import { createContext, useState } from 'react'
import TaskList from './components/TaskList'
import { Task } from './Task'
import { Box, Button, styled } from '@mui/material'
import NewTaskInput from './components/NewTaskInput'
import TaskDrawer from './components/TaskDrawer'

export const drawerWidth = 500

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean
}>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  position: 'relative',
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
      },
    },
  ],
}))

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

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
    <TasksContext.Provider
      value={{ tasks, setTasks, selectedTask, setSelectedTask }}
    >
      <Box sx={{ display: 'flex' }}>
        <Main open={!!selectedTask}>
          <Box px={2} display="flex" flexDirection="column" alignItems="start">
            <Button
              variant="outlined"
              size="large"
              sx={{ m: 4 }}
              onClick={() => {
                const newTask = new Task()
                let newTasks = [...tasks, newTask]
                newTasks = !!selectedTask
                  ? newTasks.map((task) =>
                      task.id === selectedTask
                        ? { ...task, children: [...task.children, newTask.id] }
                        : task
                    )
                  : newTasks
                setTasks(newTasks)
              }}
            >
              1step2
            </Button>
            <Box sx={{ px: 3 }}>
              <NewTaskInput />
            </Box>
            <Box sx={{ px: 3 }}>
              <TaskList>
                {tasks.filter(
                  (task) =>
                    tasks.filter((t) => t.children.includes(task.id)).length == 0
                )}
              </TaskList>
            </Box>
          </Box>
        </Main>
        <TaskDrawer taskId={selectedTask} />
      </Box>
    </TasksContext.Provider>
  )
}

export default App
