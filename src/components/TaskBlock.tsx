import { Card, CardHeader, Stack, CardBody, Heading } from '@chakra-ui/react'
import { TaskContext, Task } from '../App'
import { useContext } from 'react'

interface Props {
  id: number
  active?: boolean
}

const TaskBlock = ({ id, active }: Props) => {
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
          <Stack
            spacing={2}
            bg="var(--chakra-colors-chakra-body-bg)"
            p={2}
            borderRadius="md"
          >
            {task.children
              .map((id) => tasks.find((t) => t.id === id) as Task)
              .filter((t) => t)
              .reduceRight(
                (acc, t) => {
                  const active =
                    acc.length === 0 ||
                    (acc[0].active &&
                      !!acc[0].task.completed &&
                      !!acc[0].task.consecutive)
                  return [{ task: t, active: active }, ...acc]
                },
                [] as {
                  task: Task
                  active: boolean
                }[]
              )
              .map(({ task, active }) => (
                <TaskBlock key={task.id} id={task.id} active={active} />
              ))}
          </Stack>
        </CardBody>
      )}
    </Card>
  )
}

export default TaskBlock
