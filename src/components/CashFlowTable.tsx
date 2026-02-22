import type { CashFlow } from '../types/bond';
import { motion } from 'framer-motion';

export default function CashFlowTable({ flows = [] }: { flows: CashFlow[] }) {
    const tableData = Array.isArray(flows) ? flows : [];

    if (tableData.length === 0) return null;

    return (

        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass overflow-hidden mt-8"
        >
            <div className="p-8 border-b border-white/5 bg-white/[0.01]">
                <h2 className="text-xl font-bold text-white">Full Schedule</h2>
                <p className="text-xs text-slate-500 mt-1">Detailed period-by-period payment breakdown</p>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full premium-table">
                    <thead>
                        <tr>
                            <th>Period</th>
                            <th>Payment Date</th>
                            <th>Coupon</th>
                            <th>Cumulative</th>
                            <th>Principal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((flow, index) => (
                            <motion.tr
                                key={flow.period}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="glass-hover group"
                            >
                                <td className="font-mono text-slate-500">{flow.period.toString().padStart(2, '0')}</td>
                                <td className="font-medium">
                                    {new Date(flow.paymentDate).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'short',
                                        day: '2-digit'
                                    })}
                                </td>
                                <td className="text-emerald-400 font-mono font-medium">
                                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(flow.couponPayment)}
                                </td>
                                <td className="text-blue-400 font-mono">
                                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(flow.cumulativeInterest)}
                                </td>
                                <td className="text-slate-300 font-mono opacity-60 group-hover:opacity-100 transition-opacity">
                                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(flow.remainingPrincipal)}
                                </td>
                            </motion.tr>

                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
}
