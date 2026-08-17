import { pipelineStages } from "../data/dashboard.mock";

export default function PipelineOverview() {
    return (
        <div className="rounded-2xl border border-pulse-line bg-white p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-pulse-ink">
                        Sales Pipeline
                    </h3>

                    <p className="mt-1 text-sm text-pulse-muted">
                        Active opportunities by stage
                    </p>
                </div>

                <button className="text-sm font-medium text-pulse-teal">
                    View pipeline
                </button>
            </div>

            <div className="mt-6 space-y-5">
                {pipelineStages.map((stage) => (
                    <div key={stage.name}>
                        <div className="mb-2 flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm font-medium text-pulse-ink">
                                    {stage.name}
                                </p>

                                <p className="text-xs text-pulse-muted">
                                    {stage.deals} opportunities
                                </p>
                            </div>

                            <span className="text-sm font-semibold text-pulse-ink">
                {stage.value}
              </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-pulse-wash">
                            <div
                                className="h-full rounded-full bg-pulse-teal"
                                style={{ width: `${stage.percentage}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}