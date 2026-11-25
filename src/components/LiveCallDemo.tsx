/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  PhoneCall, 
  Calendar, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface Scenario {
  id: string;
  industry: string;
  title: string;
  agentName: string;
  prospectName: string;
  duration: number; // in seconds
  lines: {
    speaker: 'agent' | 'prospect';
    text: string;
    timestamp: number; // time in seconds when spoken
    sentiment?: 'neutral' | 'objection' | 'overcoming' | 'booked';
  }[];
}

const DEMO_SCENARIOS: Scenario[] = [
  {
    id: 'b2b-saas',
    industry: 'B2B SaaS Cold Outreach',
    title: 'Overcoming Existing Vendor Lock-in & Securing a Demo',
    agentName: 'ayntra Outbound Closer',
    prospectName: 'David Vance (VP Operations)',
    duration: 38,
    lines: [
      {
        speaker: 'agent',
        timestamp: 0,
        text: 'Hey David, this is Ryan over at ayntra. Saw your engineering team expanded to 40 devs last quarter. Quick question: are your team leads still spending 6+ hours weekly triaging support bug reports?',
        sentiment: 'neutral'
      },
      {
        speaker: 'prospect',
        timestamp: 8,
        text: 'Look Ryan, I am literally walking into a board review in 5 minutes. Plus we already have Zendesk and Jira automation dialed in.',
        sentiment: 'objection'
      },
      {
        speaker: 'agent',
        timestamp: 15,
        text: 'Totally respect your time David—definitely do not want to hold you up before the board. We actually sit directly on top of Zendesk to resolve tier-1 logs before they ever hit Jira. Apex cut 35 hours weekly in month one. Would you be open to a quick 9-minute executive teardown this Thursday at 2 PM?',
        sentiment: 'overcoming'
      },
      {
        speaker: 'prospect',
        timestamp: 27,
        text: 'Thursday at 2 PM works. Send the invite to my work email on file.',
        sentiment: 'neutral'
      },
      {
        speaker: 'agent',
        timestamp: 32,
        text: 'Done! Just pushed the Cal.com invite to your calendar and texted you a confirmation. Have a great board review David!',
        sentiment: 'booked'
      }
    ]
  },
  {
    id: 'home-services',
    industry: 'Commercial HVAC & Solar',
    title: 'Inbound Emergency Qualifier & Dispatch Booking',
    agentName: 'ayntra Receptionist',
    prospectName: 'Elena Rostova (Property Manager)',
    duration: 34,
    lines: [
      {
        speaker: 'agent',
        timestamp: 0,
        text: 'Thanks for calling Summit Mechanical, this is Sarah. How can I help you today?',
        sentiment: 'neutral'
      },
      {
        speaker: 'prospect',
        timestamp: 5,
        text: 'Hi Sarah, our main rooftop chiller in Building C is leaking coolant and the floor is heating up fast. Can someone come out today?',
        sentiment: 'objection'
      },
      {
        speaker: 'agent',
        timestamp: 13,
        text: 'I understand Elena—chiller leakage in commercial units is high priority. What is the unit capacity, and is there any electrical warning light flashing?',
        sentiment: 'neutral'
      },
      {
        speaker: 'prospect',
        timestamp: 21,
        text: 'It is a 50-ton Trane unit, amber fault code 4. We need a technician ASAP.',
        sentiment: 'neutral'
      },
      {
        speaker: 'agent',
        timestamp: 26,
        text: 'Understood. I have dispatched emergency tech Marcus arriving between 1:30 PM and 2:00 PM. I just texted your cell the live tracking link. Stay in a cool area and he will call you on arrival.',
        sentiment: 'booked'
      }
    ]
  },
  {
    id: 'real-estate',
    industry: 'High-End Real Estate',
    title: 'Reviving a 90-Day Dormant Luxury Buyer Lead',
    agentName: 'ayntra Follow-Up Closer',
    prospectName: 'Marcus Sterling (Investor)',
    duration: 32,
    lines: [
      {
        speaker: 'agent',
        timestamp: 0,
        text: 'Hi Marcus, Jordan here with Sterling Group. You toured the waterfront penthouse on Marina Blvd back in November. A brand new off-market corner unit just opened in the same tower at $1.8M.',
        sentiment: 'neutral'
      },
      {
        speaker: 'prospect',
        timestamp: 9,
        text: 'Hey Jordan. I actually paused looking because interest rates bumped, and most of those units had ridiculous HOA fees.',
        sentiment: 'objection'
      },
      {
        speaker: 'agent',
        timestamp: 16,
        text: 'Totally fair objection Marcus—HOAs have gotten steep. This specific unit has pre-funded capital reserves with HOA locked at $420/month for 3 years, plus developer rate buydown. Would Friday at 11 AM work for a private walkthrough?',
        sentiment: 'overcoming'
      },
      {
        speaker: 'prospect',
        timestamp: 26,
        text: 'Locked at $420? Wow, that is different. Yes, let us do Friday at 11 AM.',
        sentiment: 'booked'
      }
    ]
  }
];

