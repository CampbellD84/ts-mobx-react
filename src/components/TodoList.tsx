import React, { FunctionComponent, useState } from 'react'
import { useObserver } from "mobx-react-lite"
import { useStores } from '../stores/helpers/use-stores'
import Todo from '../stores/data/todos/todo'
import { TodoComponent } from './Todo'
import User from '../stores/data/users/user'

interface Props {
    user?: User
}

export const TodoList: FunctionComponent<Props> = ({ user }) => {
    const [text, setText] = useState('')
    const { dataStores: { todoStore } } = useStores()
    return useObserver(() => {
        return (
            <div>
                <div style={{ marginBottom: 150 }}>
                    <div>Incomplete</div>
                    {
                        user ? user.incompleteTodos.map((todo: Todo) => <TodoComponent todo={todo} key={todo.id} />)
                            :
                            todoStore.incompleteTodos.map(todo => <TodoComponent todo={todo} key={todo.id} />)
                    }
                </div>
                <div>
                    <div>Complete</div>
                    {
                        user ? user.completeTodos.map((todo: Todo) => <TodoComponent todo={todo} key={todo.id} />)
                            :
                            todoStore.completeTodos.map((todo: Todo) => <TodoComponent todo={todo} key={todo.id} />)
                    }
                </div>
                <div style={{ marginTop: 50 }}>
                    <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
                    <button onClick={() => {
                        todoStore.addTodo(text, user ? user.id : 999)
                        setText('')
                    }}>Add Todo</button>
                </div>
            </div>
        )
    })
}