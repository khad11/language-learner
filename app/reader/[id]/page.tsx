"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAppContext } from "@/components/providers"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, BookOpen } from "lucide-react"
import { TranslationModal } from "@/components/translation-modal"

export default function ReaderPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const { files, addSavedWord } = useAppContext()
  const [file, setFile] = useState<any>(null)
  const [selectedText, setSelectedText] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [translation, setTranslation] = useState("")

  useEffect(() => {
    if (params.id) {
      const foundFile = files.find((f) => f.id === params.id)
      if (foundFile) {
        setFile(foundFile)
      } else {
        router.push("/my-files")
      }
    }
  }, [params.id, files, router])

  const handleTextSelection = () => {
    const selection = window.getSelection()
    if (selection && selection.toString().trim().length > 0) {
      setSelectedText(selection.toString().trim())
      setIsModalOpen(true)
    }
  }

  const handleSaveWord = () => {
    if (selectedText && translation && file) {
      // Get some context around the selected word
      const content = file.content
      const index = content.indexOf(selectedText)
      const start = Math.max(0, index - 30)
      const end = Math.min(content.length, index + selectedText.length + 30)
      const context = content.substring(start, end).replace(selectedText, `**${selectedText}**`)

      addSavedWord({
        word: selectedText,
        translation,
        context,
        fileId: file.id,
        fileName: file.name,
      })

      toast({
        title: "Word saved",
        description: `"${selectedText}" has been added to your vocabulary`,
      })

      setIsModalOpen(false)
      setSelectedText("")
      setTranslation("")
    }
  }

  if (!file) {
    return <div className="container mx-auto px-4 py-12">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => router.push("/my-files")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Files
          </Button>
          <Button variant="outline" onClick={() => router.push("/saved-words")}>
            <BookOpen className="mr-2 h-4 w-4" />
            View Saved Words
          </Button>
        </div>

        <div className="bg-card rounded-lg p-6 border">
          <h1 className="text-2xl font-bold mb-6">{file.name}</h1>

          <div className="prose dark:prose-invert max-w-none" onMouseUp={handleTextSelection}>
            {file.content.split("\n").map((paragraph: string, i: number) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="bg-muted p-4 rounded-lg">
          <p className="text-sm">
            <strong>Tip:</strong> Select any word or phrase to save it to your vocabulary list with a translation.
          </p>
        </div>
      </div>

      <TranslationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedText={selectedText}
        translation={translation}
        onTranslationChange={setTranslation}
        onSave={handleSaveWord}
      />
    </div>
  )
}
