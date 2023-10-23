import { useTodo } from "~/context";
import { Button } from ".";
import { useState } from "react";

const TodosInput = () => {

    const { addTodo, inputRef } = useTodo();
    const [name, setName] = useState<string>("");

    return (
        <form
                className="form"
                onSubmit={e => {
                    e.preventDefault();
                    addTodo(name);
                    setName("");
                }}
            >
                <div className="form__group">
                    <label htmlFor="todo-input" className="form__group__label "></label>
                    <input
                        ref={inputRef}
                        id="todo-input"
                        type="text"
                        className="form__group__input"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <Button className="button form__group__button" label="Add Todo" />
                </div>
            </form>
    );
};

export default TodosInput;