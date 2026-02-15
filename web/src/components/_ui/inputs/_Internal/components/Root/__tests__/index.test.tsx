import { describe, expect, it } from "vitest";
import { InternalInputRoot } from "..";
import { render, screen } from "@testing-library/react";

describe("InternalInput.Root", () => {
  it("deve renderizar os filhos", () => {
    render(
      <InternalInputRoot>
        <span>conteúdo</span>
      </InternalInputRoot>,
    );

    expect(screen.getByText("conteúdo")).toBeInTheDocument();
  });

  it("deve aceitar className customizada", () => {
    const { container } = render(
      <InternalInputRoot className="custom-class">
        <span>conteúdo</span>
      </InternalInputRoot>,
    );

    expect(container.firstChild).toHaveClass("custom-class");
  });
});
