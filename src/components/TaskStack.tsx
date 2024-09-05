import { useContext, useState } from 'react'
import { TaskContext } from '../App'
import { Stack, StackProps } from '@chakra-ui/react'
import TaskBlock from './TaskBlock'

interface TaskStackProps extends StackProps {
  children: (number | number[])[]
  parallel?: boolean
  active: boolean
}

const TaskStack = ({
  children,
  parallel,
  active,
  ...props
}: TaskStackProps) => {
  useContext(TaskContext)

  return (
    <Stack
      spacing={2}
      bg="var(--chakra-colors-chakra-body-bg)"
      p={2}
      borderRadius="md"
      {...props}
    >
      {children
        .reduceRight(
          (acc, id) => {
            if (parallel) {
              return {
                children: [
                  { id: id, active: active, setNextActive: null },
                  ...acc.children,
                ],
                nextActive: acc.nextActive,
              }
            }
            const [nextActive, setNextActive] = useState(false)
            return {
              children: [
                {
                  id: id,
                  active: acc.nextActive,
                  setNextActive: setNextActive,
                },
                ...acc.children,
              ],
              nextActive: nextActive,
            }
          },
          { children: [], nextActive: active } as {
            children: {
              id: number | number[]
              active: boolean
              setNextActive: React.Dispatch<React.SetStateAction<boolean>> | null
            }[]
            nextActive: boolean
          }
        )
        .children.map((child, index) => {
          return Array.isArray(child.id) ? (
            <TaskStack
              key={index}
              active={child.active}
              children={child.id}
              parallel
            />
          ) : (
            <TaskBlock key={index} id={child.id} active={child.active} setNextActive={child.setNextActive} />
          )
        })}
    </Stack>
  )
}

export default TaskStack
