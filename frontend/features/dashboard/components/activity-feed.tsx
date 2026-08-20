import { activities } from "../data/dashboard.mock";

export default function ActivityFeed() {
    return (
        <div className="rounded-2xl border border-pulse-line bg-white p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-pulse-ink">
                        Activity Feed
                    </h3>

                    <p className="mt-1 text-sm text-pulse-muted">
                        Recent activity across PulseCRM
                    </p>
                </div>

                <button className="text-sm font-medium text-pulse-teal">
                    View all
                </button>
            </div>

            <div className="mt-6 space-y-5">
                {activities.map((activity) => (
                    <div
                        key={`${activity.title}-${activity.time}`}
                        className="flex gap-4"
                    >
                        <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-pulse-teal" />

                        <div>
                            <p className="text-sm font-semibold text-pulse-ink">
                                {activity.title}
                            </p>

                            <p className="mt-1 text-sm text-pulse-muted">
                                {activity.description}
                            </p>

                            <p className="mt-1 text-xs text-pulse-muted">
                                {activity.time}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}