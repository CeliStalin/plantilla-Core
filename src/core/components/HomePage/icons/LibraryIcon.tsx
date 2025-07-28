import React from 'react';

export const LibraryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M3 3H21V5H3V3Z" fill="#667eea"/>
    <path d="M3 7H21V9H3V7Z" fill="#667eea"/>
    <path d="M3 11H21V13H3V11Z" fill="#667eea"/>
    <path d="M3 15H21V17H3V15Z" fill="#667eea"/>
    <path d="M3 19H21V21H3V19Z" fill="#667eea"/>
    <path d="M7 3V21" stroke="#667eea" strokeWidth="2"/>
    <path d="M17 3V21" stroke="#667eea" strokeWidth="2"/>
    <circle cx="12" cy="12" r="2" fill="#764ba2"/>
    <path d="M10 8L14 8" stroke="#764ba2" strokeWidth="2" strokeLinecap="round"/>
    <path d="M10 16L14 16" stroke="#764ba2" strokeWidth="2" strokeLinecap="round"/>
  </svg>
); 