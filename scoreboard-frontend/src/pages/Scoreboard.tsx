import { useMatchStore } from "../store/matchStore";
import { formatTime } from "../utils/time";

function TeamCrest({ name }: { name: string }) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, 2);

  return (
    <div className="scoreboard-crest champions-display text-sm text-white">
      {initials || "FC"}
    </div>
  );
}

export default function Scoreboard() {
  const { localName, awayName, localScore, awayScore, period, timeSeconds } =
    useMatchStore();
  const { startTime } = useMatchStore();

  return (
    <div className="scoreboard-stage champions-body text-white">
      <div className="champions-orbits" />
      <div className="game-start">Hora de Inicio: {startTime}</div>

      <div className="relative flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
        <div className="flex w-full max-w-7xl flex-col items-center justify-center gap-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="scoreboard-logo-wrap">
              <img
                src="/pelota-logo.png"
                alt="Champions style ball logo"
                className="scoreboard-logo-image"
              />
            </div>

            <p className="champions-display text-[0.7rem] tracking-[0.75em] text-white/78 sm:text-xs">
              LIVE MATCH SCORE
            </p>
          </div>

          <div className="scoreboard-bar w-full max-w-6xl rounded-[1.8rem] px-4 py-5 sm:px-6 lg:px-8 lg:py-6">
            {/* Cambiado a 3 columnas simétricas: [Local (flex-1) _ Guion (auto) _ Visitante (flex-1)] */}
            <div className="grid items-center gap-4 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
              {/* 1. EQUIPO LOCAL */}
              <div className="flex items-center justify-center gap-4 lg:justify-end">
                <TeamCrest name={localName} />
                <div className="min-w-0 text-center lg:text-right">
                  <div className="champions-display truncate text-3xl text-white sm:text-4xl lg:text-[3.6rem] xl:text-[4rem]">
                    {localName}
                  </div>
                  <div className="mt-3 score-badge mx-auto lg:mr-0">
                    {localScore}
                  </div>
                </div>
              </div>

              {/* 2. SEPARADOR / SECCIÓN CENTRAL */}
              <div className="champions-display scoreboard-divider text-center text-4xl leading-none sm:text-6xl lg:text-[5rem] px-2">
                -
              </div>

              {/* 3. EQUIPO VISITANTE */}
              <div className="flex items-center justify-center gap-4 lg:justify-start">
                <div className="min-w-0 text-center lg:text-left">
                  <div className="champions-display truncate text-3xl text-white sm:text-4xl lg:text-[3.6rem] xl:text-[4rem]">
                    {awayName}
                  </div>
                  <div className="mt-3 score-badge mx-auto lg:ml-0">
                    {awayScore}
                  </div>
                </div>
                <TeamCrest name={awayName} />
              </div>
            </div>
          </div>

          <p className="champions-display scoreboard-time text-[4.3rem] leading-none text-white sm:text-[6rem] lg:text-[8rem] xl:text-[9.5rem]">
            {formatTime(timeSeconds)}
          </p>

          <div className="champions-display rounded-full border border-white/10 bg-black/20 px-5 py-2 text-xs tracking-[0.42em] text-white/70 sm:text-sm">
            Tiempo {period}
          </div>
        </div>
      </div>
    </div>
  );
}
