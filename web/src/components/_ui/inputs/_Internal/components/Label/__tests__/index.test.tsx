import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { InternalInputLabel } from "..";

describe("InternalInputLabel", () => {
  it("deve renderizar o texto do label", () => {
    render(<InternalInputLabel>Nome</InternalInputLabel>);

    expect(screen.getByText("Nome")).toBeInTheDocument();
  });

  it("deve associar o label ao input via htmlFor", () => {
    render(<InternalInputLabel htmlFor="meu-input">Nome</InternalInputLabel>);

    const label = screen.getByText("Nome");
    expect(label).toHaveAttribute("for", "meu-input");
  });

  it("deve mostrar indicador de obrigatório quando required=true", () => {
    render(<InternalInputLabel required>Nome</InternalInputLabel>);

    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("não deve mostrar indicador quando required=false", () => {
    render(<InternalInputLabel required={false}>Nome</InternalInputLabel>);

    expect(screen.queryByText("*")).not.toBeInTheDocument();
  });
});
