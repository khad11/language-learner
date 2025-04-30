"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";
import { Book, FileText, Home, Menu, X, LogIn, UserPlus } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Don't show navbar on auth pages
  if (pathname.startsWith("/auth/")) {
    return null;
  }

  const routes = [
    {
      href: "/",
      label: "Home",
      icon: <Home className="h-4 w-4 mr-2" />,
      active: pathname === "/",
    },
    {
      href: "/files",
      label: "My Files",
      icon: <FileText className="h-4 w-4 mr-2" />,
      active: pathname === "/files" || pathname.startsWith("/files/"),
    },
    {
      href: "/words",
      label: "Saved Words",
      icon: <Book className="h-4 w-4 mr-2" />,
      active: pathname === "/words",
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-[1140px] mx-auto flex  justify-between  h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <Book className="h-6 w-6" />
            <span className="font-bold">LinguaLearn</span>
          </Link>
        </div>

        <div className=" flex  items-center   gap-5 md:justify-end">
          <nav className="hidden md:flex items-center space-x-2">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={route.active ? "default" : "ghost"}
                asChild
              >
                <Link href={route.href} className="flex items-center">
                  {route.icon}
                  {route.label}
                </Link>
              </Button>
            ))}
          </nav>
        </div>
        <div className="flex items-center space-x-2">
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/auth/login" className="flex items-center">
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/auth/signup" className="flex items-center">
                <UserPlus className="h-4 w-4 mr-2" />
                Sign Up
              </Link>
            </Button>
          </div>
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <nav className="flex flex-col p-2 space-y-1">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={route.active ? "default" : "ghost"}
                className="justify-start"
                onClick={() => setIsMenuOpen(false)}
                asChild
              >
                <Link href={route.href} className="flex items-center">
                  {route.icon}
                  {route.label}
                </Link>
              </Button>
            ))}
            <Button
              variant="ghost"
              className="justify-start"
              onClick={() => setIsMenuOpen(false)}
              asChild
            >
              <Link href="/auth/login" className="flex items-center">
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Link>
            </Button>
            <Button
              variant="default"
              className="justify-start"
              onClick={() => setIsMenuOpen(false)}
              asChild
            >
              <Link href="/auth/signup" className="flex items-center">
                <UserPlus className="h-4 w-4 mr-2" />
                Sign Up
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
