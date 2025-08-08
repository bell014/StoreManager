import React, { useState, useEffect } from "react";
import { 
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, 
  Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, 
  useDisclosure, Input, Spinner 
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { fetchProducts, createProduct, deleteProduct } from "../apiService";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  supplierId: number;
}

export const ProductList: React.FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalAction, setModalAction] = useState<'add' | 'delete'>('add');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({ 
    name: '', 
    description: '', 
    price: 0, 
    supplierId: 0 
  });

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError("Failed to load products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = () => {
    setModalAction('add');
    setNewProduct({ name: '', description: '', price: 0, supplierId: 0 });
    onOpen();
  };

  const handleCreateProduct = async () => {
    try {
      await createProduct(newProduct);
      await loadProducts();
      onOpenChange();
    } catch (err) {
      setError("Failed to create product");
      console.error(err);
    }
  };

  const handleDeleteProduct = (product: Product) => {
    setModalAction('delete');
    setSelectedProduct(product);
    onOpen();
  };

  const confirmDelete = async () => {
    if (!selectedProduct) return;
    try {
      await deleteProduct(selectedProduct.id);
      await loadProducts();
      onOpenChange();
    } catch (err) {
      setError("Failed to delete product");
      console.error(err);
    }
  };

  useEffect(() => {
    loadProducts();
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
          <TableColumn>SUPPLIER ID</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>{product.supplierId}</TableCell>
              <TableCell>
                <Button isIconOnly size="sm" variant="light" aria-label="Edit product">
                  <Icon icon="lucide:edit" />
                </Button>
                <Button 
                  isIconOnly 
                  size="sm" 
                  variant="light" 
                  color="danger" 
                  aria-label="Delete product" 
                  onPress={() => handleDeleteProduct(product)}
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
                {modalAction === 'add' ? 'Add New Product' : 'Delete Product'}
              </ModalHeader>
              <ModalBody>
                {modalAction === 'add' ? (
                  <div className="space-y-4">
                    <Input
                      label="Name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    />
                    <Input
                      label="Description"
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    />
                    <Input
                      type="number"
                      label="Price"
                      value={newProduct.price.toString()}
                      onChange={(e) => setNewProduct({...newProduct, price: parseFloat(e.target.value)})}
                    />
                    <Input
                      type="number"
                      label="Supplier ID"
                      value={newProduct.supplierId.toString()}
                      onChange={(e) => setNewProduct({...newProduct, supplierId: parseInt(e.target.value)})}
                    />
                  </div>
                ) : (
                  <p>Are you sure you want to delete {selectedProduct?.name}?</p>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button 
                  color={modalAction === 'add' ? 'primary' : 'danger'} 
                  onPress={modalAction === 'add' ? handleCreateProduct : confirmDelete}
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