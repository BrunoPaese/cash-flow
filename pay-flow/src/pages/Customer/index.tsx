import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../contexts/Theme/useTheme";
import { Body, Page } from "../Login/style";
import HeaderControls from "../../components/HeaderControls";
import Card from "../../components/Card";
import { Row } from "../../components/Row";
import { Col } from "../../components/Col";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { customerSchema } from "../../validations/customerSchema";
import { maskCpfCnpj } from "../../utils/mask";
import { useCustomer } from "../../contexts/Customer/useCustomer";
import { useState } from "react";
import InputButton from "../../components/InputButton";
import type { Customer } from "../../contexts/Customer/CustomerProvider";
import CustomerCard from "../../components/CustomerCard";
import { useCheckout } from "../../contexts/Checkout/useCheckout";
import { ActionFooter } from "../../components/ActionFooter";
import { CNPJ_CODE_LENGTH } from "../../domain/constants";

interface CustomerFormData {
  identifier: string;
}

function Customer() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { getCustomer, confirmCustomer } = useCustomer();
  const { checkout } = useCheckout();
  const navigate = useNavigate();
  const {
    control,
    reset,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<CustomerFormData>({
    resolver: yupResolver(customerSchema(t)),
    defaultValues: {
      identifier: checkout?.customer?.identifier,
    },
  });

  const inputIdentifier = useWatch({
    control,
    name: "identifier",
  });

  const [previewCustomer, setPreviewCustomer] = useState<Customer | undefined>(
    checkout?.customer,
  );

  const onSubmit = (data: CustomerFormData) => {
    confirmCustomer({
      identifier: data.identifier,
      name: previewCustomer?.name,
      phone: previewCustomer?.phone,
      email: previewCustomer?.email,
      country: previewCustomer?.country,
      lastPurchase: previewCustomer?.lastPurchase,
      adress: previewCustomer?.adress,
    });
    navigate("/checkout");
  };

  const handleGetCustomer = async () => {
    if (!inputIdentifier) return;
    const result = await getCustomer(inputIdentifier);
    setPreviewCustomer(result);
  };

  const handleChangeCustomer = (value: string) => {
    const masked = maskCpfCnpj(value);
    setValue("identifier", masked);
    setPreviewCustomer(undefined);
  };

  const handleClear = () => {
    reset();
    setPreviewCustomer(undefined);
    confirmCustomer(undefined);
  };

  return (
    <Page theme={theme}>
      <HeaderControls
        breadcrumbs={[
          { label: t("checkout.checkout"), path: "/checkout" },
          { label: t("customer.customer"), path: "/checkout/customer" },
        ]}
      />
      <Body>
        <Card title={t("customer.customer")} titlePadding={16}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col>
                <InputButton
                  text={t("customer.identifier")}
                  placeholder={t("customer.identifier")}
                  error={errors.identifier?.message}
                  value={inputIdentifier}
                  maxLength={CNPJ_CODE_LENGTH}
                  icon={Search}
                  onClick={handleGetCustomer}
                  {...register("identifier", {
                    onChange: (event) =>
                      handleChangeCustomer(event.target.value),
                  })}
                />
              </Col>
            </Row>
            {previewCustomer && (
              <Row>
                <Col>
                  <CustomerCard previewCustomer={previewCustomer} />
                </Col>
              </Row>
            )}
            <ActionFooter
              confirmText={t("customer.confirmCustomer")}
              disabled={!previewCustomer}
              onClear={handleClear}
            />
          </form>
        </Card>
      </Body>
    </Page>
  );
}

export default Customer;
