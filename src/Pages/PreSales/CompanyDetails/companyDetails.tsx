import Details from "./sections/details";
import BusinessInformation from "./sections/BusinessInformation";
import AITraining from "./sections/AItraining";
import UploadCompanyData from "./sections/UploadCompanyData";

const CompanyDetails = () => {
    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <div className="flex flex-col gap-8">
                <Details />
                <BusinessInformation />
                <AITraining />
                <UploadCompanyData />
            </div>
        </div>
    );
};

export default CompanyDetails;