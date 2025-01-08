import React from 'react';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export function Link({ href, children, className = '', ...props }: LinkProps) {
  return (
    <a 
      href={href} 
      className={`text-gray-700 hover:text-purple-600 transition-colors ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}