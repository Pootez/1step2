
export class Task {
    private static idCount = 1;
    id: number
    title: string
    children: number[]
    completed = false

    constructor(title?: string, children?: number[]) {
        this.id = Task.idCount++
        this.title = title || "Task #" + this.id
        this.children = children || []
    }
}