import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignInButton } from "@clerk/nextjs";
import { MessageSquare, Sparkles, Shield, Zap } from "lucide-react";

export default async function HomePage() {
  const { userId } = await auth();

  if (userId) {
    redirect("/chat");
  }

  return (
    <div className="min-h-screen coral-gradient-light relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-coral-300/20 rounded-full blur-xl"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-coral-400/20 rounded-full blur-lg"></div>
      <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-coral-200/30 rounded-full blur-2xl"></div>
      
      {/* Header */}
      <header className="border-b border-coral-200/50 bg-white/90 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-coral-500 rounded-2xl flex items-center justify-center shadow-lg">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-coral-600 to-coral-500 bg-clip-text text-transparent">Veyra</span>
            </div>
            <SignInButton mode="modal">
              <button className="bg-coral-500 text-white px-6 py-3 rounded-2xl hover:bg-coral-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
                Sign In
              </button>
            </SignInButton>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center relative">
          <div className="mb-8">
            <div className="inline-block p-4 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl float-animation">
              <div className="w-16 h-16 bg-coral-500 rounded-2xl flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-bold mb-8">
            <span className="bg-gradient-to-r from-gray-900 via-coral-600 to-coral-500 bg-clip-text text-transparent">
              Welcome to
            </span>
            <span className="block bg-gradient-to-r from-coral-500 to-coral-600 bg-clip-text text-transparent">
              Veyra
            </span>
          </h1>
          
          <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
            Experience the future of AI conversations with beautiful design, 
            intelligent memory, and seamless interactions. Your personal AI companion 
            that understands and remembers.
          </p>

          <SignInButton mode="modal">
            <button className="bg-coral-500 text-white px-10 py-4 rounded-2xl hover:bg-coral-600 transition-all duration-300 font-bold text-lg inline-flex items-center space-x-3 shadow-xl hover:shadow-2xl transform hover:scale-105 pulse-coral">
              <span>Start Your Journey</span>
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles className="h-4 w-4" />
              </div>
            </button>
          </SignInButton>
        </div>

        {/* Features */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group text-center p-8 rounded-3xl bg-white/80 backdrop-blur-sm shadow-xl border border-coral-200/50 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="bg-coral-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-coral-200 transition-colors duration-300">
              <MessageSquare className="h-8 w-8 text-coral-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Smart Conversations
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Experience natural, flowing conversations with AI that understands 
              context and adapts to your communication style.
            </p>
          </div>

          <div className="group text-center p-8 rounded-3xl bg-white/80 backdrop-blur-sm shadow-xl border border-coral-200/50 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="bg-coral-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-coral-200 transition-colors duration-300">
              <Shield className="h-8 w-8 text-coral-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Secure & Private
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Your privacy matters. All conversations are protected with 
              enterprise-grade security and end-to-end encryption.
            </p>
          </div>

          <div className="group text-center p-8 rounded-3xl bg-white/80 backdrop-blur-sm shadow-xl border border-coral-200/50 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="bg-coral-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-coral-200 transition-colors duration-300">
              <Zap className="h-8 w-8 text-coral-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Lightning Fast
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Get instant responses with our optimized AI engine. 
              No waiting, just seamless real-time conversations.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
