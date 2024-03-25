import { ActionIcon, Container, Group, Title } from "@mantine/core";
import { EditIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { kysely } from "~/db/kysely";

export const generateStaticParams = async () => {
  return [];
};

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
      <Group justify="space-between">
        <Title>{message.message}</Title>
        <ActionIcon
          component={Link}
          href={`/multi/${params.id}/edit`}
          variant="outline"
        >
          <EditIcon size={16} />
        </ActionIcon>
      </Group>
    </Container>
  );
}
