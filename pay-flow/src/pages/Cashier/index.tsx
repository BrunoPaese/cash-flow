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
import InputButton from "../../components/InputButton";
import { useCashier } from "../../contexts/Cashier/useCashier";
import { cashierSchema } from "../../validations/cashierSchema";
import { useState } from "react";
import CashierCard from "../../components/CashierCard";
import { useCheckout } from "../../contexts/Checkout/useCheckout";
import { ActionFooter } from "../../components/ActionFooter";
import type { Cashier } from "../../contexts/Cashier/CashierContext";

interface CashierFormData {
  id: number;
}

function Cashier() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { getCashier, confirmCashier } = useCashier();
  const { checkout } = useCheckout();
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CashierFormData>({
    resolver: yupResolver(cashierSchema(t)),
    defaultValues: { id: checkout?.cashier?.id },
  });

  const [previewCashier, setPreviewCashier] = useState<Cashier | undefined>(
    checkout?.cashier,
  );

  const inputId = useWatch({
    control,
    name: "id",
  });

  const onSubmit = (data: CashierFormData) => {
    confirmCashier({
      id: data.id,
      name: previewCashier?.name,
      rating: previewCashier?.rating,
    });
    navigate("/checkout");
  };

  const handleGetCashier = async () => {
    if (!inputId) return;
    const result = await getCashier(inputId);
    setPreviewCashier(result);
  };

  const handleClear = () => {
    reset();
    setPreviewCashier(undefined);
    confirmCashier(undefined);
  };

  return (
    <Page theme={theme}>
      <HeaderControls
        breadcrumbs={[
          { label: t("checkout.checkout"), path: "/checkout" },
          { label: t("cashier.cashier"), path: "/checkout/cashier" },
        ]}
      />
      <Body>
        <Card title={t("cashier.cashier")} titlePadding={16}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col>
                <InputButton
                  text={t("cashier.id")}
                  placeholder={t("cashier.id")}
                  error={errors.id?.message}
                  value={inputId}
                  maxLength={3}
                  icon={Search}
                  onClick={handleGetCashier}
                  {...register("id", {
                    onChange: () => setPreviewCashier(undefined),
                  })}
                />
              </Col>
            </Row>
            {previewCashier && (
              <Row>
                <Col>
                  <CashierCard previewCashier={previewCashier} />
                </Col>
              </Row>
            )}
            <ActionFooter
              confirmText={t("cashier.confirmCashier")}
              disabled={!previewCashier}
              onClear={handleClear}
            />
          </form>
        </Card>
      </Body>
    </Page>
  );
}

export default Cashier;
