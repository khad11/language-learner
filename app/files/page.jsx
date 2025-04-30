"use client"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { FileUploader } from "../../components/file-uploader"
import { FileList } from "../../components/file-list"

// Mock data for files
const initialFiles = [
  { id: "1", name: "Spanish Article.pdf", date: "2023-04-15", type: "pdf" },
  { id: "2", name: "French Vocabulary.txt", date: "2023-05-20", type: "txt" },
]

export default function FilesPage() {
  const [files, setFiles] = useState(initialFiles)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileUpload = (newFiles) => {
    const newFileEntries = newFiles.map((file) => ({
      id: Math.random().toString(36).substring(7),
      name: file.name,
      date: new Date().toISOString().split("T")[0],
      type: file.name.split(".").pop() || "",
    }))

    setFiles([...files, ...newFileEntries])
    setIsUploading(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold">My Files</h1>
          <Button onClick={() => setIsUploading(true)}>Upload New File</Button>
        </div>

        {isUploading && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Upload New File</CardTitle>
            </CardHeader>
            <CardContent>
              <FileUploader onUpload={handleFileUpload} onCancel={() => setIsUploading(false)} />
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Your Files</CardTitle>
          </CardHeader>
          <CardContent>
            <FileList files={files} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
