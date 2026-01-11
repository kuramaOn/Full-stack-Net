import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiUsers, FiEye, FiCalendar } from 'react-icons/fi';
import { adminAPI } from '../../services/api';
import AnalyticsChart from '../../components/admin/AnalyticsChart';
import Loading from '../../components/common/Loading';

const Analytics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('week');

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      const response = await adminAPI.getStats();
      setStats(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setLoading(false);
    }
  };

  if (loading) return <Loading fullScreen />;

  // Mock data for charts (replace with real API data)
  const viewsOverTime = [
    { label: 'Mon', value: 1200 },
    { label: 'Tue', value: 1900 },
    { label: 'Wed', value: 1500 },
    { label: 'Thu', value: 2100 },
    { label: 'Fri', value: 2800 },
    { label: 'Sat', value: 3200 },
    { label: 'Sun', value: 2600 },
  ];

  const userGrowth = [
    { label: 'Week 1', value: 50 },
    { label: 'Week 2', value: 75 },
    { label: 'Week 3', value: 120 },
    { label: 'Week 4', value: 180 },
  ];

  const contentByGenre = stats?.genreStats?.slice(0, 5).map(g => ({
    label: g._id,
    value: g.count
  })) || [];

  const subscriptionData = stats?.subscriptionStats?.map(s => ({
    label: s._id || 'Free',
    value: s.count
  })) || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-glow bg-gradient-to-r from-glacier-400 to-glacier-600 bg-clip-text text-transparent">
            Advanced Analytics
          </h1>
          <p className="text-gray-400 mt-2">Deep insights into your platform performance</p>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-2">
          {['day', 'week', 'month', 'year'].map((range) => (
            <motion.button
              key={range}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg capitalize transition-all duration-300 ${
                timeRange === range
                  ? 'glass-effect-strong glacier-glow text-glacier-400'
                  : 'glass-effect text-gray-400 hover:text-glacier-400'
              }`}
            >
              {range}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard
          title="Total Revenue"
          value="$24,580"
          change="+12.5%"
          icon={FiTrendingUp}
          color="from-green-500 to-green-600"
        />
        <MetricCard
          title="Active Users"
          value={stats?.overview?.activeUsers || 0}
          change="+8.2%"
          icon={FiUsers}
          color="from-glacier-500 to-glacier-600"
        />
        <MetricCard
          title="Total Views"
          value={stats?.contentStats?.totalViews?.toLocaleString() || 0}
          change="+15.3%"
          icon={FiEye}
          color="from-purple-500 to-purple-600"
        />
        <MetricCard
          title="Avg Watch Time"
          value="42 min"
          change="+5.7%"
          icon={FiCalendar}
          color="from-blue-500 to-blue-600"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsChart
          title="Views Over Time"
          data={viewsOverTime}
          type="line"
        />
        <AnalyticsChart
          title="User Growth"
          data={userGrowth}
          type="bar"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsChart
          title="Content by Genre"
          data={contentByGenre}
          type="bar"
        />
        <AnalyticsChart
          title="Subscription Distribution"
          data={subscriptionData}
          type="pie"
        />
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InsightCard
          title="Peak Hours"
          value="8-10 PM"
          description="Most active viewing time"
          trend="up"
        />
        <InsightCard
          title="Avg Session"
          value="1.5 hours"
          description="Average user session duration"
          trend="up"
        />
        <InsightCard
          title="Bounce Rate"
          value="23%"
          description="Users leaving after one page"
          trend="down"
        />
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, change, icon: Icon, color }) => {
  const isPositive = change.startsWith('+');
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="glass-effect-strong rounded-xl p-6 hover:glacier-glow transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-gradient-to-r ${color} bg-opacity-20`}>
          <Icon className={`text-2xl bg-gradient-to-r ${color} bg-clip-text text-transparent`} />
        </div>
        <span className={`text-sm font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {change}
        </span>
      </div>
      <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
      <p className="text-3xl font-bold text-white">{value}</p>
    </motion.div>
  );
};

const InsightCard = ({ title, value, description, trend }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-effect-strong rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-glacier-400 font-semibold">{title}</h3>
        <span className={`text-xs px-2 py-1 rounded ${
          trend === 'up' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
        }`}>
          {trend === 'up' ? '↑' : '↓'}
        </span>
      </div>
      <p className="text-2xl font-bold text-white mb-1">{value}</p>
      <p className="text-sm text-gray-400">{description}</p>
    </motion.div>
  );
};

export default Analytics;
