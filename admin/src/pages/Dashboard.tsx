import { useState } from 'react';
import Navbar from '../components/Navbar';
import Sider from '../components/SideBar';
import StatusCard from '../components/StatusCard';
import TrendingPosts from '../components/TrendingPosts';
import NewPosts from '../components/NewPosts';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="h-screen">
      <Sider sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col lg:ml-64">
        <Navbar toggleSidebar={toggleSidebar} />
        <StatusCard/>
        <TrendingPosts/>
        <NewPosts/>
      </div>
    </div>
  );
};

export default Dashboard;
