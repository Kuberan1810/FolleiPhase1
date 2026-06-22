const fs = require('fs');

const replacements = [
  {
    file: 'src/Component/FloatingButton.tsx',
    find: 'import { motion, AnimatePresence } from "framer-motion";',
    replace: 'import { motion } from "framer-motion";'
  },
  {
    file: 'src/Component/FloatingButton.tsx',
    find: 'const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);',
    replace: '// const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);'
  },
  {
    file: 'src/Component/Sidebar.tsx',
    find: 'const bottomNavItems = [',
    replace: '/* const bottomNavItems = ['
  },
  {
    file: 'src/Component/Sidebar.tsx',
    find: '{bottomNavItems.map((item) => (',
    replace: '*/{/*bottomNavItems.map((item) => (*/}'
  },
  {
    file: 'src/Pages/PostSales/Analytics/NetRevenueChart.tsx',
    find: 'const [activeHoverBar, setActiveHoverBar] = useState<number | null>(null);',
    replace: '// const [activeHoverBar, setActiveHoverBar] = useState<number | null>(null);'
  },
  {
    file: 'src/Pages/PostSales/Customer/Profile/section/AttachmentsCard.tsx',
    find: "import React from 'react';",
    replace: ""
  },
  {
    file: 'src/Pages/PostSales/Customer/Profile/section/LeadNotesCard.tsx',
    find: "import React from 'react';",
    replace: ""
  },
  {
    file: 'src/Pages/PostSales/Customer/Profile/section/SupportTicketsCard.tsx',
    find: "import { AlertCircle, FileText, Activity, AlertCircleIcon } from 'lucide-react';",
    replace: "import { FileText, Activity, AlertCircleIcon } from 'lucide-react';"
  },
  {
    file: 'src/Pages/PostSales/Customer/section/customerLayout.tsx',
    find: "const [searchQuery, setSearchQuery] = useState('');",
    replace: "// const [searchQuery, setSearchQuery] = useState('');"
  },
  {
    file: 'src/Pages/PostSales/CustomerOnboarding/Enablement/CustomerEnablement.tsx',
    find: "import { ArrowLeft } from 'lucide-react';",
    replace: ""
  },
  {
    file: 'src/Pages/PostSales/CustomerOnboarding/Enablement/CustomerEnablement.tsx',
    find: "const navigate = useNavigate();",
    replace: "// const navigate = useNavigate();"
  },
  {
    file: 'src/Pages/PostSales/CustomerOnboarding/Enablement/section/ProductUsage.tsx',
    find: "{usageData.map((entry, index) => (",
    replace: "{usageData.map((_entry, index) => ("
  },
  {
    file: 'src/Pages/PostSales/CustomerOnboarding/section/OnboardingTable.tsx',
    find: "import { Filter, ArrowUpDown, ChevronLeft, ChevronRight, X } from 'lucide-react';",
    replace: "import { Filter, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';"
  },
  {
    file: 'src/Pages/PostSales/CustomerOnboarding/section/StatsSection.tsx',
    find: "import { Users, FileText, TrendingUp, GraduationCap, CheckCircle, MessageSquare } from 'lucide-react';",
    replace: "import { TrendingUp, MessageSquare } from 'lucide-react';"
  },
  {
    file: 'src/Pages/PostSales/OutBoundDashboard/Section/CustomerHealth.tsx',
    find: "import React from 'react';",
    replace: ""
  },
  {
    file: 'src/Pages/PostSales/RenewalMain/renewal/Section/RenewalListLayout.tsx',
    find: "import type { RenewalListRow, RenewalDetail } from '../Renewal';",
    replace: "import type { RenewalDetail } from '../Renewal';"
  },
  {
    file: 'src/Pages/PostSales/RenewalMain/renewaldash/Section/UpcomingRenewalTable.tsx',
    find: "import { ArrowRight } from 'iconsax-react';",
    replace: ""
  },
  {
    file: 'src/Pages/PostSales/RenewalMain/renewaldash/Section/UpsellOpportunityList.tsx',
    find: "import { ArrowRight } from 'iconsax-react';",
    replace: ""
  },
  {
    file: 'src/Pages/PreSales/campaings/CampaignCreation/CampaignCreation.tsx',
    find: "import CampaignReady from './section/CampaignReady';",
    replace: ""
  },
  {
    file: 'src/Pages/PreSales/campaings/CampaignCreation/section/WhatsAppPreview.tsx',
    find: "import { ArrowLeft, Video, Phone, MoreVertical, Send, CheckCheck } from 'lucide-react';",
    replace: "import { ArrowLeft, Video, Phone, MoreVertical, CheckCheck } from 'lucide-react';"
  },
  {
    file: 'src/Pages/PreSales/campaings/CampaignLeadList/section/CampaignLeadTable.tsx',
    find: "import React, { useState, useEffect } from 'react';",
    replace: "import { useState, useEffect } from 'react';"
  },
  {
    file: 'src/Pages/PreSales/campaings/CampaignProfile/CampaignProfile.tsx',
    find: "import { PauseCircle, Trash, ArrowLeft } from 'iconsax-react';",
    replace: "import { PauseCircle, Trash } from 'iconsax-react';"
  },
  {
    file: 'src/Pages/PreSales/campaings/CampaignProfile/section/AIInsightBanner.tsx',
    find: "import React from 'react';",
    replace: ""
  },
  {
    file: 'src/Pages/PreSales/campaings/CampaignProfile/section/DetailStatCards.tsx',
    find: "import React from 'react';",
    replace: ""
  },
  {
    file: 'src/Pages/PreSales/campaings/CampaignProfile/section/RecentEngagement.tsx',
    find: "import React from 'react';",
    replace: ""
  },
  {
    file: 'src/Pages/PreSales/campaings/section/CampaignTable.tsx',
    find: "import React, { useState, useEffect } from 'react';",
    replace: "import { useState, useEffect } from 'react';"
  },
  {
    file: 'src/Pages/PreSales/campaings/section/CampaignTable.tsx',
    find: "const handler = (e: MouseEvent) => setOpenMenuId(null);",
    replace: "const handler = (_e: MouseEvent) => setOpenMenuId(null);"
  },
  {
    file: 'src/Pages/PreSales/campaings/section/StatCards.tsx',
    find: "import React from 'react';",
    replace: ""
  },
  {
    file: 'src/Pages/PreSales/FlowBuilder/FlowBuilder.tsx',
    find: "import { Plus, Minus, RotateCcw, TimerReset, MessageSquareDot, Bot, Waves, PhoneOutgoing, MonitorDot, Play, FileCog, BellRing, CalendarDays, UserCheck, Activity, MessageSquare, Mail, SquareDashed, RefreshCcwDot, LineChart, CalendarRange, Users } from 'lucide-react';",
    replace: "import { Plus, Minus, RotateCcw, TimerReset, MessageSquareDot, Bot, Waves, PhoneOutgoing, MonitorDot, Play, FileCog, BellRing, CalendarDays, UserCheck, Activity, Mail, SquareDashed, RefreshCcwDot, CalendarRange, Users } from 'lucide-react';"
  },
  {
    file: 'src/Pages/PreSales/Inbox/Section/AdminNeeds.tsx',
    find: "import { ArrowUpDown, ArrowLeft, List } from 'lucide-react';",
    replace: "import { ArrowUpDown, ArrowLeft } from 'lucide-react';"
  },
  {
    file: 'src/Pages/PreSales/Inbox/Section/AdminNeeds.tsx',
    find: 'import { AiOutlineAlignLeft } from "react-icons/ai";',
    replace: ''
  },
  {
    file: 'src/Pages/PreSales/Inbox/Section/HandlesSection.tsx',
    find: 'height: `${height * 1.8}px`,',
    replace: 'height: height ? `${height * 1.8}px` : undefined,'
  },
  {
    file: 'src/Pages/PreSales/Leads/LeadProfile/section/AttachmentsCard.tsx',
    find: "import React from 'react';",
    replace: ""
  },
  {
    file: 'src/Pages/PreSales/Leads/LeadProfile/section/CampaignParticipationCard.tsx',
    find: "import { Shield, ArrowUpRight } from 'lucide-react';",
    replace: "import { ArrowUpRight } from 'lucide-react';"
  },
  {
    file: 'src/Pages/PreSales/Leads/LeadProfile/section/ProfilePipeLine.tsx',
    find: "import React from 'react';",
    replace: ""
  },
  {
    file: 'src/Pages/PreSales/Leads/Leads.tsx',
    find: 'import Leadslayout from "./Section/leadslayout"',
    replace: 'import Leadslayout from "./section/leadslayout"'
  },
  {
    file: 'src/Pages/PreSales/Orchestrator/section/BulkDataImport.tsx',
    find: "const rows = [",
    replace: "/* const rows = ["
  },
  {
    file: 'src/Pages/PreSales/Orchestrator/section/BulkDataImport.tsx',
    find: "rows.map((row, index)",
    replace: "*/{/* rows.map((row, index)"
  }
];

replacements.forEach(({ file, find, replace }) => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes(find)) {
      content = content.replace(find, replace);
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Replaced in ${file}`);
    } else {
      console.log(`String not found in ${file}: ${find}`);
    }
  } else {
    console.log(`File not found: ${file}`);
  }
});
