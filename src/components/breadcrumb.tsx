import { useLocation } from "wouter";
import { Link } from "wouter";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumb() {
  const [location] = useLocation();
  
  const getBreadcrumbs = () => {
    const paths = location.split('/').filter(Boolean);
    const breadcrumbs = [
      { label: 'Home', href: '/home', icon: Home }
    ];

    let currentPath = '';
    paths.forEach((path, index) => {
      currentPath += `/${path}`;
      
      // Skip the first path if it's 'home' since we already have it
      if (path === 'home' && index === 0) return;
      
      let label = path.charAt(0).toUpperCase() + path.slice(1);
      
      // Custom labels for specific paths
      switch (path) {
        case 'discover':
          label = 'Discover';
          break;
        case 'write':
          label = 'Write Article';
          break;
        case 'settings':
          label = 'Settings';
          break;
        case 'profile':
          label = 'Profile';
          break;
        case 'article':
          label = 'Article';
          break;
        default:
          // For dynamic segments like IDs, show them as-is
          if (path.length > 20) {
            label = path.substring(0, 20) + '...';
          }
      }
      
      breadcrumbs.push({ label, href: currentPath });
    });

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();
  
  // Don't show breadcrumbs on home page or if only one item
  if (location === '/home' || breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-slate-400 mb-6">
      {breadcrumbs.map((crumb, index) => (
        <div key={crumb.href} className="flex items-center space-x-2">
          {index > 0 && <ChevronRight className="h-4 w-4" />}
          {index === breadcrumbs.length - 1 ? (
            <span className="text-white font-medium flex items-center space-x-1">
              {crumb.icon && <crumb.icon className="h-4 w-4" />}
              <span>{crumb.label}</span>
            </span>
          ) : (
            <Link href={crumb.href}>
              <span className="hover:text-white transition-colors cursor-pointer flex items-center space-x-1">
                {crumb.icon && <crumb.icon className="h-4 w-4" />}
                <span>{crumb.label}</span>
              </span>
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}