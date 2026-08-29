export type SubscriptionPlan = "Starter" | "Pro" | "Business" | "Enterprise";

export type CustomerStatus = "Active" | "Trial" | "Churned" | "Paused";

export type TransactionStatus = "Completed" | "Pending" | "Failed" | "Refunded";

export type PaymentMethod = "Visa" | "Mastercard" | "Amex" | "PayPal" | "Bank Transfer";

export interface Customer {
  id: string;
  name: string;
  email: string;
  avatar: string;
  plan: SubscriptionPlan;
  status: CustomerStatus;
  mrr: number;
  joined: string;
  lastActivity: string;
  company: string;
  payments: Payment[];
  activities: Activity[];
}

export interface Payment {
  id: string;
  date: string;
  amount: number;
  status: TransactionStatus;
}

export interface Activity {
  id: string;
  date: string;
  description: string;
  type: "payment" | "upgrade" | "login" | "support" | "subscription";
}

export interface Transaction {
  id: string;
  customerId: string;
  customerName: string;
  amount: number;
  date: string;
  paymentMethod: PaymentMethod;
  status: TransactionStatus;
  description: string;
}

export interface Metric {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  trend: "up" | "down";
}

export interface ChartDataPoint {
  date: string;
  revenue: number;
  previousRevenue: number;
}

export interface PlanBreakdown {
  plan: SubscriptionPlan;
  count: number;
  revenue: number;
  percentage: number;
  color: string;
}

export interface TrafficSource {
  source: string;
  visitors: number;
  percentage: number;
  change: number;
  color: string;
}

export interface DailyMetric {
  date: string;
  value: number;
}

export interface ConversionFunnelStep {
  step: string;
  count: number;
  percentage: number;
}
