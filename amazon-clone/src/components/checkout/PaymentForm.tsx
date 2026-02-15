"use client";

import { useState } from "react";
import {
  CreditCard,
  Lock,
  Check,
  Smartphone,
  Building2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { PaymentMethodType, PaymentInfo } from "@/lib/types";
import {
  usePaymentStore,
  getPaymentDisplayText,
  getPaymentMethodLabel,
} from "@/store/paymentStore";

interface PaymentFormProps {
  onSubmit: (paymentInfo: PaymentInfo) => void;
  onBack: () => void;
}

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

export default function PaymentForm({ onSubmit, onBack }: PaymentFormProps) {
  const { methods, addMethod, getDefault } = usePaymentStore();
  const defaultMethod = getDefault();

  const [selectedMethodId, setSelectedMethodId] = useState<string | "new">(
    defaultMethod ? defaultMethod.id : "new"
  );
  const [activeTab, setActiveTab] = useState<PaymentMethodType>("credit_card");

  // Card form state
  const [cardForm, setCardForm] = useState({
    cardNumber: "",
    nameOnCard: "",
    expiry: "",
    cvv: "",
  });

  // UPI form state
  const [upiId, setUpiId] = useState("");

  // Net Banking form state
  const [selectedBank, setSelectedBank] = useState("");

  // Save options
  const [saveMethod, setSaveMethod] = useState(false);
  const [setAsDefault, setSetAsDefault] = useState(false);
  const [saveLabel, setSaveLabel] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const hasPaymentMethods = methods.length > 0;
  const showNewForm = selectedMethodId === "new";

  const validateCard = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!cardForm.cardNumber.trim() || cardForm.cardNumber.replace(/\s/g, "").length < 16)
      newErrors.cardNumber = "Valid card number is required";
    if (!cardForm.nameOnCard.trim())
      newErrors.nameOnCard = "Name on card is required";
    if (!cardForm.expiry.trim() || !/^\d{2}\/\d{2}$/.test(cardForm.expiry))
      newErrors.expiry = "Valid expiry (MM/YY) is required";
    if (!cardForm.cvv.trim() || cardForm.cvv.length < 3)
      newErrors.cvv = "Valid CVV is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateUpi = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!upiId.trim() || !upiId.includes("@"))
      newErrors.upiId = "Valid UPI ID is required (e.g. name@upi)";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateNetBanking = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!selectedBank) newErrors.bank = "Please select a bank";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Using a saved method
    if (!showNewForm) {
      const method = methods.find((m) => m.id === selectedMethodId);
      if (method) {
        onSubmit({
          type: method.type,
          displayText: getPaymentDisplayText(method),
        });
      }
      return;
    }

    // New payment method
    if (activeTab === "credit_card" || activeTab === "debit_card") {
      if (!validateCard()) return;

      const last4 = cardForm.cardNumber.replace(/\s/g, "").slice(-4);
      const displayText = `${getPaymentMethodLabel(activeTab)} ending in ${last4}`;

      if (saveMethod) {
        addMethod(
          {
            type: activeTab,
            label: saveLabel.trim() || displayText,
            cardNumber: `**** **** **** ${last4}`,
            cardLast4: last4,
            nameOnCard: cardForm.nameOnCard,
            expiry: cardForm.expiry,
          },
          setAsDefault
        );
      }

      onSubmit({ type: activeTab, displayText });
    } else if (activeTab === "upi") {
      if (!validateUpi()) return;

      const displayText = `UPI - ${upiId}`;

      if (saveMethod) {
        addMethod(
          {
            type: "upi",
            label: saveLabel.trim() || displayText,
            upiId,
          },
          setAsDefault
        );
      }

      onSubmit({ type: "upi", displayText });
    } else if (activeTab === "net_banking") {
      if (!validateNetBanking()) return;

      const displayText = `Net Banking - ${selectedBank}`;

      if (saveMethod) {
        addMethod(
          {
            type: "net_banking",
            label: saveLabel.trim() || displayText,
            bankName: selectedBank,
          },
          setAsDefault
        );
      }

      onSubmit({ type: "net_banking", displayText });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
        <CreditCard className="w-5 h-5" />
        Payment Information
      </h2>

      <div className="bg-blue-50 text-blue-800 text-sm p-3 rounded-md flex items-center gap-2">
        <Lock className="w-4 h-4 shrink-0" />
        <span>This is a demo. No real payment will be processed.</span>
      </div>

      {/* Saved Payment Methods */}
      {hasPaymentMethods && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">
            Saved payment methods
          </p>
          <div className="space-y-2">
            {methods.map((method) => (
              <button
                key={method.id}
                type="button"
                onClick={() => setSelectedMethodId(method.id)}
                className={`w-full text-left p-3 border rounded-lg transition-colors ${
                  selectedMethodId === method.id
                    ? "border-[#FF9900] bg-[#FF9900]/5 ring-1 ring-[#FF9900]"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {method.type === "upi" ? (
                      <Smartphone className="w-4 h-4 text-gray-400 shrink-0" />
                    ) : method.type === "net_banking" ? (
                      <Building2 className="w-4 h-4 text-gray-400 shrink-0" />
                    ) : (
                      <CreditCard className="w-4 h-4 text-gray-400 shrink-0" />
                    )}
                    <span className="font-medium text-sm text-gray-900">
                      {method.label}
                    </span>
                    {method.isDefault && (
                      <Badge className="bg-[#FF9900]/10 text-[#FF9900] border-[#FF9900]/20 text-xs">
                        Default
                      </Badge>
                    )}
                  </div>
                  {selectedMethodId === method.id && (
                    <Check className="w-4 h-4 text-[#FF9900]" />
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1 ml-6">
                  {getPaymentDisplayText(method)}
                </p>
              </button>
            ))}

            <button
              type="button"
              onClick={() => setSelectedMethodId("new")}
              className={`w-full text-left p-3 border rounded-lg transition-colors ${
                selectedMethodId === "new"
                  ? "border-[#FF9900] bg-[#FF9900]/5 ring-1 ring-[#FF9900]"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-900">
                  + Use a new payment method
                </span>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* New Payment Method Form */}
      {(showNewForm || !hasPaymentMethods) && (
        <>
          {/* Payment Type Tabs */}
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

          {/* Credit/Debit Card Form */}
          {(activeTab === "credit_card" || activeTab === "debit_card") && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <Input
                  value={cardForm.cardNumber}
                  onChange={(e) =>
                    setCardForm((prev) => ({
                      ...prev,
                      cardNumber: formatCardNumber(e.target.value),
                    }))
                  }
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
                {errors.cardNumber && (
                  <p className="text-xs text-red-600 mt-1">{errors.cardNumber}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name on Card
                </label>
                <Input
                  value={cardForm.nameOnCard}
                  onChange={(e) =>
                    setCardForm((prev) => ({ ...prev, nameOnCard: e.target.value }))
                  }
                  placeholder="John Doe"
                />
                {errors.nameOnCard && (
                  <p className="text-xs text-red-600 mt-1">{errors.nameOnCard}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <Input
                    value={cardForm.expiry}
                    onChange={(e) =>
                      setCardForm((prev) => ({
                        ...prev,
                        expiry: formatExpiry(e.target.value),
                      }))
                    }
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                  {errors.expiry && (
                    <p className="text-xs text-red-600 mt-1">{errors.expiry}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVV
                  </label>
                  <Input
                    value={cardForm.cvv}
                    onChange={(e) =>
                      setCardForm((prev) => ({
                        ...prev,
                        cvv: e.target.value.replace(/\D/g, "").slice(0, 4),
                      }))
                    }
                    placeholder="123"
                    maxLength={4}
                    type="password"
                  />
                  {errors.cvv && (
                    <p className="text-xs text-red-600 mt-1">{errors.cvv}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* UPI Form */}
          {activeTab === "upi" && (
            <div className="space-y-4">
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
              </div>
              <p className="text-xs text-gray-500">
                Enter your UPI ID linked to any UPI app (Google Pay, PhonePe, Paytm, etc.)
              </p>
            </div>
          )}

          {/* Net Banking Form */}
          {activeTab === "net_banking" && (
            <div className="space-y-4">
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
                        setSelectedBank(bank);
                        setErrors({});
                      }}
                      className={`text-left p-2.5 border rounded-lg text-sm transition-colors ${
                        selectedBank === bank
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
            </div>
          )}

          {/* Save Options */}
          <div className="space-y-3 pt-2 border-t">
            <div className="flex items-center gap-2">
              <Checkbox
                id="save-payment"
                checked={saveMethod}
                onCheckedChange={(checked) => setSaveMethod(checked === true)}
              />
              <label
                htmlFor="save-payment"
                className="text-sm text-gray-700 cursor-pointer"
              >
                Save this payment method for future orders
              </label>
            </div>

            {saveMethod && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Label
                  </label>
                  <Input
                    value={saveLabel}
                    onChange={(e) => setSaveLabel(e.target.value)}
                    placeholder="Personal Card, Work UPI, etc."
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="set-default-payment"
                    checked={setAsDefault}
                    onCheckedChange={(checked) =>
                      setSetAsDefault(checked === true)
                    }
                  />
                  <label
                    htmlFor="set-default-payment"
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    Set as default payment method
                  </label>
                </div>
              </>
            )}
          </div>
        </>
      )}

      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          type="submit"
          className="bg-[#FF9900] hover:bg-[#FFa31a] text-black font-medium"
        >
          Review Order
        </Button>
      </div>
    </form>
  );
}
