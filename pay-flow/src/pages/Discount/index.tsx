import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../contexts/Theme/useTheme";
import { Body, Page } from "../Login/style";
import HeaderControls from "../../components/HeaderControls";
import { useDiscount } from "../../contexts/Discount/useDiscount";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { discountSchema } from "../../validations/discountSchema";
import Card from "../../components/Card";
import { Row } from "../../components/Row";
import { Col } from "../../components/Col";
import InputButton from "../../components/InputButton";
import { Search } from "lucide-react";
import type { Discount } from "../../contexts/Discount/DiscountProvider";
import DiscountCard from "../../components/DiscountCard";
import { useCheckout } from "../../contexts/Checkout/useCheckout";
import { ActionFooter } from "../../components/ActionFooter";
import {
  calculateDiscountValue,
  calculateTotalWithDiscount,
} from "../../utils/saleCalculations";

interface DiscountFormData {
  couponCode: string;
}

function Discount() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { checkout } = useCheckout();
  const { getDiscount, confirmDiscount } = useDiscount();
  const navigate = useNavigate();

  const {
    reset,
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DiscountFormData>({
    resolver: yupResolver(discountSchema(t)),
    defaultValues: { couponCode: checkout?.discount?.couponCode },
  });

  const [previewDiscount, setPreviewDiscount] = useState<Discount | undefined>(
    checkout?.discount,
  );

  const couponCode = useWatch({
    control,
    name: "couponCode",
  });

  const onSubmit = (data: DiscountFormData) => {
    confirmDiscount({
      couponCode: data.couponCode.toUpperCase(),
      discountPercentage: previewDiscount?.discountPercentage,
      discountValue: previewDiscount?.discountValue,
    });
    navigate("/checkout");
  };

  const handleGetDiscount = async () => {
    if (!couponCode) return;
    const result = await getDiscount(couponCode);
    const previewDiscountValue = calculateDiscountValue(
      checkout?.payment?.subTotal,
      result?.discountPercentage,
    );
    const previewTotalWithDiscount = calculateTotalWithDiscount(
      checkout?.payment?.subTotal,
      previewDiscountValue,
    );
    setPreviewDiscount({
      ...result,
      discountValue: previewDiscountValue,
      totalWithDiscount: previewTotalWithDiscount,
    });
  };

  const handleClear = () => {
    reset();
    setPreviewDiscount(undefined);
    confirmDiscount(undefined);
  };

  return (
    <Page theme={theme}>
      <HeaderControls
        breadcrumbs={[
          { label: t("checkout.checkout"), path: "/checkout" },
          { label: t("discount.discount"), path: "/checkout/discount" },
        ]}
      />
      <Body>
        <Card title={t("discount.discount")} titlePadding={16}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col>
                <InputButton
                  label={t("discount.coupon")}
                  text={t("discount.coupon")}
                  error={errors.couponCode?.message}
                  value={couponCode}
                  icon={Search}
                  onClick={handleGetDiscount}
                  {...register("couponCode", {
                    onChange: () => setPreviewDiscount(undefined),
                  })}
                />
              </Col>
            </Row>
            {previewDiscount && (
              <Row>
                <Col>
                  <DiscountCard previewDiscount={previewDiscount} />
                </Col>
              </Row>
            )}
            <ActionFooter
              confirmText={t("cashier.confirmCashier")}
              disabled={!previewDiscount}
              onClear={handleClear}
            />
          </form>
        </Card>
      </Body>
    </Page>
  );
}

export default Discount;
