import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { InternalInput } from "..";

describe("InternalInput - Composição completa", () => {
  it("deve compor Root + Label + Control + ErrorMessage", () => {
    render(
      <InternalInput.Root>
        <InternalInput.Label htmlFor="email" required>
          Email
        </InternalInput.Label>
        <InternalInput.Control id="email" placeholder="seu@email.com" />
        <InternalInput.ErrorMessage>Email inválido</InternalInput.ErrorMessage>
      </InternalInput.Root>,
    );

    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("*")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("seu@email.com")).toBeInTheDocument();
    expect(screen.getByText("Email inválido")).toBeInTheDocument();
  });

  it("deve compor sem erro e sem label (estado mínimo)", () => {
    render(
      <InternalInput.Root>
        <InternalInput.Control placeholder="buscar..." />
      </InternalInput.Root>,
    );

    expect(screen.getByPlaceholderText("buscar...")).toBeInTheDocument();
  });
});
