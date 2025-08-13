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
  imageUrl?: string;
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
    supplierId: '',
    imageUrl: undefined
  });
  const [formErrors, setFormErrors] = useState<{name?: string; price?: string; supplierId?: string}>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'carousel'>('list');

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
      const imageInput = document.getElementById('product-image') as HTMLInputElement;
      const imageFile = imageInput?.files?.[0];
      
      if (modalAction === 'add') {
        await createProduct(productForm, imageFile);
      } else if (modalAction === 'edit' && selectedProduct) {
        await updateProduct(selectedProduct.id, productForm, imageFile);
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
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold dark:text-gray-100">Products</h1>
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search products..."
            startContent={<Icon icon="lucide:search" />}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Button
            isIconOnly
            variant="light"
            onPress={() => setViewMode(viewMode === 'list' ? 'carousel' : 'list')}
          >
            <Icon icon={viewMode === 'list' ? 'lucide:layout-grid' : 'lucide:list'} />
          </Button>
          <Button color="primary" onPress={handleAddProduct}>
            <Icon icon="lucide:plus" className="mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      {/* List View */}
      {viewMode === 'list' && (
        <Table aria-label="Products table" removeWrapper>
          <TableHeader>
            <TableColumn>NAME</TableColumn>
            <TableColumn>DESCRIPTION</TableColumn>
            <TableColumn>PRICE</TableColumn>
            <TableColumn>SUPPLIER</TableColumn>
            <TableColumn>ACTIONS</TableColumn>
          </TableHeader>
          <TableBody>
            {products
              .filter(product => 
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((product) => (
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
      )}

      {/* Carousel View */}
      {viewMode === 'carousel' && (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {products
            .filter(product => 
              product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              product.description.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map(product => (
                <div 
                  key={product.id} 
                  className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col"
                >
                  <div className="aspect-square w-full mb-3 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden">
                    {product.imageUrl ? (
                      <img 
                        src={product.imageUrl} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Icon icon="lucide:image" className="w-12 h-12" />
                      </div>
                    )}
                  </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{product.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{product.description}</p>
                <p className="mt-2 font-bold text-gray-900 dark:text-gray-100">${product.price.toFixed(2)}</p>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {suppliers.find(s => s.id === product.supplierId)?.name || product.supplierId}
                </span>
                <div className="flex gap-2 mt-4">
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
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Modal */}
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
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Product Image
                      </label>
                      <input
                        id="product-image"
                        type="file"
                        accept="image/*"
                        className="block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-md file:border-0
                          file:text-sm file:font-semibold
                          file:bg-blue-50 file:text-blue-700
                          hover:file:bg-blue-100"
                      />
                    </div>
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
