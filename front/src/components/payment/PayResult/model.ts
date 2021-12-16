export interface PayDataListProps {
  payID: number;
  payStatus: string;
  payDate: string;
  plateNum: string;
  payPrice: number;
  orderDetail: string;
  cancelReason: string;
  cancelImgURL: [];
  cancelClaim: string;
}

export interface FilterValueProps {
  startDate?: Date;
  endDate?: Date;
  payStatusKeyword: string | undefined;
  plateNumKeyword: string | undefined;
}
