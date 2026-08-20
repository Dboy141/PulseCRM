import { pipelineStages } from "../data/dashboard.mock";

export default function PipelineOverview() {
    return (
        <section className="rounded-2xl border border-[#e1e6ef] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <h3 className="text-[15px] font-bold text-[#202533]">
                Sales Pipeline
            </h3>

            <div className="mt-5 flex items-center gap-6">
                <div className="relative flex h-[156px] w-[156px] shrink-0 items-center justify-center rounded-full bg-[#edf0f6]">
                    <div
                        className="absolute inset-0 rounded-full"
                        style={{
                            background:
                                "conic-gradient(#755cff 0 2deg,#0aa2a1 2deg 5deg,#c87500 5deg 7deg,#15996a 7deg 10deg,transparent 10deg 86deg,#755cff 86deg 88deg,#4f6eff 88deg 91deg,#0aa2a1 91deg 94deg,#15996a 94deg 97deg,transparent 97deg 178deg,#0aa2a1 178deg 181deg,#c87500 181deg 184deg,#15996a 184deg 187deg,transparent 187deg 268deg,#755cff 268deg 271deg,#4f6eff 271deg 274deg,#0aa2a1 274deg 277deg,#c87500 277deg 280deg,transparent 280deg 360deg)",
                        }}
                    />

                    <div className="relative flex h-[116px] w-[116px] flex-col items-center justify-center rounded-full bg-white">
                        <p className="text-[20px] font-extrabold tracking-[-0.04em] text-[#242938]">
                            ₦128,450
                        </p>

                        <p className="mt-1 text-[10px] text-[#9aa2b4]">
                            Total Pipeline
                        </p>
                    </div>
                </div>

                <div className="min-w-0 flex-1 space-y-3">
                    {pipelineStages.map((stage) => (
                        <div
                            key={stage.name}
                            className="grid grid-cols-[10px_minmax(0,1fr)_72px_36px] items-center gap-2 text-[11px]"
                        >
              <span
                  className="h-2 w-2 rounded-full"
                  style={{
                      backgroundColor:
                      stage.color,
                  }}
              />

                            <span className="font-medium text-[#6d7690]">
                {stage.name}
              </span>

                            <span className="text-right font-bold text-[#242938]">
                {stage.value}
              </span>

                            <span className="text-right text-[#a0a8ba]">
                ({stage.percentage})
              </span>
                        </div>
                    ))}
                </div>
            </div>

            <button
                type="button"
                className="mt-6 w-full rounded-xl bg-[#eef1ff] py-3 text-xs font-bold text-[#4f6eff]"
            >
                View Pipeline
            </button>
        </section>
    );
}