import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Search, Bell, Menu, Pen } from "lucide-react";

export default function Navigation() {
  const [location] = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/discover", label: "Discover" },
    { href: "/write", label: "Write" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass transition-all duration-300">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex-shrink-0">
              <h1 className="text-2xl font-serif font-bold gradient-text" data-testid="link-home">
                QuillSpace
              </h1>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-6">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`transition-colors duration-200 ${
                      location === item.href
                        ? "text-primary font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    data-testid={`link-${item.label.toLowerCase()}`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Bar - Desktop */}
            <div className="hidden md:flex items-center bg-secondary/50 rounded-full px-4 py-2">
              <Search className="w-4 h-4 text-muted-foreground mr-2" />
              <Input 
                type="text" 
                placeholder="Search stories..." 
                className="bg-transparent border-none outline-none text-sm w-48 placeholder-muted-foreground p-0 focus-visible:ring-0"
                data-testid="input-search-nav"
              />
            </div>
            
            {/* Search Button - Mobile */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden glass rounded-full p-2 hover:bg-white/20"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              data-testid="button-search-mobile"
            >
              <Search className="w-4 h-4" />
            </Button>
            
            {/* Notifications */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="glass rounded-full p-2 hover:bg-white/20 relative"
              data-testid="button-notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></span>
            </Button>
            
            {/* Write Button */}
            <Link href="/write">
              <Button 
                className="hidden sm:flex bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:from-purple-700 hover:to-cyan-700 transition-all duration-200"
                data-testid="button-write-nav"
              >
                <Pen className="w-4 h-4 mr-2" />
                Write
              </Button>
            </Link>
            
            {/* Profile */}
            <Link href="/profile/user-1">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                alt="Profile" 
                className="w-8 h-8 rounded-full border-2 border-primary/50 hover:border-primary transition-colors cursor-pointer"
                data-testid="img-profile-nav"
              />
            </Link>
            
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="md:hidden"
                  data-testid="button-mobile-menu"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="glass border-border/50">
                <div className="flex flex-col space-y-6 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`text-lg transition-colors duration-200 ${
                        location === item.href
                          ? "text-primary font-medium"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      data-testid={`mobile-link-${item.label.toLowerCase()}`}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Link href="/write">
                    <Button 
                      className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:from-purple-700 hover:to-cyan-700"
                      data-testid="button-write-mobile"
                    >
                      <Pen className="w-4 h-4 mr-2" />
                      Write
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden pb-4">
            <div className="flex items-center bg-secondary/50 rounded-full px-4 py-2">
              <Search className="w-4 h-4 text-muted-foreground mr-2" />
              <Input 
                type="text" 
                placeholder="Search stories..." 
                className="bg-transparent border-none outline-none text-sm w-full placeholder-muted-foreground p-0 focus-visible:ring-0"
                data-testid="input-search-mobile"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
