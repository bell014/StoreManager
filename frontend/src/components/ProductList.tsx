import React, { useState, useEffect } from "react";
import { 
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, 
  Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, 
  useDisclosure, Input, Spinner, Select, SelectItem 
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { 
  fetchProducts, 
  createProduct, 
  updateProduct,
  deleteProduct,
  fetchSuppliers
} from "../apiService";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  supplierId: string;
}

export const ProductList: React.FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [products, setProducts] = useState<Product[]>([]);
  const [suppliers, setSuppliers] = useState<{id: string, name: string}[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalAction, setModalAction] = useState<'add' | 'edit' | 'delete'>('add');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState<Omit<Product, 'id'>>({ 
    name: '', 
    description: '', 
    price: 0, 
    supplierId: '' 
  });
  const [formErrors, setFormErrors] = useState<{name?: string; price?: string; supplierId?: string}>({});

  const loadData = async () => {
    try {
      setLoading(true);
      const [productsData, suppliersData] = await Promise.all([
        fetchProducts(),
        fetchSuppliers()
      ]);
      setProducts(productsData);
      setSuppliers(suppliersData.map(s => ({id: s.id, name: s.name})));
      setError(null);
    } catch (err) {
      setError("Failed to load data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const errors: typeof formErrors = {};
    if (!productForm.name.trim()) errors.name = "Name is required";
    if (isNaN(productForm.price) || productForm.price <= 0) errors.price = "Price must be greater than 0";
    if (!productForm.supplierId) errors.supplierId = "Supplier is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddProduct = () => {
    setModalAction('add');
    setProductForm({ name: '', description: '', price: 0, supplierId: '' });
    setFormErrors({});
    onOpen();
  };

  const handleEditProduct = (product: Product) => {
    setModalAction('edit');
    setSelectedProduct(product);
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price,
      supplierId: product.supplierId
    });
    setFormErrors({});
    onOpen();
  };

  const handleConfirmDelete = (product: Product) => {
    setModalAction('delete');
    setSelectedProduct(product);
    onOpen();
  };

  const handleSubmitProduct = async () => {
    if (!validateForm()) return;
    try {
      if (modalAction === 'add') {
        await createProduct(productForm);
      } else if (modalAction === 'edit' && selectedProduct) {
        await updateProduct(selectedProduct.id, productForm);
      }
      await loadData();
      onOpenChange();
    } catch (err) {
      setError(`Failed to ${modalAction} product`);
      console.error(err);
    }
  };

  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;
    try {
      await deleteProduct(selectedProduct.id);
      await loadData();
      onOpenChange();
    } catch (err) {
      setError("Failed to delete product");
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
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
          <TableColumn>SUPPLIER</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>{suppliers.find(s => s.id === product.supplierId)?.name || product.supplierId}</TableCell>
              <TableCell>
                <Button 
                  isIconOnly 
                  size="sm" 
                  variant="light" 
                  aria-label="Edit product"
                  onPress={() => handleEditProduct(product)}
                >
                  <Icon icon="lucide:edit" />
                </Button>
                <Button 
                  isIconOnly 
                  size="sm" 
                  variant="light" 
                  color="danger" 
                  aria-label="Delete product" 
                  onPress={() => handleConfirmDelete(product)}
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
              <ModalHeader>
                {modalAction === 'add' ? 'Add New Product' : 
                 modalAction === 'edit' ? 'Edit Product' : 'Delete Product'}
              </ModalHeader>
              <ModalBody>
                {modalAction !== 'delete' ? (
                  <div className="space-y-4">
                    <Input
                      label="Name"
                      value={productForm.name}
                      isInvalid={!!formErrors.name}
                      errorMessage={formErrors.name}
                      onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                    />
                    <Input
                      label="Description"
                      value={productForm.description}
                      onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                    />
                    <Input
                      type="number"
                      label="Price"
                      value={productForm.price.toString()}
                      isInvalid={!!formErrors.price}
                      errorMessage={formErrors.price}
                      onChange={(e) => setProductForm({...productForm, price: parseFloat(e.target.value) || 0})}
                    />
                    <Select
                      label="Supplier"
                      selectedKeys={productForm.supplierId ? [productForm.supplierId] : []}
                      isInvalid={!!formErrors.supplierId}
                      errorMessage={formErrors.supplierId}
                      onChange={(e) => setProductForm({...productForm, supplierId: e.target.value})}
                    >
                      {suppliers.map((supplier) => (
                        <SelectItem key={supplier.id} value={supplier.id}>
                          {supplier.name}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                ) : (
                  <p className="text-red-600 font-semibold">
                    Are you sure you want to delete <strong>{selectedProduct?.name}</strong>?
                  </p>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button 
                  color={modalAction === 'delete' ? 'danger' : 'primary'} 
                  onPress={modalAction === 'delete' ? handleDeleteProduct : handleSubmitProduct}
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
