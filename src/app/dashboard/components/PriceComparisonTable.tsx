'use client';

import React from 'react';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface StorePrice {
  store: string;
  price: number;
  inStock: boolean;
  distance?: number;
}

interface PriceComparisonTableProps {
  medicine: string;
  prices: StorePrice[];
  onSelectStore?: (store: string) => void;
}

export function PriceComparisonTable({ medicine, prices, onSelectStore }: PriceComparisonTableProps) {
  const sortedPrices = [...prices].sort((a, b) => a.price - b.price);

  return (
    <Card>
      <CardHeader>
        <h3 className="font-semibold text-gray-900 dark:text-white">{medicine}</h3>
      </CardHeader>
      <CardBody>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Store</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white">Price</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">Stock</th>
              </tr>
            </thead>
            <tbody>
              {sortedPrices.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                  onClick={() => onSelectStore?.(item.store)}
                >
                  <td className="py-3 px-4 text-gray-900 dark:text-white">{item.store}</td>
                  <td className="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white">
                    ₹{item.price.toFixed(2)}
                  </td>
                  <td className="text-center py-3 px-4">
                    <Badge variant={item.inStock ? 'success' : 'danger'} size="sm">
                      {item.inStock ? 'In Stock' : 'Out'}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
}
