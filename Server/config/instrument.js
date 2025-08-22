// sentry.js (or wherever you init Sentry)
import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
  dsn: "https://7285d2bdd10c9707c01851ffb93f21fc@o4509887078793216.ingest.us.sentry.io/4509887085608960",   // Replace with your real DSN
  integrations: [
    nodeProfilingIntegration(),
    Sentry.mongooseIntegration()
  ],
  //tracesSampleRate: 1.0,  // Adjust sampling rate for performance traces
});
Sentry.profiler.startProfiler();