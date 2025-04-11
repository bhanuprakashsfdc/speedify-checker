/**
 * Internal Linking Utility
 * 
 * This utility helps create internal links within content to improve SEO
 * by connecting related pages across the website.
 */

import { blogPosts } from '@/data/blogPosts';
import keywords from '@/data/keywords';

// Format a keyword to a URL slug
export const formatKeywordToUrl = (keyword: string): string => {
  return `/keyword/${keyword.toLowerCase().replace(/\s+/g, '-')}.html`;
};

// Format a blog slug to a URL
export const formatBlogToUrl = (slug: string): string => {
  return `/blog/${slug}.html`;
};

// Get related blog posts based on keywords
export const getRelatedPosts = (currentSlug: string, keywordList: string[]): typeof blogPosts => {
  // Don't include the current post
  const otherPosts = blogPosts.filter(post => post.slug !== currentSlug);
  
  // Find posts that share keywords with the current post
  return otherPosts
    .filter(post => {
      // Check if any keywords match
      return post.keywords.some(keyword => keywordList.includes(keyword));
    })
    .slice(0, 4); // Limit to 3 related posts
};

// Get related keywords for a blog post
export const getRelatedKeywords = (postKeywords: string[]): string[] => {
  // Get unique keywords that aren't already in the post's keywords
  return keywords
    .filter(keyword => 
      // Find keywords that are related but not identical
      postKeywords.some(postKeyword => 
        keyword.includes(postKeyword) && keyword !== postKeyword
      )
    )
    .slice(0, 5); // Limit to 5 related keywords
};

// Add internal links to HTML content
export const addInternalLinks = (content: string): string => {
  let linkedContent = content;
  
  // Sort keywords by length (descending) to ensure longer phrases are linked first
  const sortedKeywords = [...keywords].sort((a, b) => b.length - a.length);
  
  // Only process the top keywords to avoid over-linking
  const topKeywords = sortedKeywords.slice(0, 30);
  
  // Track which keywords have been linked to avoid duplicate links
  const linkedKeywords = new Set<string>();
  
  // Maximum number of links to add
  const maxLinks = 5;
  let linkCount = 0;
  
  for (const keyword of topKeywords) {
    // Stop if we've reached the maximum number of links
    if (linkCount >= maxLinks) break;
    
    // Skip if this keyword has already been linked
    if (linkedKeywords.has(keyword)) continue;
    
    // Create a regex that matches the keyword but not if it's already in a link
    // This regex looks for the keyword that is not preceded by 'href="' and not inside an HTML tag
    const regex = new RegExp(`(?<!href="[^"]*)(\\b${keyword}\\b)(?![^<>]*>)`, 'i');
    
    // Check if the keyword exists in the content
    if (regex.test(linkedContent)) {
      // Replace only the first occurrence
      linkedContent = linkedContent.replace(
        regex,
        `<a href="${formatKeywordToUrl(keyword)}" class="text-blue-500 hover:underline">$1</a>`
      );
      
      // Mark this keyword as linked
      linkedKeywords.add(keyword);
      linkCount++;
    }
  }
  
  return linkedContent;
};