import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { confirmSignUp, resendSignUpCode } from "aws-amplify/auth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get("email") || "";

  const [code, setCode] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      await confirmSignUp({ username: email, confirmationCode: code });
      toast.success("Email verified successfully! You can now sign in.");
      navigate("/signin");
    } catch (error) {
      toast.error(error.message || "Verification failed!");
    }
  };

  const handleResendCode = async () => {
    try {
      await resendSignUpCode({ username: email });
      toast.success("Verification code resent! Check your email.");
    } catch (error) {
      toast.error(error.message || "Failed to resend code.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md shadow-hover rounded-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Verify Your Email</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerify} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">Enter Verification Code</Label>
                <Input
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  placeholder="6-digit code"
                />
              </div>

              <Button type="submit" className="w-full rounded-full gradient-hero">
                Verify Email
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full mt-2"
                onClick={handleResendCode}
              >
                Resend Code
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default VerifyEmail;
