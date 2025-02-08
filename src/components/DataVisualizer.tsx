import React from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ChartData } from '../types';

const COLORS = [
  '#2563eb', // Blue
  '#16a34a', // Green
  '#9333ea', // Purple
  '#dc2626', // Red
  '#f59e0b', // Amber
  '#0891b2', // Cyan
  '#4f46e5', // Indigo
  '#be123c', // Rose
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <p className="font-semibold">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function DataVisualizer({ type, data, xAxis, yAxis }: ChartData) {
  const renderChart = () => {
    switch (type) {
      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey={xAxis}
              tick={{ fill: '#4b5563' }}
              axisLine={{ stroke: '#9ca3af' }}
            />
            <YAxis
              tick={{ fill: '#4b5563' }}
              axisLine={{ stroke: '#9ca3af' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Bar
              dataKey={yAxis}
              fill="#2563eb"
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
            />
          </BarChart>
        );
      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey={xAxis}
              tick={{ fill: '#4b5563' }}
              axisLine={{ stroke: '#9ca3af' }}
            />
            <YAxis
              tick={{ fill: '#4b5563' }}
              axisLine={{ stroke: '#9ca3af' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Line
              type="monotone"
              dataKey={yAxis}
              stroke="#16a34a"
              strokeWidth={2}
              dot={{ fill: '#16a34a', strokeWidth: 2 }}
              activeDot={{ r: 8 }}
              animationDuration={1500}
            />
          </LineChart>
        );
      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              dataKey={yAxis}
              nameKey={xAxis}
              cx="50%"
              cy="50%"
              outerRadius={120}
              innerRadius={60}
              labelLine={false}
              label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                value,
                index
              }) => {
                const RADIAN = Math.PI / 180;
                const radius = 25 + innerRadius + (outerRadius - innerRadius);
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                return (
                  <text
                    x={x}
                    y={y}
                    fill="#4b5563"
                    textAnchor={x > cx ? 'start' : 'end'}
                    dominantBaseline="central"
                  >
                    {`${data[index][xAxis]} (${value})`}
                  </text>
                );
              }}
              animationDuration={1500}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              layout="horizontal"
              align="center"
            />
          </PieChart>
        );
    }
  };

  return (
    <div className="w-full h-[500px]">
      <ResponsiveContainer>{renderChart()}</ResponsiveContainer>
    </div>
  );
}