export const LiveCallDemo: React.FC = () => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('b2b-saas');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [waveBars, setWaveBars] = useState<number[]>(Array(24).fill(16));

  const scenario = DEMO_SCENARIOS.find((s) => s.id === selectedScenarioId) || DEMO_SCENARIOS[0];

  // Playback timer & simulated audio waveform
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= scenario.duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });

        // Waveform bounce
        setWaveBars(
          Array.from({ length: 24 }, () => Math.floor(Math.random() * 38) + 8)
        );
      }, 1000);
    } else {
      setWaveBars(Array(24).fill(10));
    }

    return () => clearInterval(timer);
  }, [isPlaying, scenario.duration]);

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `0${m}:${s < 10 ? `0${s}` : s}`;
  };

  return (
    <section id="live-demo" className="py-24 relative overflow-hidden bg-[#090b11] border-t border-white/[0.08]">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-violet-600/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
            UNFILTERED AUDIO PROOF
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Hear how ayntra handles real prospect objections.
          </h2>
          <p className="text-neutral-400 text-base leading-relaxed">
            Listen to the sub-second conversational rhythm, natural vocal pauses, and dynamic objection handling that closes meetings.
          </p>
        </div>

        {/* Scenario Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {DEMO_SCENARIOS.map((scen) => (
            <button
              key={scen.id}
              onClick={() => {
                setSelectedScenarioId(scen.id);
                setIsPlaying(false);
                setCurrentTime(0);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold font-mono transition-all ${
                selectedScenarioId === scen.id
                  ? 'bg-gradient-to-r from-cyan-500 to-violet-600 text-white shadow-lg shadow-cyan-500/20'
                  : 'bg-neutral-900/80 text-neutral-400 hover:text-white border border-white/[0.08]'
              }`}
            >
              {scen.industry}
            </button>
          ))}
        </div>

        {/* Audio Console & Synced Transcript */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-[#0d0f17] border border-white/[0.1] shadow-2xl shadow-black/80 overflow-hidden">
          {/* Audio Player Controls Header */}
          <div className="p-4 sm:p-6 bg-[#090a10] border-b border-white/[0.08] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block mb-0.5">
                  LIVE OUTBOUND CALL RECORDING
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {scenario.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto text-xs font-mono text-neutral-400">
                <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800">
                  MEETING SECURED
                </span>
                <span>LATENCY: 520ms</span>
              </div>
            </div>

            {/* Scrubber & Play Bar */}
            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={handleTogglePlay}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white flex items-center justify-center shadow-lg shadow-cyan-500/30 active:scale-95 transition shrink-0"
                aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
              </button>

              <button
                onClick={handleReset}
                className="p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-white/[0.06] transition shrink-0"
                title="Restart call recording"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Progress Slider */}
              <div className="flex-1 space-y-1">
                <div className="relative w-full h-2 rounded-full bg-neutral-800 overflow-hidden cursor-pointer"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const pct = clickX / rect.width;
                    setCurrentTime(Math.round(pct * scenario.duration));
                  }}
                >
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-violet-500 transition-all duration-200"
                    style={{ width: `${(currentTime / scenario.duration) * 100}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <span>{formatSeconds(currentTime)}</span>
                  <span>{formatSeconds(scenario.duration)}</span>
                </div>
              </div>

              {/* Waveform visualizer */}
              <div className="hidden md:flex items-center gap-1 h-8 px-3 rounded-xl bg-neutral-950 border border-white/[0.05]">
                {waveBars.map((h, i) => (
                  <div
                    key={i}
                    className="w-1 rounded-full bg-cyan-400/80 transition-all duration-150"
                    style={{ height: `${h}px` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Synced Transcript Stream */}
          <div className="p-6 sm:p-8 space-y-4 max-h-[380px] overflow-y-auto">
            {scenario.lines.map((line, idx) => {
              const isPastOrCurrent = currentTime >= line.timestamp;
              const isCurrent =
                currentTime >= line.timestamp &&
                (idx === scenario.lines.length - 1 || currentTime < scenario.lines[idx + 1].timestamp);

              return (
                <div
                  key={idx}
                  className={`p-4 rounded-xl transition-all duration-300 ${
                    isCurrent
                      ? 'bg-[#121624] border border-cyan-500/40 shadow-lg'
                      : isPastOrCurrent
                      ? 'bg-neutral-900/60 border border-white/[0.06] opacity-90'
                      : 'bg-neutral-900/20 border border-transparent opacity-40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5 text-xs font-mono">
                    <span className={`font-bold flex items-center gap-1.5 ${
                      line.speaker === 'agent' ? 'text-cyan-400' : 'text-violet-400'
                    }`}>
                      {line.speaker === 'agent' ? '🤖 ' + scenario.agentName : '👤 ' + scenario.prospectName}
                    </span>

                    <div className="flex items-center gap-2">
                      {line.sentiment === 'objection' && (
                        <span className="text-[10px] text-amber-400 font-bold">
                          [OBJECTION RAISED]
                        </span>
                      )}
                      {line.sentiment === 'overcoming' && (
                        <span className="text-[10px] text-cyan-400 font-bold">
                          [OBJECTION HANDLED]
                        </span>
                      )}
                      {line.sentiment === 'booked' && (
                        <span className="text-[10px] text-emerald-400 font-bold">
                          [CALENDAR SYNCED]
                        </span>
                      )}
                      <span className="text-neutral-500 text-[11px]">{formatSeconds(line.timestamp)}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                    "{line.text}"
                  </p>
                </div>
              );
            })}
          </div>

          {/* Outcome Footer Banner */}
          <div className="px-6 py-4 bg-[#090b10] border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-neutral-300 font-mono">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Result: Prospect agreed to 9-min executive briefing. Invite sent to David Vance.</span>
            </div>
            <button
              onClick={() => {
                setIsPlaying(true);
                setCurrentTime(0);
              }}
              className="text-cyan-400 hover:text-cyan-300 font-semibold font-mono text-xs flex items-center gap-1"
            >
              <span>Replay Call Sequence</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
