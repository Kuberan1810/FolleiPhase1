import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Check, Copy, AlertCircle, MoreVertical, Download, ChevronLeft, ChevronRight, ChevronDown, RefreshCw, Trash2, ShieldAlert } from "lucide-react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";

import hubspotIcon from "../../../assets/crm/hubsoft.png";
import zohoIcon from "../../../assets/crm/zoho.png";
import pipedriveIcon from "../../../assets/crm/pipe.png";
import copperIcon from "../../../assets/crm/cooper.png";
import keapIcon from "../../../assets/crm/keap.png";

// Salesforce inline SVG
const SalesforceLogo = () => (
  <svg className="w-12 h-12 shrink-0" viewBox="0 0 24 24" fill="none">
    <path
      d="M18.8 9.5C18.2 6.5 15.5 4.3 12.3 4.3c-2.3 0-4.3 1.1-5.6 2.8C6.3 6.8 5.8 6.7 5.3 6.7c-2.6 0-4.8 2.1-4.8 4.8 0 .1 0 .3.1.4C.2 12.2 0 12.6 0 13c0 2.2 1.8 4 4 4h14.5c2.5 0 4.5-2 4.5-4.5 0-2.3-1.7-4.2-4.2-4.5z"
      fill="#00A1E0"
    />
  </svg>
);

interface CRMConfig {
  name: string;
  idColumnName: string;
  logo: React.ReactNode;
}

const CRM_MAP: Record<string, CRMConfig> = {
  salesforce: {
    name: "Salesforce CRM",
    idColumnName: "SALESFORCE ID",
    logo: <SalesforceLogo />
  },
  hubspot: {
    name: "HubSpot CRM",
    idColumnName: "HUBSPOT ID",
    logo: <img src={hubspotIcon} className="w-12 h-12 object-contain shrink-0" alt="HubSpot" />
  },
  zoho: {
    name: "Zoho CRM",
    idColumnName: "ZOHO ID",
    logo: <img src={zohoIcon} className="w-12 h-12 object-contain shrink-0" alt="Zoho" />
  },
  pipedrive: {
    name: "Pipedrive",
    idColumnName: "PIPEDRIVE ID",
    logo: <img src={pipedriveIcon} className="w-12 h-12 object-contain shrink-0" alt="Pipedrive" />
  },
  copper: {
    name: "Copper CRM",
    idColumnName: "COPPER ID",
    logo: <img src={copperIcon} className="w-12 h-12 object-contain shrink-0" alt="Copper" />
  },
  keap: {
    name: "Keap",
    idColumnName: "KEAP ID",
    logo: <img src={keapIcon} className="w-12 h-12 object-contain shrink-0" alt="Keap" />
  }
};

interface LeadItem {
  id: string;
  date: string;
  name: string;
  email: string;
  company: string;
  status: "New Inquiry" | "Demo Scheduled" | "Contacted";
  crmIdValue: string;
}

