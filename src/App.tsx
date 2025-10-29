import { Switch, Route, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import Home from "./pages/Home";
import About from "./pages/About";
import ServicesPage from "./pages/ServicesPage";
import Portfolio from "./pages/Portfolio";
import ProjectDetails from "./pages/ProjectDetails";
import TeamPage from "./pages/TeamPage";
import ContactPage from "./pages/ContactPage";
import RequestService from "./pages/RequestService";
import Blog from "./pages/Blog";
import NotFound from "./pages/not-found";

function Router() {
  const [location] = useLocation();
  const [isPageLoading, setIsPageLoading] = useState(false);

  useEffect(() => {
    // Show loading when route changes
    setIsPageLoading(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    // Hide loading after a short delay
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      <LoadingScreen isLoading={isPageLoading} />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/services" component={ServicesPage} />
            <Route path="/portfolio/:id" component={ProjectDetails} />
            <Route path="/portfolio" component={Portfolio} />
            <Route path="/team" component={TeamPage} />
            <Route path="/blog" component={Blog} />
            <Route path="/contact" component={ContactPage} />
            <Route path="/request-service" component={RequestService} />
            <Route component={NotFound} />
          </Switch>
        </main>
        <Footer />
      </div>
    </>
  );
}

function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    // Initial page load - show loading for 2 seconds
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LoadingScreen isLoading={isInitialLoading} />
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
