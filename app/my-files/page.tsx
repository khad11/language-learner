"use client"

import { useState } from "react"
import { useAppContext } from "@/components/providers"
import { FileUploader } from "@/components/file-uploader"
import { FileCard } from "@/components/file-card"
import { Button } from "@/components/ui/button"
import { Upload, FileText } from "lucide-react"

export default function MyFilesPage() {
  const { files } = useAppContext()
  const [isUploading, setIsUploading] = useState(false)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col space-y-8 max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight">My Files</h1>
          <Button onClick={() => setIsUploading(true)}>
            <Upload className="mr-2 h-4 w-4" />
            Upload New File
          </Button>
        </div>

        {isUploading ? (
          <div className="bg-card rounded-lg p-6 border">
            <FileUploader onComplete={() => setIsUploading(false)} />
          </div>
        ) : null}

        {files.length === 0 && !isUploading ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">No files yet</h2>
            <p className="text-muted-foreground mb-6">Upload text files or PDFs to start learning</p>
            <Button onClick={() => setIsUploading(true)}>
              <Upload className="mr-2 h-4 w-4" />
              Upload Your First File
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {files.map((file) => (
              <FileCard key={file.id} file={file} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
