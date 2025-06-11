export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Performance monitoring
    const { performance } = await import('perf_hooks');
    
    // Log startup metrics
    const startupTime = performance.now();
    console.log(`[Performance] Server startup time: ${startupTime.toFixed(2)}ms`);
    
    // You can add more instrumentation here:
    // - Error tracking (Sentry, etc.)
    // - APM (Application Performance Monitoring)
    // - Custom metrics collection
  }
}