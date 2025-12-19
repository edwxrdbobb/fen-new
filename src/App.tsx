import { Authenticated, Unauthenticated } from "convex/react";
import { SignInForm } from "./SignInForm";
import { Toaster } from "sonner";
import { MainLayout } from "./components/MainLayout";
import { ThemeProvider } from "./contexts/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Authenticated>
          <MainLayout />
        </Authenticated>
        <Unauthenticated>
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-gray-900 dark:to-gray-800">
            <div className="w-full max-w-md mx-auto p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-full mb-4">
                  <span className="text-2xl text-white font-bold">FEN</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Find Everything Now</h1>
                <p className="text-gray-600 dark:text-gray-300">Discover the best of Freetown, Sierra Leone</p>
              </div>
              <SignInForm />
            </div>
          </div>
        </Unauthenticated>
        <Toaster />
      </div>
    </ThemeProvider>
  );
}
