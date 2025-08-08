import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@heroui/react";
import { Icon } from "@iconify/react";

const mockSuppliers = [
  { id: 1, name: "Supplier 1", contact: "John Doe", address: "123 Main St, City, Country" },
  { id: 2, name: "Supplier 2", contact: "Jane Smith", address: "456 Elm St, Town, Country" },
  { id: 3, name: "Supplier 3", contact: "Bob Johnson", address: "789 Oak St, Village, Country" },
];

export const SupplierList: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Suppliers</h1>
        <Button color="primary">
          <Icon icon="lucide:plus" className="mr-2" />
          Add Supplier
        </Button>
      </div>
      <Table aria-label="Suppliers table" removeWrapper>
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>CONTACT</TableColumn>
          <TableColumn>ADDRESS</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {mockSuppliers.map((supplier) => (
            <TableRow key={supplier.id}>
              <TableCell>{supplier.name}</TableCell>
              <TableCell>{supplier.contact}</TableCell>
              <TableCell>{supplier.address}</TableCell>
              <TableCell>
                <Button isIconOnly size="sm" variant="light" aria-label="Edit supplier">
                  <Icon icon="lucide:edit" />
                </Button>
                <Button isIconOnly size="sm" variant="light" color="danger" aria-label="Delete supplier">
                  <Icon icon="lucide:trash" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};