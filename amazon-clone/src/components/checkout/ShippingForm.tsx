"use client";

import { useState, useEffect } from "react";
import { MapPin, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ShippingAddress } from "@/lib/types";
import { useAddressStore } from "@/store/addressStore";

interface ShippingFormProps {
  onSubmit: (address: ShippingAddress) => void;
  initialData?: ShippingAddress;
}

const blankAddress: ShippingAddress = {
  fullName: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  country: "United States",
  phone: "",
};

export default function ShippingForm({ onSubmit, initialData }: ShippingFormProps) {
  const { addresses, addAddress, getDefault } = useAddressStore();
  const defaultAddr = getDefault();

  const [selectedAddressId, setSelectedAddressId] = useState<string | "new">(
    defaultAddr ? defaultAddr.id : "new"
  );
  const [form, setForm] = useState<ShippingAddress>(
    initialData || defaultAddr || blankAddress
  );
  const [saveAddress, setSaveAddress] = useState(false);
  const [setAsDefault, setSetAsDefault] = useState(false);
  const [saveLabel, setSaveLabel] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof ShippingAddress, string>>>({});

  const hasAddresses = addresses.length > 0;
  const showForm = selectedAddressId === "new";

  useEffect(() => {
    if (selectedAddressId === "new") {
      setForm(initialData || blankAddress);
    } else {
      const addr = addresses.find((a) => a.id === selectedAddressId);
      if (addr) {
        setForm({
          fullName: addr.fullName,
          address: addr.address,
          city: addr.city,
          state: addr.state,
          zipCode: addr.zipCode,
          country: addr.country,
          phone: addr.phone,
        });
      }
    }
  }, [selectedAddressId, addresses, initialData]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ShippingAddress, string>> = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.state.trim()) newErrors.state = "State is required";
    if (!form.zipCode.trim()) newErrors.zipCode = "ZIP code is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      if (showForm && saveAddress) {
        addAddress(form, saveLabel.trim() || "Address", setAsDefault);
      }
      onSubmit(form);
    }
  };

  const handleChange = (field: keyof ShippingAddress, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <h2 className="text-lg font-bold text-gray-900">Shipping Address</h2>

      {hasAddresses && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Select an address</p>
          <div className="space-y-2">
            {addresses.map((addr) => (
              <button
                key={addr.id}
                type="button"
                onClick={() => setSelectedAddressId(addr.id)}
                className={`w-full text-left p-3 border rounded-lg transition-colors ${
                  selectedAddressId === addr.id
                    ? "border-[#FF9900] bg-[#FF9900]/5 ring-1 ring-[#FF9900]"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                    <span className="font-medium text-sm text-gray-900">
                      {addr.label}
                    </span>
                    {addr.isDefault && (
                      <Badge className="bg-[#FF9900]/10 text-[#FF9900] border-[#FF9900]/20 text-xs">
                        Default
                      </Badge>
                    )}
                  </div>
                  {selectedAddressId === addr.id && (
                    <Check className="w-4 h-4 text-[#FF9900]" />
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1 ml-6">
                  {addr.fullName}, {addr.address}, {addr.city}, {addr.state}{" "}
                  {addr.zipCode}
                </p>
              </button>
            ))}

            <button
              type="button"
              onClick={() => setSelectedAddressId("new")}
              className={`w-full text-left p-3 border rounded-lg transition-colors ${
                selectedAddressId === "new"
                  ? "border-[#FF9900] bg-[#FF9900]/5 ring-1 ring-[#FF9900]"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-900">
                  + Use a new address
                </span>
              </div>
            </button>
          </div>
        </div>
      )}

      {(showForm || !hasAddresses) && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <Input
              value={form.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              placeholder="John Doe"
            />
            {errors.fullName && (
              <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <Input
              value={form.address}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="123 Main St, Apt 4"
            />
            {errors.address && (
              <p className="text-xs text-red-600 mt-1">{errors.address}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <Input
                value={form.city}
                onChange={(e) => handleChange("city", e.target.value)}
                placeholder="New York"
              />
              {errors.city && (
                <p className="text-xs text-red-600 mt-1">{errors.city}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <Input
                value={form.state}
                onChange={(e) => handleChange("state", e.target.value)}
                placeholder="NY"
              />
              {errors.state && (
                <p className="text-xs text-red-600 mt-1">{errors.state}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ZIP Code
              </label>
              <Input
                value={form.zipCode}
                onChange={(e) => handleChange("zipCode", e.target.value)}
                placeholder="10001"
              />
              {errors.zipCode && (
                <p className="text-xs text-red-600 mt-1">{errors.zipCode}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <Input value={form.country} disabled />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <Input
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="(555) 123-4567"
              type="tel"
            />
            {errors.phone && (
              <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
            )}
          </div>

          <div className="space-y-3 pt-2 border-t">
            <div className="flex items-center gap-2">
              <Checkbox
                id="save-address"
                checked={saveAddress}
                onCheckedChange={(checked) =>
                  setSaveAddress(checked === true)
                }
              />
              <label
                htmlFor="save-address"
                className="text-sm text-gray-700 cursor-pointer"
              >
                Save this address for future orders
              </label>
            </div>

            {saveAddress && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Label
                  </label>
                  <Input
                    value={saveLabel}
                    onChange={(e) => setSaveLabel(e.target.value)}
                    placeholder="Home, Work, etc."
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="set-default"
                    checked={setAsDefault}
                    onCheckedChange={(checked) =>
                      setSetAsDefault(checked === true)
                    }
                  />
                  <label
                    htmlFor="set-default"
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    Set as default address
                  </label>
                </div>
              </>
            )}
          </div>
        </>
      )}

      <Button
        type="submit"
        className="bg-[#FF9900] hover:bg-[#FFa31a] text-black font-medium"
      >
        Continue to Payment
      </Button>
    </form>
  );
}
