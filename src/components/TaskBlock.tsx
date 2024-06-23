import { Card, CardHeader, CardBody, Heading } from '@chakra-ui/react'
import { TaskContext } from '../App'
import { useContext } from 'react'
import TaskStack from './TaskStack'

interface TaskBlockProps {
  id: number
  active?: boolean
}

const TaskBlock = ({ id, active }: TaskBlockProps) => {
  const { tasks, setTasks } = useContext(TaskContext)
  const task = tasks.find((task) => task.id === id)

  if (!task) {
    setTasks(tasks.map((t) => t.children.filter((childId) => childId !== id)))
    return <></>
  }

  // const isLeaf = task.children.length === 0
  const isOrphan =
    tasks.filter((t) => t.children.indexOf(id) !== -1).length === 0

  return (
    <Card
      key={id}
      variant={!!active || isOrphan ? 'elevated' : 'outline'}
      width="100%"
    >
      <CardHeader>
        <Heading size="md">{task.title}</Heading>
      </CardHeader>
      {task.children.length > 0 && (
        <CardBody p={2}>
          <TaskStack>{task.children}</TaskStack>
        </CardBody>
      )}
    </Card>
  )
}

export default TaskBlock
