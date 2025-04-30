"use client"

import { useAppContext } from "@/components/providers"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Trash2, ExternalLink } from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type FileCardProps = {
  file: {
    id: string
    name: string
    type: string
    dateAdded: string
  }
}

export function FileCard({ file }: FileCardProps) {
  const { removeFile } = useAppContext()

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-start justify-between">
          <div className="flex items-center gap-2 truncate">
            <FileText className="h-5 w-5 flex-shrink-0" />
            <span className="truncate">{file.name}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground">
          Added {formatDistanceToNow(new Date(file.dateAdded), { addSuffix: true })}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={`/reader/${file.id}`}>
          <Button variant="outline" size="sm">
            <ExternalLink className="mr-2 h-4 w-4" />
            Open
          </Button>
        </Link>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="sm" className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete {file.name} and remove any saved words from this file.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => removeFile(file.id)}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  )
}
