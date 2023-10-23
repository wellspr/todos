import { type MetaFunction } from "@remix-run/node";
import { TodosInput, TodosList, TodosCompleted } from "~/components";

export const meta: MetaFunction = () => {
    return [
        { title: "Todo App" },
        { name: "description", content: "A Todo App Powered by Remix" },
    ];
};

export default function Index() {

    return (
        <>
            <TodosInput />

            <h2>Current Tasks</h2>
            <TodosList />

            <h2>Completed Tasks</h2>
            <TodosCompleted />
        </>
    );
};

