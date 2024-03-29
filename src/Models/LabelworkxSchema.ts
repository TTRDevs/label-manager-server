export interface LabelworkxSalesReport {
    labelName: string;
    catalog: string;
    releaseArtist: string;
    releaseName: string;
    trackArtist: string;
    trackTitle: string;
    mixName: string;
    format: string;
    saleType: string;
    qty: number;
    value: number;
    royaltyISRC: string;
    EAN: string;
    storeName: string;
}

export const LabelworkxSalesReportTable = 'labelworkx_sales_report';