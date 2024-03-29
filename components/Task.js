import Link from "next/link";
import Cookie from "universal-cookie";
import { useContext } from "react";
import { StateContext } from "../context/StateContext";

const cookie = new Cookie();

export default function Task({ task, taskDeleted }) {
    const { setSelectedTask } = useContext(StateContext);
    const deleteTask = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/tasks/${task.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `JWT ${cookie.get("access_token")}`,
            },
        }).then((res) => {
            if (res.status === 401) {
                alert("JWT Token not valid");
            }
        });
        taskDeleted();
    }
    return (
        <div>
            <span>{task.id}</span>
            {" : "}
            <Link href={`/tasks/${task.id}`}>
                <span className="cursor-pointer text-white border-b border-gray-500 hover:bg-gray-600">
                    {task.title}
                </span>
            </Link>
            <div className="float-right ml-20">
                <svg
                    onClick={() => setSelectedTask(task)}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 float-left cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                </svg>
                <svg
                    onClick={deleteTask}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                </svg>
            </div>
        </div>
    );
}