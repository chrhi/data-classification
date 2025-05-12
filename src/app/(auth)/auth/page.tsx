import LoginForm from "@/components/forms/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Data Classification",
  description: "Login to the Data Classification platform",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col sm:flex-row">
      {/* Left side - Green background with logo and info */}
      <div className="hidden sm:flex sm:w-1/2 bg-green-600 flex-col justify-center items-center p-8 text-white">
        <div className="max-w-md">
          <div className="mb-12">
            <h1 className="text-4xl font-bold italic mb-2">
              data classification
            </h1>
            <div className="h-1 w-20 bg-white rounded"></div>
          </div>

          <h2 className="text-3xl font-medium mb-6">Welcome Back!</h2>
          <p className="text-lg opacity-90 mb-8">
            Access your data classification dashboard to manage projects,
            policies, and ensure compliance.
          </p>
        </div>
      </div>

      {/* Right side - Login form (client component) */}
      <div className="w-full sm:w-1/2 flex justify-center items-center p-4 sm:p-8 md:p-12 bg-white dark:bg-gray-950">
        <div className="w-full max-w-md">
          {/* Mobile logo display */}
          <div className="sm:hidden text-center mb-8">
            <h1 className="text-3xl font-bold italic text-green-600">
              data classification
            </h1>
            <div className="h-1 w-16 bg-green-600 rounded mx-auto mt-1"></div>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}
