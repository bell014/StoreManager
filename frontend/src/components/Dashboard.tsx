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

  useEffect(() => {
    const loadData = async () => {
      try {
        const orders = await fetchOrders();
        const products = await fetchProducts();

        // Process orders into status data
        const orderStatus = processOrderStatus(orders);
        setStatusData(orderStatus);

        // Process products into top products
        const topProducts = processTopProducts(products);
        setTopProducts(topProducts);

        // Calculate quick stats
        setStats({
          totalOrders: orders.length,
          totalRevenue: calculateTotalRevenue(orders),
          customerSatisfaction: 95, // Placeholder - would come from customer data
          newCustomers: calculateNewCustomers(orders) // Placeholder
        });
      } catch (error) {
        console.error("Error loading dashboard data:", error);
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

  const processTopProducts = (products) => {
    // Sort products by sales and take top 4
    return products
      .sort((a, b) => b.salesCount - a.salesCount)
      .slice(0, 4)
      .map(product => ({
        name: product.name,
        sales: product.salesCount || 0
      }));
  };

  const calculateTotalRevenue = (orders) => {
    return orders.reduce((total, order) => total + (order.totalAmount || 0), 0);
  };

  const calculateNewCustomers = (orders) => {
    // This would normally track new vs returning customers
    // For now just return a placeholder
    return orders.length > 0 ? Math.floor(orders.length / 10) : 0;
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