import ContainerLayout from "./common/ContainerLayout";
import PayFilter from "../components/payment/PayFilter/index";
import PayResult from "../components/payment/PayResult";
import { useState } from "react";

const Payment = () => {
  const [filterKeyword, setFilterKeyword] = useState<string>();

  return (
    <ContainerLayout titleName="결제관리">
      <PayFilter setFilterKeyword={setFilterKeyword} />
      <PayResult filterKeyword={filterKeyword} />
    </ContainerLayout>
  );
};

export default Payment;
