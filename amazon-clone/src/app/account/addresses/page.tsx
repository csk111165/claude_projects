"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Plus, Pencil, Trash2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/store/authStore";
import { useAddressStore } from "@/store/addressStore";
import { SavedAddress, ShippingAddress } from "@/lib/types";

const emptyAddress: ShippingAddress & { label: string } = {
  label: "",
  fullName: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  country: "United States",
  phone: "",
};

function AddressForm({
  initialData,
  onSave,
  onCancel,
}: {
  initialData?: SavedAddress;
  onSave: (data: ShippingAddress & { label: string }) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<ShippingAddress & { label: string }>(
    initialData
      ? {
          label: initialData.label,
          fullName: initialData.fullName,
          address: initialData.address,
          city: initialData.city,
          state: initialData.state,
          zipCode: initialData.zipCode,
          country: initialData.country,
          phone: initialData.phone,
        }
      : { ...emptyAddress }
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.label.trim()) newErrors.label = "Label is required";
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
      onSave(form);
    }
  };

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border rounded-lg p-4 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Label (e.g. Home, Work)
        </label>
        <Input
          value={form.label}
          onChange={(e) => handleChange("label", e.target.value)}
          placeholder="Home"
        />
        {errors.label && (
          <p className="text-xs text-red-600 mt-1">{errors.label}</p>
        )}
      </div>

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

      <div className="flex gap-2">
        <Button
          type="submit"
          className="bg-[#FF9900] hover:bg-[#FFa31a] text-black font-medium"
        >
          {initialData ? "Update Address" : "Add Address"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default function AddressesPage() {
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const { addresses, addAddress, updateAddress, removeAddress, setDefault } =
    useAddressStore();
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

  const handleAdd = (data: ShippingAddress & { label: string }) => {
    const { label, ...address } = data;
    addAddress(address, label);
    setShowAddForm(false);
  };

  const handleUpdate = (
    id: string,
    data: ShippingAddress & { label: string }
  ) => {
    updateAddress(id, data);
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    removeAddress(id);
  };

  return (
    <div className="max-w-[1500px] mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Your Addresses</h1>
        {!showAddForm && (
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-[#FF9900] hover:bg-[#FFa31a] text-black font-medium"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Address
          </Button>
        )}
      </div>

      {showAddForm && (
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-3">
            Add New Address
          </h2>
          <AddressForm
            onSave={handleAdd}
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      )}

      {addresses.length === 0 && !showAddForm ? (
        <div className="text-center py-16">
          <MapPin className="w-20 h-20 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-900 mb-2">
            No saved addresses
          </h2>
          <p className="text-gray-500 mb-6">
            Add an address to speed up your checkout experience.
          </p>
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-[#FF9900] hover:bg-[#FFa31a] text-black font-medium"
          >
            Add Your First Address
          </Button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {addresses.map((addr) =>
            editingId === addr.id ? (
              <AddressForm
                key={addr.id}
                initialData={addr}
                onSave={(data) => handleUpdate(addr.id, data)}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <div
                key={addr.id}
                className="border rounded-lg p-4 relative flex flex-col"
              >
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-medium text-gray-900">{addr.label}</h3>
                  {addr.isDefault && (
                    <Badge className="bg-[#FF9900]/10 text-[#FF9900] border-[#FF9900]/20">
                      Default
                    </Badge>
                  )}
                </div>
                <div className="text-sm text-gray-600 space-y-1 flex-1">
                  <p>{addr.fullName}</p>
                  <p>{addr.address}</p>
                  <p>
                    {addr.city}, {addr.state} {addr.zipCode}
                  </p>
                  <p>{addr.country}</p>
                  <p>{addr.phone}</p>
                </div>
                <div className="flex gap-2 mt-4 pt-3 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingId(addr.id)}
                  >
                    <Pencil className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(addr.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Delete
                  </Button>
                  {!addr.isDefault && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDefault(addr.id)}
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
