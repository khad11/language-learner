"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { FileText, Search, FileIcon, Trash2 } from "lucide-react"

export function FileList({ files }) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredFiles = files.filter((file) => file.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const getFileIcon = (type) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return <FileText className="h-4 w-4 text-red-500" />
      case "txt":
        return <FileIcon className="h-4 w-4 text-blue-500" />
      default:
        return <FileIcon className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search files..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredFiles.length > 0 ? (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFiles.map((file) => (
                <TableRow key={file.id}>
                  <TableCell>
                    <div className="flex items-center">
                      {getFileIcon(file.type)}
                      <span className="ml-2">{file.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{file.date}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/files/${file.id}`}>
                          <FileText className="h-4 w-4" />
                          <span className="sr-only">Open</span>
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-12 border rounded-md">
          <p className="text-muted-foreground">
            {searchTerm ? "No files match your search." : "You haven't uploaded any files yet."}
          </p>
        </div>
      )}
    </div>
  )
}
