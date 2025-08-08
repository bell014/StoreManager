import React from "react";
import { Card, CardBody, CardFooter, Image, Button } from "@heroui/react";

const mockProducts = [
  { id: 1, name: "Product A", price: 19.99, image: "https://img.heroui.chat/image/fashion?w=300&h=400&u=1" },
  { id: 2, name: "Product B", price: 29.99, image: "https://img.heroui.chat/image/fashion?w=300&h=400&u=2" },
  { id: 3, name: "Product C", price: 39.99, image: "https://img.heroui.chat/image/fashion?w=300&h=400&u=3" },
  { id: 4, name: "Product D", price: 49.99, image: "https://img.heroui.chat/image/fashion?w=300&h=400&u=4" },
];

export const StoreFront: React.FC = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Welcome to Our Store</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockProducts.map((product) => (
          <Card key={product.id} isPressable>
            <CardBody className="p-0">
              <Image
                src={product.image}
                alt={product.name}
                className="w-full h-[200px] object-cover"
              />
            </CardBody>
            <CardFooter className="flex-col items-start">
              <h5 className="text-lg font-semibold">{product.name}</h5>
              <p className="text-default-500">${product.price.toFixed(2)}</p>
              <Button color="primary" className="mt-2 w-full">
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};