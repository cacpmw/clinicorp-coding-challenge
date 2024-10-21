import { DialogTrigger } from "./ui/dialog";
import { Plus } from "lucide-react";

export function EmptyTasks() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8">
      <p className="">
        Você ainda não cadastrou nenhuma tarefa, que tal cadastrar um agora
        mesmo?
      </p>
      <DialogTrigger asChild>
        <button
          type="button"
          className="bg-violet-500
         text-violet-50
         px-4 py-2.5
         rounded-lg
         flex
         gap-2
         items-center
         text-sm
         font-medium
         tracking-tight
         hover:bg-violet-600"
        >
          <Plus className="size-4" />
          Cadastrar Tarefa
        </button>
      </DialogTrigger>
    </div>
  );
}
