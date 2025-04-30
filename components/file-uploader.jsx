"use client"

import { useState, useRef } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Upload, File } from "lucide-react"

export function FileUploader({ onUpload, onCancel }) {
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState([])
  const fileInputRef = useRef(null)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files) {
      const files = Array.from(e.dataTransfer.files)
      setSelectedFiles(files)
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setSelectedFiles(files)
    }
  }

  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      onUpload(selectedFiles)
      setSelectedFiles([])
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-2">
          <Upload className="h-8 w-8 text-muted-foreground" />
          <h3 className="font-medium">Drag and drop your files here</h3>
          <p className="text-sm text-muted-foreground">or click to browse (PDF, TXT files)</p>
          <Input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept=".pdf,.txt"
            multiple
          />
          <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
            Browse Files
          </Button>
        </div>
      </div>

      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium">Selected Files:</h4>
          <ul className="space-y-1">
            {selectedFiles.map((file, index) => (
              <li key={index} className="flex items-center text-sm">
                <File className="h-4 w-4 mr-2 text-muted-foreground" />
                {file.name}
              </li>
            ))}
          </ul>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button onClick={handleUpload}>
              Upload {selectedFiles.length} {selectedFiles.length === 1 ? "File" : "Files"}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
