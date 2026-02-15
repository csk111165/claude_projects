import SignInForm from "@/components/auth/SignInForm";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center py-12 px-4">
      <Link href="/" className="text-2xl font-bold mb-8">
        Nova<span className="text-[#FF9900]">Mart</span>
      </Link>
      <SignInForm />
    </div>
  );
}
