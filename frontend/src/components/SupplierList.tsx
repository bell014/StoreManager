import React, { useState, useEffect } from "react";
import { 
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, 
  Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, 
  useDisclosure, Input, Spinner 
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { fetchSuppliers, createSupplier, deleteSupplier } from "../apiService";

interface Supplier {
  id: number;
  name: string;
  contact: string;
  address: string;
}

export const SupplierList: React.FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalAction, setModalAction] = useState<'add' | 'delete'>('add');
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [newSupplier, setNewSupplier] = useState<Omit<Supplier, 'id'>>({ 
    name: '', 
    contact: '', 
    address: '' 
  });

  const loadSuppliers = async () => {
    try {
      setLoading(true);
      const data = await fetchSuppliers();
      setSuppliers(data);
      setError(null);
    } catch (err) {
      setError("Failed to load suppliers");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSupplier = () => {
    setModalAction('add');
    setNewSupplier({ name: '', contact: '', address: '' });
    onOpen();
  };

  const handleCreateSupplier = async () => {
    try {
      await createSupplier(newSupplier);
      await loadSuppliers();
      onOpenChange();
    } catch (err) {
      setError("Failed to create supplier");
      console.error(err);
    }
  };

  const handleDeleteSupplier = (supplier: Supplier) => {
    setModalAction('delete');
    setSelectedSupplier(supplier);
    onOpen();
  };

  const confirmDelete = async () => {
    if (!selectedSupplier) return;
    try {
      await deleteSupplier(selectedSupplier.id);
      await loadSuppliers();
      onOpenChange();
    } catch (err) {
      setError("Failed to delete supplier");
      console.error(err);
    }
  };

  useEffect(() => {
    loadSuppliers();
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
        <h1 className="text-2xl font-bold">Suppliers</h1>
        <Button color="primary" onPress={handleAddSupplier}>
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
          {suppliers.map((supplier) => (
            <TableRow key={supplier.id}>
              <TableCell>{supplier.name}</TableCell>
              <TableCell>{supplier.contact}</TableCell>
              <TableCell>{supplier.address}</TableCell>
              <TableCell>
                <Button isIconOnly size="sm" variant="light" aria-label="Edit supplier">
                  <Icon icon="lucide:edit" />
                </Button>
                <Button 
                  isIconOnly 
                  size="sm" 
                  variant="light" 
                  color="danger" 
                  aria-label="Delete supplier" 
                  onPress={() => handleDeleteSupplier(supplier)}
                >
                  <Icon icon="lucide:trash" />
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
                {modalAction === 'add' ? 'Add New Supplier' : 'Delete Supplier'}
              </ModalHeader>
              <ModalBody>
                {modalAction === 'add' ? (
                  <div className="space-y-4">
                    <Input
                      label="Name"
                      value={newSupplier.name}
                      onChange={(e) => setNewSupplier({...newSupplier, name: e.target.value})}
                    />
                    <Input
                      label="Contact"
                      value={newSupplier.contact}
                      onChange={(e) => setNewSupplier({...newSupplier, contact: e.target.value})}
                    />
                    <Input
                      label="Address"
                      value={newSupplier.address}
                      onChange={(e) => setNewSupplier({...newSupplier, address: e.target.value})}
                    />
                  </div>
                ) : (
                  <p>Are you sure you want to delete {selectedSupplier?.name}?</p>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button 
                  color={modalAction === 'add' ? 'primary' : 'danger'} 
                  onPress={modalAction === 'add' ? handleCreateSupplier : confirmDelete}
                >
                  {modalAction === 'add' ? 'Add' : 'Delete'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};