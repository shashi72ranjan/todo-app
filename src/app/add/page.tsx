"use client";

import { BackgroundBeams } from "@/components/ui/background-beams";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import ColourfulText from "@/components/ui/colourful-text";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { motion } from "framer-motion";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/stateful-button";



type Doc = {
  id: number;
  title: string;
  content: string;
  completed: boolean;
};


const LOCAL_STORAGE_KEY = "my-docs";

export default function DocumentationManager() {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    const storedDocs = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedDocs) {
      setDocs(JSON.parse(storedDocs));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(docs));
  }, [docs]);

  const handleAddOrUpdate = () => {
    if (!title || !content) return;

    if (editingId !== null) {
      setDocs((prev) =>
        prev.map((doc) =>
          doc.id === editingId ? { ...doc, title, content } : doc
        )
      );
      setEditingId(null);
    } else {
      const newDoc: Doc = {
        id: Date.now(),
        title,
        content,
        completed: false,
      };
      setDocs((prev) => [...prev, newDoc]);
    }

    setTitle("");
    setContent("");
  };

  const handleDelete = (id: number) => {
    setDocs((prev) => prev.filter((doc) => doc.id !== id));
  };

  const handleEdit = (doc: Doc) => {
    setTitle(doc.title);
    setContent(doc.content);
    setEditingId(doc.id);
  };

  const toggleComplete = (id: number) => {
    setDocs((prev) =>
      prev.map((doc) =>
        doc.id === id ? { ...doc, completed: !doc.completed } : doc
      )
    );
  };

  return (
    <div className="relative min-h-screen  overflow-hidden">
      {/* Background Animation */}
      <BackgroundBeams className="z-0 bg-black" />
        
      {/* Foreground Content */}
      <div className="relative z-10 max-w-6xl mx-auto mt-10 p-4 space-y-6">
        <div className="relative z-10">
        <div>
          <motion.h1
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="mt-10 text-2xl md:text-4xl lg:text-5xl font-bold text-center text-white bg-black/80 backdrop-blur-md rounded-md p-4 shadow-md font-sans relative z-10"
>
  📄 <ColourfulText text="Documentation Manager" />
</motion.h1>

        </div>
</div>

       
<div >
  <PlaceholdersAndVanishInput
  placeholders={["Enter your document title", "What's this doc about?", "Give it a name!"]}
  onChange={(e) => setTitle(e.target.value)}
  value={" "}
 
/>
 <textarea
  placeholder="Content"
  value={content}
  onChange={(e) => setContent(e.target.value)}
  className="w-full h-32 px-4 py-3 rounded-md border border-neutral-300 bg-black/60 text-white font-mono placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-md resize-none mb-5"
/>

         <Button onClick={handleAddOrUpdate}>
  {editingId !== null ? "Update Documentation" : "Add Documentation"}
</Button>

        </div>

        {/* Documentation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {docs.map((doc) => (
            <CardSpotlight 
              key={doc.id} 
              className={`h-auto min-h-80 ${doc.completed ? "opacity-70" : ""}`}
            >
              <div className="p-4">
                <h2 className={`text-xl font-bold relative z-20 text-white ${doc.completed ? "line-through" : ""}`}>
                  {doc.title}
                </h2>
                <p className="text-neutral-200 mt-4 relative z-20 text-sm">
                  {doc.content}
                </p>
                
                <div className="flex gap-4 mt-6 relative z-20">
                  <button
                    onClick={() => handleEdit(doc)}
                    className="text-blue-300 hover:text-blue-100 text-sm flex items-center gap-1"
                  >
                    <EditIcon />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="text-red-300 hover:text-red-100 text-sm flex items-center gap-1"
                  >
                    <DeleteIcon />
                    Delete
                  </button>
                  <button
                    onClick={() => toggleComplete(doc.id)}
                    className="text-green-300 hover:text-green-100 text-sm flex items-center gap-1"
                  >
                    {doc.completed ? (
                      <>
                        <UndoIcon />
                        Undo
                      </>
                    ) : (
                      <>
                        <CheckIcon />
                        Complete
                      </>
                    )}
                  </button>
                </div>
                
                {doc.completed && (
                  <p className="text-green-400 mt-4 relative z-20 text-xs flex items-center gap-1">
                    <CheckCircleIcon />
                    Completed
                  </p>
                )}
              </div>
            </CardSpotlight>
          ))}
        </div>
      </div>
    </div>
  );
}

// Icon Components
const EditIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
};

const DeleteIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
};

const CheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
};

const UndoIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 7v6h6" />
      <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
    </svg>
  );
};

const CheckCircleIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
};