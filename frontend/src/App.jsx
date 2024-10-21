import { useQuery } from "@tanstack/react-query";
import { getTasks } from "./http/api";
import Tasks from "./components/Tasks";
import { Dialog } from "./components/ui/dialog";
import { CreateTaskDialog } from "./components/CreateTaskDialog";
import { EmptyTasks } from "./components/EmptyTasks";

function App() {
  const { data, isLoading } = useQuery({
    queryFn: getTasks,
    queryKey: ["tasks"],
    staleTime: 1000 * 60,
  });
  return (
    <Dialog>
      {isLoading || data?.length > 0 ? <Tasks /> : <EmptyTasks />}

      <CreateTaskDialog />
    </Dialog>
  );
}

export default App;
