import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import {
  BootstrapTable,
  TableHeaderColumn,
} from "@/components/compat/BootstrapTable";

const rows = Array.from({ length: 12 }, (_, index) => ({
  id: `product-${index + 1}`,
  title: index === 0 ? "Walnut Chair" : `Product ${index + 1}`,
  price: index + 1,
}));

describe("BootstrapTable compatibility component", () => {
  it("searches, sorts and paginates rows", async () => {
    const user = userEvent.setup();
    render(
      <BootstrapTable
        data={rows}
        pagination
        search
        options={{ sizePerPage: 10, paginationSize: 5 }}
      >
        <TableHeaderColumn dataField="title" dataSort>
          Title
        </TableHeaderColumn>
        <TableHeaderColumn dataField="price" dataSort>
          Price
        </TableHeaderColumn>
        <TableHeaderColumn dataField="id" isKey>
          ID
        </TableHeaderColumn>
      </BootstrapTable>,
    );

    expect(screen.getByText("Walnut Chair")).toBeInTheDocument();
    expect(screen.queryByText("Product 12")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "2" }));
    expect(screen.getByText("Product 12")).toBeInTheDocument();
    await user.type(screen.getByRole("searchbox"), "Walnut");
    expect(screen.getByText("Walnut Chair")).toBeInTheDocument();
    expect(screen.queryByText("Product 12")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Price" }));
  });
});
