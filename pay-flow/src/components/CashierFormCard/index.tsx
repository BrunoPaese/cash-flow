import { useTranslation } from "react-i18next";
import Card from "../Card";
import { Row } from "../Row";
import { Col } from "../Col";
import Input from "../Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { CPF_CODE_LENGTH } from "../../domain/constants";
import { useCashier } from "../../contexts/Cashier/useCashier";
import { newCashierSchema } from "../../validations/newCashierSchema";
import { ActionFooter } from "../ActionFooter";
import { maskCpfCnpj } from "../../utils/mask";

// export interface CashierFormData {
//   item: string;
//   description: string;
//   price: number;
//   costPrice: number;
//   stock: number;
//   minStock: number;
//   maxStock: number;
//   barCode: string;
//   isActive: boolean;
// }

export interface CashierFormData {
  cpf: string;
  name: string;
  email: string;
  isActive: boolean;
  rating: number;
  createdAt: Date;
}

function CashierFormCard() {
  const { t } = useTranslation();
  const { addCashier } = useCashier();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CashierFormData>({
    resolver: yupResolver(newCashierSchema(t)),
  });

  const handleAddCashier = (cashier: CashierFormData) => {
    addCashier(cashier);
    reset();
  };

  const handleClear = () => {
    reset();
  };

  const handleChangeCustomer = (value: string) => {
    const masked = maskCpfCnpj(value);
    setValue("cpf", masked);
  };

  return (
    <Card title={t("cashier.newCashier")}>
      <form onSubmit={handleSubmit(handleAddCashier)}>
        <Row>
          <Col>
            <Input
              text={t("cashier.enterCashier")}
              placeholder={t("cashier.cpf")}
              error={errors.cpf?.message}
              autoFocus
              maxLength={CPF_CODE_LENGTH}
              {...register("cpf", {
                onChange: (event) => handleChangeCustomer(event.target.value),
              })}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              text={t("cashier.enterCashier")}
              placeholder={t("cashier.name")}
              error={errors.name?.message}
              {...register("name")}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              text={t("cashier.enterCashier")}
              placeholder={t("cashier.email")}
              error={errors.email?.message}
              {...register("email")}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              text={t("cashier.enterCashier")}
              placeholder={t("cashier.createdAt")}
              error={errors.createdAt?.message}
              disabled
              {...register("createdAt")}
            />
          </Col>
        </Row>
        <ActionFooter
          confirmText={t("cashier.addCashier")}
          onClear={handleClear}
        />
      </form>
    </Card>
  );
}

export default CashierFormCard;
