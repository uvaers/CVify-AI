import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { WandSparklesIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { generateProject } from "./action";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateProjectSchema } from "@/lib/validation";
import type { z } from "zod";

type GenerateProjectInput = z.infer<typeof generateProjectSchema>;

interface GenerateProjectButtonProps {
  onProjectGenerated: (project: any) => void;
}

export default function GenerateProjectButton({
  onProjectGenerated,
}: GenerateProjectButtonProps) {
  const [showInputDialog, setShowInputDialog] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        type="button"
        onClick={() => setShowInputDialog(true)}
      >
        <WandSparklesIcon className="size-4" />
        Smart fill (AI)
      </Button>
      <InputDialog
        open={showInputDialog}
        onOpenChange={setShowInputDialog}
        onProjectGenerated={(project) => {
          onProjectGenerated(project);
          setShowInputDialog(false);
        }}
      />
    </>
  );
}

interface InputDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProjectGenerated: (project: any) => void;
}

function InputDialog({
  open,
  onOpenChange,
  onProjectGenerated,
}: InputDialogProps) {
  const { toast } = useToast();

  const form = useForm<GenerateProjectInput>({
    resolver: zodResolver(generateProjectSchema),
    defaultValues: {
      description: "",
    },
  });

  async function onSubmit(input: GenerateProjectInput) {
    try {
      const response = await generateProject(input);
      onProjectGenerated(response);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Something went wrong. Please try again.",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate project</DialogTitle>
          <DialogDescription>
            Describe your project and the AI will generate an optimized entry for
            you.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="E.g. Built a full-stack web application using React and Node.js that helps users track their daily tasks..."
                      autoFocus
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton type="submit" loading={form.formState.isSubmitting}>
              Generate
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}