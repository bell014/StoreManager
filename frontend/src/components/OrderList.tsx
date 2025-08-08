import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";

const mockOrders = [
  { id: 1, customerName: "Alice Johnson", total: 59.98, status: "Pending", date: "2023-05-01" },
  { id: 2, customerName: "Bob Smith", total: 89.97, status: "Shipped", date: "2023-05-02" },
  { id: 3, customerName: "Charlie Brown", total: 39.99, status: "Delivered", date: "2023-05-03" },
];

export const OrderList: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Orders</h1>
        <Button color="primary">
          <Icon icon="lucide:plus" className="mr-2" />
          New Order
        </Button>
      </div>
      <Table aria-label="Orders table" removeWrapper>
        <TableHeader>
          <TableColumn>ORDER ID</TableColumn>
          <TableColumn>CUSTOMER</TableColumn>
          <TableColumn>TOTAL</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>DATE</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {mockOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.customerName}</TableCell>
              <TableCell>${order.total.toFixed(2)}</TableCell>
              <TableCell>
                <Chip color={order.status === "Delivered" ? "success" : order.status === "Shipped" ? "primary" : "warning"}>
                  {order.status}
                </Chip>
              </TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>
                <Button isIconOnly size="sm" variant="light" aria-label="View order details">
                  <Icon icon="lucide:eye" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};