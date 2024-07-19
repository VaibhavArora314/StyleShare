import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js";
import { useRecoilValue } from "recoil";
import { tokenState } from "../store/atoms/auth";
import { ColorRing } from 'react-loader-spinner';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

const Graphs = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userStats, setUserStats] = useState([]);
  const [postStats, setPostStats] = useState([]);
  const [commentStats, setCommentStats] = useState([]);
  const [favoritesStats, setFavoritesStats] = useState([]);
  const [reactionsStats, setReactionsStats] = useState([]);
  const [contactMessagesStats, setContactMessagesStats] = useState([]);
  const [loading,setLoading] = useState(true);
  const token = useRecoilValue(tokenState);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("/api/v1/admin/getgraphsstatus", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserStats(response.data.users);
        setPostStats(response.data.posts);
        setCommentStats(response.data.comments);
        setFavoritesStats(response.data.favorites);
        setReactionsStats(response.data.reactions);
        setContactMessagesStats(response.data.contacts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stats:", error);
        setLoading(true);
      }
    };
    fetchStats();
  }, [token]);

  const formatData = (data: any[]) => { 
    const counts: { [key: string]: number } = {}; 
    data.forEach((item) => { 
      const date = new Date(item.createdAt); 
      const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`; 
      if (!counts[formattedDate]) counts[formattedDate] = 0; 
      counts[formattedDate]++; 
    }); 
    const labels = Object.keys(counts); 
    const values = Object.values(counts); 
    return { labels, values }; 
  };

  const createChartData = ({ data, label, borderColor }:any) => {
    return {
      labels: data.labels,
      datasets: [
        {
          label: label,
          data: data.values,
          fill: false,
          borderColor: borderColor,
          tension: 0.1,
        },
      ],
    };
  };

  const createBarData = ({ data, label, backgroundColor }:any) => {
    return {
      labels: data.labels,
      datasets: [
        {
          label: label,
          data: data.values,
          backgroundColor: backgroundColor,
        },
      ],
    };
  };

  const userData = formatData(userStats);
  const postData = formatData(postStats);
  const commentData = formatData(commentStats);
  const favoriteData = formatData(favoritesStats);
  const reactionData = formatData(reactionsStats);
  const contactMessagesData = formatData(contactMessagesStats);

  const userChartData = createChartData({ data: userData, label: "Users registered", borderColor: "rgb(75, 192, 192)" });
  const postChartData = createChartData({ data: postData, label: "Posts uploads", borderColor: "rgb(75, 75, 192)" });
  const commentChartData = createChartData({ data: commentData, label: "Comments done", borderColor: "rgb(192, 75, 192)" });
  const favoriteChartData = createChartData({ data: favoriteData, label: "Favorites done", borderColor: "rgb(192, 75, 75)" });
  const reactionChartData = createChartData({ data: reactionData, label: "Reactions done", borderColor: "rgb(75, 192, 75)" });
  const contactMessageChartData = createChartData({ data: contactMessagesData, label: "Contact messages received", borderColor: "rgb(192, 192, 75)" });

  const userBarData = createBarData({ data: userData, label: "Users registered", backgroundColor: "rgba(75, 192, 192, 0.5)" });
  const postBarData = createBarData({ data: postData, label: "Posts uploads", backgroundColor: "rgba(75, 75, 192, 0.5)" });
  const commentBarData = createBarData({ data: commentData, label: "Comments done", backgroundColor: "rgba(192, 75, 192, 0.5)" });
  const favoriteBarData = createBarData({ data: favoriteData, label: "Favorites done", backgroundColor: "rgba(192, 75, 75, 0.5)" });
  const reactionBarData = createBarData({ data: reactionData, label: "Reactions done", backgroundColor: "rgba(75, 192, 75, 0.5)" });
  const contactMessageBarData = createBarData({ data: contactMessagesData, label: "Contact messages received", backgroundColor: "rgba(192, 192, 75, 0.5)" });

  const Y = new Date();
  let year = Y.getFullYear();

  return (
    <div className="mb-10 w-full">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col lg:ml-80">
        {loading ? 
        <div className="flex justify-center items-center h-80">
        <ColorRing
          visible={true}
          height="100"
          width="100"
          colors={['#000435', 'rgb(14 165 233)', 'rgb(243 244 246)','#000435','rgb(14 165 233)']}
        />
      </div>
      :
        <div className="mx-5 -mt-2 lg:mr-11 overflow-x-auto rounded-xl mb-5">
          <h3 className="mb-2 flex font-bold text-xl decoration-sky-500 decoration-dotted underline">Users Over Time {year}</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="p-4 bg-white shadow rounded">
          <Line data={userChartData} options={{ responsive: true, scales: {x: { title: { display: true, text: 'Date User registered' } }, y: { title: { display: true, text: 'User Count' } },}, maintainAspectRatio: false }} />
            </div>
            <div className="p-4 bg-white shadow rounded">
              <Bar data={userBarData} options={{ responsive: true,scales: {x: { title: { display: true, text: 'Date User registered' } }, y: { title: { display: true, text: 'User Count' } },}, maintainAspectRatio: false }} />
            </div>
          </div>
          <h3 className="mt-5 font-bold text-xl decoration-sky-500 decoration-dotted underline">Posts Over Time {year}</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-2">
            <div className="p-4 bg-white shadow rounded">
              <Line data={postChartData} options={{ responsive: true, scales: { x: { title: { display: true, text: 'Date when posted' } }, y: { title: { display: true, text: 'Posts Count' } } }, maintainAspectRatio: false }} />
            </div>
            <div className="p-4 bg-white shadow rounded">
              <Bar data={postBarData} options={{ responsive: true,scales: { x: { title: { display: true, text: 'Date when posted' } }, y: { title: { display: true, text: 'Posts Count' } } }, maintainAspectRatio: false }} />
            </div>
          </div>
          <h3 className="mt-5 font-bold text-xl decoration-sky-500 decoration-dotted underline">Comments Over Time {year}</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-2">
            <div className="p-4 bg-white shadow rounded">
              <Line data={commentChartData} options={{ responsive: true,scales: { x: { title: { display: true, text: 'Date when commented' } }, y: { title: { display: true, text: 'Comments Count' } } }, maintainAspectRatio: false }} />
            </div>
            <div className="p-4 bg-white shadow rounded">
              <Bar data={commentBarData} options={{ responsive: true,scales: { x: { title: { display: true, text: 'Date when commented' } }, y: { title: { display: true, text: 'Comments Count' } } }, maintainAspectRatio: false }} />
            </div>
          </div>
          <h3 className="mt-5 font-bold text-xl decoration-sky-500 decoration-dotted underline">Favorites Over Time {year}</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-2">
            <div className="p-4 bg-white shadow rounded">
              <Line data={favoriteChartData} options={{ responsive: true,scales: { x: { title: { display: true, text: 'Date' } }, y: { title: { display: true, text: 'Favorite Count' } } }, maintainAspectRatio: false }} />
            </div>
            <div className="p-4 bg-white shadow rounded">
              <Bar data={favoriteBarData} options={{ responsive: true,scales: { x: { title: { display: true, text: 'Date' } }, y: { title: { display: true, text: 'Favorite Count' } } }, maintainAspectRatio: false }} />
            </div>
          </div>
          <h3 className="mt-5 font-bold text-xl decoration-sky-500 decoration-dotted underline">Reactions Over Time {year}</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-2">
            <div className="p-4 bg-white shadow rounded">
              <Line data={reactionChartData} options={{ responsive: true,scales: { x: { title: { display: true, text: 'Reacted Date' } }, y: { title: { display: true, text: 'Reactions Count' } } }, maintainAspectRatio: false }} />
            </div>
            <div className="p-4 bg-white shadow rounded">
              <Bar data={reactionBarData} options={{ responsive: true,scales: { x: { title: { display: true, text: 'Reacted Date' } }, y: { title: { display: true, text: 'Reactions Count' } } }, maintainAspectRatio: false }} />
            </div>
          </div>
          <h3 className="mt-5 font-bold text-xl decoration-sky-500 decoration-dotted underline">Contact Messages Over Time {year}</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-2">
            <div className="p-4 bg-white shadow rounded">
              <Line data={contactMessageChartData} options={{ responsive: true,scales: { x: { title: { display: true, text: 'Contacted Date' } }, y: { title: { display: true, text: 'Messages Count' } } }, maintainAspectRatio: false }} />
            </div>
            <div className="p-4 bg-white shadow rounded">
              <Bar data={contactMessageBarData} options={{ responsive: true,scales: { x: { title: { display: true, text: 'Contacted Date' } }, y: { title: { display: true, text: 'Messages Count' } } }, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      }
      </div>
    </div>
  );
};

export default Graphs;
