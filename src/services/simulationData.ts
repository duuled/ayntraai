/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Ayntra Innovation - High-fidelity Infrastructure Inspection Simulation Scenarios
 */

import { InspectionAuditLogItem } from '../types/inspection';

export interface InspectionScenario {
  id: string;
  name: string;
  assetCategory: string;
  voiceTranscript: string;
  aiVoiceReply: string;
  auditItem: InspectionAuditLogItem;
}

export const SIMULATION_SCENARIOS: InspectionScenario[] = [
  {
    id: 'scen-bridge-crack',
    name: 'Interstate 80 Overpass - Pier 4 Shear Crack',
    assetCategory: 'Concrete Highway Bridge',
    voiceTranscript: 'Ayntra, check pier column 4 on the north abutment. Noticing diagonal fissure with rust staining.',
    aiVoiceReply: 'Confirmed shear fissure detected on Pier 4. Estimated aperture 4.2mm with active rebar carbonation. Classified High Severity. Initiating structural alert.',
    auditItem: {
      id: 'AYN-2026-8841',
      assetId: 'I80-BR-04-NORTH',
      assetName: 'I-80 Viaduct North Abutment Pier 4',
      assetCategory: 'Bridge Substructure',
      timestamp: new Date().toISOString(),
      severity: 'HIGH',
      defectCategory: 'CONCRETE_CRACK',
      defectTitle: 'Diagonal Shear Fissure & Rebar Oxidation',
      defectDescription: 'Diagonal shear cracking observed across south-east quadrant of load-bearing concrete pier. Moderate calcification and brown ferric leaching indicate active interior rebar oxidation.',
      confidenceScore: 94.8,
      measurements: {
        estimatedLengthMm: 620,
        estimatedWidthMm: 4.2,
        depthMm: 18,
        corrosionPercentage: 24,
      },
      recommendedAction: 'Schedule Level-2 NDT (Non-Destructive Testing) ultrasound scan within 48 hours; install displacement crack-gauge.',
      inspectorVoicePrompt: 'Ayntra, check pier column 4 on the north abutment. Noticing diagonal fissure with rust staining.',
      aiVisualReasoning: 'Optical inspection matched geometric pattern of 45-degree diagonal shear distress. Leaching pattern verifies moisture penetration into load zone.',
      boundingBoxes: [
        { x: 28, y: 34, width: 44, height: 38, label: 'Shear Crack (4.2mm)', confidence: 0.95 },
        { x: 52, y: 56, width: 16, height: 22, label: 'Ferric Leaching', confidence: 0.91 }
      ],
      geolocation: {
        latitude: 37.7749,
        longitude: -122.4194,
        altitude: 42.5,
        accuracy: 3.2,
        heading: 312,
        formattedAddress: 'I-80 Westbound Mile Marker 4.2, San Francisco, CA'
      },
      webhookDispatches: [
        {
          destination: 'MAKE_COM',
          endpoint: 'https://hook.us1.make.com/inspection-workflow-router',
          timestamp: new Date().toISOString(),
          status: 'MOCK_SUCCESS',
          statusCode: 200,
          responsePayload: { executionId: 'exec_make_78912', status: 'routed_to_bridge_authority' }
        },
        {
          destination: 'SUPABASE',
          endpoint: 'https://your-project.supabase.co/rest/v1/inspections',
          timestamp: new Date().toISOString(),
          status: 'MOCK_SUCCESS',
          statusCode: 201,
          responsePayload: { id: 'AYN-2026-8841', inserted: true }
        }
      ]
    }
  },
  {
    id: 'scen-substation-leak',
    name: '230kV Substation - High-Voltage Transformer Oil Leak',
    assetCategory: 'Power Grid Infrastructure',
    voiceTranscript: 'Scanning main Step-Down Transformer T-02. Radiator flange seal seems wet.',
    aiVoiceReply: 'Critical alert: Dielectric transformer oil seepage confirmed at valve junction B2. Thermal gradient elevated. Immediate maintenance dispatch recommended.',
    auditItem: {
      id: 'AYN-2026-9104',
      assetId: 'SUB-TX-230KV-02',
      assetName: 'Main Substation Step-Down Transformer Unit 2',
      assetCategory: 'High-Voltage Electrical',
      timestamp: new Date().toISOString(),
      severity: 'CRITICAL',
      defectCategory: 'GAS_FLUID_LEAK',
      defectTitle: 'Dielectric Mineral Oil Weepage at Radiator Flange',
      defectDescription: 'Visible fluid dripping along lower secondary radiator header flange. Surface sheen and darkening indicative of degraded gasket seal under thermal pressure.',
      confidenceScore: 98.2,
      measurements: {
        estimatedLengthMm: 140,
        estimatedWidthMm: 80,
        corrosionPercentage: 12,
      },
      recommendedAction: 'IMMEDIATE DISPATCH: Notify regional grid dispatcher for load reroute. Isolate radiator header to prevent catastrophic arcing or oil flash.',
      inspectorVoicePrompt: 'Scanning main Step-Down Transformer T-02. Radiator flange seal seems wet.',
      aiVisualReasoning: 'Reflective fluid pooling detected at flange seam matching dielectric oil viscosity. Oil level sight glass indicates -8% volume degradation.',
      boundingBoxes: [
        { x: 38, y: 45, width: 28, height: 32, label: 'Dielectric Oil Weepage', confidence: 0.98 }
      ],
      geolocation: {
        latitude: 37.8044,
        longitude: -122.2712,
        altitude: 18.2,
        accuracy: 2.1,
        heading: 84,
        formattedAddress: 'Grid Substation Yard 3, Oakland Industrial Corridor, CA'
      },
      webhookDispatches: [
        {
          destination: 'MAKE_COM',
          endpoint: 'https://hook.us1.make.com/inspection-workflow-router',
          timestamp: new Date().toISOString(),
          status: 'MOCK_SUCCESS',
          statusCode: 200,
          responsePayload: { executionId: 'exec_make_critical_991', emergencyPaging: 'DISPATCHED' }
        },
        {
          destination: 'GOOGLE_MAPS',
          endpoint: 'https://maps.googleapis.com/maps/api/geocode/json',
          timestamp: new Date().toISOString(),
          status: 'MOCK_SUCCESS',
          statusCode: 200,
          responsePayload: { geocoded: true, lat: 37.8044, lng: -122.2712 }
        }
      ]
    }
  },
  {
    id: 'scen-pipeline-corrosion',
    name: 'Sector 7 Gas Pipeline - Pitting Corrosion',
    assetCategory: 'Pipeline Distribution',
    voiceTranscript: 'Checking exposed gas line near creek crossing. Surface coating is bubbling.',
    aiVoiceReply: 'Atmospheric pitting corrosion detected. Coating delamination covers approximately 35% of pipe crown. Severity: Medium.',
    auditItem: {
      id: 'AYN-2026-6732',
      assetId: 'PIPE-NATGAS-SEC7',
      assetName: '16-Inch High-Pressure Steel Gas Main',
      assetCategory: 'Gas Pipeline',
      timestamp: new Date().toISOString(),
      severity: 'MEDIUM',
      defectCategory: 'CORROSION_RUST',
      defectTitle: 'Localized Epoxied Coating Blistering & Ferrous Oxidation',
      defectDescription: 'Blistering of polyken wrap and epoxy protective barrier on upper 180 degrees of exposed pipe span. Surface ferric oxide rust scale formed beneath blistered pocket.',
      confidenceScore: 89.4,
      measurements: {
        estimatedLengthMm: 310,
        estimatedWidthMm: 190,
        depthMm: 1.8,
        corrosionPercentage: 35,
      },
      recommendedAction: 'Scrape blister sample, perform ultrasonic wall-thickness measurement (verify minimum yield threshold), apply cold-applied petrolatum wrap.',
      inspectorVoicePrompt: 'Checking exposed gas line near creek crossing. Surface coating is bubbling.',
      aiVisualReasoning: 'Colorimetric analysis confirms Class B oxidation blister. No acoustic hiss or vapor haze detected.',
      boundingBoxes: [
        { x: 30, y: 38, width: 42, height: 35, label: 'Coating Blister & Rust', confidence: 0.90 }
      ],
      geolocation: {
        latitude: 37.8715,
        longitude: -122.2730,
        altitude: 64.0,
        accuracy: 4.0,
        heading: 190,
        formattedAddress: 'Strawberry Creek Pipeline Crossing, Berkeley, CA'
      },
      webhookDispatches: [
        {
          destination: 'SUPABASE',
          endpoint: 'https://your-project.supabase.co/rest/v1/inspections',
          timestamp: new Date().toISOString(),
          status: 'MOCK_SUCCESS',
          statusCode: 201,
          responsePayload: { id: 'AYN-2026-6732', ticketGenerated: true }
        }
      ]
    }
  },
  {
    id: 'scen-telecom-tower',
    name: 'Apex Tower 54 - Guy Wire Turnbuckle Fatigue',
    assetCategory: 'Telecommunications Tower',
    voiceTranscript: 'Inspecting North-West anchor block guy wire turnbuckle tension.',
    aiVoiceReply: 'Anchor Guy Wire turnbuckle verified. Safety safety wire intact, tension within acceptable safety margin (+2%). Condition Nominal.',
    auditItem: {
      id: 'AYN-2026-4421',
      assetId: 'TEL-TWR-APX-54',
      assetName: 'Apex 180ft Guyed Cellular Mast Anchor NW',
      assetCategory: 'Telecom Tower',
      timestamp: new Date().toISOString(),
      severity: 'NOMINAL',
      defectCategory: 'NORMAL_OPERATION',
      defectTitle: 'Guy Wire Anchor Assembly - Pass Inspection',
      defectDescription: 'Turnbuckle galvanized zinc barrier intact. Cotter pins properly double-wrapped. No fraying of stranded wire rope. Mechanical tension within engineered specification.',
      confidenceScore: 97.5,
      measurements: {
        corrosionPercentage: 0,
      },
      recommendedAction: 'Log routine quarterly clearance. Next scheduled service cycle: Q3 2026.',
      inspectorVoicePrompt: 'Inspecting North-West anchor block guy wire turnbuckle tension.',
      aiVisualReasoning: 'Structural geometry alignment within 0.4 degree tolerance. Cotter pin placement validated.',
      boundingBoxes: [
        { x: 35, y: 25, width: 30, height: 50, label: 'Turnbuckle Hardware OK', confidence: 0.98 }
      ],
      geolocation: {
        latitude: 37.8272,
        longitude: -122.2913,
        altitude: 140.0,
        accuracy: 2.8,
        heading: 345,
        formattedAddress: 'Grizzly Peak Telecom Station 54, CA'
      },
      webhookDispatches: [
        {
          destination: 'MAKE_COM',
          endpoint: 'https://hook.us1.make.com/inspection-workflow-router',
          timestamp: new Date().toISOString(),
          status: 'MOCK_SUCCESS',
          statusCode: 200,
          responsePayload: { logged: true, compliancePass: true }
        }
      ]
    }
  }
];
