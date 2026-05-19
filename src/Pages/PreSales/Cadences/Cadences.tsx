import React, { useState } from 'react';
import { Pause, Play } from 'lucide-react';
import CadenceList from './sections/CadenceList';
import WorkflowBuilder from './sections/WorkflowBuilder';

export interface Step {
    id: string;
    day: string;
    type: 'email' | 'call' | 'message';
    title: string;
    stats?: string;
    content: string;
    waitTime?: string;
}

export interface Cadence {
    id: string;
    title: string;
    status: 'ACTIVE' | 'PAUSED' | 'DRAFT';
    leadsCount: string;
    stepsCount: number;
    updatedTime: string;
    version: string;
    workflow: Step[];
}

const defaultCadences: Cadence[] = [
    {
        id: '1',
        title: 'Enterprise Q4 Outreach',
        status: 'ACTIVE',
        leadsCount: '12k',
        stepsCount: 6,
        updatedTime: '2h ago',
        version: 'V0.4',
        workflow: [
            {
                id: 's1',
                day: 'DAY 1',
                type: 'email',
                title: 'Initial Value Prop',
                stats: 'OPEN RATE 68%',
                content: '"Hi {{first_name}}, I noticed your recent work with {{company_name}} and..."',
                waitTime: 'Wait 2 Days'
            },
            {
                id: 's2',
                day: 'DAY 4',
                type: 'call',
                title: 'Initial Discovery Call',
                content: 'Refer to the value prop email from Day 1',
                waitTime: undefined
            },
            {
                id: 's3',
                day: 'DAY 5',
                type: 'message',
                title: 'Friendly Follow-up',
                content: 'Multichannel outreach via LinkedIn or WhatsApp',
                waitTime: undefined
            },
            {
                id: 's4',
                day: 'DAY 6',
                type: 'email',
                title: 'Final Break-up Email',
                content: '"Hi {{first_name}}, I haven\'t heard back from you, so I assume..."',
                waitTime: undefined
            }
        ]
    },
    {
        id: '2',
        title: 'BDR Trial Follow-up',
        status: 'PAUSED',
        leadsCount: '45',
        stepsCount: 4,
        updatedTime: '1d ago',
        version: 'V1.0',
        workflow: []
    },
    {
        id: '3',
        title: 'Inbound Reactivation',
        status: 'DRAFT',
        leadsCount: '0',
        stepsCount: 3,
        updatedTime: '3d ago',
        version: 'V0.1',
        workflow: []
    },
    {
        id: '4',
        title: 'EMEA Expansion V2',
        status: 'PAUSED',
        leadsCount: '210',
        stepsCount: 5,
        updatedTime: '1w ago',
        version: 'V2.1',
        workflow: []
    }
];

const Cadences: React.FC = () => {
    const [cadences, setCadences] = useState<Cadence[]>(defaultCadences);
    const [selectedId, setSelectedId] = useState<string>('1');
    const [activeTab, setActiveTab] = useState<'workflow' | 'leads'>('workflow');

    const selectedCadence = cadences.find(c => c.id === selectedId) || cadences[0];

    const toggleStatus = (id: string) => {
        setCadences(prev => prev.map(c => {
            if (c.id === id) {
                const newStatus: 'ACTIVE' | 'PAUSED' = c.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
                return { ...c, status: newStatus };
            }
            return c;
        }));
    };

    const handleAddStep = (stepData: {
        title: string;
        type: 'email' | 'call' | 'message';
        description: string;
        waitDuration: string;
        timeUnit: string;
    }) => {
        setCadences(prev => prev.map(c => {
            if (c.id === selectedId) {
                const lastStep = c.workflow[c.workflow.length - 1];
                let nextDayNum = 1;
                if (lastStep) {
                    const match = lastStep.day.match(/\d+/);
                    if (match) {
                        nextDayNum = parseInt(match[0]) + parseInt(stepData.waitDuration || '1');
                    }
                }

                const updatedWorkflow = [...c.workflow];
                if (updatedWorkflow.length > 0) {
                    updatedWorkflow[updatedWorkflow.length - 1] = {
                        ...updatedWorkflow[updatedWorkflow.length - 1],
                        waitTime: stepData.waitDuration ? `Wait ${stepData.waitDuration} ${stepData.timeUnit}` : undefined
                    };
                }

                const newStep = {
                    id: `s${Date.now()}`,
                    day: `DAY ${nextDayNum}`,
                    type: stepData.type,
                    title: stepData.title,
                    content: stepData.description,
                    waitTime: undefined
                };

                updatedWorkflow.push(newStep);

                return {
                    ...c,
                    workflow: updatedWorkflow,
                    stepsCount: updatedWorkflow.length
                };
            }
            return c;
        }));
    };

    return (
        <div className="flex h-[calc(100vh-5.5rem)] bg-white font-['Manrope'] -mx-6 -mt-6 overflow-hidden">

            <CadenceList
                cadences={cadences}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
            />

            <div className="flex-1 flex flex-col h-full bg-[#F8FAFC]">
                <div className="sticky top-0 z-20 bg-white">
                    <div className="px-8 py-3 border-b border-[#EBEBEB] flex justify-between items-center">
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h1 className="text-[24px] font-bold text-[#0F172A]">{selectedCadence.title}</h1>
                                <span className="text-[12px] font-bold text-[#64748B] bg-[#F1F5F9] px-2 py-0.5 rounded-[2px]">
                                    {selectedCadence.version}
                                </span>
                            </div>
                        </div>
                        <div>
                            <button
                                onClick={() => toggleStatus(selectedCadence.id)}
                                className="px-4 py-2.5 border border-[#E2E8F0] rounded-[12px] bg-white text-[14px] font-bold text-[#0F172A] hover:bg-slate-50 cursor-pointer transition-all flex items-center gap-2 focus:outline-none"
                            >
                                {selectedCadence.status === 'ACTIVE' ? (
                                    <>
                                        <Pause size={16} /> Pause Cadence
                                    </>
                                ) : (
                                    <>
                                        <Play size={16} /> Resume Cadence
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="px-8 flex gap-8 border-b border-[#EBEBEB]">
                        <button
                            onClick={() => setActiveTab('workflow')}
                            className={`py-4 font-normal text-[14px] border-b-2 transition-all cursor-pointer focus:outline-none ${activeTab === 'workflow'
                                ? 'border-[#004370] text-[#004370]'
                                : 'border-transparent text-[#64748B] hover:text-[#1E293B]'
                                }`}
                        >
                            Workflow
                        </button>
                        <button
                            onClick={() => setActiveTab('leads')}
                            className={`py-4 font-normal text-[14px] border-b-2 transition-all cursor-pointer focus:outline-none ${activeTab === 'leads'
                                ? 'border-[#004370] text-[#004370]'
                                : 'border-transparent text-[#64748B] hover:text-[#1E293B]'
                                }`}
                        >
                            Leads
                        </button>
                    </div>
                </div>

                <div className="flex-1 no-scrollbar flex flex-col">

                    <WorkflowBuilder
                        cadence={selectedCadence}
                        onAddStep={handleAddStep}
                    />

                </div>
            </div>
        </div>
    );
};

export default Cadences;
