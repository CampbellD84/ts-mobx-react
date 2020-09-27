import React from 'react'
import { useObserver } from "mobx-react-lite"
import { useStores } from '../stores/helpers/use-stores'
import Todo from '../stores/data/todos/todo'
import { TodoComponent } from './Todo'

export const TodoList = () => {
    const { dataStores: { todoStore } } = useStores()
    return useObserver(() => {
        return (
            <div>
                <div style={{ marginBottom: '150px' }}>
                    Incomplete
                    {todoStore.incompleteTodos.map((todo: Todo) => <TodoComponent todo={todo} key={todo.id} />)}
                </div>
                <div>
                    Complete
                    {todoStore.completeTodos.map((todo: Todo) => <TodoComponent todo={todo} key={todo.id} />)}
                </div>
            </div>
        )
    })
}