import { init as initApm } from '@elastic/apm-rum'
const rum = initApm({

  // Set required service name (allowed characters: a-z, A-Z, 0-9, -, _, and space)
  serviceName: 'positive_influence',

  // Set custom APM Server URL (default: http://localhost:8200)
  serverUrl: 'https://d47442b93cb14e3382ec8f4f8aedd4bf.apm.eastus2.azure.elastic-cloud.com:443',

  // Set the service version (required for source map feature)
  serviceVersion: '1',

  // Set the service environment
  environment: 'production'
});

export default rum;