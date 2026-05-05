import { useTranslation } from "react-i18next";
import Card from "../Card";
import { Row } from "../Row";
import { Col } from "../Col";
import Input from "../Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ActionFooter } from "../ActionFooter";
import Select from "../Select";
import { useState } from "react";
import { newShippingSchema } from "../../validations/newShippingSchema";
import { useShipping } from "../../contexts/Shipping/useShipping";

export interface ShippingFormData {
  type: number;
  name: string;
}

function ShippingFormCard() {
  const { t } = useTranslation();
  const { addShipping } = useShipping();

  const [type, setType] = useState<number>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ShippingFormData>({
    resolver: yupResolver(newShippingSchema(t)),
  });

  const handleAddProduct = async (shipping: ShippingFormData) => {
    const normalizedShipping: ShippingFormData = {
      ...shipping,
      name: shipping.name.toUpperCase(),
    };
    addShipping(normalizedShipping);
    reset();
  };

  const handleClear = () => {
    reset();
  };

  return (
    <Card title={t("shipping.newShipping")}>
      <form onSubmit={handleSubmit(handleAddProduct)}>
        <Row>
          <Col>
            <Select
              label={t("shipping.type")}
              text={t("shipping.type")}
              value={type}
              onChange={(value) => setType(value)}
              options={[
                { label: "PAC", value: 1, icon: null },
                { label: "Sedex", value: 2, icon: null },
                { label: "Transportadora", value: 3, icon: null },
              ]}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              label={t("shipping.name")}
              text={t("product.enterCustomer")}
              error={errors.name?.message}
              autoFocus
              {...register("name")}
            />
          </Col>
        </Row>
        <ActionFooter
          confirmText={t("shipping.addShipping")}
          onClear={handleClear}
        />
      </form>
    </Card>
  );
}

export default ShippingFormCard;
