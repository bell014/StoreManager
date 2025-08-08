import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/react";
import { Icon } from "@iconify/react";

const mockProducts = [
  { id: 1, name: "Product A", description: "Description for Product A", price: 19.99, supplier: "Supplier 1" },
  { id: 2, name: "Product B", description: "Description for Product B", price: 29.99, supplier: "Supplier 2" },
  { id: 3, name: "Product C", description: "Description for Product C", price: 39.99, supplier: "Supplier 3" },
];

export const ProductList: React.FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalAction, setModalAction] = React.useState<'add' | 'delete'>('add');
  const [selectedProduct, setSelectedProduct] = React.useState<string | null>(null);

  const handleAddProduct = () => {
    setModalAction('add');
    onOpen();
  };

  const handleDeleteProduct = (productName: string) => {
    setModalAction('delete');
    setSelectedProduct(productName);
    onOpen();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button color="primary" onPress={handleAddProduct}>
          <Icon icon="lucide:plus" className="mr-2" />
          Add Product
        </Button>
      </div>
      <Table aria-label="Products table" removeWrapper>
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>DESCRIPTION</TableColumn>
          <TableColumn>PRICE</TableColumn>
          <TableColumn>SUPPLIER</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {mockProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>{product.supplier}</TableCell>
              <TableCell>
                <Button isIconOnly size="sm" variant="light" aria-label="Edit product">
                  <Icon icon="lucide:edit" />
                </Button>
                <Button isIconOnly size="sm" variant="light" color="danger" aria-label="Delete product" onPress={() => handleDeleteProduct(product.name)}>
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
                {modalAction === 'add' ? 'Add New Product' : 'Delete Product'}
              </ModalHeader>
              <ModalBody>
                {modalAction === 'add' ? (
                  <p>Form to add a new product will be implemented here.</p>
                ) : (
                  <p>Are you sure you want to delete {selectedProduct}?</p>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color={modalAction === 'add' ? 'primary' : 'danger'} onPress={onClose}>
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