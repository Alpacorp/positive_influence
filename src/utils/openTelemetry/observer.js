import { ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { DocumentLoadInstrumentation } from '@opentelemetry/instrumentation-document-load';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { UserInteractionInstrumentation } from '@opentelemetry/instrumentation-user-interaction';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request';
// import { BaseOpenTelemetryComponent } from '@opentelemetry/plugin-react-load';
// import { CollectorTraceExporter } from '@opentelemetry/exporter-collector';
// import { diag, DiagConsoleLogger } from '@opentelemetry/api';
// import { Resource } from '@opentelemetry/resources';
// import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

const observer = (serviceName) => {

  const provider = new WebTracerProvider();

  // const fetchInstrumentation = new FetchInstrumentation();

  // const exporter = new CollectorTraceExporter({
  //   url: 'http://localhost:55678/v1/trace',
  // });
  // provider.addSpanProcessor(new SimpleSpanProcessor(exporter));

  provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));

  provider.register({
    contextManager: new ZoneContextManager(),
  });

  // fetchInstrumentation.setTracerProvider(provider);


  registerInstrumentations({
    instrumentations: [
      new FetchInstrumentation({
        ignoreUrls: [/localhost:8090\/sockjs-node/],
        propagateTraceHeaderCorsUrls: [
          'https://cors-test.appspot.com/test',
          'https://httpbin.org/get',
        ],
        clearTimingResources: true,
      }),
      new DocumentLoadInstrumentation(),
      new UserInteractionInstrumentation(),
      new XMLHttpRequestInstrumentation({
        propagateTraceHeaderCorsUrls: ['https://accounts-social-control.herokuapp.com/']
      }),
    ],
  });

  const tracer = provider.getTracer(serviceName);

  return tracer;
};

export default observer;
