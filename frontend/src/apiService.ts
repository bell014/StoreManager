const API_BASE_URL = import.meta.env.DEV ? '/api' : 'http://localhost:8080/api';

// Authentication services
export const signup = async (userData: { email: string; password: string; name: string }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        password: userData.password
      }),
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { message: 'Registration failed - server error' };
      }
      throw new Error(errorData.message || 'Registration failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Signup error:', error);
    throw new Error(
      error instanceof Error 
        ? error.message 
        : 'An unexpected error occurred during registration'
    );
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Logout failed');
    }
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

export const checkAuthStatus = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/status`, {
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Not authenticated');
    }

    return await response.json();
  } catch (error) {
    console.error('Auth status check error:', error);
    throw error;
  }
};

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

export const updateProduct = async (
  productId: string, 
  product: { 
    name: string, 
    description: string, 
    price: number, 
    supplierId: string 
  },
  image?: File
) => {
  try {
    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(product)], {
      type: 'application/json'
    }));
    if (image) {
      formData.append('image', image);
    }

    const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
      method: 'PUT',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update product');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const createProduct = async (
  product: { 
    name: string, 
    description: string, 
    price: number, 
    supplierId: string 
  },
  image?: File
) => {
  try {
    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(product)], {
      type: 'application/json'
    }));
    if (image) {
      formData.append('image', image);
    }

    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create product');
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
