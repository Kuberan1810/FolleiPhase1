import React, { useState, useRef } from 'react';
import Step1 from '../CampaignCreationSteps/Step1';
import Step2 from '../CampaignCreationSteps/Step2';
import Step3 from '../CampaignCreationSteps/Step3';

const CampaignCreation = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedChannels, setSelectedChannels] = useState<string[]>(['email']);
  const [selectedAudience, setSelectedAudience] = useState<string>('hot-leads');

  // Step 2 States
  const [subject, setSubject] = useState("Expanding {{company}}'s market reach");
  const [emailBody, setEmailBody] = useState(`Hi {{first_name}},\n\nYour skin `);
  const [ctaEnabled, setCtaEnabled] = useState(true);
  const [attachments, setAttachments] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Step 3 States
  const [scheduleType, setScheduleType] = useState('send-now');
  const [launchDate, setLaunchDate] = useState<Date>(new Date('2026-10-24T09:30:00'));
  const [launchTime, setLaunchTime] = useState<Date>(new Date('2026-10-24T09:30:00'));
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

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1
            selectedChannels={selectedChannels}
            setSelectedChannels={setSelectedChannels}
            selectedAudience={selectedAudience}
            setSelectedAudience={setSelectedAudience}
            onNext={() => setCurrentStep(2)}
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
            onBack={() => setCurrentStep(1)}
            onNext={() => setCurrentStep(3)}
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
            onBack={() => setCurrentStep(2)}
            onLaunch={() => console.log('Campaign Launched!')}
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
          <h1 className="text-[28px] md:text-[36px] font-extrabold text-[#001E40] leading-tight tracking-[-0.9px] font-manrope mb-2">Campaign Creation</h1>
          <p className="text-[#43474F] text-[14px] md:text-[16px] font-normal leading-relaxed tracking-[0px] font-manrope">Define your campaign's core identity and communication channels.</p>
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

export default CampaignCreation;