const CRMProfile = () => {
  const { crmId } = useParams<{ crmId: string }>();
  const navigate = useNavigate();

  // Default to Salesforce if not found
  const activeCrmId = crmId && CRM_MAP[crmId] ? crmId : "salesforce";
  const crmConfig = CRM_MAP[activeCrmId];

  const [leads, setLeads] = useState<LeadItem[]>([
    { id: "1", date: "12 Jan, 2026", name: "Sophia Miller", email: "sophia.m@gmail.com", company: "CloudScale system", status: "New Inquiry", crmIdValue: "09555834gy94" },
    { id: "2", date: "11 Jan, 2026", name: "Noah Davis", email: "noah03@gmail.com", company: "Global Logistics Inc", status: "New Inquiry", crmIdValue: "09555834gy94" },
    { id: "3", date: "12 Jan, 2026", name: "Liam Anderson", email: "andersonl@gmail.com", company: "CloudScale system", status: "Demo Scheduled", crmIdValue: "09555834gy94" },
    { id: "4", date: "12 Jan, 2026", name: "Mia Thompson", email: "miathom89@gmail.com", company: "Global Logistics Inc", status: "Contacted", crmIdValue: "09555834gy94" },
    { id: "5", date: "11 Jan, 2026", name: "Benjamin Clark", email: "ben02@gmail.com", company: "CloudScale system", status: "Demo Scheduled", crmIdValue: "09555834gy94" },
    { id: "6", date: "11 Jan, 2026", name: "Meera Nair", email: "meera34@gmail.com", company: "CloudScale system", status: "Contacted", crmIdValue: "09555834gy94" },
    { id: "7", date: "12 Jan, 2026", name: "Emma Wilson", email: "emmaw@gmail.com", company: "Global Logistics Inc", status: "Demo Scheduled", crmIdValue: "09555834gy94" },
    { id: "8", date: "11 Jan, 2026", name: "Meera Nair", email: "meera34@gmail.com", company: "CloudScale system", status: "Contacted", crmIdValue: "09555834gy94" }
  ]);

  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const menuDropdownRef = useRef<HTMLDivElement>(null);
  const [syncingLeadId, setSyncingLeadId] = useState<string | null>(null);
  const [stats, setStats] = useState({
    converted: 834,
    duplicate: 234,
    spam: 34
  });
  const [showRowsDropdown, setShowRowsDropdown] = useState(false);
  const rowsDropdownRef = useRef<HTMLDivElement>(null);
  const [selectedLetter, setSelectedLetter] = useState('All');
  const [showAZPopup, setShowAZPopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (rowsDropdownRef.current && !rowsDropdownRef.current.contains(e.target as Node)) {
        setShowRowsDropdown(false);
      }
    };
    if (showRowsDropdown) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showRowsDropdown]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuDropdownRef.current && !menuDropdownRef.current.contains(e.target as Node)) {
        setActiveMenuId(null);
      }
    };
    if (activeMenuId) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [activeMenuId]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setShowAZPopup(false);
      }
    };
    if (showAZPopup) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showAZPopup]);

  const handleMenuClick = (e: React.MouseEvent, leadId: string) => {
    e.stopPropagation();
    if (activeMenuId === leadId) {
      setActiveMenuId(null);
      return;
    }
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setMenuPos({ top: rect.bottom + 5, left: rect.left - 140 });
    setActiveMenuId(leadId);
  };

  const handleSyncLead = (leadId: string) => {
    setActiveMenuId(null);
    setSyncingLeadId(leadId);
    const toastId = toast.loading("Syncing lead with CRM...");
    
    setTimeout(() => {
      setSyncingLeadId(null);
      toast.success("Lead synchronized successfully!", { id: toastId });
    }, 1200);
  };

  const handleMarkAsSpam = (leadId: string) => {
    setActiveMenuId(null);
    setLeads(prev => prev.filter(l => l.id !== leadId));
    setStats(prev => ({ ...prev, spam: prev.spam + 1 }));
    toast.success("Lead marked as spam");
  };

  const handleDeleteLead = (leadId: string) => {
    setActiveMenuId(null);
    setLeads(prev => prev.filter(l => l.id !== leadId));
    toast.success("Lead deleted successfully");
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [leads.length, rowsPerPage, selectedLetter]);

  const filteredLeads = leads.filter(
    (lead) => selectedLetter === 'All' || lead.name.trim().toUpperCase().startsWith(selectedLetter.toUpperCase())
  );
  const totalItems = filteredLeads.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / rowsPerPage));
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedLeads = filteredLeads.slice(startIndex, startIndex + rowsPerPage);

  const toggleSort = () => {
    setSortAsc(!sortAsc);
    setLeads(prev => [...prev].sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (sortAsc) {
        return nameA > nameB ? -1 : 1;
      } else {
        return nameA < nameB ? -1 : 1;
      }
    }));
  };

  const handleExport = () => {
    const headers = ["Date", "Lead Name", "Email", "Company", "Status", crmConfig.idColumnName];
    const csvRows = leads.map(l => [l.date, l.name, l.email, l.company, l.status, l.crmIdValue].join(","));
    const csvContent = [headers.join(","), ...csvRows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${crmConfig.name.replace(/\s+/g, "_")}_leads_export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "New Inquiry":
        return "bg-[#EFF6FF] text-[#1D4ED8] font-medium";
      case "Demo Scheduled":
        return "bg-[#FAF5FF] text-[#7E22CE] font-medium";
      case "Contacted":
        return "bg-[#FFF7ED] text-[#C2410C] font-medium";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getAvatarBgColor = (name: string) => {
    const charCode = name.charCodeAt(0) || 0;
    const colors = [
      "bg-[#EEF2FF] text-[#004370]",
      "bg-[#ECFDF5] text-[#065F46]",
      "bg-[#FFF1D7] text-[#9A3412]",
      "bg-[#FDF2F8] text-[#9D174D]"
    ];
    return colors[charCode % colors.length];
  };

  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
    }
    return name.trim().charAt(0).toUpperCase();
  };

  return (
    <div className="w-full flex flex-col gap-6 md:gap-8 font-['Inter'] min-h-screen lg:mb-0 mb-20">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 pb-6 w-full">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center p-1 rounded-xl transition-all duration-300 hover:bg-[#F1F5F9] text-[#464555] hover:text-[#004370] cursor-pointer group"
          >
            <ChevronLeft size={26} className="transition-transform duration-300 group-hover:-translate-x-1" />
          </button>
          {/* <button
            onClick={() => navigate("/presales/connected-crm")}
            className="p-1 hover:bg-slate-100 rounded-full transition-colors cursor-pointer border-none bg-transparent flex items-center justify-center"
          >
            <ArrowLeft className="w-6 h-6 text-[#0B1C30]" />
          </button> */}

          <div className="flex items-center gap-3">
            {crmConfig.logo}
            <div>
              <h1 className="text-[24px] sm:text-[30px] font-extrabold text-[#0F172A] font-manrope leading-tight">
                {crmConfig.name}
              </h1>
              <p className="text-[13px] sm:text-[14px] text-[#64748B] font-medium font-inter mt-0.5">
                Last sync: 14 minutes ago
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleExport}
          className="flex items-center gap-2 bg-[#004370] hover:bg-[#002d4c] text-white font-bold text-[13px] sm:text-[14px] px-5 py-2.5 rounded-xl cursor-pointer transition-colors shadow-xs"
        >
          <Download size={16} />
          Export
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Converted Leads */}
        <div className="BoxStyle p-6 flex flex-col gap-4 bg-white border border-[#EDF3FD] rounded-2xl relative">
          <div className="flex items-center justify-between w-full">
            <div className="w-9 h-9 rounded-full bg-[#ECFDF5] flex items-center justify-center">
              <Check className="text-[#059669] w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#059669] bg-[#ECFDF5] px-2 py-1 rounded-[6px]">
              +1.5%
            </span>
          </div>
          <div>
            <p className="text-[14px] font-bold text-[#64748B]">Converted Leads</p>
            <h2 className="text-[32px] font-black text-[#0F172A] mt-1">{stats.converted}</h2>
          </div>
        </div>

        {/* Duplicate Leads */}
        <div className="BoxStyle p-6 flex flex-col gap-4 bg-white border border-[#EDF3FD] rounded-2xl">
          <div className="w-9 h-9 rounded-full bg-[#EFF6FF] flex items-center justify-center">
            <Copy className="text-[#1D4ED8] w-5 h-5" />
          </div>
          <div>
            <p className="text-[14px] font-bold text-[#64748B]">Duplicate Leads</p>
            <h2 className="text-[32px] font-black text-[#0F172A] mt-1">{stats.duplicate}</h2>
          </div>
        </div>

        {/* Spam Leads */}
        <div className="BoxStyle p-6 flex flex-col gap-4 bg-white border border-[#EDF3FD] rounded-2xl relative">
          <div className="flex items-center justify-between w-full">
            <div className="w-9 h-9 rounded-full bg-[#FEF2F2] flex items-center justify-center">
              <AlertCircle className="text-[#DC2626] w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#DC2626] bg-[#FEF2F2] px-2.5 py-1 rounded-[6px]">
              Require review
            </span>
          </div>
          <div>
            <p className="text-[14px] font-bold text-[#64748B]">Spam Leads</p>
            <h2 className="text-[32px] font-black text-[#0F172A] mt-1">{stats.spam}</h2>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-2xl border border-[#EDF3FD] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#EDF3FD]">
                <th className="py-4 pl-6 pr-4 text-[12px] font-bold text-[#64748B] uppercase tracking-wider">Date</th>
                <th className="py-4 px-4 text-[12px] font-bold text-[#64748B] uppercase tracking-wider relative">
                  <div className="flex items-center gap-1.5 select-none">
                    <button
                      onClick={toggleSort}
                      className="flex items-center gap-1 bg-transparent border-none font-bold text-[12px] text-[#64748B] hover:text-[#004370] cursor-pointer"
                    >
                      Lead Name
                    </button>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowAZPopup(!showAZPopup);
                      }}
                      className="inline-flex items-center gap-[2px] cursor-pointer hover:bg-slate-50 transition-colors"
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid rgba(234, 243, 255, 0.97)',
                        borderRadius: '5px',
                        padding: '0 5px',
                        height: '18px',
                        fontWeight: 600,
                        fontSize: '10px',
                        lineHeight: '18px',
                        letterSpacing: '0px',
                        textTransform: 'uppercase',
                        color: '#004370',
                      }}
                    >
                      <span>A-Z</span>
                      <span className="text-[8px] leading-none select-none ml-0.5">
                        {selectedLetter !== 'All' ? '▲' : '▼'}
                      </span>
                    </div>
                  </div>

                  {showAZPopup && (
                    <div
                      ref={popupRef}
                      onClick={(e) => e.stopPropagation()}
                      className="absolute top-[42px] left-6 mt-1 z-50 bg-white border border-[#E2E8F0] rounded-[16px] p-1.5 shadow-[0_10px_25px_rgba(0,0,0,0.08)] max-h-[260px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent w-14 flex flex-col items-center gap-0.5"
                    >
                      {['All', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')].map((letter) => (
                        <button
                          key={letter}
                          onClick={() => {
                            setSelectedLetter(letter);
                            setShowAZPopup(false);
                          }}
                          className={`w-10 h-8 shrink-0 flex items-center justify-center text-[13px] font-bold transition-all duration-150 scrollbar-hide no-scrollbar cursor-pointer ${
                            selectedLetter === letter
                              ? 'text-[#004370]'
                              : 'text-[#434655] hover:bg-slate-50 hover:text-[#004370]'
                          }`}
                        >
                          {letter}
                        </button>
                      ))}
                    </div>
                  )}
                </th>
                <th className="py-4 px-4 text-[12px] font-bold text-[#64748B] uppercase tracking-wider">Company</th>
                <th className="py-4 px-4 text-[12px] font-bold text-[#64748B] uppercase tracking-wider">Status</th>
                <th className="py-4 px-4 text-[12px] font-bold text-[#64748B] uppercase tracking-wider">{crmConfig.idColumnName}</th>
                <th className="py-4 pl-4 pr-6 text-[12px] font-bold text-[#64748B] uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDF3FD]">
              {paginatedLeads.length > 0 ? (
                paginatedLeads.map(lead => (
                  <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 pl-6 pr-4 text-[14px] text-[#0F172A] font-medium whitespace-nowrap">{lead.date}</td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-[13px] shrink-0 border border-slate-100 ${getAvatarBgColor(lead.name)}`}>
                          {getInitials(lead.name)}
                        </div>
                        <div>
                          <p className="text-[15px] font-bold text-[#0F172A] leading-tight">{lead.name}</p>
                          <p className="text-[13px] text-[#64748B] mt-0.5 leading-none">{lead.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-[14px] text-[#64748B] font-medium whitespace-nowrap">{lead.company}</td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-[10px] text-[12px] font-semibold tracking-wide ${getStatusStyle(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-[14px] text-[#0F172A] font-medium whitespace-nowrap font-mono">{lead.crmIdValue}</td>
                    <td className="py-4 pl-4 pr-6 text-right whitespace-nowrap text-[#64748B]">
                      <div className="flex items-center justify-end pr-1 gap-2">
                        {syncingLeadId === lead.id ? (
                          <RefreshCw size={16} className="text-[#004370] animate-spin" />
                        ) : (
                          <button
                            onClick={(e) => handleMenuClick(e, lead.id)}
                            className="p-1 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer border-none bg-transparent flex items-center justify-center text-slate-500 hover:text-slate-800"
                          >
                            <MoreVertical size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 text-sm font-medium">
                    No leads matching current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Row */}
        <div className="py-4 px-6 border-t border-[#EDF3FD] flex items-center justify-between flex-wrap gap-4 text-[#64748B] text-[13px] font-medium bg-[#FAFAFA]">
          <div className="flex items-center gap-1">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              className="p-1 hover:bg-slate-100 rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold transition-all ${currentPage === page ? "bg-[#004370] text-white" : "hover:bg-slate-100 cursor-pointer"}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              className="p-1 hover:bg-slate-100 rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="flex items-center gap-2 relative" ref={rowsDropdownRef}>
            <span>Rows per page:</span>
            <button
              onClick={() => setShowRowsDropdown(!showRowsDropdown)}
              className="flex items-center justify-between gap-1.5 border border-[#E2E8F0] px-3 py-1.5 rounded-lg text-[13px] font-semibold text-[#0F365C] hover:bg-slate-50 transition-colors bg-white cursor-pointer"
            >
              <span>{rowsPerPage}</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>
            {showRowsDropdown && (
              <div className="absolute bottom-full right-0 mb-1.5 z-50 bg-white border border-[#E2E8F0] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.08)] py-1 min-w-[70px] flex flex-col">
                {[5, 10, 20, 50].map((val) => (
                  <button
                    key={val}
                    onClick={() => {
                      setRowsPerPage(val);
                      setShowRowsDropdown(false);
                    }}
                    className={`px-3 py-1.5 text-left text-[13px] font-medium transition-colors hover:bg-slate-50 cursor-pointer ${rowsPerPage === val ? 'text-[#0F365C] font-semibold bg-slate-50/50' : 'text-slate-600'
                      }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {activeMenuId && createPortal(
        <div
          ref={menuDropdownRef}
          style={{ position: "fixed", top: menuPos.top, left: menuPos.left, zIndex: 999 }}
          className="bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 w-[160px] animate-in fade-in slide-in-from-top-1 duration-150"
        >
          <button
            onClick={() => handleSyncLead(activeMenuId)}
            className="w-full flex items-center gap-2.5 px-4 py-2 font-inter font-medium text-[13px] text-[#0F172A] hover:bg-slate-50 transition-colors cursor-pointer text-left border-none bg-transparent"
          >
            <RefreshCw size={14} className="text-slate-500" />
            Sync Lead
          </button>
          <button
            onClick={() => handleMarkAsSpam(activeMenuId)}
            className="w-full flex items-center gap-2.5 px-4 py-2 font-inter font-medium text-[13px] text-[#C2410C] hover:bg-orange-50/50 transition-colors cursor-pointer text-left border-none bg-transparent"
          >
            <ShieldAlert size={14} className="text-orange-600" />
            Mark as Spam
          </button>
          <div className="h-px bg-slate-100 my-1"></div>
          <button
            onClick={() => handleDeleteLead(activeMenuId)}
            className="w-full flex items-center gap-2.5 px-4 py-2 font-inter font-medium text-[13px] text-[#DC2626] hover:bg-red-50 transition-colors cursor-pointer text-left border-none bg-transparent"
          >
            <Trash2 size={14} className="text-red-600" />
            Delete Lead
          </button>
        </div>,
        document.body
      )}
    </div>
  );
};

export default CRMProfile;
