import React, { useState } from 'react';
import { FileUpload } from '../components/FileUpload';
import { DataVisualizer } from '../components/DataVisualizer';
import { DataAnalyzer } from '../components/DataAnalyzer';
import { DataRow, ChartData } from '../types';
import { BarChart3, LineChart, PieChart } from 'lucide-react';

export function Analysis() {
  const [data, setData] = useState<DataRow[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [selectedChart, setSelectedChart] = useState<ChartData | null>(null);
  const [selectedX, setSelectedX] = useState<string>('');
  const [selectedY, setSelectedY] = useState<string>('');

  const handleDataLoaded = (loadedData: DataRow[]) => {
    setData(loadedData);
    setColumns(Object.keys(loadedData[0] || {}));
  };

  const createChart = (type: 'bar' | 'line' | 'pie') => {
    if (!selectedX || !selectedY) return;
    
    setSelectedChart({
      type,
      data,
      xAxis: selectedX,
      yAxis: selectedY
    });
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      {!data.length ? (
        <div className="mt-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            Upload Your Data
          </h2>
          <FileUpload onDataLoaded={handleDataLoaded} />
        </div>
      ) : (
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">Create Visualization</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">X-Axis</label>
                <select
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 transition-colors duration-200"
                  value={selectedX}
                  onChange={(e) => setSelectedX(e.target.value)}
                >
                  <option value="">Select column</option>
                  {columns.map((col) => (
                    <option key={col} value={col}>{col}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Y-Axis</label>
                <select
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 transition-colors duration-200"
                  value={selectedY}
                  onChange={(e) => setSelectedY(e.target.value)}
                >
                  <option value="">Select column</option>
                  {columns.map((col) => (
                    <option key={col} value={col}>{col}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => createChart('bar')}
                className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                Bar Chart
              </button>
              <button
                onClick={() => createChart('line')}
                className="flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
              >
                <LineChart className="w-5 h-5 mr-2" />
                Line Chart
              </button>
              <button
                onClick={() => createChart('pie')}
                className="flex items-center px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors duration-200"
              >
                <PieChart className="w-5 h-5 mr-2" />
                Pie Chart
              </button>
            </div>
          </div>

          {selectedChart && (
            <div className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">Visualization</h2>
              <DataVisualizer {...selectedChart} />
            </div>
          )}

          <DataAnalyzer data={data} />

          <div className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-x-auto">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">Data Preview</h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.slice(0, 5).map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    {columns.map((column) => (
                      <td
                        key={column}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        {row[column]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}