export interface ZebralutionSalesReport {
    period: string;
    periodSold: string;
    code: string;
    name: string;
    licenseCc: string;
    label: string;
    lc: string;
    artist: string;
    title: string;
    ean: string;
    isrc: string;
    labelOrderProvider: string;
    shop: string;
    content: string;
    country: string;
    retailPrice: number;
    retailPricePublic: number;
    publMin: number;
    publPiece: number;
    publEurIncome: number;
    sharePercent: number;
    shareEur: number;
    sales: number;
    revenueEur: number;
    revLessPublEur: number;
}

export const ZebralutionSalesReportTable = 'zebralution_sales_report';
