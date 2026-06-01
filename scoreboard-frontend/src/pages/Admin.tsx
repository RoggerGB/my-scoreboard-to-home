import { useEffect, useState } from "react";
import { useMatchStore } from "../store/matchStore";

export default function Admin() {
  const { localName, awayName, localScore, awayScore, period, startTime, setMatch } =
    useMatchStore();

  const [p, setP] = useState(period);

  useEffect(() => {
    setP(period);
  }, [period]);

  function applyPeriod() {
    setMatch({ period: p });
  }

  function resetToDefaults() {
    setMatch({
      localName: "EQUIPO A",
      awayName: "EQUIPO B",
      localScore: 0,
      awayScore: 0,
      period: 1,
      timeSeconds: 0,
      startTime: "21:00",
    });
  }

  return (
    <main className="champions-body flex min-h-screen items-start justify-center px-4 py-8 text-white">
      <div className="w-full max-w-md px-4">
        <div className="panel-shell rounded-[1.25rem] p-4">
          <h2 className="champions-display text-lg text-white">Admin</h2>

          <div className="mt-4 space-y-4 text-left">
            <div>
              <div className="text-sm text-[#c7d4eb]">Current match</div>
              <div className="mt-2 text-white">
                {localName} {localScore} - {awayScore} {awayName}
              </div>
              <div className="mt-1 text-sm text-[#c7d4eb]">Start: {startTime}</div>
            </div>

            <div>
              <label className="text-sm text-[#c7d4eb]">Period</label>
              <input
                type="number"
                className="mt-2 w-full rounded-lg bg-black/20 p-3 text-white"
                value={p}
                onChange={(e) => setP(parseInt(e.target.value || "1", 10))}
                min={1}
              />
              <div className="mt-3 flex gap-3">
                <button className="flex-1 rounded-lg bg-[#0b2a66] py-3 font-semibold" onClick={applyPeriod}>
                  Apply period
                </button>
                <button className="flex-1 rounded-lg bg-red-600 py-3 font-semibold" onClick={resetToDefaults}>
                  Reset defaults
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}