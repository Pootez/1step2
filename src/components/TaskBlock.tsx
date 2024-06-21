import {
  Card,
  CardHeader,
  Stack,
  StackDivider,
  CardBody,
  Heading,
} from '@chakra-ui/react'
import { TaskContext } from '../App'
import { useContext } from 'react'

interface Props {
  id: number
}

const TaskBlock = ({ id }: Props) => {
  const { tasks, setTasks } = useContext(TaskContext)
  const task = tasks.find((task) => task.id === id)

  if (!task) {
    setTasks(tasks.map((t) => t.children.filter((childId) => childId !== id)))
    return <></>
  }

  return (
    <Card key={id} variant="outline">
      <CardHeader>
        <Heading size="md">{task.title}</Heading>
      </CardHeader>
      {task.children.length > 0 && (
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            {task.children.map((id) => {
              return <TaskBlock id={id} />
            })}
          </Stack>
        </CardBody>
      )}
    </Card>
  )
}

export default TaskBlock
