export interface BondRequest {
    faceValue: number;
    couponRate: number;
    marketPrice: number;
    yearsToMaturity: number;
    frequency: number;
}

export interface CashFlow {
    period: number;
    paymentDate: string;
    couponPayment: number;
    cumulativeInterest: number;
    remainingPrincipal: number;
}

export interface BondResponse {
    currentYield: number;
    ytm: number;
    totalInterest: number;
    premiumOrDiscount: string;
    cashFlows: CashFlow[];
}
