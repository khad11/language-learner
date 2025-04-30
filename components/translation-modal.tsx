"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Save } from "lucide-react"

type TranslationModalProps = {
  isOpen: boolean
  onClose: () => void
  selectedText: string
  translation: string
  onTranslationChange: (translation: string) => void
  onSave: () => void
}

export function TranslationModal({
  isOpen,
  onClose,
  selectedText,
  translation,
  onTranslationChange,
  onSave,
}: TranslationModalProps) {
  // In a real app, we might fetch translations from an API
  // For this demo, we'll simulate a translation
  const [isTranslating, setIsTranslating] = useState(false)

  const handleAutoTranslate = () => {
    setIsTranslating(true)

    // Simulate API call with timeout
    setTimeout(() => {
      // Mock translations for demo purposes
      const mockTranslations: Record<string, string> = {
        hello: "hola",
        goodbye: "adiós",
        book: "libro",
        language: "idioma",
        learn: "aprender",
        word: "palabra",
        translate: "traducir",
      }

      const lowerCaseWord = selectedText.toLowerCase()
      const translation = mockTranslations[lowerCaseWord] || `[${selectedText} translation]`

      onTranslationChange(translation)
      setIsTranslating(false)
    }, 1000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Save Word to Vocabulary</DialogTitle>
          <DialogDescription>
            Add a translation for this word or phrase to save it to your vocabulary list.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="selected-text" className="text-sm font-medium">
              Selected Text
            </label>
            <Input id="selected-text" value={selectedText} readOnly className="bg-muted" />
          </div>

          <div className="grid gap-2">
            <label htmlFor="translation" className="text-sm font-medium flex justify-between">
              <span>Translation</span>
              <Button
                variant="link"
                size="sm"
                className="p-0 h-auto"
                onClick={handleAutoTranslate}
                disabled={isTranslating}
              >
                {isTranslating ? "Translating..." : "Auto-translate"}
              </Button>
            </label>
            <Input
              id="translation"
              value={translation}
              onChange={(e) => onTranslationChange(e.target.value)}
              placeholder="Enter translation"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onSave} disabled={!translation}>
            <Save className="mr-2 h-4 w-4" />
            Save to Vocabulary
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
