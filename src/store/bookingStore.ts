import { create } from "zustand";

interface PaymentState {
  clientSecret: string | null;
  orderId: string | null;
  paymentIntentId: string | null;
  setPayment: (data: {
    clientSecret: string;
    orderId: string;
    paymentIntentId: string;
  }) => void;
  clearPayment: () => void;
}

export const usePaymentStore = create<PaymentState>((set) => ({
  clientSecret: null,
  orderId: null,
  paymentIntentId: null,
  setPayment: (data) => set(data),
  clearPayment: () =>
    set({ clientSecret: null, orderId: null, paymentIntentId: null }),
}));
