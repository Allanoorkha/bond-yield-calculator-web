import type { BondResponse } from '../types/bond';
import { motion } from 'framer-motion';
import { TrendingUp, PieChart, Activity, Tag } from 'lucide-react';

export default function ResultsCard({ data }: { data: BondResponse }) {
    const ytm = typeof data?.ytm === 'number' ? data.ytm : 0;
    const currentYield = typeof data?.currentYield === 'number' ? data.currentYield : 0;
    const totalInterest = typeof data?.totalInterest === 'number' ? data.totalInterest : 0;
    const remainingPrincipal = typeof data?.cashFlows?.[0]?.remainingPrincipal === 'number'
        ? data.cashFlows[0].remainingPrincipal
        : 0;

    const cards = [
        {
            label: 'Yield to Maturity',
            value: `${ytm.toFixed(3)}%`,
            icon: <TrendingUp className="text-emerald-400" />,
            sub: 'Annualized return if held',
            color: 'bg-emerald-500/10'
        },
        {
            label: 'Current Yield',
            value: `${currentYield.toFixed(3)}%`,
            icon: <Activity className="text-blue-400" />,
            sub: 'Coupon / Market Price',
            color: 'bg-blue-500/10'
        },
        {
            label: 'Total Payout',
            value: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalInterest + remainingPrincipal),
            icon: <PieChart className="text-purple-400" />,
            sub: 'Interest + Principal',
            color: 'bg-purple-500/10'
        },
        {
            label: 'Market Status',
            value: data?.premiumOrDiscount || 'N/A',
            icon: <Tag className="text-amber-400" />,
            sub: 'Price vs Face Value',
            color: 'bg-amber-500/10',
            status: true
        }
    ];


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cards.map((card, index) => (
                <motion.div
                    key={card.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass glass-hover p-6"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div className={`p-3 rounded-2xl ${card.color}`}>
                            {card.icon}
                        </div>
                        {card.status && (
                            <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter
                ${data.premiumOrDiscount === 'Premium' ? 'bg-emerald-500/20 text-emerald-400' :
                                    data.premiumOrDiscount === 'Discount' ? 'bg-red-500/20 text-red-400' : 'bg-slate-500/20 text-slate-400'}`}>
                                {data.premiumOrDiscount}
                            </span>
                        )}
                    </div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">{card.label}</p>
                    <h3 className="text-2xl font-bold text-white mt-1 tabular-nums">{card.value}</h3>
                    <p className="text-[10px] text-slate-400 mt-2">{card.sub}</p>
                </motion.div>
            ))}
        </div>
    );
}
