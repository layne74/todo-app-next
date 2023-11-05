'use client'
import { useRouter } from "next/navigation"
import styles from './todo.module.css'

export default function Todo({ id, content, completed }) {
    const router = useRouter()

    function setChecked() {
        let todoH2 = document.getElementById(id).querySelector("h2");
        // let btn = document.getElementById(id).querySelector("button");
        todoH2.classList.toggle("checked");

        // todoH2.style.cursor = "wait";
        // todoH2.style.pointerEvents = "none";
        
        setTimeout(() => {
            // todoH2.style.pointerEvents = "auto";
            // todoH2.style.cursor = "pointer";
        }, 2500)
    }

    function removeTodoFromDom() {
        let todoDiv = document.getElementById(id);
        let btn = document.getElementById(id).querySelector("button");
        
        todoDiv.style.transition = '0.8s';
        todoDiv.style.opacity = 0;
        todoDiv.style.cursor = "wait";
        setTimeout(() => {
            todoDiv.style.display = "none";
        }, 800)


        btn.style.pointerEvents = "none";
        btn.classList.add("fade-out");


    }

    async function deleteTodo() {
        removeTodoFromDom()
        try {
            await fetch(`/api/todo/${id}`, {
                method: "DELETE",
            })
            router.refresh()
        } catch (error) {
            console.error(error)
        }
    }

    async function toggleTodo() {
        try {
            setChecked()
            await fetch(`/api/todo/${id}`, {
                method: "PUT",
                body: JSON.stringify({ completed: !completed }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            router.refresh()
        } catch (error) {
            setChecked()
            console.error(error)
        }
    }

    return (
        <div id={id} className={styles.todoBox}>
            <h2 onClick={toggleTodo} className={completed ? `${styles.checked} ${styles.todoContent}` : styles.todoContent}>{content}</h2>
            <button onClick={deleteTodo}> X</button>
        </div>
    )
}
