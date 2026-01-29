import {tasksApiService} from "@/entities/task/api";
import {useQuery} from "@tanstack/react-query";

export function useStat() {

  return useQuery({
    queryKey: ['tasks', 'stats'],
    queryFn: async () => {
      const allTasks = await tasksApiService.getAll()

      const completedTasks = allTasks.filter((task) => task.isCompleted)

      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      const todayTasks = allTasks.filter((task) => {
        const taskDate = new Date(task.createdAt);
        return taskDate >= today && taskDate < tomorrow;
      });

      const weekEnd = new Date(today);
      weekEnd.setDate(today.getDate() + 7);

      const weekTasks = allTasks.filter((task) => {
        const taskDate = new Date(task.createdAt);
        return taskDate >= today && taskDate < weekEnd;
      });


      return {
        allTasks: {name: 'Total', value: allTasks.length},
        completed: {name: 'Completed tasks', value: completedTasks.length},
        todayTasks: {name: 'Today tasks', value: todayTasks.length},
        weekTasks: {name: 'Week tasks', value: weekTasks.length}
      }
    }
  })
}