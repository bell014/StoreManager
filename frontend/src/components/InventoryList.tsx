import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@heroui/react";
import { Icon } from "@iconify/react";

const mockInventory = [
  { id: 1, productName: "Product A", quantity: 100, lastUpdated: "2023-05-01" },
  { id: 2, productName: "Product B", quantity: 75, lastUpdated: "2023-05-02" },
  { id: 3, productName: "Product C", quantity: 50, lastUpdated: "2023-05-03" },
];

export const InventoryList: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Inventory</h1>
        <Button color="primary">
          <Icon icon="lucide:refresh-cw" className="mr-2" />
          Update Inventory
        </Button>
      </div>
      <Table aria-label="Inventory table" removeWrapper>
        <TableHeader>
          <TableColumn>PRODUCT</TableColumn>
          <TableColumn>QUANTITY</TableColumn>
          <TableColumn>LAST UPDATED</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {mockInventory.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.productName}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.lastUpdated}</TableCell>
              <TableCell>
                <Button isIconOnly size="sm" variant="light" aria-label="Edit inventory">
                  <Icon icon="lucide:edit" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};