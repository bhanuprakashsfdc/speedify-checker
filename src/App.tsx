import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import AboutUs from "@/pages/AboutUs";
import Contact from "@/pages/Contact";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsConditions from "@/pages/TermsConditions";
import KeywordDetail from "@/components/KeywordList";
import SEO from "@/pages/SEO";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="/index.html" element={<Index />} />
            <Route path="/about.html" element={<AboutUs />} />
            <Route path="/contact.html" element={<Contact />} />
            <Route path="/privacy-policy.html" element={<PrivacyPolicy />} />
            <Route path="/terms.html" element={<TermsConditions />} />
            <Route path="/blog.html" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
           {/* <Route path="/:keyword" element={<SEO />} /> */} 
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </HelmetProvider>      
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
