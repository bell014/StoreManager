const API_BASE_URL = 'http://localhost:8080/api';

export const fetchInventory = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/inventory`);
    if (!response.ok) {
      throw new Error('Failed to fetch inventory');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching inventory:', error);
    throw error;
  }
};

export const updateInventoryItem = async (productId: string, quantity: number, location: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/inventory/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity, location }),
    });
    if (!response.ok) {
      throw new Error('Failed to update inventory');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating inventory:', error);
    throw error;
  }
};

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const updateProduct = async (productId: string, product: { 
  name: string, 
  description: string, 
  price: number, 
  supplierId: string 
}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error('Failed to update product');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const createProduct = async (product: { 
  name: string, 
  description: string, 
  price: number, 
  supplierId: string 
}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error('Failed to create product');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

export const fetchSuppliers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/suppliers`);
    if (!response.ok) {
      throw new Error('Failed to fetch suppliers');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    throw error;
  }
};

export const updateSupplier = async (supplierId: string, supplier: { 
  name: string, 
  email: string, 
  address: string,
  phone: string,
  website: string 
}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/suppliers/${supplierId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(supplier),
    });
    if (!response.ok) {
      throw new Error('Failed to update supplier');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating supplier:', error);
    throw error;
  }
};

export const createSupplier = async (supplier: { 
  name: string, 
  email: string, 
  address: string,
  phone: string,
  website: string 
}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/suppliers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(supplier),
    });
    if (!response.ok) {
      throw new Error('Failed to create supplier');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating supplier:', error);
    throw error;
  }
};

export const deleteSupplier = async (supplierId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/suppliers/${supplierId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete supplier');
    }
  } catch (error) {
    console.error('Error deleting supplier:', error);
    throw error;
  }
};

export const fetchOrders = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`);
    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const updateOrder = async (orderId: string, order: {
  status: string,
  customerName?: string,
  customerEmail?: string,
  shippingAddress?: string
}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });
    if (!response.ok) {
      throw new Error('Failed to update order');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
};

export const createOrder = async (order: { 
  customerId: string,
  status: string,
  customerName: string,
  customerEmail: string,
  shippingAddress: string,
  items: Array<{
    productId: string,
    quantity: number,
    price: number
  }>
}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });
    if (!response.ok) {
      throw new Error('Failed to create order');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const deleteOrder = async (orderId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete order');
    }
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
};
