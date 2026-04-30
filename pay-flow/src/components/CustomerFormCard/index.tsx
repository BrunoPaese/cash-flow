import { useTranslation } from "react-i18next";
import Card from "../Card";
import { Row } from "../Row";
import { Col } from "../Col";
import Input from "../Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { CNPJ_CODE_LENGTH } from "../../domain/constants";
import { ActionFooter } from "../ActionFooter";
import { maskCpfCnpj } from "../../utils/mask";
import { newCustomerSchema } from "../../validations/newCustomerSchema";
import { useCustomer } from "../../contexts/Customer/useCustomer";

export interface Address {
  street: string;
  number?: string;
  city: string;
  postalCode: string;
  state: string;
  uf: string;
  country: string;
}

export interface CustomerFormData {
  identifier: string;
  name: string;
  phone: string;
  email: string;
  address: Address;
}

function CustomerFormCard() {
  const { t } = useTranslation();
  const { addCustomer } = useCustomer();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CustomerFormData>({
    resolver: yupResolver(newCustomerSchema(t)),
  });

  const handleAddCustomer = async (customer: CustomerFormData) => {
    const normalizedCustomer: CustomerFormData = {
      ...customer,
      identifier: customer.identifier.toUpperCase(),
      name: customer.name.toUpperCase(),
      address: {
        ...customer.address,
        street: customer.address.street.toUpperCase(),
        city: customer.address.city.toUpperCase(),
        postalCode: customer.address.postalCode.toUpperCase(),
        state: customer.address.state.toUpperCase(),
        uf: customer.address.uf.toUpperCase(),
        country: customer.address.country.toUpperCase(),
      },
    };
    addCustomer(normalizedCustomer);
    reset();
  };

  const handleClear = () => {
    reset();
  };

  const handleChangeCustomer = (value: string) => {
    const masked = maskCpfCnpj(value);
    setValue("identifier", masked);
  };

  return (
    <Card title={t("customer.newCustomer")}>
      <form onSubmit={handleSubmit(handleAddCustomer)}>
        <Row>
          <Col>
            <Input
              text={t("customer.enterCustomer")}
              placeholder={t("customer.identifier")}
              error={errors.identifier?.message}
              autoFocus
              maxLength={CNPJ_CODE_LENGTH}
              {...register("identifier", {
                onChange: (event) => handleChangeCustomer(event.target.value),
              })}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              text={t("customer.enterCustomer")}
              placeholder={t("customer.name")}
              error={errors.name?.message}
              {...register("name")}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              text={t("customer.enterCustomer")}
              placeholder={t("customer.phone")}
              error={errors.phone?.message}
              {...register("phone")}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              text={t("customer.enterCustomer")}
              placeholder={t("customer.email")}
              error={errors.email?.message}
              uppercase={false}
              {...register("email")}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              text={t("address.enterCustomer")}
              placeholder={t("address.street")}
              error={errors.address?.street?.message}
              {...register("address.street")}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              text={t("address.enterCustomer")}
              placeholder={t("address.number")}
              error={errors.address?.number?.message}
              {...register("address.number")}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              text={t("address.enterCustomer")}
              placeholder={t("address.city")}
              error={errors.address?.city?.message}
              {...register("address.city")}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              text={t("address.enterCustomer")}
              placeholder={t("address.postalCode")}
              error={errors.address?.postalCode?.message}
              {...register("address.postalCode")}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              text={t("address.enterCustomer")}
              placeholder={t("address.state")}
              error={errors.address?.state?.message}
              {...register("address.state")}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              text={t("address.enterCustomer")}
              placeholder={t("address.uf")}
              error={errors.address?.uf?.message}
              {...register("address.uf")}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              text={t("address.enterCustomer")}
              placeholder={t("address.country")}
              error={errors.address?.country?.message}
              {...register("address.country")}
            />
          </Col>
        </Row>
        <ActionFooter
          confirmText={t("customer.addCustomer")}
          onClear={handleClear}
        />
      </form>
    </Card>
  );
}

export default CustomerFormCard;
