"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "../../../components/ui/button"
import { Card } from "../../../components/ui/card"
import { FileViewer } from "../../../components/file-viewer"
import { ArrowLeft, Save } from "lucide-react"
import { useToast } from "../../../components/ui/use-toast"

// Mock file content
const mockFileContent = `
Language learning is the process by which humans acquire the capacity to perceive, produce, and use words to understand and communicate. This capacity involves acquiring diverse aspects of language.

Learning a second language means acquiring a system of rules, but just as a very young child learning their first language is not aware of the formal rules of the language, the second language learner is not aware of the rules they have acquired.

Research has shown that the most effective way to learn a language is through immersion and consistent practice. Reading texts in the target language is particularly beneficial as it exposes learners to vocabulary in context.
`

export default function FilePage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [selectedWords, setSelectedWords] = useState([])
  const [fileContent, setFileContent] = useState(mockFileContent)
  const fileId = params.id

  const handleWordSelect = (word) => {
    if (!selectedWords.includes(word)) {
      setSelectedWords([...selectedWords, word])
      toast({
        title: "Word added",
        description: `"${word}" has been added to your vocabulary list.`,
      })
    }
  }

  const handleSaveWords = () => {
    // In a real app, this would save to a backend
    // For now, we'll just simulate saving to localStorage
    const savedWords = JSON.parse(localStorage.getItem("savedWords") || "[]")
    const newWords = selectedWords.filter((word) => !savedWords.some((sw) => sw.word === word))

    const wordsToSave = newWords.map((word) => ({
      id: Math.random().toString(36).substring(7),
      word,
      translation: "", // In a real app, this would be fetched from a translation API
      context: fileContent.substring(
        Math.max(0, fileContent.indexOf(word) - 30),
        Math.min(fileContent.length, fileContent.indexOf(word) + word.length + 30),
      ),
      date: new Date().toISOString(),
    }))

    localStorage.setItem("savedWords", JSON.stringify([...savedWords, ...wordsToSave]))

    toast({
      title: "Words saved",
      description: `${newWords.length} new words have been saved to your vocabulary list.`,
    })

    setSelectedWords([])
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Files
          </Button>

          {selectedWords.length > 0 && (
            <Button onClick={handleSaveWords}>
              <Save className="mr-2 h-4 w-4" />
              Save {selectedWords.length} Words
            </Button>
          )}
        </div>

        <Card className="p-6">
          <FileViewer content={fileContent} onWordSelect={handleWordSelect} selectedWords={selectedWords} />
        </Card>
      </div>
    </div>
  )
}
