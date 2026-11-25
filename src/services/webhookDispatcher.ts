/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Ayntra Innovation - Production Webhook & Integration Dispatcher
 * Routes structured multimodal inspection JSON to Make.com, Supabase, Google Maps, or custom endpoints.
 */

import { InspectionAuditLogItem, WebhookConfig, WebhookDispatchResult } from '../types/inspection';

export const DEFAULT_WEBHOOK_CONFIG: WebhookConfig = {
  makeWebhookUrl: 'https://hook.us1.make.com/ayntra-field-inspection-bridge',
  makeEnabled: true,
  supabaseUrl: 'https://your-project.supabase.co',
  supabaseAnonKey: 'sb_mock_token_key_here',
  supabaseTable: 'field_inspections',
  supabaseEnabled: true,
  googleMapsApiKey: '',
  googleMapsEnabled: false,
  customWebhookUrl: '',
  customEnabled: false,
  autoDispatchOnCritical: true,
};

export class WebhookDispatcher {
  private config: WebhookConfig;

  constructor(initialConfig?: Partial<WebhookConfig>) {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('ayntra_webhook_config') : null;
    this.config = saved ? { ...DEFAULT_WEBHOOK_CONFIG, ...JSON.parse(saved) } : { ...DEFAULT_WEBHOOK_CONFIG, ...initialConfig };
  }

  public getConfig(): WebhookConfig {
    return { ...this.config };
  }

  public updateConfig(newConfig: Partial<WebhookConfig>): void {
    this.config = { ...this.config, ...newConfig };
    if (typeof window !== 'undefined') {
      localStorage.setItem('ayntra_webhook_config', JSON.stringify(this.config));
    }
  }

  /**
   * Route structured inspection JSON data to all enabled services
   * Standard Function Calling stub for Gemini Live and automated field triggers
   */
  public async dispatchInspectionData(
    auditItem: InspectionAuditLogItem,
    isSimulation = false
  ): Promise<WebhookDispatchResult[]> {
    const dispatches: WebhookDispatchResult[] = [];

    // 1. Dispatch to Make.com (Integromat) Webhook
    if (this.config.makeEnabled && this.config.makeWebhookUrl) {
      const result = await this.dispatchMakeWebhook(auditItem, isSimulation);
      dispatches.push(result);
    }

    // 2. Dispatch to Supabase Table / REST API
    if (this.config.supabaseEnabled && this.config.supabaseUrl) {
      const result = await this.dispatchSupabaseWebhook(auditItem, isSimulation);
      dispatches.push(result);
    }

    // 3. Dispatch to Google Maps Geolocation / Reverse Geocode
    if (this.config.googleMapsEnabled && this.config.googleMapsApiKey) {
      const result = await this.dispatchGoogleMapsGeocoding(auditItem, isSimulation);
      dispatches.push(result);
    }

    // 4. Dispatch to Custom Webhook (e.g. Zapier, AWS Lambda, Slack)
    if (this.config.customEnabled && this.config.customWebhookUrl) {
      const result = await this.dispatchCustomWebhook(auditItem, isSimulation);
      dispatches.push(result);
    }

    return dispatches;
  }

