import { Container, Stack, Title } from "@mantine/core";

import { CreateMessageForm } from "./create-message-form";

export default async function Page() {
  return (
    <Container>
      <Stack>
        <Title>Create</Title>
        <CreateMessageForm />
      </Stack>
    </Container>
  );
}
