import React from 'react';
import RenewalListLayout from './Section/RenewalListLayout';

export type RenewalStatCard = {
  id: string;
  icon: 'users' | 'calendar' | 'userCheck';
  iconBoxBg: string;
  label: string;
  value: string;
  pillText: string;
  pillColor: string;
  pillBg: string;
};

export type RenewalListRow = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  plan: 'ENTERPRISE' | 'PRO';
  date: string;
  status: 'Committed' | 'Risk' | 'Negotiating';
  score: number;
};

export type RenewalDetail = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  plan: string;
  planUpgradeNote: string;
  seatsUsed: number;
  seatsTotal: number;
  renewalChance: number;
  churnRisk: 'Low' | 'Medium' | 'High';
  bestAction: {
    title: string;
    caption: string;
  };
  usageTrend: string;
  usageBars: { month: string; value: number; highlight: boolean }[];
  tickets: number;
  csat: number;
};

export default function Renewal() {
  return <RenewalListLayout />;
}