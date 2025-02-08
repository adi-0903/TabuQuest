import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import Papa from 'papaparse';
import { DataRow } from '../types';

interface FileUploadProps {
  onDataLoaded: (data: DataRow[]) => void;
}

export function FileUpload({ onDataLoaded }: FileUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    
    Papa.parse(file, {
      complete: (results) => {
        // Ensure we have data and it's properly formatted
        if (!results.data || !Array.isArray(results.data) || results.data.length === 0) {
          console.error('Invalid CSV format or empty file');
          return;
        }

        // Convert the parsed data to our DataRow format
        const formattedData = results.data
          .filter((row: any) => {
            // Filter out empty rows or rows that are just empty strings
            if (!row || typeof row !== 'object') return false;
            return Object.values(row).some(value => value !== '');
          })
          .map((row: any) => {
            const formattedRow: DataRow = {};
            Object.entries(row).forEach(([key, value]) => {
              // Convert numeric strings to numbers, keep other values as is
              formattedRow[key] = !isNaN(Number(value)) && value !== '' 
                ? Number(value) 
                : value;
            });
            return formattedRow;
          });

        if (formattedData.length > 0) {
          onDataLoaded(formattedData);
        } else {
          console.error('No valid data found in CSV file');
        }
      },
      header: true, // This tells PapaParse to use the first row as headers
      skipEmptyLines: true,
      transformHeader: (header: string) => {
        // Clean up header names
        return header.trim();
      },
      error: (error: any) => {
        console.error('Error parsing CSV:', error);
      }
    });
  }, [onDataLoaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'text/csv': ['.csv']
    },
    multiple: false
  });

  return (
    <div
      {...getRootProps()}
      className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
    >
      <input {...getInputProps()} />
      <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
      <p className="text-lg font-medium text-gray-600">
        {isDragActive ? 'Drop your CSV file here' : 'Drag & drop your CSV file here, or click to select'}
      </p>
      <p className="mt-2 text-sm text-gray-500">Only CSV files are supported</p>
    </div>
  );
}