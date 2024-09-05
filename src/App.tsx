import { Box, Heading, StackDivider } from '@chakra-ui/react'
import { createContext, useState } from 'react'
import TaskStack from './components/TaskStack'

export interface Task {
  id: number
  title: string
  children: (number|number[])[]
  completed?: boolean
  parallel?: boolean
}

const initialTasks = [
  { id: 0, title: 'Task 1', children: [2, 3], },
  { id: 1, title: 'Task 2', children: [3] },
  { id: 2, title: 'Task 3', children: [] },
  { id: 3, title: 'Task 4', children: [] },
]

export const TaskContext = createContext<{ tasks: Task[]; setTasks: any }>({
  tasks: [],
  setTasks: () => {},
})

const App = () => {
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
        <Heading
        onClick={() => console.log('tasks', tasks)}
        >1step2</Heading>
        <br />
        <TaskStack active parallel direction="row" divider={<StackDivider />} spacing={5}>
          {tasks
            .filter((task) => {
              return childrenTasks.indexOf(task.id) === -1
            })
            .map((task) => task.id)}
        </TaskStack>
      </Box>
    </TaskContext.Provider>
  )
}

export default App
