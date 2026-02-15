"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Package, User, MapPin, CreditCard, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import PageTransition from "@/components/ui/PageTransition";

export default function AccountPage() {
  const [mounted, setMounted] = useState(false);
  const { user, isAuthenticated, signOut, orders } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push("/auth/signin");
    }
  }, [mounted, isAuthenticated, router]);

  if (!mounted || !isAuthenticated) {
    return (
      <div className="max-w-[1500px] mx-auto px-4 py-6">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  const handleSignOut = () => {
    signOut();
    router.push("/");
  };

  const cards = [
    {
      title: "Your Orders",
      description: `Track, return, or buy things again (${orders.length} orders)`,
      icon: Package,
      href: "/account/orders",
    },
    {
      title: "Login & Security",
      description: "Edit login, name, and mobile number",
      icon: User,
      href: "#",
    },
    {
      title: "Your Addresses",
      description: "Edit addresses for orders",
      icon: MapPin,
      href: "/account/addresses",
    },
    {
      title: "Payment Methods",
      description: "Edit or add payment methods",
      icon: CreditCard,
      href: "/account/payments",
    },
    {
      title: "Account Settings",
      description: "Manage notification and communication preferences",
      icon: Settings,
      href: "#",
    },
  ];

  return (
    <PageTransition>
      <div className="max-w-[1500px] mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Account</h1>
        <p className="text-gray-600 mb-6">
          Welcome, <span className="font-medium">{user?.name}</span> ({user?.email})
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {cards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <card.icon className="w-10 h-10 text-[#232F3E] shrink-0 p-2 bg-gray-100 rounded-lg" />
              <div>
                <h3 className="font-medium text-gray-900">{card.title}</h3>
                <p className="text-sm text-gray-500">{card.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <Button
          variant="outline"
          onClick={handleSignOut}
          className="text-red-600 border-red-200 hover:bg-red-50"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </PageTransition>
  );
}
