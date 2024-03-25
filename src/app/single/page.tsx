import { Container, Stack, Title } from "@mantine/core";
import { CreateMessageForm } from "./create-message-form";
import { kysely } from "~/db/kysely";
import { EditMessageForm } from "./edit-message-form";

export default async function Home() {
  const messages = await kysely
    .selectFrom("messages")
    .selectAll("messages")
    .execute();

  return (
    <Container>
      <Stack>
        <Title>Messages</Title>
        <CreateMessageForm />
        <Stack>
          {messages.map((message) => (
            <EditMessageForm key={message.id} message={message} />
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}
