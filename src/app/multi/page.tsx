import {
  ActionIcon,
  Container,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

import { kysely } from "~/db/kysely";

export default async function Home() {
  const messages = await kysely
    .selectFrom("messages")
    .selectAll("messages")
    .execute();

  return (
    <Container>
      <Stack>
        <Group justify="space-between">
          <Title>Messages</Title>
          <ActionIcon component={Link} href="/multi/new" variant="outline">
            <PlusIcon size={16} />
          </ActionIcon>
        </Group>
        <Stack>
          {messages.map((message) => (
            <Paper
              key={message.id}
              component={Link}
              href={`/multi/${message.id}`}
              withBorder
              px="xl"
              py="lg"
            >
              <Text>{message.message}</Text>
            </Paper>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}
