import ContainerLayout from "./common/ContainerLayout";
import PayFilter from "../components/payment/PayFilter/index";
import PayResult from "../components/payment/PayResult";
import { useState } from "react";

const Payment = () => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [payStatusKeyword, setPayStatusKeyword] = useState<string>();
  const [plateNumKeyword, setPlateNumKeyword] = useState<string>();

  return (
    <ContainerLayout titleName="결제관리">
      <PayFilter
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        payStatusKeyword={payStatusKeyword}
        setPayStatusKeyword={setPayStatusKeyword}
        setPlateNumKeyword={setPlateNumKeyword}
      />
      <PayResult
        startDate={startDate}
        endDate={endDate}
        payStatusKeyword={payStatusKeyword}
        plateNumKeyword={plateNumKeyword}
      />
    </ContainerLayout>
  );
};

export default Payment;
