import React, { useState, useEffect } from "react";
import { 
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, 
  Button, Spinner, Modal, ModalContent, ModalHeader, ModalBody, 
  ModalFooter, useDisclosure, Input 
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { fetchInventory, updateInventoryItem } from "../apiService";

interface InventoryItem {
  productId: string;
  productName: string;
  quantity: number;
  location: string;
  lastUpdated: string;
}

export const InventoryList: React.FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [editForm, setEditForm] = useState<{quantity: number, location: string}>({
    quantity: 0,
    location: ''
  });

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

  const handleEdit = (item: InventoryItem) => {
    setSelectedItem(item);
    setEditForm({
      quantity: item.quantity,
      location: item.location
    });
    onOpen();
  };

  const handleUpdate = async () => {
    if (!selectedItem) return;
    try {
      await updateInventoryItem(selectedItem.productId, editForm.quantity, editForm.location);
      await loadInventory();
      onOpenChange();
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
          <TableColumn>LOCATION</TableColumn>
          <TableColumn>LAST UPDATED</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {inventory.map((item) => (
            <TableRow key={item.productId}>
              <TableCell>{item.productName}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.location}</TableCell>
              <TableCell>{new Date(item.lastUpdated).toLocaleDateString()}</TableCell>
              <TableCell>
                <Button 
                  isIconOnly 
                  size="sm" 
                  variant="light" 
                  aria-label="Edit inventory"
                  onClick={() => handleEdit(item)}
                >
                  <Icon icon="lucide:edit" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Inventory Item
              </ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <Input
                    type="number"
                    label="Quantity"
                    value={editForm.quantity.toString()}
                    onChange={(e) => setEditForm({...editForm, quantity: parseInt(e.target.value)})}
                  />
                  <Input
                    label="Location"
                    value={editForm.location}
                    onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={handleUpdate}>
                  Update
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};