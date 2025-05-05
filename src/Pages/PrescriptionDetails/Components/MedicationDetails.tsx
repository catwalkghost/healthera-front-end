import InfoSection from './InfoSection.tsx';
import InfoItem from './InfoItem.tsx';
import type { MedicationDetailsProps } from '../../../Types/types.ts';

const MedicationDetails = ({ prescription }: MedicationDetailsProps) => {
  return (
    <InfoSection title="Medication Details">
      <InfoItem label="Dosage" value={prescription.dosage} />
      <InfoItem 
        label="Type" 
        value={prescription.medicationType} 
        sx={{ textTransform: 'capitalize' }}
      />
      <InfoItem label="Frequency" value={prescription.frequency} />
      <InfoItem label="Instructions" value={prescription.instructions} />
    </InfoSection>
  );
};

export default MedicationDetails; 