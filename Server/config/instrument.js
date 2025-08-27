// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "../node_modules/@sentry/node/build/types"
import {nodeProfilingIntegration} from "../node_modules/@sentry/profiling-node/build/types";
Sentry.init({
  dsn: "https://1222f684dee4c6e5c3372da10be9c836@o4509887078793216.ingest.us.sentry.io/4509891520233472",

  integrations:[
nodeProfilingIntegration(),
Sentry.mongooseIntegration()
  ],
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
});
Sentry.profiler.startProfiler();

