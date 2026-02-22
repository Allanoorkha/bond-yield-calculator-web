import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    BarChart,
    Bar,
} from 'recharts';
import { useState } from 'react';
import type { CashFlow } from '../types/bond';
import { motion, AnimatePresence } from 'framer-motion';
import { exportToCSV } from '../utils/exportCSV';
import { Download, ChartBar, ChartLine, TrendingUp, DollarSign } from 'lucide-react';

interface Props {
    flows: CashFlow[];
}

export default function CashFlowChart({ flows = [] }: Props) {
    const [view, setView] = useState<'line' | 'bar'>('line');
    const [metric, setMetric] = useState<'coupon' | 'cumulative'>('coupon');

    const chartData = Array.isArray(flows) ? flows : [];
    if (chartData.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass p-8 mt-8"
        >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                <div>
                    <h2 className="text-xl font-bold text-white">Cash Flow Visualization</h2>
                    <p className="text-xs text-slate-500 mt-1">Interactive data exploration and export</p>
                </div>

                <div className="flex flex-wrap gap-2">
                    {/* Metric Selector */}
                    <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                        <button
                            onClick={() => setMetric('coupon')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2
                ${metric === 'coupon' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-white'}`}
                        >
                            <DollarSign size={12} /> Coupon
                        </button>
                        <button
                            onClick={() => setMetric('cumulative')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2
                ${metric === 'cumulative' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-white'}`}
                        >
                            <TrendingUp size={12} /> Cumulative
                        </button>
                    </div>

                    {/* View Toggles */}
                    <button
                        onClick={() => setView(view === 'line' ? 'bar' : 'line')}
                        className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl transition-all"
                        title="Toggle Chart Type"
                    >
                        {view === 'line' ? <ChartBar size={18} /> : <ChartLine size={18} />}
                    </button>

                    {/* Export */}
                    <button
                        onClick={() => exportToCSV(flows)}
                        className="px-4 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-600/30 text-emerald-400 rounded-xl text-xs font-bold transition-all flex items-center gap-2"
                    >
                        <Download size={14} /> Export CSV
                    </button>
                </div>
            </div>

            <div className="h-[300px] w-full">
                <AnimatePresence mode="wait">
                    {view === 'line' ? (
                        <ResponsiveContainer width="100%" height="100%" key="line-view">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis
                                    dataKey="period"
                                    stroke="#64748b"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    dy={10}
                                />
                                <YAxis
                                    stroke="#64748b"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `$${value}`}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#0f172a',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '12px',
                                        fontSize: '12px'
                                    }}
                                    itemStyle={{ color: '#f8fafc' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey={metric === 'coupon' ? 'couponPayment' : 'cumulativeInterest'}
                                    stroke="#3b82f6"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorMetric)"
                                    animationDuration={1500}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%" key="bar-view">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis
                                    dataKey="period"
                                    stroke="#64748b"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    dy={10}
                                />
                                <YAxis
                                    stroke="#64748b"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `$${value}`}
                                />
                                <Tooltip
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                    contentStyle={{
                                        backgroundColor: '#0f172a',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '12px',
                                        fontSize: '12px'
                                    }}
                                />
                                <Bar
                                    dataKey="remainingPrincipal"
                                    fill="#10b981"
                                    radius={[4, 4, 0, 0]}
                                    animationDuration={1500}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
