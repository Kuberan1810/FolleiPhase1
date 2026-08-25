import type { SetupStep, PromptSuggestion, BusinessCategoryOption, UserProfile, SetupStepConfig } from '../types';

export const DEFAULT_USER: UserProfile = {
  name: 'Aditya',
  email: 'aditya@northwind.io',
  initials: 'AR',
};

export const INITIAL_SETUP_STEPS: SetupStep[] = [
  { id: 'business', label: 'Business', status: 'active' },
  { id: 'customer-type', label: 'Customer Type', status: 'pending' },
  { id: 'crm', label: 'CRM', status: 'pending' },
  { id: 'business-data', label: 'Business Data', status: 'pending' },
  { id: 'leads', label: 'Leads', status: 'pending' },
  { id: 'finish-setup', label: 'Finish Setup', status: 'pending' },
];

export const STEP_CONFIGS: Record<string, SetupStepConfig> = {
  'business': {
    id: 'business',
    label: 'Business',
    stepNumber: 1,
    bannerTitle: "Your workspace isn't set up yet.",
    bannerSubtitle: "Let's get it ready together.",
    question: "What do you do?",
    options: [
      { id: 'software', label: 'Software' },
      { id: 'services', label: 'Services' },
      { id: 'retail', label: 'Retail' },
      { id: 'manufacturing', label: 'Manufacturing' },
      { id: 'consulting', label: 'Consulting' },
      { id: 'other', label: 'Other' },
    ],
    inputPlaceholder: "Tell Follei about your business...",
  },
  'customer-type': {
    id: 'customer-type',
    label: 'Customer Type',
    stepNumber: 2,
    bannerTitle: "Nice — that helps. One more quick question.",
    bannerSubtitle: "",
    question: "Who do you sell to?",
    options: [
      { id: 'businesses', label: 'Businesses' },
      { id: 'consumers', label: 'Consumers' },
      { id: 'both', label: 'Both' },
    ],
    inputPlaceholder: "Describe your customers...",
  },
  'crm': {
    id: 'crm',
    label: 'CRM',
    stepNumber: 3,
    bannerTitle: "Nice — that helps. One more quick question.",
    bannerSubtitle: "",
    question: "Do you already use a CRM?",
    options: [
      { id: 'telecrm', label: 'TeleCRM' },
      { id: 'salesforce', label: 'Salesforce' },
      { id: 'zoho', label: 'Zoho' },
      { id: 'pipedrive', label: 'Pipedrive' },
      { id: 'other', label: 'Other' },
      { id: 'no-crm', label: 'No CRM' },
    ],
    inputPlaceholder: "Type a CRM name...",
  },
  'business-data': {
    id: 'business-data',
    label: 'Business Data',
    stepNumber: 4,
    bannerTitle: "Nice — that helps. One more quick question.",
    bannerSubtitle: "",
    question: "Do you have existing business data?",
    description: "Products, services, pricing, FAQs, documents, policies, and other business information can help Follei understand your business.",
    options: [
      { id: 'upload-business-data', label: 'Upload Business Data' },
      { id: 'import-drive', label: 'Import from Drive' },
      { id: 'later', label: "I'll do this later" },
    ],
    inputPlaceholder: "Anything else Follei should know...",
  },
  'leads': {
    id: 'leads',
    label: 'Leads',
    stepNumber: 5,
    bannerTitle: "Nice — that helps. One more quick question.",
    bannerSubtitle: "",
    question: "Do you have existing leads?",
    description: "Bring your existing leads into Follei so your workspace is ready to work with them.",
    options: [
      { id: 'import-leads', label: 'Import Leads' },
      { id: 'connect-crm', label: 'Connect CRM' },
      { id: 'later', label: "I'll add them later" },
    ],
    inputPlaceholder: "Anything else about your leads...",
  },
  'finish-setup': {
    id: 'finish-setup',
    label: 'Finish Setup',
    stepNumber: 6,
    bannerTitle: "Your workspace is ready.",
    bannerSubtitle: "Follei now understands your business and your sales data.",
    question: "",
    options: [],
    inputPlaceholder: "",
  },
};

export const PROMPT_SUGGESTIONS: PromptSuggestion[] = [
  { id: '1', text: 'What do you sell?' },
  { id: '2', text: 'Who are your customers?' },
  { id: '3', text: 'How do you manage sales today?' },
];

export const READY_PROMPT_SUGGESTIONS: PromptSuggestion[] = [
  { id: '1', text: 'Which leads need follow-up?' },
  { id: '2', text: 'Show me my hottest leads' },
  { id: '3', text: 'Summarize Project One' },
  { id: '4', text: 'Which deals are at risk?' },
];

export const BUSINESS_OPTIONS: BusinessCategoryOption[] = [
  { id: 'software', label: 'Software' },
  { id: 'services', label: 'Services' },
  { id: 'retail', label: 'Retail' },
  { id: 'manufacturing', label: 'Manufacturing' },
  { id: 'consulting', label: 'Consulting' },
  { id: 'other', label: 'Other' },
];

