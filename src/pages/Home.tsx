import React from 'react';
import { Link } from 'react-router-dom';
import { FileSpreadsheet, PieChart as ChartPie, Brain, ArrowRight } from 'lucide-react';

export function Home() {
  const services = [
    {
      icon: <FileSpreadsheet className="w-8 h-8" />,
      title: "CSV Data Processing",
      description: "Upload and process any CSV file with ease. Our system handles large datasets efficiently."
    },
    {
      icon: <ChartPie className="w-8 h-8" />,
      title: "Advanced Visualizations",
      description: "Transform your data into meaningful insights with our interactive charts and graphs."
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Analysis",
      description: "Get intelligent insights and answers to your questions about your data using advanced AI."
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              Transform Your Data into Insights
            </h1>
            <p className="text-xl mb-8 text-indigo-100">
              Upload your tabular data and get instant visualizations and AI-powered analysis
            </p>
            <Link
              to="/analysis"
              className="inline-flex items-center px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold hover:bg-indigo-50 transition-colors duration-200"
            >
              Start Analysis
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Powerful Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="text-purple-600 mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            Ready to Analyze Your Data?
          </h2>
          <p className="text-xl mb-8 text-gray-600">
            Get started now and discover insights you never knew existed in your data.
          </p>
          <Link
            to="/analysis"
            className="inline-flex items-center px-8 py-4 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200"
          >
            Try It Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}