import React, { useState, useEffect } from "react";
import { 
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, 
  Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, 
  useDisclosure, Input, Spinner 
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { fetchSuppliers, createSupplier, updateSupplier, deleteSupplier } from "../apiService";

interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export const SupplierList: React.FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalAction, setModalAction] = useState<'add' | 'edit' | 'delete'>('add');
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [supplierForm, setSupplierForm] = useState<Omit<Supplier, 'id'>>({ 
    name: '', 
    email: '', 
    phone: '',
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
    setSupplierForm({ name: '', email: '', phone: '', address: '' });
    onOpen();
  };

  const handleEditSupplier = (supplier: Supplier) => {
    setModalAction('edit');
    setSelectedSupplier(supplier);
    setSupplierForm({
      name: supplier.name,
      email: supplier.email,
      phone: supplier.phone,
      address: supplier.address
    });
    onOpen();
  };

  const handleSubmitSupplier = async () => {
    try {
      if (modalAction === 'add') {
        await createSupplier(supplierForm);
      } else if (modalAction === 'edit' && selectedSupplier) {
        await updateSupplier(selectedSupplier.id, supplierForm);
      }
      await loadSuppliers();
      onOpenChange();
    } catch (err) {
      setError(`Failed to ${modalAction} supplier`);
      console.error(err);
    }
  };

  const handleDeleteSupplier = async () => {
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
          <TableColumn>EMAIL</TableColumn>
          <TableColumn>PHONE</TableColumn>
          <TableColumn>ADDRESS</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {suppliers.map((supplier) => (
            <TableRow key={supplier.id}>
              <TableCell>{supplier.name}</TableCell>
              <TableCell>{supplier.email}</TableCell>
              <TableCell>{supplier.phone}</TableCell>
              <TableCell>{supplier.address}</TableCell>
              <TableCell>
                <Button 
                  isIconOnly 
                  size="sm" 
                  variant="light" 
                  aria-label="Edit supplier"
                  onPress={() => handleEditSupplier(supplier)}
                >
                  <Icon icon="lucide:edit" />
                </Button>
                <Button 
                  isIconOnly 
                  size="sm" 
                  variant="light" 
                  color="danger" 
                  aria-label="Delete supplier" 
                  onPress={() => {
                    setSelectedSupplier(supplier);
                    setModalAction('delete');
                    onOpen();
                  }}
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
                {modalAction === 'add' ? 'Add New Supplier' : 
                 modalAction === 'edit' ? 'Edit Supplier' : 'Delete Supplier'}
              </ModalHeader>
              <ModalBody>
                {modalAction !== 'delete' ? (
                  <div className="space-y-4">
                    <Input
                      label="Name"
                      value={supplierForm.name}
                      onChange={(e) => setSupplierForm({...supplierForm, name: e.target.value})}
                    />
                    <Input
                      label="Email"
                      value={supplierForm.email}
                      onChange={(e) => setSupplierForm({...supplierForm, email: e.target.value})}
                    />
                    <Input
                      label="Phone"
                      value={supplierForm.phone}
                      onChange={(e) => setSupplierForm({...supplierForm, phone: e.target.value})}
                    />
                    <Input
                      label="Address"
                      value={supplierForm.address}
                      onChange={(e) => setSupplierForm({...supplierForm, address: e.target.value})}
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
                  color={modalAction === 'delete' ? 'danger' : 'primary'} 
                  onPress={modalAction === 'delete' ? handleDeleteSupplier : handleSubmitSupplier}
                >
                  {modalAction === 'add' ? 'Add' : 
                   modalAction === 'edit' ? 'Update' : 'Delete'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};