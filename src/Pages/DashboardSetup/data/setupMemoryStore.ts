import type { SetupStep, WorkspaceContextItem } from '../types';
import { INITIAL_SETUP_STEPS } from './dashboardData';

export interface SetupSessionState {
  // Phase 1 (6 Steps) state
  currentStepId: string;
  steps: SetupStep[];
  maxReachedIndex: number;
  businessType: string;
  customerType: string;
  workspaceItems: WorkspaceContextItem[];
  isComplete: boolean;
  isWorkspaceReady: boolean;
  companyName: string;

  // Phone / WhatsApp / Email 3-Step Setup state
  showPhoneSetup: boolean;
  phoneSetupCurrentStep: number;
  step2SubStep: 'input' | 'verify' | 'connected';
  whatsAppNumber: string;
  otp: string[];
  step3SubStep: 'input' | 'check-inbox' | 'verified';
  workEmail: string;
}

export const initialSetupSessionState: SetupSessionState = {
  currentStepId: 'business',
  steps: INITIAL_SETUP_STEPS,
  maxReachedIndex: 0,
  businessType: '',
  customerType: '',
  workspaceItems: [],
  isComplete: false,
  isWorkspaceReady: false,
  companyName: 'My business',

  showPhoneSetup: false,
  phoneSetupCurrentStep: 1,
  step2SubStep: 'input',
  whatsAppNumber: '',
  otp: ['', '', '', '', '', ''],
  step3SubStep: 'input',
  workEmail: '',
};

// In-memory global store that survives in-app route changes and resets on browser refresh
export const setupMemoryStore: SetupSessionState = {
  ...initialSetupSessionState,
};
