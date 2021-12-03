import ContainerLayout from "./common/ContainerLayout";
import PayFilter from "../components/payment/PayFilter/index";
import PayResult from "../components/payment/PayResult";
import { useState } from "react";

const Payment = () => {
  const [payStatusKeyword, setPayStatusKeyword] = useState<string>();
  const [plateNumKeyword, setPlateNumKeyword] = useState<string>();

  return (
    <ContainerLayout titleName="결제관리">
      <PayFilter
        setPayStatusKeyword={setPayStatusKeyword}
        setPlateNumKeyword={setPlateNumKeyword}
      />
      <PayResult
        payStatusKeyword={payStatusKeyword}
        plateNumKeyword={plateNumKeyword}
      />
    </ContainerLayout>
  );
};

export default Payment;
