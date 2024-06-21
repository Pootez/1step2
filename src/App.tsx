import { Box, Heading, Stack, StackDivider } from '@chakra-ui/react'
import TaskBlock from './components/TaskBlock'
import { createContext, useState } from 'react'

export interface Task {
  id: number
  title: string
  children: number[]
}

const initialTasks = [
  { id: 0, title: 'Task 1', children: [2, 3] },
  { id: 1, title: 'Task 2', children: [] },
  { id: 2, title: 'Task 3', children: [] },
  { id: 3, title: 'Task 4', children: [] },
]

export const TaskContext = createContext<{ tasks: Task[]; setTasks: any }>({
  tasks: [],
  setTasks: () => {},
})

function App() {
  const [tasks, setTasks] = useState(initialTasks)
  const childrenTasks = tasks
    .map((task) => task.children)
    .reduce((acc, children) => {
      return [...acc, ...children]
    })
    .filter((id, index, self) => self.indexOf(id) === index)

  return (
    <TaskContext.Provider value={{ tasks: tasks, setTasks: setTasks }}>
      <Box p={5}>
        <Heading>1step2</Heading>
        <br />
        <Stack divider={<StackDivider />} spacing="4">
          {tasks
            .filter((task) => {
              return childrenTasks.indexOf(task.id) === -1
            })
            .map((task) => {
              return <TaskBlock id={task.id} />
            })}
        </Stack>
      </Box>
    </TaskContext.Provider>
  )
}

export default App
