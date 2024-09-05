import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Button,
  HStack,
} from '@chakra-ui/react'
import { TaskContext } from '../App'
import { useContext, useEffect } from 'react'
import TaskStack from './TaskStack'

interface TaskBlockProps {
  id: number
  active?: boolean
  setNextActive?: React.Dispatch<React.SetStateAction<boolean>> | null
}

const TaskBlock = ({ id, active, setNextActive }: TaskBlockProps) => {
  const { tasks, setTasks } = useContext(TaskContext)
  const task = tasks.find((task) => task.id === id)

  if (!task) {
    setTasks(tasks.map((t) => t.children.filter((childId) => childId !== id)))
    return <></>
  }

  const isLeaf = task.children.length === 0
  const isOrphan =
    tasks.filter((t) => t.children.indexOf(id) !== -1).length === 0

  useEffect(() => {
    setNextActive && ((!!active && !!task.completed) ? setNextActive(true) : setNextActive(false))
  })

  return (
    <Card
      key={id}
      variant={!!active || isOrphan ? 'elevated' : 'outline'}
      width="100%"
      onClick={(e) => {
        e.stopPropagation()
        setTasks(
          tasks.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t
          )
        )
      }}
    >
      <CardHeader>
        <HStack justifyContent={'space-between'}>
          {isLeaf ? (
            <Button
              variant={active ? 'solid' : 'outline'}
              colorScheme={task.completed ? 'green' : 'red'}
            >
              <Heading size="md">{task.title}</Heading>
            </Button>
          ) : (
            <Heading size="md">{task.title}</Heading>
          )}
        </HStack>
      </CardHeader>
      {!isLeaf && (
        <CardBody p={2}>
          <TaskStack active={!!active}>{task.children}</TaskStack>
        </CardBody>
      )}
    </Card>
  )
}

export default TaskBlock
