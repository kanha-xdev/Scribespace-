import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Bell, 
  User, 
  Menu, 
  X, 
  Home, 
  BookOpen, 
  PenTool, 
  Compass, 
  Settings, 
  ArrowLeft, 
  LogOut,
  ChevronDown,
  Plus
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function ProfessionalNavigation() {
  const [location, setLocation] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("userName") || "User";
    const email = localStorage.getItem("userEmail") || "";
    setUserName(name);
    setUserEmail(email);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    setLocation("/");
  };

  const goBack = () => {
    window.history.back();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/discover?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const navItems = [
    { href: "/home", label: "Home", icon: Home },
    { href: "/discover", label: "Discover", icon: Compass },
    { href: "/write", label: "Write", icon: PenTool },
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const isCurrentPath = (path: string) => {
    return location === path || location.startsWith(path + '/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-slate-900/95 backdrop-blur-lg border-b border-slate-800/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left side - Logo, Back Button, and Navigation */}
          <div className="flex items-center space-x-6">
            {/* Back Button - Shows on article and profile pages */}
            {(location.startsWith('/article/') || location.startsWith('/profile/') || location.startsWith('/write')) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={goBack}
                className="text-slate-400 hover:text-white hover:bg-slate-800 p-2"
                data-testid="button-back"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}

            {/* Logo */}
            <Link href="/home" className="flex-shrink-0">
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                QuillSpace
              </h1>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isCurrentPath(item.href);
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={active ? "secondary" : "ghost"}
                      size="sm"
                      className={`flex items-center space-x-2 px-3 py-2 ${
                        active 
                          ? "bg-slate-800 text-white" 
                          : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                      }`}
                      data-testid={`nav-${item.label.toLowerCase()}`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Center - Search Bar (Desktop) */}
          <div className="hidden lg:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Search articles, topics, or authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800/50 border-slate-700 text-white placeholder-slate-400 pl-10 pr-4 py-2 rounded-full focus:bg-slate-800 focus:border-slate-600 transition-colors"
                data-testid="input-search"
              />
            </form>
          </div>

          {/* Right side - Actions and User Menu */}
          <div className="flex items-center space-x-3">
            {/* Search Button (Mobile/Tablet) */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocation('/discover')}
              className="lg:hidden text-slate-400 hover:text-white hover:bg-slate-800 p-2"
              data-testid="button-search-mobile"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Write Button */}
            <Button
              asChild
              size="sm"
              className="hidden sm:flex bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0"
              data-testid="button-write-nav"
            >
              <Link href="/write">
                <Plus className="h-4 w-4 mr-1" />
                Write
              </Link>
            </Button>

            {/* Notifications */}
            <Button
              variant="ghost"
              size="sm"
              className="relative text-slate-400 hover:text-white hover:bg-slate-800 p-2"
              data-testid="button-notifications"
            >
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                3
              </Badge>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 text-slate-300 hover:text-white hover:bg-slate-800 p-2"
                  data-testid="button-user-menu"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" alt={userName} />
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-sm">
                      {getInitials(userName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:flex items-center space-x-1">
                    <span className="text-sm font-medium">{userName}</span>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-slate-800 border-slate-700">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium text-white">{userName}</p>
                  <p className="text-xs text-slate-400">{userEmail}</p>
                </div>
                <DropdownMenuSeparator className="bg-slate-700" />
                <DropdownMenuItem asChild>
                  <Link href="/profile/me" className="flex items-center space-x-2 cursor-pointer text-slate-300 hover:text-white">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/write" className="flex items-center space-x-2 cursor-pointer text-slate-300 hover:text-white">
                    <PenTool className="h-4 w-4" />
                    <span>Write Article</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center space-x-2 cursor-pointer text-slate-300 hover:text-white">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-slate-700" />
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 cursor-pointer text-red-400 hover:text-red-300 focus:text-red-300"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-400 hover:text-white hover:bg-slate-800 p-2"
                  data-testid="button-mobile-menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-slate-900 border-slate-800">
                <SheetHeader className="text-left">
                  <SheetTitle className="text-white">Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isCurrentPath(item.href);
                    return (
                      <Link key={item.href} href={item.href}>
                        <Button
                          variant={active ? "secondary" : "ghost"}
                          className={`w-full justify-start space-x-3 text-left ${
                            active 
                              ? "bg-slate-800 text-white" 
                              : "text-slate-300 hover:text-white hover:bg-slate-800"
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Icon className="h-5 w-5" />
                          <span>{item.label}</span>
                        </Button>
                      </Link>
                    );
                  })}
                  
                  <div className="pt-4 border-t border-slate-800">
                    <form onSubmit={handleSearch} className="mb-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          type="text"
                          placeholder="Search..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full bg-slate-800 border-slate-700 text-white placeholder-slate-400 pl-10"
                        />
                      </div>
                    </form>
                    
                    <Button
                      onClick={handleSignOut}
                      variant="ghost"
                      className="w-full justify-start space-x-3 text-red-400 hover:text-red-300 hover:bg-slate-800"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Sign Out</span>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}