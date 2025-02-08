export interface DataRow {
  [key: string]: string | number;
}

export interface ChartData {
  type: 'bar' | 'line' | 'pie';
  data: DataRow[];
  xAxis: string;
  yAxis: string;
}