"use client"

import { useState } from "react"
import { useAppContext } from "@/components/providers"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Search, Trash2, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function SavedWordsPage() {
  const { savedWords, removeSavedWord } = useAppContext()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredWords = savedWords.filter(
    (word) =>
      word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.translation.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col space-y-8 max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Saved Words</h1>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search words..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {savedWords.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">No saved words yet</h2>
            <p className="text-muted-foreground mb-6">
              Highlight words while reading to add them to your vocabulary list
            </p>
            <Link href="/my-files">
              <Button>Go to My Files</Button>
            </Link>
          </div>
        ) : filteredWords.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <h2 className="text-xl font-semibold mb-2">No matching words</h2>
            <p className="text-muted-foreground">Try a different search term</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredWords.map((word) => (
              <Card key={word.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{word.word}</CardTitle>
                      <CardDescription className="text-lg font-medium mt-1">{word.translation}</CardDescription>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeSavedWord(word.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-3 rounded-md text-sm">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: word.context.replace(
                          /\*\*(.*?)\*\*/g,
                          '<span class="font-bold text-primary">$1</span>',
                        ),
                      }}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm text-muted-foreground">
                    From <span className="font-medium">{word.fileName}</span>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/reader/${word.fileId}`}>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View in Context
                      </Button>
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
