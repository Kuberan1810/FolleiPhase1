export interface SetupStep {
  id: string;
  label: string;
  status: 'active' | 'completed' | 'pending' | 'skipped';
}

export interface UserProfile {
  name: string;
  email: string;
  initials: string;
  avatarUrl?: string;
}

export interface PromptSuggestion {
  id: string;
  text: string;
}

export interface BusinessCategoryOption {
  id: string;
  label: string;
}

export interface SetupStepConfig {
  id: string;
  label: string;
  stepNumber: number;
  question: string;
  description?: string;
  bannerTitle: string;
  bannerSubtitle?: string;
  options: BusinessCategoryOption[];
  inputPlaceholder: string;
}

export interface WorkspaceContextItem {
  id: string;
  type: string;
  title: string;
  status?: string;
  value?: string;
  subtitle?: string;
  isLoading?: boolean;
  isEmpty?: boolean;
  actionLabel?: string;
  onAction?: () => void;
}
