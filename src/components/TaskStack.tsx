import { useContext } from 'react'
import { Task, TaskContext } from '../App'
import { Stack, StackProps } from '@chakra-ui/react'
import TaskBlock from './TaskBlock'

interface TaskStackProps extends StackProps {
  children: number[]
}

const TaskStack = ({ children, ...props }: TaskStackProps) => {
  const { tasks } = useContext(TaskContext)

  return (
    <Stack
      spacing={2}
      bg="var(--chakra-colors-chakra-body-bg)"
      p={2}
      borderRadius="md"
      {...props}
    >
      {children
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
  )
}

export default TaskStack
