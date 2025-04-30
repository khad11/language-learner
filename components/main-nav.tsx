import Link from "next/link"
import { BookOpen, FileText, Home } from "lucide-react"

export function MainNav() {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <BookOpen className="h-6 w-6" />
        <span className="font-bold inline-block">LinguaLearn</span>
      </Link>
      <nav className="flex gap-6">
        <Link
          href="/"
          className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <Home className="mr-1 h-4 w-4" />
          Home
        </Link>
        <Link
          href="/my-files"
          className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <FileText className="mr-1 h-4 w-4" />
          My Files
        </Link>
        <Link
          href="/saved-words"
          className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <BookOpen className="mr-1 h-4 w-4" />
          Saved Words
        </Link>
      </nav>
    </div>
  )
}
