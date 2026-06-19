import React from 'react';
import RenewalLayout from './Section/RenewalLayout';

export type RenewalStat = {
  id: string;
  label: string;
  value: string;
  subLabel: string;
  subType: 'success' | 'urgent' | 'risk';
};

export type PredictionDataPoint = {
  month: string;
  follei: number;
  actual: number;
};

export type RenewalRow = {
  id: string;
  name: string;
  email: string;
  initials: string;
  avatarBg: string;
  plan: string;
  date: string;
  status: 'Committed' | 'Risk' | 'Negotiating';
  score: number;
};

export type AiInsight = {
  id: string;
  title: string;
  caption: string;
  ctaText: string;
};

export type ForecastItem = {
  id: string;
  label: 'Confirmed' | 'Expected' | 'At Risk';
  value: number;
  color: string;
};

export type UpsellItem = {
  id: string;
  name: string;
  email: string;
  avatar: string; // image url
  amount: string;
  percentage: string;
  note: string;
};

export default function RenewalDash() {
  return <RenewalLayout />;
}
