"use client"
import React, { useState, useEffect } from 'react';
import { 
  Users, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  Activity,
  Bell,
  Settings,
  Search,
  Calendar,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  MessageCircle,
  User,
  Plus,
  Package,
  Menu,
  X
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('overview');
  const [activeRoute, setActiveRoute] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Sample data
  const salesData = [
    { month: 'Jan', sales: 4000, revenue: 2400 },
    { month: 'Feb', sales: 3000, revenue: 1398 },
    { month: 'Mar', sales: 2000, revenue: 9800 },
    { month: 'Apr', sales: 2780, revenue: 3908 },
    { month: 'May', sales: 1890, revenue: 4800 },
    { month: 'Jun', sales: 2390, revenue: 3800 },
    { month: 'Jul', sales: 3490, revenue: 4300 },
  ];

  const pieData = [
    { name: 'Desktop', value: 400, color: '#8884d8' },
    { name: 'Mobile', value: 300, color: '#82ca9d' },
    { name: 'Tablet', value: 200, color: '#ffc658' },
    { name: 'Other', value: 100, color: '#ff7c7c' },
  ];

  const recentActivities = [
    { id: 1, action: 'New user registered', time: '2 minutes ago', type: 'user' },
    { id: 2, action: 'Payment received', time: '5 minutes ago', type: 'payment' },
    { id: 3, action: 'New order placed', time: '10 minutes ago', type: 'order' },
    { id: 4, action: 'System backup completed', time: '1 hour ago', type: 'system' },
  ];

  const sidebarItems = [
    { id: 'my-profile', label: 'My Profile', icon: User, route: 'my-profile' },
    { id: 'add-product', label: 'Add Product', icon: Plus, route: 'add-product' },
    { id: 'my-products', label: 'My Products', icon: Package, route: 'my-products' },
  ];

  const StatCard = ({ title, value, change, changeType, icon: Icon, color }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          <div className="flex items-center mt-2">
            {changeType === 'up' ? (
              <ArrowUpRight className="w-4 h-4 text-green-500" />
            ) : (
              <ArrowDownRight className="w-4 h-4 text-red-500" />
            )}
            <span className={`text-sm font-medium ml-1 ${
              changeType === 'up' ? 'text-green-500' : 'text-red-500'
            }`}>
              {change}%
            </span>
            <span className="text-gray-500 text-sm ml-1">from last month</span>
          </div>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const handleRouteChange = (route) => {
    setActiveRoute(route);
    setSidebarOpen(false);
  };

  const renderContent = () => {
    if (activeRoute === 'my-profile') {
      return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="text-center">
            <User className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">My Profile</h2>
            <p className="text-gray-600">Profile component will be implemented here</p>
          </div>
        </div>
      );
    }

    if (activeRoute === 'add-product') {
      return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="text-center">
            <Plus className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Add Product</h2>
            <p className="text-gray-600">Add product component will be implemented here</p>
          </div>
        </div>
      );
    }

    if (activeRoute === 'my-products') {
      return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="text-center">
            <Package className="w-16 h-16 text-purple-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">My Products</h2>
            <p className="text-gray-600">Products list component will be implemented here</p>
          </div>
        </div>
      );
    }

    // Default dashboard content
    return (
      <div className="space-y-6">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="px-6">
            <nav className="flex space-x-8">
              {['overview', 'analytics', 'reports', 'settings'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Users"
                value="12,543"
                change="12.5"
                changeType="up"
                icon={Users}
                color="bg-blue-500"
              />
              <StatCard
                title="Total Sales"
                value="$45,678"
                change="8.2"
                changeType="up"
                icon={DollarSign}
                color="bg-green-500"
              />
              <StatCard
                title="Orders"
                value="1,234"
                change="3.1"
                changeType="down"
                icon={ShoppingCart}
                color="bg-orange-500"
              />
              <StatCard
                title="Conversion"
                value="3.4%"
                change="0.5"
                changeType="up"
                icon={TrendingUp}
                color="bg-purple-500"
              />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sales Chart */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Sales Overview</h3>
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                      }} 
                    />
                    <Area type="monotone" dataKey="sales" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
                    <Area type="monotone" dataKey="revenue" stroke="#10b981" fill="#10b981" fillOpacity={0.1} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Device Usage */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Device Usage</h3>
                  <PieChart className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex items-center justify-between">
                  <ResponsiveContainer width="60%" height={200}>
                    <RechartsPieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2">
                    {pieData.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-sm text-gray-600">{item.name}</span>
                        <span className="text-sm font-medium text-gray-900 ml-auto">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                  <Activity className="w-5 h-5 text-gray-400" />
                </div>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.type === 'user' ? 'bg-blue-500' :
                        activity.type === 'payment' ? 'bg-green-500' :
                        activity.type === 'order' ? 'bg-orange-500' : 'bg-gray-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center space-x-3">
                    <Users className="w-5 h-5 text-blue-500" />
                    <span className="text-sm font-medium">Add New User</span>
                  </button>
                  <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center space-x-3">
                    <ShoppingCart className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-medium">Create Order</span>
                  </button>
                  <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center space-x-3">
                    <BarChart3 className="w-5 h-5 text-purple-500" />
                    <span className="text-sm font-medium">Generate Report</span>
                  </button>
                  <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center space-x-3">
                    <MessageCircle className="w-5 h-5 text-orange-500" />
                    <span className="text-sm font-medium">Send Message</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Analytics Dashboard</h3>
              <p className="text-gray-600">Detailed analytics and insights will be displayed here.</p>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <div className="text-center">
              <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Reports Section</h3>
              <p className="text-gray-600">Generate and view various reports here.</p>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <div className="text-center">
              <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Settings</h3>
              <p className="text-gray-600">Manage your dashboard settings and preferences.</p>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Menu</h2>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="mt-6 px-3">
          {/* Dashboard Button */}
          <button
            onClick={() => handleRouteChange('dashboard')}
            className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors mb-1 ${
              activeRoute === 'dashboard'
                ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <BarChart3 className="w-5 h-5 mr-3" />
            Dashboard
          </button>

          {/* Menu Items */}
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleRouteChange(item.route)}
              className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors mb-1 ${
                activeRoute === item.route
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden text-gray-400 hover:text-gray-600"
                >
                  <Menu className="w-6 h-6" />
                </button>
                <h1 className="text-2xl font-bold text-gray-900">
                  {activeRoute === 'dashboard' ? 'Dashboard' :
                   activeRoute === 'my-profile' ? 'My Profile' :
                   activeRoute === 'add-product' ? 'Add Product' :
                   activeRoute === 'my-products' ? 'My Products' : 'Dashboard'}
                </h1>
                <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>{currentTime.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                  <span className="mx-2">•</span>
                  <span>{currentTime.toLocaleTimeString()}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative hidden sm:block">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                  <Bell className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Settings className="w-6 h-6" />
                </button>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  U
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;