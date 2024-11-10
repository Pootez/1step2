import {
  Checkbox,
  Collapse,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { Task } from '../Task'
import { TasksContext } from '../App'
import { useContext, useState } from 'react'
import { ExpandLess, ExpandMore } from '@mui/icons-material'

const TaskItem = ({
  children: task,
  tree = [0],
  layer = 0,
}: {
  children: Task
  tree?: number[]
  layer?: number
}) => {
  const context = useContext(TasksContext)
  if (!context) return
  const { tasks, setTasks } = context

  const [open, setOpen] = useState(true)
  const isLeaf = task.children.length == 0

  return (
    <>
      <ListItem divider sx={{ pl: layer * 2 + 2 }}>
        <ListItemIcon sx={{ flexGrow: 0 }}>
          <Checkbox
            edge="start"
            checked={task.completed}
            onChange={() => {
              setTasks(
                tasks?.map((t) =>
                  t.id == task.id ? { ...t, completed: !t.completed } : t
                )
              )
            }}
            tabIndex={-1}
          />
        </ListItemIcon>
        <ListItemButton
          onClick={() => {
            task.id != 0 &&
              setTasks(
                tasks.map((t) =>
                  t.id == 1 && task.id != 1
                    ? { ...t, children: [...t.children, task.id].filter((child, idx, arr) => arr.indexOf(child) == idx) }
                    : t
                )
              )
          }}
        >
          <ListItemText primary={task.title} />
        </ListItemButton>
        {!isLeaf && (
          <ListItemButton sx={{ flexGrow: 0 }} onClick={() => setOpen(!open)}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        )}
      </ListItem>
      {!isLeaf && (
        <Collapse orientation="vertical" in={open}>
          {task.children
            .map((childId) => tasks.find((t) => t.id == childId))
            .filter((child) => !!child)
            .map((child, idx) => (
              <TaskItem
                key={[...tree, idx].join('-')}
                tree={[...tree, idx]}
                layer={layer + 1}
              >
                {child}
              </TaskItem>
            ))}
        </Collapse>
      )}
    </>
  )
}

export default TaskItem
