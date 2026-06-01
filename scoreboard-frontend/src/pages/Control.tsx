import { useEffect, useState } from "react";
import { useMatchStore } from "../store/matchStore";
import { formatTime } from "../utils/time";

export default function Control() {
  const {
    localName,
    awayName,
    localScore,
    awayScore,

    timeSeconds,
    startTime,
    setMatch,
  } = useMatchStore();

  const [localTeam, setLocalTeam] = useState(localName);
  const [awayTeam, setAwayTeam] = useState(awayName);
  const [localGoal, setLocalGoal] = useState(localScore);
  const [awayGoal, setAwayGoal] = useState(awayScore);
  const [start, setStart] = useState(startTime);
  const [timeInput, setTimeInput] = useState(formatTime(timeSeconds));

  useEffect(() => {
    setLocalTeam(localName);
  }, [localName]);

  useEffect(() => {
    setAwayTeam(awayName);
  }, [awayName]);

  useEffect(() => {
    setLocalGoal(localScore);
  }, [localScore]);

  useEffect(() => {
    setAwayGoal(awayScore);
  }, [awayScore]);

  useEffect(() => {
    setStart(startTime);
  }, [startTime]);

  useEffect(() => {
    setTimeInput(formatTime(timeSeconds));
  }, [timeSeconds]);

  function applyNames() {
    setMatch({ localName: localTeam, awayName: awayTeam });
  }

  function applyStart() {
    setMatch({ startTime: start });
  }

  function applyScores() {
    setMatch({ localScore: localGoal, awayScore: awayGoal });
  }

  function setTimeFromInput() {
    const parts = timeInput.split(":").map((p) => parseInt(p || "0", 10));
    const seconds = (parts[0] || 0) * 60 + (parts[1] || 0);
    setMatch({ timeSeconds: seconds });
  }

  function setPreset(seconds: number) {
    setMatch({ timeSeconds: seconds });
    setTimeInput(formatTime(seconds));
  }

  function resetMatch() {
    setMatch({
      localScore: 0,
      awayScore: 0,
      period: 1,
      timeSeconds: 0,
    });
    setLocalGoal(0);
    setAwayGoal(0);
    setTimeInput("00:00");
  }

  return (
    <main className="champions-body flex min-h-screen items-start justify-center px-4 py-8 text-white">
      <div className="w-full max-w-md px-4">
        <div className="panel-shell rounded-[1.25rem] p-4">
          <h2 className="champions-display text-lg text-white">Control Panel</h2>

          <div className="mt-4 space-y-4">
            <div>
              <label className="text-sm text-[#c7d4eb]">Local team</label>
              <input
                className="mt-2 w-full rounded-lg bg-black/20 p-3 text-white placeholder:text-white/60"
                value={localTeam}
                onChange={(e) => setLocalTeam(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm text-[#c7d4eb]">Away team</label>
              <input
                className="mt-2 w-full rounded-lg bg-black/20 p-3 text-white placeholder:text-white/60"
                value={awayTeam}
                onChange={(e) => setAwayTeam(e.target.value)}
              />
            </div>

            <div className="flex gap-3">
              <button className="flex-1 rounded-lg bg-[#0b2a66] py-3 font-semibold" onClick={applyNames}>
                Apply names
              </button>
              <button
                className="flex-1 rounded-lg bg-[#0b2a66] py-3 font-semibold"
                onClick={() => setMatch({ localName: "LOCAL", awayName: "AWAY" })}
              >
                Reset names
              </button>
            </div>

            <div>
              <label className="text-sm text-[#c7d4eb]">Start time (HH:MM)</label>
              <input
                className="mt-2 w-full rounded-lg bg-black/20 p-3 text-white placeholder:text-white/60"
                value={start}
                onChange={(e) => setStart(e.target.value)}
              />
              <div className="mt-3 flex gap-3">
                <button className="flex-1 rounded-lg bg-[#0b2a66] py-3 font-semibold" onClick={applyStart}>
                  Set start
                </button>
                <button
                  className="flex-1 rounded-lg bg-[#0b2a66] py-3 font-semibold"
                  onClick={() => setStart(formatTime(0))}
                >
                  Clear
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm text-[#c7d4eb]">Scoreboard time (MM:SS)</label>
              <input
                className="mt-2 w-full rounded-lg bg-black/20 p-3 text-white placeholder:text-white/60"
                value={timeInput}
                onChange={(e) => setTimeInput(e.target.value)}
              />

              <div className="mt-3 grid grid-cols-3 gap-2">
                <button
                  className="rounded-md bg-[#0b2a66] py-2 text-sm font-semibold"
                  onClick={() => setPreset(15 * 60)}
                >
                  15 min
                </button>
                <button
                  className="rounded-md bg-[#0b2a66] py-2 text-sm font-semibold"
                  onClick={() => setPreset(30 * 60)}
                >
                  30 min
                </button>
                <button
                  className="rounded-md bg-[#0b2a66] py-2 text-sm font-semibold"
                  onClick={() => setPreset(60 * 60)}
                >
                  1 h
                </button>
              </div>


              <div className="mt-3 flex gap-3">
                <button className="flex-1 rounded-lg bg-[#0b2a66] py-3 font-semibold" onClick={setTimeFromInput}>
                  Set time
                </button>
                <button className="flex-1 rounded-lg bg-[#0b2a66] py-3 font-semibold" onClick={() => setPreset(0)}>
                  Zero
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm text-[#c7d4eb]">Score control</label>
              <div className="mt-2 flex items-center justify-between gap-3">
                <div className="flex flex-col items-center gap-2">
                  <div className="text-sm text-[#c7d4eb]">Local</div>
                  <div className="score-badge">{localGoal}</div>
                  <div className="mt-2 flex gap-2">
                    <button
                      className="rounded-md bg-[#0b2a66] px-3 py-2"
                      onClick={() => {
                        setLocalGoal((s) => s + 1);
                        setMatch({ localScore: localGoal + 1 });
                      }}
                    >
                      +
                    </button>
                    <button
                      className="rounded-md bg-[#0b2a66] px-3 py-2"
                      onClick={() => {
                        setLocalGoal((s) => Math.max(0, s - 1));
                        setMatch({ localScore: Math.max(0, localGoal - 1) });
                      }}
                    >
                      -
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="text-sm text-[#c7d4eb]">Away</div>
                  <div className="score-badge">{awayGoal}</div>
                  <div className="mt-2 flex gap-2">
                    <button
                      className="rounded-md bg-[#0b2a66] px-3 py-2"
                      onClick={() => {
                        setAwayGoal((s) => s + 1);
                        setMatch({ awayScore: awayGoal + 1 });
                      }}
                    >
                      +
                    </button>
                    <button
                      className="rounded-md bg-[#0b2a66] px-3 py-2"
                      onClick={() => {
                        setAwayGoal((s) => Math.max(0, s - 1));
                        setMatch({ awayScore: Math.max(0, awayGoal - 1) });
                      }}
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex gap-3">
                <button className="flex-1 rounded-lg bg-red-600 py-3 font-semibold" onClick={resetMatch}>
                  Reset Match
                </button>
                <button
                  className="flex-1 rounded-lg bg-[#0b2a66] py-3 font-semibold"
                  onClick={applyScores}
                >
                  Apply Scores
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
