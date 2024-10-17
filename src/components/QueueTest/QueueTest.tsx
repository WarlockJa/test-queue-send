"use client";
import { Button } from "../ui/button";
import { useAction } from "next-safe-action/hooks";
import { sendQueueMessage } from "./actions";
import { toast } from "@/hooks/use-toast";

export default function QueueTest() {
  const { execute, status } = useAction(sendQueueMessage, {
    onError({ error }) {
      toast({
        title: "Error!",
        description: error.serverError,
        variant: "destructive",
      });
    },

    onSuccess() {
      toast({
        title: "Message sent!",
        description: "Message was sent to the queue",
      });
    },
  });

  return (
    <>
      <Button onClick={() => execute({ message: "123.jpg" })}>
        Send Message
      </Button>
      <Button
        onClick={() =>
          fetch(`${process.env.NEXT_PUBLIC_WORKER_URL!}?key=123.jpg`, {
            headers: new Headers({
              "x-access-key": process.env.NEXT_PUBLIC_ACCESS_KEY!,
            }),
          })
        }
      >
        Send Fetch
      </Button>
    </>
  );
}
