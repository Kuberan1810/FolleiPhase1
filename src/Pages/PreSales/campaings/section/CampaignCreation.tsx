import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Step1 from '../CampaignCreationSteps/Step1';
import Step2 from '../CampaignCreationSteps/Step2';
import Step3 from '../CampaignCreationSteps/Step3';
import { campaigns } from '../campaignData';
import { ArrowLeft } from 'iconsax-react';

const CampaignCreations = () => {
  const navigate = useNavigate();
  const { stepId } = useParams();
  const currentStep = Number(stepId) || 1;

  useEffect(() => {
    if (stepId !== undefined && !['1', '2', '3'].includes(stepId)) {
      navigate('/presales/campaigns/create/step/1', { replace: true });
    }
  }, [stepId, navigate]);

  // Step 1 States
  const [selectedChannels, setSelectedChannels] = useState<string[]>(['email']);
  const [selectedAudience, setSelectedAudience] = useState<string>('hot-leads');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [logo, setLogo] = useState<string | null>(null);

  // Step 2 States
  const [subject, setSubject] = useState("Expanding [company] 's market reach");
  const [emailBody, setEmailBody] = useState(
    `Hi [first_name],<br><br>Your skin deserves the best care, and we're here to make it simple ✨<br><br>At Company's name, we create skincare products that are gentle, effective, and designed for real results. From deep hydration to clear, radiant skin, our formulas are made to support your everyday routine.<br><br>Discover what works best for you and start your glow journey today.<br><br>Best,<br>Company's name Team`
  );
  const [ctaEnabled, setCtaEnabled] = useState(true);
  const [attachments, setAttachments] = useState<string[]>([
    ""
  ]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getTomorrowAt1030 = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 30, 0, 0);
    return tomorrow;
  };

  // Step 3 States
  const [scheduleType, setScheduleType] = useState('schedule-later');
  const [launchDate, setLaunchDate] = useState<Date>(getTomorrowAt1030());
  const [launchTime, setLaunchTime] = useState<Date>(getTomorrowAt1030());
  const [autoResponseEnabled, setAutoResponseEnabled] = useState(true);
  const [intentTrackingEnabled, setIntentTrackingEnabled] = useState(true);
  const [followUpTiming, setFollowUpTiming] = useState('3 days after initial contact');

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAttachments(prev => [...prev, url]);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const saveDraft = () => {
    const draft = {
      id: crypto.randomUUID(),
      name: name || "Untitled Campaign",
      description,
      selectedChannels,
      selectedAudience,
      logo,
      subject,
      emailBody,
      ctaEnabled,
      attachments,
      scheduleType,
      launchDate,
      launchTime,
      autoResponseEnabled,
      intentTrackingEnabled,
      followUpTiming,
      savedAt: new Date().toISOString(),
      currentStep
    };

    try {
      const stored = localStorage.getItem("campaign_drafts");
      const drafts = stored ? JSON.parse(stored) : [];
      drafts.push(draft);
      localStorage.setItem("campaign_drafts", JSON.stringify(drafts));
    } catch (e) {
      console.error("Failed to save draft", e);
    }

    navigate('/presales/campaigns/drafts');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1
            selectedChannels={selectedChannels}
            setSelectedChannels={setSelectedChannels}
            selectedAudience={selectedAudience}
            setSelectedAudience={setSelectedAudience}
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            logo={logo}
            setLogo={setLogo}
            onNext={() => navigate('/presales/campaigns/create/step/2')}
            onCancel={() => navigate('/presales/campaigns')}
          />
        );
      case 2:
        return (
          <Step2
            subject={subject}
            setSubject={setSubject}
            emailBody={emailBody}
            setEmailBody={setEmailBody}
            attachments={attachments}
            setAttachments={setAttachments}
            ctaEnabled={ctaEnabled}
            setCtaEnabled={setCtaEnabled}
            fileInputRef={fileInputRef}
            handleUpload={handleUpload}
            triggerUpload={triggerUpload}
            onBack={() => navigate('/presales/campaigns/create/step/1')}
            onNext={() => navigate('/presales/campaigns/create/step/3')}
          />
        );
      case 3:
        return (
          <Step3
            scheduleType={scheduleType}
            setScheduleType={setScheduleType}
            launchDate={launchDate}
            setLaunchDate={setLaunchDate}
            launchTime={launchTime}
            setLaunchTime={setLaunchTime}
            autoResponseEnabled={autoResponseEnabled}
            setAutoResponseEnabled={setAutoResponseEnabled}
            intentTrackingEnabled={intentTrackingEnabled}
            setIntentTrackingEnabled={setIntentTrackingEnabled}
            followUpTiming={followUpTiming}
            setFollowUpTiming={setFollowUpTiming}
            onBack={() => navigate('/presales/campaigns/create/step/2')}
            onLaunch={() => {
              const newCampaign = {
                id: campaigns.length + 1,
                name: name.trim() || "Untitled Campaign",
                date: scheduleType === 'send-now'
                  ? `Started ${new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}`
                  : `Scheduled for ${launchDate.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}`,
                channels: selectedChannels.map(ch => {
                  if (ch === 'email') return 'mail';
                  if (ch === 'sms') return 'phone';
                  return ch;
                }),
                status: 'ACTIVE',
                statusColor: 'bg-[#DEFFE9] text-[#004F1A]',
                sent: '0',
                replies: '0',
                converted: '0',
                iconBg: 'bg-purple-100'
              };
              campaigns.unshift(newCampaign);
              console.log('Campaign Launched!', newCampaign);
              navigate('/presales/campaigns');
            }}
            onSaveDraft={saveDraft}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full font-manrope animate-in fade-in duration-500">
      {/* Header & Stepper */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 md:mb-12 gap-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={() => navigate(-1)}
              className="text-[#0B1C30] cursor-pointer flex items-center justify-center p-0.5 hover:opacity-85 transition-opacity"
            >
              <ArrowLeft size={28} strokeWidth={2.5} color='#0B1C30' />
            </button>

            <h1 className="text-[28px] md:text-[36px] font-extrabold text-[#001E40] leading-tight tracking-[-0.9px] font-manrope">
              Campaign Creation
            </h1>
          </div>

          <p className="text-[#43474F] text-[14px] md:text-[16px] font-normal leading-relaxed tracking-[0px] font-manrope">
            Define your campaign's core identity and communication channels.
          </p>
        </div>
        <div className="flex items-center gap-4">
          {[1, 2, 3].map((step) => (
            <React.Fragment key={step}>
              <div
                className={`w-[32px] h-[32px] rounded-[12px] flex items-center justify-center text-[14px] font-bold transition-all duration-300 ${currentStep === step
                  ? 'bg-[#004370] text-white border border-[#004370]'
                  : currentStep > step
                    ? 'bg-[#004370] text-white'
                    : 'bg-[#E5ECF1] text-[#94A3B8]'
                  }`}
              >
                {step}
              </div>
              {step < 3 && (
                <div className={`w-[32px] h-[2px] rounded-full transition-all duration-300 ${currentStep > step ? 'bg-[#004370]' : 'bg-[#E5ECF1]'
                  }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {renderStep()}
    </div>
  );
};

export default CampaignCreations;
