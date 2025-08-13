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
  const [formErrors, setFormErrors] = useState({
    quantity: '',
    location: ''
  });

  const validateForm = () => {
    const errors = {
      quantity: isNaN(editForm.quantity) ? 'Quantity must be a number' :
               editForm.quantity < 0 ? 'Quantity cannot be negative' : '',
      location: !editForm.location ? 'Location is required' : 
               editForm.location.length > 50 ? 'Location must be 50 characters or less' : ''
    };
    setFormErrors(errors);
    return !Object.values(errors).some(error => error !== '');
  };

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
    if (!selectedItem || !validateForm()) return;
    try {
      setLoading(true);
      setError(null);
      await updateInventoryItem(selectedItem.productId, editForm.quantity, editForm.location);
      await loadInventory();
      onOpenChange();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(`Failed to update inventory: ${errorMessage}`);
      console.error(err);
    } finally {
      setLoading(false);
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
                    isInvalid={!!formErrors.quantity}
                    errorMessage={formErrors.quantity}
                    onChange={(e) => {
                      const quantity = parseInt(e.target.value) || 0;
                      setEditForm({...editForm, quantity});
                      setFormErrors({...formErrors, quantity: ''});
                    }}
                  />
                  <Input
                    label="Location"
                    value={editForm.location}
                    isInvalid={!!formErrors.location}
                    errorMessage={formErrors.location}
                    onChange={(e) => {
                      setEditForm({...editForm, location: e.target.value});
                      setFormErrors({...formErrors, location: ''});
                    }}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button 
                  color="primary" 
                  onPress={handleUpdate}
                  isDisabled={!validateForm()}
                >
                  Update
                </Button>
                <div className="text-xs text-gray-500 mt-2">
                  * All fields are required
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};