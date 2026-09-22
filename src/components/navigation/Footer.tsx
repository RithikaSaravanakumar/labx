import { Link } from 'react-router-dom';
import { Zap, GitBranch, MessageCircle } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Product',
      links: [
        { label: 'Discover', path: '/discover' },
        { label: 'Projects', path: '/projects' },
        { label: 'Startups', path: '/startups' },
        { label: 'Opportunities', path: '/opportunities' },
      ],
    },
    {
      title: 'Community',
      links: [
        { label: 'Mentors', path: '/mentors' },
        { label: 'Hackathons', path: '/hackathons' },
        { label: 'Idea Vault', path: '/ideas' },
        { label: 'Build in Public', path: '/build' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Profile', path: '/profile' },
        { label: 'Settings', path: '/settings' },
        { label: 'Community', path: '/community' },
      ],
    },
  ];

  return (
    <footer className="border-t border-labx-border bg-labx-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-labx-violet to-labx-cyan flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-labx-text">
                Lab<span className="labx-gradient-text">X</span>
              </span>
            </Link>
            <p className="text-sm text-labx-text-muted mb-4 leading-relaxed">
              Discover. Build. Contribute. Grow.<br />
              Where ideas become products and contributions become opportunities.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-lg bg-labx-surface text-labx-text-muted hover:text-labx-text transition-colors" aria-label="GitHub">
                <GitBranch className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-labx-surface text-labx-text-muted hover:text-labx-text transition-colors" aria-label="Twitter">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {footerLinks.map(group => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold text-labx-text mb-4">{group.title}</h3>
              <ul className="space-y-2.5">
                {group.links.map(link => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm text-labx-text-muted hover:text-labx-text transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-labx-border mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-labx-text-muted">
            © {currentYear} ZeAI LabX. All rights reserved.
          </p>
          <p className="text-xs text-labx-text-muted">
            Built with purpose. Powered by community.
          </p>
        </div>
      </div>
    </footer>
  );
}
