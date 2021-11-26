import ContainerLayout from "./common/ContainerLayout";
import PayFilter from "../components/payment/PayFilter/index";
import PayResult from "../components/payment/PayResult";

const Payment = () => {
  return (
    <ContainerLayout titleName="결제관리">
      <PayFilter />
      <PayResult />
    </ContainerLayout>
  );
};

export default Payment;
