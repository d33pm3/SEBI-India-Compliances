import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Placeholder from "./pages/Placeholder.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register-agent" element={<Placeholder />} />
          <Route path="/risk-assessment" element={<Placeholder />} />
          <Route path="/doc-vault" element={<Placeholder />} />
          <Route path="/chatbot" element={<Placeholder />} />
          <Route path="/assistant" element={<Placeholder />} />
          <Route path="/notices/:noticeId" element={<Placeholder />} />
          <Route path="/response-tracker" element={<Placeholder />} />
          <Route path="/tasks" element={<Placeholder />} />
          <Route path="/timeline" element={<Placeholder />} />
          <Route path="/kpis" element={<Placeholder />} />
          <Route path="/agent-outputs/:kind" element={<Placeholder />} />
          <Route path="/calendar" element={<Placeholder />} />
          <Route path="/risk-action-plan" element={<Placeholder />} />
          <Route path="/register-manager" element={<Placeholder />} />
          <Route path="/compliance/:id" element={<Placeholder />} />
          <Route path="/admin" element={<Placeholder />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
