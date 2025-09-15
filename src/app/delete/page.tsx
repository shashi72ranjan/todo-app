"use client";

import React, { useEffect, useState } from "react";
import { WobbleCard } from "@/components/ui/wobble-card";
import ColourfulText from "@/components/ui/colourful-text";
import { BackgroundLines } from "@/components/ui/background-lines";

type Doc = {
  id: number;
  title: string;
  content: string;
  completed: boolean;
};

const LOCAL_STORAGE_KEY = "my-docs";

export default function MyDocuments() {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeDocId, setActiveDocId] = useState<number | null>(null);

  useEffect(() => {
    const storedDocs = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedDocs) {
      setDocs(JSON.parse(storedDocs));
    }
  }, []);

  const filteredDocs = docs.filter((doc) =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeDoc = docs.find((doc) => doc.id === activeDocId);

  return (
    <BackgroundLines className="fixed inset-0 z-0 h-screen w-screen overflow-auto px-4 py-10">
      <div className="max-w-7xl mx-auto space-y-6 relative z-10 mt-20">
        <h1 className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white">
          📄 <ColourfulText text="Documentation Manager" />
        </h1>

       <input
  type="text"
  placeholder="Search by title..."
  value={searchTerm}
  onChange={(e) => {
    setSearchTerm(e.target.value);
    setActiveDocId(null);
  }}
  className="w-full px-4 py-3 rounded-md border border-neutral-300 bg-black/60 text-white font-mono placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-md mb-5"
/>


        {activeDoc ? (
          <WobbleCard containerClassName="mt-6 bg-indigo-800 min-h-[300px]">
            <div className="max-w-md">
              <h2 className="text-left text-base md:text-xl lg:text-3xl font-semibold tracking-tight text-white">
                {activeDoc.title}
              </h2>
              <p className="mt-4 text-left text-base text-neutral-200">
                {activeDoc.content}
              </p>
              {activeDoc.completed && (
                <span className="text-green-300 text-xs font-medium mt-2 block">
                  ✅ Completed
                </span>
              )}
              <button
                onClick={() => setActiveDocId(null)}
                className="mt-4 text-blue-200 hover:underline text-sm"
              >
                ← Back to list
              </button>
            </div>
          </WobbleCard>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {filteredDocs.length === 0 ? (
              <p className="text-neutral-500">No matching documents found.</p>
            ) : (
              filteredDocs.map((doc) => (
                <WobbleCard
                  key={doc.id}
                  containerClassName="bg-blue-900 min-h-[300px] cursor-pointer"
                >
                  <button
                    onClick={() => setActiveDocId(doc.id)}
                    className="w-full text-left"
                  >
                    <div className="max-w-sm">
                      <h2 className="text-base md:text-xl lg:text-2xl font-semibold tracking-tight text-white">
                        {doc.title}
                      </h2>
                      <p className="mt-2 text-sm text-neutral-200 line-clamp-3">
                        {doc.content}
                      </p>
                      {doc.completed && (
                        <span className="text-green-300 text-xs font-medium mt-2 block">
                          ✅ Completed
                        </span>
                      )}
                    </div>
                  </button>
                </WobbleCard>
              ))
            )}
          </div>
        )}
      </div>
    </BackgroundLines>
  );
}