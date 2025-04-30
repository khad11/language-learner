"use client"

import { useState, useEffect } from "react"
import { Input } from "../../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { VocabularyList } from "../../components/vocabulary-list"
import { Search } from "lucide-react"

// Mock translations for demo purposes
const mockTranslations = {
  language: "idioma (Spanish), langue (French)",
  learning: "aprendizaje (Spanish), apprentissage (French)",
  process: "proceso (Spanish), processus (French)",
  acquire: "adquirir (Spanish), acquérir (French)",
  capacity: "capacidad (Spanish), capacité (French)",
  perceive: "percibir (Spanish), percevoir (French)",
  produce: "producir (Spanish), produire (French)",
  understand: "entender (Spanish), comprendre (French)",
  communicate: "comunicar (Spanish), communiquer (French)",
  research: "investigación (Spanish), recherche (French)",
  effective: "efectivo (Spanish), efficace (French)",
  immersion: "inmersión (Spanish), immersion (French)",
  consistent: "consistente (Spanish), cohérent (French)",
  practice: "práctica (Spanish), pratique (French)",
  beneficial: "beneficioso (Spanish), bénéfique (French)",
  exposes: "expone (Spanish), expose (French)",
  vocabulary: "vocabulario (Spanish), vocabulaire (French)",
  context: "contexto (Spanish), contexte (French)",
}

export default function WordsPage() {
  const [savedWords, setSavedWords] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // In a real app, this would fetch from a backend
    const storedWords = JSON.parse(localStorage.getItem("savedWords") || "[]")

    // Add mock translations for demo
    const wordsWithTranslations = storedWords.map((word) => ({
      ...word,
      translation: mockTranslations[word.word.toLowerCase()] || "Translation not available",
    }))

    setSavedWords(wordsWithTranslations)
  }, [])

  const handleDeleteWord = (id) => {
    const updatedWords = savedWords.filter((word) => word.id !== id)
    setSavedWords(updatedWords)
    localStorage.setItem("savedWords", JSON.stringify(updatedWords))
  }

  const filteredWords = savedWords.filter(
    (word) =>
      word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.translation.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Saved Words</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Search Vocabulary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search words or translations..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Vocabulary List</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredWords.length > 0 ? (
              <VocabularyList words={filteredWords} onDeleteWord={handleDeleteWord} />
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {searchTerm ? "No words match your search." : "You haven't saved any words yet."}
                </p>
                {!searchTerm && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    Start by opening a file and highlighting words you want to learn.
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
