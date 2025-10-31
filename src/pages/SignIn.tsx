import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { GraduationCap } from "lucide-react";
import { configureAmplifyForRole } from "@/aws/amplifyClient.js";
import { signIn } from "aws-amplify/auth";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      configureAmplifyForRole("student");
      await signIn({ username: formData.email, password: formData.password });

      // ✅ Store logged-in student's email locally
      localStorage.setItem("studentId", formData.email);
      console.log("Stored studentId:", localStorage.getItem("studentId"));
      
      toast.success("Welcome back, Student!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message || "Sign-in failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="absolute inset-0 gradient-hero opacity-5"></div>
        
        <Card className="w-full max-w-md relative z-10 shadow-hover rounded-2xl">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-2xl gradient-accent flex items-center justify-center">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold">Student Login</CardTitle>
            <CardDescription>Sign in to register for events</CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Student Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="student@college.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="rounded-xl"
                />
              </div>

              <Button type="submit" className="w-full rounded-full gradient-accent">
                Sign In as Student
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/signup?role=student" className="text-primary font-medium hover:underline">
                  Sign Up
                </Link>
              </p>

              <div className="pt-4 border-t">
                <p className="text-center text-sm text-muted-foreground">
                  Are you an admin?{" "}
                  <Link to="/admin/signin" className="text-primary font-medium hover:underline">
                    Admin Login
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default SignIn;