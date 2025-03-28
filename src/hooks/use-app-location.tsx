import { useLocation } from 'react-router';

/* eslint-disable max-len */
export interface LocationWithState extends Location { state: { pathname?: string; from?: string; } }
export const useAppLocation = (): LocationWithState => useLocation() as unknown as LocationWithState;
