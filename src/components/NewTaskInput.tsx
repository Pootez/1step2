import { Add } from '@mui/icons-material'
import { Button, TextField } from '@mui/material'
import { useContext, useState } from 'react'
import { TasksContext } from '../App'
import { Task } from '../Task'

const NewTaskInput = () => {
  const [text, setText] = useState('')

  const context = useContext(TasksContext)
  if (!context) return
  const { tasks, setTasks } = context

  const addTask = () => {
    if (text) setTasks([...tasks, new Task(text)])
  }

  return (
    <TextField
      fullWidth
      size="medium"
      placeholder="New Task..."
      onChange={(e) => setText(e.target.value)}
      slotProps={{
        input: {
          endAdornment: (
            <Button
              {...(!text && { disabled: true })}
              variant={!text ? 'outlined' : 'contained'}
              endIcon={<Add />}
              onClick={addTask}
            >
              Add
            </Button>
          ),
        },
      }}
    />
  )
}

export default NewTaskInput
