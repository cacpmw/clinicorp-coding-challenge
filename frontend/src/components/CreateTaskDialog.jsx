import { X } from "lucide-react";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

import { Button } from "./ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postNewTask } from "../http/api";
import { useQueryClient } from "@tanstack/react-query";

const createTaskForm = z.object({
  responsible: z
    .string({ required_error: "Campo Obrigatorio" })
    .refine((input) => {
      return input.length > 0;
    }, "Campo Obrigatorio"),
  description: z
    .string({ required_error: "Campo Obrigatorio" })
    .refine((input) => {
      return input.length > 0;
    }, "Campo Obrigatorio"),
  status: z.string({ required_error: "Campo Obrigatorio" }).refine((input) => {
    return input.length > 0;
  }, "Campo Obrigatorio"),
});

export function CreateTaskDialog() {
  const queryClient = useQueryClient();

  async function handleCreateTask(newTaskPayload) {
    newTaskPayload["computer"] = window.location.hostname;

    await postNewTask(newTaskPayload);
    await queryClient.invalidateQueries({ queryKey: ["tasks"] }); //refetches data
    await queryClient.refetchQueries({ queryKey: ["tasks"] });
    reset();
  }
  const { register, handleSubmit, formState, reset } = useForm({
    resolver: zodResolver(createTaskForm),
  });

  return (
    <DialogContent>
      <div className="flex flex-col gap-6 h-full">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <DialogTitle>Cadastrar Tarefa</DialogTitle>
            <DialogClose>
              <X className="text-zinc-50" />
            </DialogClose>
          </div>
          <DialogDescription>
            Adicione uma tarefa para ser realizada por um membro do time
          </DialogDescription>
        </div>
        <form
          onSubmit={handleSubmit(handleCreateTask)}
          action=""
          className="flex-1 flex flex-col justify-between"
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Qual terafa deseja realizar?</Label>
              <Input
                autoFocus
                placeholder="Enviar email..."
                {...register("description")}
              />
              {formState.errors.description && (
                <p className="text-sm text-red-400">
                  {formState.errors.description.message}
                </p>
              )}
              <Label htmlFor="responsible">Quem sera responsavel</Label>
              <Input
                placeholder="Bruno, Carlos etc"
                {...register("responsible")}
              />
              {formState.errors.responsible && (
                <p className="text-sm text-red-400">
                  {formState.errors.responsible.message}
                </p>
              )}
              <Label htmlFor="status">Quem sera responsavel</Label>
              <Input
                placeholder="Waiting, Doing, Done"
                {...register("status")}
              />
              {formState.errors.status && (
                <p className="text-sm text-red-400">
                  {formState.errors.status.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2"></div>
          </div>

          <div className="flex items-center gap-3">
            <DialogClose asChild>
              <Button type="button" className="flex-1" variant="secondary">
                Fechar
              </Button>
            </DialogClose>
            <Button className="flex-1" variant="primary">
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </DialogContent>
  );
}
