import { useState } from 'react';
import BondForm from './components/BondForm';
import ResultsCard from './components/ResultsCard';
import CashFlowTable from './components/CashFlowTable';
import CashFlowChart from './components/CashFlowChart';
import { calculateBond } from './services/api';
import type { BondResponse, BondRequest } from './types/bond';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Info } from 'lucide-react';

function App() {
  const [result, setResult] = useState<BondResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Running Bisection Analysis...');
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = async (data: BondRequest) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    try {
      setLoading(true);
      setError(null);
      setLoadingMessage('Running Bisection Analysis...');

      // If the request takes longer than 4 seconds, the Render server is likely spinning up
      timeoutId = setTimeout(() => {
        setLoadingMessage('Waking up server (might take ~40-50 secs)...');
      }, 4000);

      const response = await calculateBond(data);
      setResult(response);
    } catch {
      setError('Connection failed. The server might be waking up, please try again in 30 seconds.');
    } finally {
      clearTimeout(timeoutId!);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <Sparkles className="text-blue-500 animate-pulse" size={24} />
            <span className="text-blue-500 font-bold uppercase tracking-[0.3em] text-[10px]">Financial Intelligence</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-black text-white tracking-tight mb-4"
          >
            Bond Analytics <span className="text-blue-600">Pro</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto text-lg"
          >
            Real-time yield calculations and cash flow projections
            using institutional-grade bisection engines.
          </motion.p>
        </header>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 sticky top-12">
            <BondForm onSubmit={handleCalculate} isLoading={loading} />

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex gap-3 text-red-400 text-xs"
                >
                  <Info size={16} className="shrink-0" />
                  <p>{error}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full min-h-[400px] flex flex-col items-center justify-center space-y-4"
                >
                  <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                  <p className="text-blue-400 font-medium animate-pulse">{loadingMessage}</p>
                </motion.div>
              ) : !result ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full min-h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[2rem] text-slate-600"
                >
                  <p className="text-lg font-medium">Ready for calculation</p>
                  <p className="text-sm">Input bond parameters to see visual analytics</p>
                </motion.div>
              ) : (
                <motion.div
                  key="results-view"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-8"
                >
                  <ResultsCard data={result} />
                  <CashFlowChart flows={result.cashFlows} />
                  <CashFlowTable flows={result.cashFlows} />
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

        <footer className="mt-24 pt-8 border-t border-white/5 text-center">
          <p className="text-slate-600 text-[10px] uppercase tracking-[0.2em]">
            Institutional Grade Calculator • © 2026 Financial Systems Inc.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
