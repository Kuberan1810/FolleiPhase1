export type ItemAnalysisStatus = "idle" | "analyzing" | "found" | "not_found";

export interface ExtractedSubItem {
  id: string;
  title: string;
  description: string;
  status?: "found" | "not_found";
}

export interface ChecklistItem {
  id: string;
  name: string;
  status: ItemAnalysisStatus;
  resultText?: string;
  subItems?: ExtractedSubItem[];
}

export interface UnderstandingCategory {
  id: string;
  title: string;
  items: ChecklistItem[];
}

export interface UploadedFile {
  id: string;
  file?: File;
  name: string;
  size: number;
  type: string;
  status: "analyzing" | "analyzed" | "error";
}

export type AnalysisStage = "idle" | "analyzing" | "analyzed";

export const MOCK_PRODUCT_SUBITEMS: ExtractedSubItem[] = [
  {
    id: "prod-1",
    title: "Personal Loan",
    description: "Funds to individuals for personal needs",
    status: "found",
  },
  {
    id: "prod-2",
    title: "Business Loan",
    description: "Working capital or expansion funding to businesses",
    status: "found",
  },
  {
    id: "prod-3",
    title: "Consumer Durable Loan",
    description: "Customers purchase electronics and household products",
    status: "found",
  },
  {
    id: "prod-4",
    title: "Home Loan",
    description: "Financing for purchasing or constructing a property",
    status: "found",
  },
  {
    id: "prod-5",
    title: "Vehicle Loan",
    description: "Financing for purchasing a new or used vehicle",
    status: "found",
  },
  {
    id: "prod-6",
    title: "Education Loan",
    description: "Financial assistance for higher studies in domestic and foreign universities",
    status: "found",
  },
];

export const INITIAL_UNDERSTANDING_CATEGORIES: UnderstandingCategory[] = [
  {
    id: "business",
    title: "BUSINESS",
    items: [
      {
        id: "products",
        name: "Products",
        status: "idle",
        resultText: "12 items found",
        subItems: MOCK_PRODUCT_SUBITEMS,
      },
      {
        id: "services",
        name: "Services",
        status: "idle",
        resultText: "8 services found",
        subItems: [
          { id: "srv-1", title: "Loan Advisory", description: "Personalized consulting on borrowing strategies", status: "found" },
          { id: "srv-2", title: "Credit Score Enhancement", description: "Credit report auditing and improvement guidance", status: "found" },
          { id: "srv-3", title: "Debt Consolidation", description: "Restructuring multiple liabilities into single low-interest plans", status: "found" },
        ],
      },
      {
        id: "pricing",
        name: "Pricing & Packages",
        status: "idle",
        resultText: "5 pricing plans found",
        subItems: [
          { id: "prc-1", title: "Standard Processing Fee", description: "1.5% - 2.5% of total sanctioned principal", status: "found" },
          { id: "prc-2", title: "Early Pre-closure Option", description: "Zero foreclosure charges after 12 active EMIs", status: "found" },
        ],
      },
      {
        id: "plans",
        name: "Plans & Subscriptions",
        status: "idle",
        resultText: "3 subscription tiers found",
        subItems: [
          { id: "pln-1", title: "Standard Membership", description: "Quarterly financial health assessment", status: "found" },
          { id: "pln-2", title: "Premium VIP Advisory", description: "Priority underwriting & dedicated relationship manager", status: "found" },
        ],
      },
      {
        id: "policies",
        name: "Policies & Terms",
        status: "idle",
        resultText: "Missing in file",
        subItems: [
          { id: "pol-1", title: "Standard Privacy & Retention", description: "Missing mandatory clause in document", status: "not_found" },
        ],
      },
      {
        id: "faqs",
        name: "FAQs",
        status: "idle",
        resultText: "21 questions found",
        subItems: [
          { id: "faq-1", title: "What is the minimum eligibility age?", description: "Applicants must be at least 21 years old", status: "found" },
          { id: "faq-2", title: "What documents are required?", description: "Identity proof, address proof, and 6-month bank statement", status: "found" },
        ],
      },
    ],
  },
  {
    id: "sales",
    title: "SALES",
    items: [
      { id: "sales_process", name: "Sales Process", status: "idle", resultText: "5 stages found" },
      { id: "lead_qual", name: "Lead Qualification", status: "idle", resultText: "9 criteria found" },
      { id: "messaging", name: "Sales Messaging", status: "idle", resultText: "14 snippets found" },
      { id: "value_prop", name: "Value Propositions", status: "idle", resultText: "6 propositions found" },
      { id: "objections", name: "Common Objections", status: "idle", resultText: "7 objections found" },
      { id: "pain_points", name: "Customer Pain Points", status: "idle", resultText: "11 pain points found" },
      { id: "buyer_personas", name: "Buyer Personas", status: "idle", resultText: "4 personas found" },
    ],
  },
  {
    id: "customers",
    title: "CUSTOMERS",
    items: [
      { id: "segments", name: "Customer Segments", status: "idle", resultText: "4 segments found" },
      { id: "industries", name: "Target Industries", status: "idle", resultText: "9 industries found" },
      { id: "use_cases", name: "Use Cases", status: "idle", resultText: "12 use cases found" },
      { id: "contact_info", name: "Contact & Company Information", status: "idle", resultText: "38 records found" },
      { id: "comm_prefs", name: "Communication Preferences", status: "idle", resultText: "Not found" },
    ],
  },
  {
    id: "operations",
    title: "OPERATIONS",
    items: [
      { id: "support_process", name: "Support Process", status: "idle", resultText: "4 workflows found" },
      { id: "billing_process", name: "Payment & Billing Process", status: "idle", resultText: "3 flows found" },
      { id: "deals", name: "Existing Deals & Opportunities", status: "idle", resultText: "17 deals found" },
      { id: "followup", name: "Follow-up Patterns", status: "idle", resultText: "Not found" },
    ],
  },
  {
    id: "competitive_intelligence",
    title: "COMPETITIVE INTELLIGENCE",
    items: [
      { id: "competitors", name: "Competitors", status: "idle", resultText: "6 competitors found" },
      { id: "differentiators", name: "Differentiators", status: "idle", resultText: "23 features found" },
      { id: "positioning", name: "Positioning Angles", status: "idle", resultText: "4 angles found" },
    ],
  },
];

export const SUPPORTED_FORMATS = "PDF, DOCX, XLSX, CSV, PPTX, TXT";
export const MAX_FILE_SIZE_TEXT = "25 MB per file";
export const ACCEPTED_EXTENSIONS = [".pdf", ".docx", ".xlsx", ".csv", ".pptx", ".txt"];
