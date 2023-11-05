"use client";
import styles from "./todoInput.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";

export default function TodoInput() {
    const [todo, setTodo] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [buttonText, setButtonText] = useState("Add");
    const router = useRouter();

    async function addTodo(e) {
        setLoading(true);
        setButtonText("Adding...");
        e.preventDefault();
        try {
            await fetch(`/api/create-post`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ content: todo }),
            });
            setTodo("");
            setLoading(false);
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
            }, 2000);
            setButtonText("Add");
            router.refresh();
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    return (
        <>
            <form action={addTodo}>
                <input
                    type="text"
                    placeholder="Add a todo"
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                />
                <button type="submit" onClick={(e) => addTodo(e)}>{buttonText}</button>
            </form>
            <div className={styles.messageBox}>
                {loading && <p className={styles.loading}>Loading...</p>}
                {error && <p className={styles.error}>Error</p>}
                {success && <p className={styles.success}>Todo Added</p>}
            </div>
            
        </>
    )
}

