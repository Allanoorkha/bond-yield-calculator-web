import type { CashFlow } from '../types/bond';

export function exportToCSV(flows: CashFlow[]) {
    const headers = [
        'Period',
        'Payment Date',
        'Coupon Payment',
        'Cumulative Interest',
        'Remaining Principal',
    ];

    const rows = flows.map((f) => [
        f.period,
        new Date(f.paymentDate).toLocaleDateString(),
        f.couponPayment,
        f.cumulativeInterest,
        f.remainingPrincipal,
    ]);

    const csvContent =
        'data:text/csv;charset=utf-8,' +
        [headers, ...rows]
            .map((row) => row.join(','))
            .join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'cashflow_schedule.csv');
    document.body.appendChild(link);
    link.click();
}
