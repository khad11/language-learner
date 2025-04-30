"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type File = {
  id: string
  name: string
  content: string
  type: string
  dateAdded: string
}

type SavedWord = {
  id: string
  word: string
  translation: string
  context: string
  fileId: string
  fileName: string
  dateAdded: string
}

type AppContextType = {
  files: File[]
  savedWords: SavedWord[]
  addFile: (file: Omit<File, "id" | "dateAdded">) => void
  removeFile: (id: string) => void
  addSavedWord: (word: Omit<SavedWord, "id" | "dateAdded">) => void
  removeSavedWord: (id: string) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function Providers({ children }: { children: React.ReactNode }) {
  const [files, setFiles] = useState<File[]>([])
  const [savedWords, setSavedWords] = useState<SavedWord[]>([])

  // Load data from localStorage on mount
  useEffect(() => {
    const storedFiles = localStorage.getItem("lingualearn-files")
    const storedWords = localStorage.getItem("lingualearn-words")

    if (storedFiles) {
      setFiles(JSON.parse(storedFiles))
    }

    if (storedWords) {
      setSavedWords(JSON.parse(storedWords))
    }
  }, [])

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("lingualearn-files", JSON.stringify(files))
  }, [files])

  useEffect(() => {
    localStorage.setItem("lingualearn-words", JSON.stringify(savedWords))
  }, [savedWords])

  const addFile = (file: Omit<File, "id" | "dateAdded">) => {
    const newFile = {
      ...file,
      id: crypto.randomUUID(),
      dateAdded: new Date().toISOString(),
    }
    setFiles((prev) => [...prev, newFile])
  }

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id))
    // Also remove any saved words associated with this file
    setSavedWords((prev) => prev.filter((word) => word.fileId !== id))
  }

  const addSavedWord = (word: Omit<SavedWord, "id" | "dateAdded">) => {
    const newWord = {
      ...word,
      id: crypto.randomUUID(),
      dateAdded: new Date().toISOString(),
    }
    setSavedWords((prev) => [...prev, newWord])
  }

  const removeSavedWord = (id: string) => {
    setSavedWords((prev) => prev.filter((word) => word.id !== id))
  }

  return (
    <AppContext.Provider
      value={{
        files,
        savedWords,
        addFile,
        removeFile,
        addSavedWord,
        removeSavedWord,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext must be used within a Providers component")
  }
  return context
}
