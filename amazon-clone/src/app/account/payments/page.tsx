"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CreditCard,
  Plus,
  Pencil,
  Trash2,
  Star,
  Smartphone,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/store/authStore";
import {
  usePaymentStore,
  getPaymentDisplayText,
  getPaymentMethodLabel,
} from "@/store/paymentStore";
import { SavedPaymentMethod, PaymentMethodType } from "@/lib/types";

const BANKS = [
  "State Bank of India",
  "HDFC Bank",
  "ICICI Bank",
  "Axis Bank",
  "Punjab National Bank",
  "Bank of Baroda",
  "Kotak Mahindra Bank",
  "Yes Bank",
];

const paymentTabs: { type: PaymentMethodType; label: string; icon: React.ReactNode }[] = [
  { type: "credit_card", label: "Credit Card", icon: <CreditCard className="w-4 h-4" /> },
  { type: "debit_card", label: "Debit Card", icon: <CreditCard className="w-4 h-4" /> },
  { type: "upi", label: "UPI", icon: <Smartphone className="w-4 h-4" /> },
  { type: "net_banking", label: "Net Banking", icon: <Building2 className="w-4 h-4" /> },
];

function PaymentMethodForm({
  initialData,
  onSave,
  onCancel,
}: {
  initialData?: SavedPaymentMethod;
  onSave: (data: Omit<SavedPaymentMethod, "id" | "isDefault">) => void;
  onCancel: () => void;
}) {
  const [activeTab, setActiveTab] = useState<PaymentMethodType>(
    initialData?.type || "credit_card"
  );
  const [label, setLabel] = useState(initialData?.label || "");

  // Card fields
  const [cardNumber, setCardNumber] = useState("");
  const [nameOnCard, setNameOnCard] = useState(initialData?.nameOnCard || "");
  const [expiry, setExpiry] = useState(initialData?.expiry || "");

  // UPI field
  const [upiId, setUpiId] = useState(initialData?.upiId || "");

  // Net Banking field
  const [bankName, setBankName] = useState(initialData?.bankName || "");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const isEditing = !!initialData;

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) {
      return digits.slice(0, 2) + "/" + digits.slice(2);
    }
    return digits;
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!label.trim()) newErrors.label = "Label is required";

    if (activeTab === "credit_card" || activeTab === "debit_card") {
      if (!isEditing) {
        if (!cardNumber.trim() || cardNumber.replace(/\s/g, "").length < 16)
          newErrors.cardNumber = "Valid card number is required";
      }
      if (!nameOnCard.trim()) newErrors.nameOnCard = "Name on card is required";
      if (!expiry.trim() || !/^\d{2}\/\d{2}$/.test(expiry))
        newErrors.expiry = "Valid expiry (MM/YY) is required";
    } else if (activeTab === "upi") {
      if (!upiId.trim() || !upiId.includes("@"))
        newErrors.upiId = "Valid UPI ID is required (e.g. name@upi)";
    } else if (activeTab === "net_banking") {
      if (!bankName) newErrors.bank = "Please select a bank";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (activeTab === "credit_card" || activeTab === "debit_card") {
      const last4 = isEditing
        ? initialData.cardLast4!
        : cardNumber.replace(/\s/g, "").slice(-4);
      onSave({
        type: activeTab,
        label: label.trim(),
        cardNumber: `**** **** **** ${last4}`,
        cardLast4: last4,
        nameOnCard,
        expiry,
      });
    } else if (activeTab === "upi") {
      onSave({
        type: "upi",
        label: label.trim(),
        upiId,
      });
    } else if (activeTab === "net_banking") {
      onSave({
        type: "net_banking",
        label: label.trim(),
        bankName,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border rounded-lg p-4 space-y-4">
      {/* Payment Type Tabs - only for new */}
      {!isEditing && (
        <div className="flex border rounded-lg overflow-hidden">
          {paymentTabs.map((tab) => (
            <button
              key={tab.type}
              type="button"
              onClick={() => {
                setActiveTab(tab.type);
                setErrors({});
              }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 text-xs font-medium transition-colors ${
                activeTab === tab.type
                  ? "bg-[#FF9900] text-black"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      )}

      {isEditing && (
        <p className="text-sm font-medium text-gray-500">
          {getPaymentMethodLabel(activeTab)}
        </p>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Label
        </label>
        <Input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Personal Card, Work UPI, etc."
        />
        {errors.label && (
          <p className="text-xs text-red-600 mt-1">{errors.label}</p>
        )}
      </div>

      {/* Card Fields */}
      {(activeTab === "credit_card" || activeTab === "debit_card") && (
        <>
          {!isEditing && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <Input
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
              {errors.cardNumber && (
                <p className="text-xs text-red-600 mt-1">{errors.cardNumber}</p>
              )}
            </div>
          )}
          {isEditing && (
            <p className="text-sm text-gray-500">
              Card: {initialData.cardNumber}
            </p>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name on Card
            </label>
            <Input
              value={nameOnCard}
              onChange={(e) => setNameOnCard(e.target.value)}
              placeholder="John Doe"
            />
            {errors.nameOnCard && (
              <p className="text-xs text-red-600 mt-1">{errors.nameOnCard}</p>
            )}
          </div>
          <div className="max-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expiry Date
            </label>
            <Input
              value={expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
              placeholder="MM/YY"
              maxLength={5}
            />
            {errors.expiry && (
              <p className="text-xs text-red-600 mt-1">{errors.expiry}</p>
            )}
          </div>
        </>
      )}

      {/* UPI Field */}
      {activeTab === "upi" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            UPI ID
          </label>
          <Input
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            placeholder="yourname@upi"
          />
          {errors.upiId && (
            <p className="text-xs text-red-600 mt-1">{errors.upiId}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Enter your UPI ID linked to any UPI app (Google Pay, PhonePe, Paytm, etc.)
          </p>
        </div>
      )}

      {/* Net Banking Field */}
      {activeTab === "net_banking" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Your Bank
          </label>
          <div className="grid grid-cols-2 gap-2">
            {BANKS.map((bank) => (
              <button
                key={bank}
                type="button"
                onClick={() => {
                  setBankName(bank);
                  setErrors({});
                }}
                className={`text-left p-2.5 border rounded-lg text-sm transition-colors ${
                  bankName === bank
                    ? "border-[#FF9900] bg-[#FF9900]/5 ring-1 ring-[#FF9900] font-medium"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {bank}
              </button>
            ))}
          </div>
          {errors.bank && (
            <p className="text-xs text-red-600 mt-1">{errors.bank}</p>
          )}
        </div>
      )}

      <div className="flex gap-2">
        <Button
          type="submit"
          className="bg-[#FF9900] hover:bg-[#FFa31a] text-black font-medium"
        >
          {isEditing ? "Update" : "Add"} Payment Method
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

function MethodIcon({ type }: { type: PaymentMethodType }) {
  if (type === "upi") return <Smartphone className="w-5 h-5 text-gray-500" />;
  if (type === "net_banking") return <Building2 className="w-5 h-5 text-gray-500" />;
  return <CreditCard className="w-5 h-5 text-gray-500" />;
}

export default function PaymentsPage() {
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const { methods, addMethod, updateMethod, removeMethod, setDefault } =
    usePaymentStore();
  const router = useRouter();

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

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

  const handleAdd = (data: Omit<SavedPaymentMethod, "id" | "isDefault">) => {
    addMethod(data);
    setShowAddForm(false);
  };

  const handleUpdate = (
    id: string,
    data: Omit<SavedPaymentMethod, "id" | "isDefault">
  ) => {
    updateMethod(id, data);
    setEditingId(null);
  };

  return (
    <div className="max-w-[1500px] mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Payment Methods</h1>
        {!showAddForm && (
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-[#FF9900] hover:bg-[#FFa31a] text-black font-medium"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Payment Method
          </Button>
        )}
      </div>

      {showAddForm && (
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-3">
            Add New Payment Method
          </h2>
          <PaymentMethodForm
            onSave={handleAdd}
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      )}

      {methods.length === 0 && !showAddForm ? (
        <div className="text-center py-16">
          <CreditCard className="w-20 h-20 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-900 mb-2">
            No saved payment methods
          </h2>
          <p className="text-gray-500 mb-6">
            Add a payment method to speed up your checkout experience.
          </p>
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-[#FF9900] hover:bg-[#FFa31a] text-black font-medium"
          >
            Add Your First Payment Method
          </Button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {methods.map((method) =>
            editingId === method.id ? (
              <PaymentMethodForm
                key={method.id}
                initialData={method}
                onSave={(data) => handleUpdate(method.id, data)}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <div
                key={method.id}
                className="border rounded-lg p-4 relative flex flex-col"
              >
                <div className="flex items-center gap-2 mb-2">
                  <MethodIcon type={method.type} />
                  <h3 className="font-medium text-gray-900">{method.label}</h3>
                  {method.isDefault && (
                    <Badge className="bg-[#FF9900]/10 text-[#FF9900] border-[#FF9900]/20">
                      Default
                    </Badge>
                  )}
                </div>
                <div className="text-sm text-gray-600 space-y-1 flex-1">
                  <p className="text-xs text-gray-400 uppercase">
                    {getPaymentMethodLabel(method.type)}
                  </p>
                  <p>{getPaymentDisplayText(method)}</p>
                  {method.nameOnCard && <p>{method.nameOnCard}</p>}
                  {method.expiry && <p>Expires: {method.expiry}</p>}
                </div>
                <div className="flex gap-2 mt-4 pt-3 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingId(method.id)}
                  >
                    <Pencil className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeMethod(method.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Delete
                  </Button>
                  {!method.isDefault && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDefault(method.id)}
                    >
                      <Star className="w-3 h-3 mr-1" />
                      Set Default
                    </Button>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
