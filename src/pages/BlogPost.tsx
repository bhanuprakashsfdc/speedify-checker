import React, { useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { blogPosts } from '@/data/blogPosts';
import SpeedTest from '@/components/SpeedTest';
import { addInternalLinks, getRelatedPosts, getRelatedKeywords, formatKeywordToUrl, formatBlogToUrl } from '@/lib/internalLinking';
import { DynamicSEO } from '@/pages/SEO';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const cleanSlug = slug?.replace('.html', '');
  const post = blogPosts.find(post => post.slug === cleanSlug);

  useEffect(() => {
    if (slug && post && !slug.endsWith('.html')) {
      navigate(`/blog/${slug}.html`, { replace: true });
    }
  }, [slug, post, navigate]);

  useEffect(() => {
    if (!post) {
      navigate('/blog.html');
    }
  }, [post, navigate]);

  const shareUrl = `https://www.interentspeedtest.com/blog/${post?.slug}.html`;
  const shareTitle = post?.title || 'Internet Speed Test Blog';

  if (!post) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": post.coverImage,
    "datePublished": post.date,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Internet Speed Test",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.interentspeedtest.com/favicon.ico"
      }
    },
    "description": post.excerpt
  };

  return (
    <div className="min-h-screen flex flex-col">
      <DynamicSEO
        title={`${post.title} | Internet Speed Test Blog`}
        description={post.excerpt}
        keywords={post.keywords.join(', ')}
        canonicalUrl={`https://www.interentspeedtest.com/blog/${post.slug}.html`}
        ogUrl={`https://www.interentspeedtest.com/blog/${post.slug}.html`}
        ogImage={post.coverImage}
        ogTitle={post.title}
        ogDescription={post.excerpt}
        twitterTitle={post.title}
        twitterDescription={post.excerpt}
        twitterImage={post.coverImage}
        jsonLd={[blogPostingSchema]}
      />

      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <Link
              to="/blog.html"
              className="inline-flex items-center text-finance-primary hover:text-finance-primary/90 text-sm font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to all articles
            </Link>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">{post.title}</h1>

            <div className="flex items-center text-sm text-muted-foreground">
              <span>{formattedDate}</span>
              <span className="mx-2">•</span>
              <span>{post.readTime} min read</span>
              <span className="mx-2">•</span>
              <span>By {post.author}</span>
            </div>
            <div className="aspect-video bg-muted relative overflow-hidden rounded-lg">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                Image courtesy of <a href="https://www.pexels.com" target="_blank" rel="noopener noreferrer" className="underline">Pexels</a>
              </div>
            </div>
          </div>

          <SpeedTest />

          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: addInternalLinks(post.content) }} />
          </div>

          <div className="pt-6 border-t">
            <h3 className="text-lg font-semibold mb-2">Related Topics</h3>
            <div className="flex flex-wrap gap-2">
              {post.keywords.map((keyword, index) => (
                <Link
                  key={index}
                  to={formatKeywordToUrl(keyword)}
                  className="px-3 py-1 bg-muted rounded-full text-sm hover:bg-muted/80 transition-colors"
                >
                  {keyword}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Related Posts Section */}
          {useMemo(() => {
            const relatedPosts = getRelatedPosts(post.slug, post.keywords);
            if (relatedPosts.length > 0) {
              return (
                <div className="pt-6 border-t">
                  <h3 className="text-lg font-semibold mb-4">Related Articles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {relatedPosts.map((relatedPost) => (
                      <Link 
                        key={relatedPost.id}
                        to={formatBlogToUrl(relatedPost.slug)}
                        className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <h4 className="font-medium text-base mb-2">{relatedPost.title}</h4>
                        <p className="text-sm text-muted-foreground">{relatedPost.excerpt.substring(0, 100)}...</p>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }
            return null;
          }, [post.slug, post.keywords])}
          
          {/* Additional Keywords Section */}
          {useMemo(() => {
            const additionalKeywords = getRelatedKeywords(post.keywords);
            if (additionalKeywords.length > 0) {
              return (
                <div className="pt-6 border-t">
                  <h3 className="text-lg font-semibold mb-2">Explore More</h3>
                  <div className="flex flex-wrap gap-2">
                    {additionalKeywords.map((keyword, index) => (
                      <Link
                        key={index}
                        to={formatKeywordToUrl(keyword)}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
                      >
                        {keyword}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }
            return null;
          }, [post.keywords])}

          <div className="pt-6 border-t">
            <h3 className="text-lg font-semibold mb-3">Share This Article</h3>
            <div className="flex space-x-4">
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#1DA1F2] text-white rounded-full hover:bg-[#1DA1F2]/90 transition-colors"
                aria-label="Share on Twitter"
              >
                {/* Twitter Icon */}
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#4267B2] text-white rounded-full hover:bg-[#4267B2]/90 transition-colors"
                aria-label="Share on Facebook"
              >
                {/* Facebook Icon */}
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#0077B5] text-white rounded-full hover:bg-[#0077B5]/90 transition-colors"
                aria-label="Share on LinkedIn"
              >
                {/* LinkedIn Icon */}
              </a>
              <a
                href={`mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(`Check out this article: ${shareUrl}`)}`}
                className="p-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors"
                aria-label="Share via Email"
              >
                {/* Email Icon */}
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
