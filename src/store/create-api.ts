import { buildCreateApi, coreModule } from '@reduxjs/toolkit/query';
import { reactHooksModule } from '@reduxjs/toolkit/query/react';

const createApi = buildCreateApi(
  coreModule(),
  reactHooksModule({ unstable__sideEffectsInRender: true }),
);

export default createApi;
