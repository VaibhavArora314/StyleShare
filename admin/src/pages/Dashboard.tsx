import StatusCard from '../components/StatusCard';
import TrendingPosts from '../components/TrendingPosts';
import NewPosts from '../components/NewPosts';

const Dashboard = () => {

  document.title ="Style Share Admin | Dashboard 👨‍💻"

  return (
    <div className="h-screen">
      <div className="flex-1 flex flex-col lg:ml-64">
        <StatusCard/>
        <TrendingPosts/>
        <NewPosts/>
      </div>
    </div>
  );
};

export default Dashboard;
