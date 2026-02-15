import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { InternalInputErrorMessage } from "..";

describe("InternalInputErrorMessage", () => {
  it("deve renderizar mensagem de erro", () => {
    render(
      <InternalInputErrorMessage>Campo obrigatório</InternalInputErrorMessage>,
    );

    expect(screen.getByText("Campo obrigatório")).toBeInTheDocument();
  });

  it("não deve renderizar nada quando children é undefined", () => {
    const { container } = render(<InternalInputErrorMessage />);

    expect(container.innerHTML).toBe("");
  });

  it("não deve renderizar nada quando children é null", () => {
    const { container } = render(
      <InternalInputErrorMessage>{null}</InternalInputErrorMessage>,
    );

    expect(container.innerHTML).toBe("");
  });
});
