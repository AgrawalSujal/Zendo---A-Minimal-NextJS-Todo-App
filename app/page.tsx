"use client";
import React, { useEffect, useState } from "react";

interface todo {
  id: number;
  text: string;
  completed: boolean;
}

const HomePage = () => {
  // maintain state one for the form & another for the list
  const [input, setInput] = useState("");
  const [todo, setTodo] = useState<todo[]>([]);

  const handleAddItem = (e) => {
    e.preventDefault();
    setTodo([...todo, { id: Date.now(), text: input, completed: false }]);
    setInput("");
  };

  const handleComplete = (item: todo) => {
    if (item) {
      setTodo([
        ...todo.filter((i: todo) => i.id !== item.id),
        { ...item, completed: !item.completed },
      ]);
    }
  };

  useEffect(() => {
    const storedTodo = localStorage.getItem("todo");
    if (storedTodo) {
      setTodo(JSON.parse(storedTodo));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-2xl">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-6">
          🧘 ZenDo
        </h1>

        {/* Input + Add */}
        <form onSubmit={handleAddItem} className="flex items-center gap-3 mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What's on your mind today?"
            className="flex-grow p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
            Add
          </button>
        </form>

        {/* Task List */}
        <div className="space-y-3">
          {todo.length === 0 ? (
            <p className="text-center text-gray-500">
              Nothing added yet. Start your Zen 🧘‍♂️
            </p>
          ) : (
            todo.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-blue-50 px-4 py-3 rounded-lg shadow-sm">
                <span
                  className={`text-base flex-grow ${
                    item.completed
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }`}>
                  {item.text}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleComplete(item)}
                    className={`text-sm px-3 py-1 rounded-md font-medium transition ${
                      item.completed
                        ? "bg-yellow-400 hover:bg-yellow-500 text-white"
                        : "bg-green-500 hover:bg-green-600 text-white"
                    }`}>
                    {item.completed ? "Undo" : "Done"}
                  </button>
                  <button
                    onClick={() =>
                      setTodo(todo.filter((i) => i.id !== item.id))
                    }
                    className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-md font-medium transition">
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
};

export default HomePage;
