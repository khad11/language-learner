"use client"

import { useState, useEffect, useRef } from "react"

export function FileViewer({ content, onWordSelect, selectedWords }) {
  const [processedContent, setProcessedContent] = useState([])
  const viewerRef = useRef(null)

  useEffect(() => {
    // Process content to make words selectable
    const paragraphs = content.split("\n").filter((p) => p.trim() !== "")

    const processed = paragraphs.map((paragraph, pIndex) => {
      const words = paragraph.split(/(\s+)/).map((part, index) => {
        // Skip spaces and punctuation
        if (part.trim() === "" || /^[.,;:!?()[\]{}'"]+$/.test(part)) {
          return <span key={`${pIndex}-${index}`}>{part}</span>
        }

        // Clean the word (remove punctuation)
        const cleanWord = part.replace(/[.,;:!?()[\]{}'"]+/g, "")
        const isPunctuation = cleanWord !== part
        const punctuation = isPunctuation ? part.slice(cleanWord.length) : ""

        const isSelected = selectedWords.includes(cleanWord)

        return (
          <span key={`${pIndex}-${index}`}>
            <span
              className={`cursor-pointer ${
                isSelected ? "bg-primary/30 rounded px-0.5" : "hover:bg-primary/10 hover:rounded hover:px-0.5"
              }`}
              onClick={() => onWordSelect(cleanWord)}
            >
              {cleanWord}
            </span>
            {punctuation}
          </span>
        )
      })

      return (
        <p key={pIndex} className="mb-4">
          {words}
        </p>
      )
    })

    setProcessedContent(processed)
  }, [content, selectedWords, onWordSelect])

  return (
    <div ref={viewerRef} className="prose dark:prose-invert max-w-none">
      {processedContent}
    </div>
  )
}
