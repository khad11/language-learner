"use client"

import React from "react"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { ChevronDown, ChevronUp, Trash2, Volume2 } from "lucide-react"

export function VocabularyList({ words, onDeleteWord }) {
  const [expandedWordId, setExpandedWordId] = useState(null)
  const [editingTranslation, setEditingTranslation] = useState(null)

  const toggleExpand = (id) => {
    setExpandedWordId(expandedWordId === id ? null : id)
  }

  const handleEditTranslation = (id, currentTranslation) => {
    setEditingTranslation({ id, value: currentTranslation })
  }

  const handleSaveTranslation = (id) => {
    // In a real app, this would update the backend
    // For now, we'll just update the UI
    setEditingTranslation(null)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  return (
    <div className="space-y-4">
      {words.length > 0 ? (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Word</TableHead>
                <TableHead>Translation</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {words.map((word) => (
                <React.Fragment key={word.id}>
                  <TableRow>
                    <TableCell className="font-medium">{word.word}</TableCell>
                    <TableCell>
                      {editingTranslation?.id === word.id ? (
                        <div className="flex space-x-2">
                          <Input
                            value={editingTranslation.value}
                            onChange={(e) =>
                              setEditingTranslation({
                                ...editingTranslation,
                                value: e.target.value,
                              })
                            }
                            className="h-8"
                          />
                          <Button size="sm" onClick={() => handleSaveTranslation(word.id)}>
                            Save
                          </Button>
                        </div>
                      ) : (
                        word.translation
                      )}
                    </TableCell>
                    <TableCell>{formatDate(word.date)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="icon">
                          <Volume2 className="h-4 w-4" />
                          <span className="sr-only">Pronounce</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => toggleExpand(word.id)}>
                          {expandedWordId === word.id ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                          <span className="sr-only">{expandedWordId === word.id ? "Collapse" : "Expand"}</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => onDeleteWord(word.id)}>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  {expandedWordId === word.id && word.context && (
                    <TableRow>
                      <TableCell colSpan={4} className="bg-muted/50">
                        <div className="p-2">
                          <h4 className="text-sm font-medium mb-1">Context:</h4>
                          <p className="text-sm text-muted-foreground">...{word.context}...</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No words in your vocabulary list yet.</p>
        </div>
      )}
    </div>
  )
}
