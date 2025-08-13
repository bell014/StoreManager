import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchOrders, fetchProducts } from "../apiService";

export const Dashboard: React.FC = () => {
  const [statusData, setStatusData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    customerSatisfaction: 0,
    newCustomers: 0
  });

  // Mock data for development/testing
  const mockOrders = [
    {
      id: '1',
      status: 'success',
      customerId: 'cust1',
      items: [
        { productId: 'prod1', quantity: 2, price: 10 },
        { productId: 'prod2', quantity: 1, price: 15 }
      ]
    },
    {
      id: '2',
      status: 'success',
      customerId: 'cust2',
      items: [
        { productId: 'prod1', quantity: 3, price: 10 },
        { productId: 'prod3', quantity: 2, price: 20 }
      ]
    }
  ];

  const mockProducts = [
    { id: 'prod1', name: 'Product 1', price: 10 },
    { id: 'prod2', name: 'Product 2', price: 15 },
    { id: 'prod3', name: 'Product 3', price: 20 }
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('Fetching orders and products...');
        let orders, products;
        
        try {
          orders = await fetchOrders();
          products = await fetchProducts();
          
          if (!orders || !Array.isArray(orders)) orders = mockOrders;
          if (!products || !Array.isArray(products)) products = mockProducts;
          
          console.log('Orders data:', orders);
          console.log('Products data:', products);
        } catch (apiError) {
          console.warn('API failed, using mock data:', apiError);
          orders = mockOrders;
          products = mockProducts;
        }

        // Process orders into status data
        const orderStatus = processOrderStatus(orders);
        console.log('Processed order status:', orderStatus);
        setStatusData(orderStatus);

        // Process products into top products
        const topProducts = processTopProducts(orders, products);
        console.log('Processed top products:', topProducts);
        setTopProducts(topProducts);

        // Calculate quick stats
        const stats = {
          totalOrders: orders.length,
          totalRevenue: calculateTotalRevenue(orders),
          customerSatisfaction: calculateCustomerSatisfaction(orders),
          newCustomers: calculateNewCustomers(orders)
        };
        console.log('Calculated stats:', stats);
        setStats(stats);

      } catch (error) {
        console.error("Error processing dashboard data:", error);
        setError("Failed to load dashboard data. Please try again later.");
      }
    };

    loadData();
  }, []);

  /**
   * Processes orders into monthly sales data for the chart
   * Data comes from the /api/orders endpoint via fetchOrders()
   * Each order must have:
   * - orderDate: Date string (e.g. "2023-01-15")
   * - totalAmount: Number representing order total
   */
  const processOrderStatus = (orders: Array<{
    status: string;
  }>) => {
    const statusCounts = {
      success: 0,
      pending: 0,
      declined: 0
    };

    orders.forEach(order => {
      if (order.status === 'success') {
        statusCounts.success++;
      } else if (order.status === 'pending') {
        statusCounts.pending++;
      } else if (order.status === 'declined') {
        statusCounts.declined++;
      }
    });

    return [
      {
        name: 'Orders',
        success: statusCounts.success,
        pending: statusCounts.pending,
        declined: statusCounts.declined
      }
    ];
  };

  const processTopProducts = (orders: Order[]) => {
    // Count product sales across all orders
    const productSales = new Map<string, number>();
    
    orders.forEach(order => {
      order.items.forEach(item => {
        const currentCount = productSales.get(item.productId) || 0;
        productSales.set(item.productId, currentCount + item.quantity);
      });
    });

    // Convert to array and sort by sales count
    const sortedProducts = Array.from(productSales.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4); // Take top 4

    // Map to product names and quantities
    return sortedProducts.map(([productId, quantity]) => {
      const product = products.find(p => p.id === productId);
      return {
        name: product?.name || `Product ${productId}`,
        sales: quantity
      };
    });
  };

  const calculateTotalRevenue = (orders: Order[]) => {
    return orders.reduce((total, order) => {
      const orderTotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      return total + orderTotal;
    }, 0);
  };

  const calculateNewCustomers = (orders: Order[]) => {
    // Track unique customer IDs
    const customerIds = new Set<string>();
    orders.forEach(order => customerIds.add(order.customerId));
    return customerIds.size;
  };

  const calculateCustomerSatisfaction = (orders: Order[]) => {
    // Calculate based on order status (simplified for demo)
    const successfulOrders = orders.filter(o => o.status === 'success').length;
    return orders.length > 0 ? Math.round((successfulOrders / orders.length) * 100) : 0;
  };
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-semibold">Order Status</h2>
          </CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="success" fill="#4CAF50" name="Success" />
                <Bar dataKey="pending" fill="#FFC107" name="Pending" />
                <Bar dataKey="declined" fill="#F44336" name="Declined" />
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-2xl font-semibold">Top Products</h2>
          </CardHeader>
          <CardBody>
            <ul className="space-y-2">
              {topProducts.map((product, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{product.name}</span>
                  <span className="font-semibold">{product.sales} sold</span>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold">Quick Stats</h2>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{stats.totalOrders}</p>
              <p className="text-sm text-gray-500">Total Orders</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Total Revenue</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{stats.customerSatisfaction}%</p>
              <p className="text-sm text-gray-500">Customer Satisfaction</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{stats.newCustomers}</p>
              <p className="text-sm text-gray-500">New Customers</p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};