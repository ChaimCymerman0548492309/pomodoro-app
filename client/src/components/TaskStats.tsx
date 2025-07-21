import {
  StatsView,
  StatsGrid,
  StatCard,
  StatNumber,
  StatLabel,
  PriorityChart,
  ChartBar,
  ChartLabel,
  ChartBarInner,
} from "./styles";

type Task = {
  id: number;
  title: string;
  completed: boolean;
  dueDate?: string;
  priority?: "low" | "medium" | "high";
};

type TaskStatsProps = {
  tasks: Task[];
};

function TaskStats({ tasks }: TaskStatsProps) {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;

  return (
    <StatsView>
      <h2>Task Statistics</h2>
      <StatsGrid>
        <StatCard>
          <StatNumber>{tasks.length}</StatNumber>
          <StatLabel>Total Tasks</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{pendingTasks}</StatNumber>
          <StatLabel>Pending</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{completedTasks}</StatNumber>
          <StatLabel>Completed</StatLabel>
        </StatCard>
      </StatsGrid>

      <h3>Priority Distribution</h3>
      <PriorityChart>
        {["high", "medium", "low"].map((priority) => {
          const count = tasks.filter((t) => t.priority === priority).length;
          const percentage =
            tasks.length > 0 ? Math.round((count / tasks.length) * 100) : 0;

          return (
            <ChartBar key={priority}>
              <ChartLabel>{priority}</ChartLabel>
              <ChartBarInner percentage={percentage} priority={priority}>
                {percentage}%
              </ChartBarInner>
            </ChartBar>
          );
        })}
      </PriorityChart>
    </StatsView>
  );
}

export default TaskStats;
