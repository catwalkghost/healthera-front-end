import { createApiResolver } from '../../utils/apiResolver';
import type { PrescriptionsApi } from '../../types/Prescription';

import { api as mockApi } from './mockApi';
import { api as realApi } from './realApi';

const api = createApiResolver<PrescriptionsApi>(
  mockApi,
  realApi
);

export const fetchPrescriptions = api.fetchPrescriptions;
export const fetchPrescriptionById = api.fetchPrescriptionById;
export const requestRefill = api.requestRefill; 
