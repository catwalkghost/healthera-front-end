import { createApiResolver } from '../../Utils/apiResolver';
import type { PrescriptionsApi } from '../../../Types/types';

import { api as mockApi } from './mockApi.ts';
import { api as realApi } from './realApi.ts';

const api = createApiResolver<PrescriptionsApi>(
  mockApi,
  realApi
);

export const fetchPrescriptions = api.fetchPrescriptions;
export const fetchPrescriptionById = api.fetchPrescriptionById;
export const requestRefill = api.requestRefill; 
