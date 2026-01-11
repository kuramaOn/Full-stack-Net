import { motion } from 'framer-motion';
import { useState } from 'react';

const AnalyticsChart = ({ title, data, type = 'bar' }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Find max value for scaling
  const maxValue = Math.max(...data.map(item => item.value));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-effect-strong rounded-xl p-6"
    >
      <h3 className="text-xl font-bold text-glacier-400 mb-6">{title}</h3>
      
      {type === 'bar' && (
        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-300">{item.label}</span>
                <span className="text-glacier-400 font-semibold">{item.value.toLocaleString()}</span>
              </div>
              <div className="relative h-8 glass-effect rounded-lg overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(item.value / maxValue) * 100}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`h-full bg-gradient-to-r from-glacier-500 to-glacier-600 transition-all duration-300 ${
                    hoveredIndex === index ? 'glacier-glow-strong' : ''
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {type === 'line' && (
        <div className="h-64 relative">
          <svg width="100%" height="100%" className="overflow-visible">
            {/* Grid lines */}
            {[0, 25, 50, 75, 100].map((percent) => (
              <line
                key={percent}
                x1="0"
                y1={`${percent}%`}
                x2="100%"
                y2={`${percent}%`}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
            ))}

            {/* Line chart */}
            <motion.polyline
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="3"
              points={data.map((item, index) => {
                const x = (index / (data.length - 1)) * 100;
                const y = 100 - (item.value / maxValue) * 100;
                return `${x}%,${y}%`;
              }).join(' ')}
            />

            {/* Gradient definition */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
            </defs>

            {/* Data points */}
            {data.map((item, index) => {
              const x = (index / (data.length - 1)) * 100;
              const y = 100 - (item.value / maxValue) * 100;
              return (
                <motion.circle
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  cx={`${x}%`}
                  cy={`${y}%`}
                  r="4"
                  fill="#0ea5e9"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {hoveredIndex === index && (
                    <title>{`${item.label}: ${item.value}`}</title>
                  )}
                </motion.circle>
              );
            })}
          </svg>

          {/* Labels */}
          <div className="flex justify-between mt-4 text-xs text-gray-400">
            {data.map((item, index) => (
              <span key={index}>{item.label}</span>
            ))}
          </div>
        </div>
      )}

      {type === 'pie' && (
        <div className="flex items-center justify-center">
          <div className="relative w-64 h-64">
            <svg width="100%" height="100%" viewBox="0 0 100 100">
              {(() => {
                let startAngle = 0;
                const total = data.reduce((sum, item) => sum + item.value, 0);
                const colors = ['#0ea5e9', '#0284c7', '#0369a1', '#075985', '#0c4a6e'];

                return data.map((item, index) => {
                  const percentage = (item.value / total) * 100;
                  const angle = (percentage / 100) * 360;
                  const endAngle = startAngle + angle;

                  const x1 = 50 + 40 * Math.cos((Math.PI * startAngle) / 180);
                  const y1 = 50 + 40 * Math.sin((Math.PI * startAngle) / 180);
                  const x2 = 50 + 40 * Math.cos((Math.PI * endAngle) / 180);
                  const y2 = 50 + 40 * Math.sin((Math.PI * endAngle) / 180);

                  const largeArc = angle > 180 ? 1 : 0;

                  const path = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`;

                  const slice = (
                    <motion.path
                      key={index}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      d={path}
                      fill={colors[index % colors.length]}
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <title>{`${item.label}: ${item.value} (${percentage.toFixed(1)}%)`}</title>
                    </motion.path>
                  );

                  startAngle = endAngle;
                  return slice;
                });
              })()}
            </svg>
          </div>
          
          {/* Legend */}
          <div className="ml-8 space-y-2">
            {data.map((item, index) => {
              const colors = ['#0ea5e9', '#0284c7', '#0369a1', '#075985', '#0c4a6e'];
              return (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded" 
                    style={{ backgroundColor: colors[index % colors.length] }}
                  />
                  <span className="text-sm text-gray-300">{item.label}</span>
                  <span className="text-sm text-glacier-400 font-semibold">{item.value}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default AnalyticsChart;
