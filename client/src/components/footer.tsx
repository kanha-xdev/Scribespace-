import { Link } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Platform",
      links: [
        { label: "Write", href: "/write" },
        { label: "Discover", href: "/discover" },
        { label: "Community", href: "#" },
        { label: "Topics", href: "#topics" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Writing Guide", href: "#" },
        { label: "Style Guide", href: "#" },
        { label: "Help Center", href: "#" },
        { label: "API Documentation", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    {
      label: "Twitter",
      href: "#",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      ),
    },
    {
      label: "Instagram",
      href: "#",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zm5.624 18.462c-.678.678-1.61 1.077-2.605 1.077H8.984c-.996 0-1.927-.399-2.605-1.077C5.701 17.784 5.302 16.853 5.302 15.857V8.143c0-.996.399-1.927 1.077-2.605C7.057 4.86 7.988 4.461 8.984 4.461h6.052c.996 0 1.927.399 2.605 1.077.678.678 1.077 1.61 1.077 2.605v7.714c0 .996-.399 1.927-1.077 2.605zM16.948 8.52c-.678 0-1.228-.55-1.228-1.228s.55-1.228 1.228-1.228 1.228.55 1.228 1.228-.55 1.228-1.228 1.228zm-4.931 1.329c2.042 0 3.698 1.656 3.698 3.698s-1.656 3.698-3.698 3.698-3.698-1.656-3.698-3.698 1.656-3.698 3.698-3.698zm0 6.071c1.307 0 2.373-1.066 2.373-2.373s-1.066-2.373-2.373-2.373-2.373 1.066-2.373 2.373 1.066 2.373 2.373 2.373z"/>
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: "#",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      label: "GitHub",
      href: "#",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
    },
  ];

  return (
    <footer className="section-spacing bg-secondary/20 border-t border-border/50">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="glass rounded-3xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <Link href="/">
                <h3 className="text-2xl font-serif font-bold gradient-text mb-4" data-testid="link-footer-logo">
                  QuillSpace
                </h3>
              </Link>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                A premium platform where stories come alive and communities thrive. 
                Join thousands of writers sharing their authentic voices.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10"
                    aria-label={social.label}
                    data-testid={`link-social-${social.label.toLowerCase()}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
            
            {/* Footer Links */}
            {footerSections.map((section) => (
              <div key={section.title}>
                <h4 className="font-semibold mb-4 text-foreground">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                        data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-border/50 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-muted-foreground text-sm">
                &copy; {currentYear} QuillSpace. All rights reserved. Built with passion for writers and readers.
              </p>
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <Link href="#" className="hover:text-foreground transition-colors" data-testid="link-privacy">
                  Privacy Policy
                </Link>
                <Link href="#" className="hover:text-foreground transition-colors" data-testid="link-terms">
                  Terms of Service
                </Link>
                <Link href="#" className="hover:text-foreground transition-colors" data-testid="link-cookies">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
