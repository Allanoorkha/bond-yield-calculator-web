import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import type { BondRequest } from '../types/bond';
import { Calculator, DollarSign, Percent, CalendarDays, RefreshCcw } from 'lucide-react';
import { motion } from 'framer-motion';

const schema = z.object({
    faceValue: z.number().positive('Face value must be positive'),
    couponRate: z.number().min(0, 'Coupon rate cannot be negative'),
    marketPrice: z.number().positive('Market price must be positive'),
    yearsToMaturity: z.number().positive('Years to maturity must be positive'),
    frequency: z.number(),
});

interface Props {
    onSubmit: (data: BondRequest) => void;
    isLoading?: boolean;
}

export default function BondForm({ onSubmit, isLoading }: Props) {
    const { register, handleSubmit, formState: { errors } } = useForm<BondRequest>({
        resolver: zodResolver(schema),
        defaultValues: {
            faceValue: 1000,
            couponRate: 5,
            marketPrice: 980,
            yearsToMaturity: 5,
            frequency: 2,
        }
    });

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass p-8"
        >
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-blue-500/10 rounded-2xl">
                    <Calculator className="text-blue-400" size={24} />
                </div>
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                    Bond Inputs
                </h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                    {/* Face Value */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                            <DollarSign size={14} /> Face Value
                        </label>
                        <input
                            className="input-glass"
                            type="number"
                            placeholder="1000"
                            {...register('faceValue', { valueAsNumber: true })}
                        />
                        {errors.faceValue && <p className="text-red-400 text-xs">{errors.faceValue.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Coupon Rate */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                                <Percent size={14} /> Coupon (%)
                            </label>
                            <input
                                className="input-glass"
                                type="number"
                                step="0.01"
                                placeholder="5"
                                {...register('couponRate', { valueAsNumber: true })}
                            />
                            {errors.couponRate && <p className="text-red-400 text-xs">{errors.couponRate.message}</p>}
                        </div>

                        {/* Market Price */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                                <DollarSign size={14} /> Price
                            </label>
                            <input
                                className="input-glass"
                                type="number"
                                step="0.01"
                                placeholder="980"
                                {...register('marketPrice', { valueAsNumber: true })}
                            />
                            {errors.marketPrice && <p className="text-red-400 text-xs">{errors.marketPrice.message}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Years */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                                <CalendarDays size={14} /> Years
                            </label>
                            <input
                                className="input-glass"
                                type="number"
                                step="0.1"
                                placeholder="5"
                                {...register('yearsToMaturity', { valueAsNumber: true })}
                            />
                            {errors.yearsToMaturity && <p className="text-red-400 text-xs">{errors.yearsToMaturity.message}</p>}
                        </div>

                        {/* Frequency */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                                <RefreshCcw size={14} /> Frequency
                            </label>
                            <select
                                className="input-glass appearance-none"
                                {...register('frequency', { valueAsNumber: true })}
                            >
                                <option value={1} className="bg-[#0b0f1a]">Annual</option>
                                <option value={2} className="bg-[#0b0f1a]">Semi-Annual</option>
                                <option value={4} className="bg-[#0b0f1a]">Quarterly</option>
                                <option value={12} className="bg-[#0b0f1a]">Monthly</option>
                            </select>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full relative group overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 
                     text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 
                     transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] 
                     disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>
                            <Calculator size={18} />
                            Calculate Returns
                        </>
                    )}
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
                </button>
            </form>
        </motion.div>
    );
}
