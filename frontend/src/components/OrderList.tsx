import React, { useState, useEffect } from "react";
import { 
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, 
  Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, 
  useDisclosure, Spinner, Select, SelectItem 
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { fetchOrders, createOrder, deleteOrder, fetchSuppliers, fetchProducts } from "../apiService";

interface Order {
  id: number;
  orderDate: string;
  supplierId: number;
  items: number[];
}

interface Supplier {
  id: number;
  name: string;
  contact: string;
  address: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  supplierId: number;
}

export const OrderList: React.FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [orders, setOrders] = useState<Order[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalAction, setModalAction] = useState<'add' | 'delete'>('add');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [newOrder, setNewOrder] = useState<Omit<Order, 'id'>>({ 
    supplierId: 0,
    items: []
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const [ordersData, suppliersData, productsData] = await Promise.all([
        fetchOrders(),
        fetchSuppliers(),
        fetchProducts()
      ]);
      setOrders(ordersData);
      setSuppliers(suppliersData);
      setProducts(productsData);
      setError(null);
    } catch (err) {
      setError("Failed to load data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrder = () => {
    setModalAction('add');
    setNewOrder({ supplierId: 0, items: [] });
    onOpen();
  };

  const handleCreateOrder = async () => {
    try {
      await createOrder(newOrder);
      await loadData();
      onOpenChange();
    } catch (err) {
      setError("Failed to create order");
      console.error(err);
    }
  };

  const handleDeleteOrder = (order: Order) => {
    setModalAction('delete');
    setSelectedOrder(order);
    onOpen();
  };

  const confirmDelete = async () => {
    if (!selectedOrder) return;
    try {
      await deleteOrder(selectedOrder.id);
      await loadData();
      onOpenChange();
    } catch (err) {
      setError("Failed to delete order");
      console.error(err);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleSupplierChange = (keys: Set<string>) => {
    const selectedKey = Array.from(keys)[0];
    setNewOrder({...newOrder, supplierId: parseInt(selectedKey)});
  };

  const handleProductsChange = (keys: Set<string>) => {
    setNewOrder({...newOrder, items: Array.from(keys).map(Number)});
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
        <h1 className="text-2xl font-bold">Orders</h1>
        <Button color="primary" onPress={handleAddOrder}>
          <Icon icon="lucide:plus" className="mr-2" />
          New Order
        </Button>
      </div>
      <Table aria-label="Orders table" removeWrapper>
        <TableHeader>
          <TableColumn>ORDER ID</TableColumn>
          <TableColumn>SUPPLIER</TableColumn>
          <TableColumn>ITEMS COUNT</TableColumn>
          <TableColumn>DATE</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {orders.map((order) => {
            const supplier = suppliers.find(s => s.id === order.supplierId);
            return (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{supplier?.name || 'Unknown'}</TableCell>
                <TableCell>{order.items.length}</TableCell>
                <TableCell>{formatDate(order.orderDate)}</TableCell>
                <TableCell>
                  <Button isIconOnly size="sm" variant="light" aria-label="View order">
                    <Icon icon="lucide:eye" />
                  </Button>
                  <Button 
                    isIconOnly 
                    size="sm" 
                    variant="light" 
                    color="danger" 
                    aria-label="Delete order" 
                    onPress={() => handleDeleteOrder(order)}
                  >
                    <Icon icon="lucide:trash" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {modalAction === 'add' ? 'Create New Order' : 'Delete Order'}
              </ModalHeader>
              <ModalBody>
                {modalAction === 'add' ? (
                  <div className="space-y-4">
                    <Select
                      label="Supplier"
                      selectedKeys={newOrder.supplierId ? [newOrder.supplierId.toString()] : []}
                      onSelectionChange={handleSupplierChange}
                    >
                      {suppliers.map((supplier) => (
                        <SelectItem key={supplier.id} value={supplier.id}>
                          {supplier.name}
                        </SelectItem>
                      ))}
                    </Select>
                    <Select
                      label="Products"
                      selectionMode="multiple"
                      selectedKeys={newOrder.items.map(item => item.toString())}
                      onSelectionChange={handleProductsChange}
                    >
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                ) : (
                  <p>Are you sure you want to delete order #{selectedOrder?.id}?</p>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button 
                  color={modalAction === 'add' ? 'primary' : 'danger'} 
                  onPress={modalAction === 'add' ? handleCreateOrder : confirmDelete}
                >
                  {modalAction === 'add' ? 'Create' : 'Delete'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};