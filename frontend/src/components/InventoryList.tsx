import React, { useState, useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Spinner } from "@heroui/react";
import { Icon } from "@iconify/react";
import { fetchInventory, updateInventoryItem } from "../apiService";

interface InventoryItem {
  productId: number;
  productName: string;
  quantity: number;
  lastUpdated: string;
}

export const InventoryList: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadInventory = async () => {
    try {
      setLoading(true);
      const data = await fetchInventory();
      setInventory(data);
      setError(null);
    } catch (err) {
      setError("Failed to load inventory");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (productId: number, newQuantity: number) => {
    try {
      await updateInventoryItem(productId, newQuantity);
      await loadInventory();
    } catch (err) {
      setError("Failed to update inventory");
      console.error(err);
    }
  };

  useEffect(() => {
    loadInventory();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Inventory</h1>
        <Button color="primary" onClick={loadInventory}>
          <Icon icon="lucide:refresh-cw" className="mr-2" />
          Refresh Inventory
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
          {inventory.map((item) => (
            <TableRow key={item.productId}>
              <TableCell>{item.productName}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{new Date(item.lastUpdated).toLocaleDateString()}</TableCell>
              <TableCell>
                <Button 
                  isIconOnly 
                  size="sm" 
                  variant="light" 
                  aria-label="Edit inventory"
                  onClick={() => handleUpdate(item.productId, item.quantity + 1)}
                >
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