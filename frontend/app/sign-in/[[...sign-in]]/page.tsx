import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center coral-gradient-light relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-coral-300/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-coral-200/30 rounded-full blur-2xl"></div>
      
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mb-6">
            <div className="inline-block p-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
              <div className="w-12 h-12 bg-coral-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">V</span>
              </div>
            </div>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-coral-600 bg-clip-text text-transparent mb-2">
            Welcome back
          </h2>
          <p className="text-lg text-gray-600">
            Sign in to continue your journey with Veyra
          </p>
        </div>
        <SignIn
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-2xl rounded-3xl border border-coral-200/50 bg-white/90 backdrop-blur-sm",
              headerTitle: "text-gray-900 font-bold",
              headerSubtitle: "text-coral-600",
              formButtonPrimary: "bg-coral-500 hover:bg-coral-600 rounded-xl font-semibold",
            },
          }}
        />
      </div>
    </div>
  );
}
