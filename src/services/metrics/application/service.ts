import { Service } from 'typedi';
import * as prometheusMetric from 'prom-client';

const prometheusMetricRegistry = new prometheusMetric.Registry();

const gauge = new prometheusMetric.Gauge({
    name: 'gauge',
    help: 'gauge tet',
    labelNames: ['name'],
});
prometheusMetricRegistry.registerMetric(gauge);

@Service()
class MetricService {
  async getMetrics() {
    gauge.set({ name: 'ee1' }, 3);
    gauge.set({ name: 'ee2' }, 3);
    gauge.set({ name: 'ee3' }, 3);
    return await prometheusMetricRegistry.metrics();
  }

  set(value: number) {
    gauge.set({ name: 'ee' }, value);
  }
}

export {MetricService};