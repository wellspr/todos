import { useTodo } from "~/context";
import { Button } from ".";

const TodosCompleted = () => {

    const { todos, updateTodo } = useTodo();

    return (
        <div className="list-completed">
            {
                todos && todos.map(todo => {

                    if (todo.finished) {
                        return (
                            <li
                                key={todo.key}
                                className="list__item list__item--finished"
                            >
                                <div className="list__item__name">
                                        {todo.name}
                                </div>
                                <div className="list__item__buttons">
                                    <Button
                                        className="button button__control button__repeat"
                                        label="Repeat task"
                                        onClick={() => updateTodo(todo.key, { ...todo, finished: false })}
                                    />
                                </div>
                            </li>
                        );
                    }

                    return null;
                })
            }
        </div>
    );
};

export default TodosCompleted;