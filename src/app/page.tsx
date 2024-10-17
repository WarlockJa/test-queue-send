import QueueTest from "@/components/QueueTest/QueueTest";
import { q } from "@cf/queue/q";

export const runtime = "edge";

export default async function Home() {
  await q.send("TEST");
  return (
    <main className="flex min-h-screen items-center justify-center">
      <QueueTest />
    </main>
  );
}