  /**
   * Function Calling Stub: Dispatch to Make.com
   * Make.com receives JSON and triggers automated SMS alerts, PDF reports, or Jira tickets.
   */
  public async dispatchMakeWebhook(
    auditItem: InspectionAuditLogItem,
    isSimulation = false
  ): Promise<WebhookDispatchResult> {
    const endpoint = this.config.makeWebhookUrl;
    const timestamp = new Date().toISOString();

    // If simulating or using placeholder URL, return formatted mock response
    if (isSimulation || endpoint.includes('example.com') || endpoint.includes('ayntra-field-inspection-bridge')) {
      await new Promise((resolve) => setTimeout(resolve, 380)); // Simulate realistic network delay
      return {
        destination: 'MAKE_COM',
        endpoint,
        timestamp,
        status: 'MOCK_SUCCESS',
        statusCode: 200,
        responsePayload: {
          success: true,
          scenarioExecutionId: `make_scen_${Math.floor(Math.random() * 900000 + 100000)}`,
          message: 'Make.com Scenario received field alert payload successfully',
          routedTo: ['Maintenance SMS Gateway', 'Asset Management ERP', 'Incident Ticket System']
        }
      };
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Ayntra-Source': 'Field-Inspector-Mobile-V1'
        },
        body: JSON.stringify({
          event: 'INFRASTRUCTURE_ANOMALY_DETECTED',
          timestamp,
          payload: auditItem
        })
      });

      const responsePayload = await response.json().catch(() => ({ statusText: response.statusText }));
      return {
        destination: 'MAKE_COM',
        endpoint,
        timestamp,
        status: response.ok ? 'SUCCESS' : 'FAILED',
        statusCode: response.status,
        responsePayload,
        error: response.ok ? undefined : `HTTP ${response.status}: ${response.statusText}`
      };
    } catch (err: unknown) {
      return {
        destination: 'MAKE_COM',
        endpoint,
        timestamp,
        status: 'FAILED',
        error: err instanceof Error ? err.message : String(err)
      };
    }
  }

  /**
   * Function Calling Stub: Save to Supabase REST database
   * Inserts the structured audit inspection item into Supabase PostgreSQL table.
   */
  public async dispatchSupabaseWebhook(
    auditItem: InspectionAuditLogItem,
    isSimulation = false
  ): Promise<WebhookDispatchResult> {
    const endpoint = `${this.config.supabaseUrl.replace(/\/$/, '')}/rest/v1/${this.config.supabaseTable || 'inspections'}`;
    const timestamp = new Date().toISOString();

    if (isSimulation || endpoint.includes('your-project') || !this.config.supabaseAnonKey) {
      await new Promise((resolve) => setTimeout(resolve, 450));
      return {
        destination: 'SUPABASE',
        endpoint,
        timestamp,
        status: 'MOCK_SUCCESS',
        statusCode: 201,
        responsePayload: {
          insertedId: auditItem.id,
          status: 'Record upserted in field_inspections table',
          databaseRowId: Math.floor(Math.random() * 8000 + 1000)
        }
      };
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': this.config.supabaseAnonKey,
          'Authorization': `Bearer ${this.config.supabaseAnonKey}`,
          'Prefer': 'return=representation'
        },
        body: JSON.stringify({
          inspection_id: auditItem.id,
          asset_id: auditItem.assetId,
          asset_name: auditItem.assetName,
          severity: auditItem.severity,
          defect_category: auditItem.defectCategory,
          defect_title: auditItem.defectTitle,
          description: auditItem.defectDescription,
          confidence_score: auditItem.confidenceScore,
          recommended_action: auditItem.recommendedAction,
          measurements: auditItem.measurements,
          geolocation: auditItem.geolocation,
          created_at: auditItem.timestamp
        })
      });

      const responsePayload = await response.json().catch(() => ({ statusText: response.statusText }));
      return {
        destination: 'SUPABASE',
        endpoint,
        timestamp,
        status: response.ok ? 'SUCCESS' : 'FAILED',
        statusCode: response.status,
        responsePayload,
        error: response.ok ? undefined : `HTTP ${response.status}: ${response.statusText}`
      };
    } catch (err: unknown) {
      return {
        destination: 'SUPABASE',
        endpoint,
        timestamp,
        status: 'FAILED',
        error: err instanceof Error ? err.message : String(err)
      };
    }
  }

  /**
   * Function Calling Stub: Google Maps Geocoding / Location verification
   */
  public async dispatchGoogleMapsGeocoding(
    auditItem: InspectionAuditLogItem,
    isSimulation = false
  ): Promise<WebhookDispatchResult> {
    const { latitude, longitude } = auditItem.geolocation;
    const endpoint = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${this.config.googleMapsApiKey}`;
    const timestamp = new Date().toISOString();

    if (isSimulation || !this.config.googleMapsApiKey) {
      await new Promise((resolve) => setTimeout(resolve, 250));
      return {
        destination: 'GOOGLE_MAPS',
        endpoint: 'https://maps.googleapis.com/maps/api/geocode/json',
        timestamp,
        status: 'MOCK_SUCCESS',
        statusCode: 200,
        responsePayload: {
          formatted_address: auditItem.geolocation.formattedAddress || 'Simulated Highway Mile Marker 42.1, CA',
          place_id: 'ChIJ7Y_89W1wjoARw1234MockID',
          geometry: { location: { lat: latitude, lng: longitude } }
        }
      };
    }

    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      return {
        destination: 'GOOGLE_MAPS',
        endpoint: 'https://maps.googleapis.com/maps/api/geocode/json',
        timestamp,
        status: data.status === 'OK' ? 'SUCCESS' : 'FAILED',
        statusCode: response.status,
        responsePayload: data,
        error: data.status === 'OK' ? undefined : data.error_message || data.status
      };
    } catch (err: unknown) {
      return {
        destination: 'GOOGLE_MAPS',
        endpoint: 'https://maps.googleapis.com/maps/api/geocode/json',
        timestamp,
        status: 'FAILED',
        error: err instanceof Error ? err.message : String(err)
      };
    }
  }

  /**
   * Custom HTTP Post Webhook (e.g. AWS Lambda, Slack, Webhook.site)
   */
  public async dispatchCustomWebhook(
    auditItem: InspectionAuditLogItem,
    isSimulation = false
  ): Promise<WebhookDispatchResult> {
    const endpoint = this.config.customWebhookUrl;
    const timestamp = new Date().toISOString();

    if (isSimulation || !endpoint) {
      return {
        destination: 'CUSTOM',
        endpoint,
        timestamp,
        status: 'MOCK_SUCCESS',
        statusCode: 200,
        responsePayload: { message: 'Custom webhook mock dispatched' }
      };
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(auditItem)
      });
      return {
        destination: 'CUSTOM',
        endpoint,
        timestamp,
        status: response.ok ? 'SUCCESS' : 'FAILED',
        statusCode: response.status,
        responsePayload: await response.text()
      };
    } catch (err: unknown) {
      return {
        destination: 'CUSTOM',
        endpoint,
        timestamp,
        status: 'FAILED',
        error: err instanceof Error ? err.message : String(err)
      };
    }
  }
}

export const globalWebhookDispatcher = new WebhookDispatcher();
