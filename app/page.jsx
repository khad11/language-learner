import { Button } from "../components/ui/button"
import Link from "next/link"
import { BookOpen, FileText, Upload } from "lucide-react"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Welcome to LinguaLearn</h1>
        <p className="text-xl text-muted-foreground">
          Improve your language skills by reading and building your vocabulary
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <Link href="/files" className="w-full">
            <Button variant="outline" className="w-full h-32 flex flex-col gap-2">
              <FileText className="h-8 w-8" />
              <span className="text-lg font-medium">My Files</span>
            </Button>
          </Link>

          <Link href="/words" className="w-full">
            <Button variant="outline" className="w-full h-32 flex flex-col gap-2">
              <BookOpen className="h-8 w-8" />
              <span className="text-lg font-medium">Saved Words</span>
            </Button>
          </Link>
        </div>

        <div className="mt-8">
          <Link href="/files">
            <Button className="px-8 py-6 text-lg">
              <Upload className="mr-2 h-5 w-5" />
              Upload New File
            </Button>
          </Link>
        </div>

        <div className="mt-12 p-6 bg-muted rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">How it works</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-primary font-bold">1</span>
              </div>
              <h3 className="font-medium">Upload Files</h3>
              <p className="text-sm text-muted-foreground mt-2">Upload PDFs or text files you want to read</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-primary font-bold">2</span>
              </div>
              <h3 className="font-medium">Highlight Words</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Select unknown words to save them to your vocabulary list
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-primary font-bold">3</span>
              </div>
              <h3 className="font-medium">Review & Learn</h3>
              <p className="text-sm text-muted-foreground mt-2">Review your saved words with translations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
