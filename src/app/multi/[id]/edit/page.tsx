import { Container } from "@mantine/core";
import { notFound } from "next/navigation";

import { kysely } from "~/db/kysely";

import { EditMessageForm } from "./edit-message-form";

export default async function Page({ params }: { params: { id: string } }) {
  const message = await kysely
    .selectFrom("messages")
    .selectAll("messages")
    .where("id", "=", parseInt(params.id))
    .executeTakeFirst();

  if (!message) {
    notFound();
  }

  return (
    <Container>
      <EditMessageForm message={message} />
    </Container>
  );
}
