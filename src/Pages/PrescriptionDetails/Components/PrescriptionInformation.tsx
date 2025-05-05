import InfoSection from './InfoSection.tsx';
import InfoItem from './InfoItem.tsx';
import type { PrescriptionInformationProps } from '../../../Types/types.ts';
import { formatDate } from '../../../Lib/Utils/dateFormat.ts';

const PrescriptionInformation = ({ prescription, isExpired }: PrescriptionInformationProps) => {
  return (
    <InfoSection title="Prescription Information">
      <InfoItem label="Date Issued" value={formatDate(prescription.dateIssued)} />
      <InfoItem 
        label="Expiry Date" 
        value={`${formatDate(prescription.expiryDate)}${isExpired ? ' (Expired)' : ''}`}
        color={isExpired ? 'error.main' : 'text.primary'}
      />
      <InfoItem label="Remaining Refills" value={String(prescription.remainingRefills)} />
      <InfoItem label="Prescribed By" value={prescription.prescribedBy} />
      <InfoItem label="Pharmacy" value={prescription.pharmacy} />
    </InfoSection>
  );
};

export default PrescriptionInformation; 