import { Plus } from "lucide-react";
import { DialogTrigger } from "../components/ui/dialog.jsx";
import { Separator } from "./ui/separator.jsx";
import { Button } from "../components/ui/button.jsx";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../http/api.js";
import { ViteIcon } from "./ReactIcon.jsx";

export default function Tasks() {
  const { data } = useQuery({
    queryFn: getTasks,
    queryKey: ["tasks"],
    staleTime: 1000 * 60,
  });

  if (!data) {
    return null;
  }

  return (
    <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <ViteIcon />
          <span className="text-lg font-semibold capitalize">Tarefas</span>
        </div>
        <DialogTrigger asChild>
          <Button
            size="sm"
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
         hover:bg-violet-600
         "
          >
            <Plus className="size-4" />
            Cadastrar tarefa
          </Button>
        </DialogTrigger>
      </div>
      <Separator />
      <div className="flex flex-col gap-6">
        <h2 className="font-medium text-lg text-zinc-100">Tarefas</h2>
        <div className="flex flex-col gap-3 space-y-6">
          {data.map((currentElement, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-center border border-dashed border-zinc-400  gap-2 p-4"
              >
                <div className="flex flex-row w-full items-center justify-between space-x-2">
                  <img
                    height={35}
                    width={35}
                    src="https://avatar.iran.liara.run/public"
                    alt="Avatar image"
                  />
                  <div className="flex flex-row w-full justify-between">
                    {currentElement.responsible}
                    <span className="capitalize">{currentElement.status}</span>
                  </div>
                </div>

                <div className="flex flex-row w-full text-zinc-400 justify-start">
                  <p className="text-sm text-zinc-100">
                    {currentElement.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
