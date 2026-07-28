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
import { formatPhoneInternational } from "../../utils/phone";

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

  const handleChangeIdentifier = (value: string) => {
    const masked = maskCpfCnpj(value);
    setValue("identifier", masked);
  };

  const handleChangePhone = (value: string) => {
    const masked = formatPhoneInternational(value, "BR");
    console.log("Masked phone:", masked);
    setValue("phone", masked);
  };

  return (
    <Card title={t("customer.newCustomer")}>
      <form onSubmit={handleSubmit(handleAddCustomer)}>
        <Row>
          <Col>
            <Input
              label={t("customer.identifier")}
              text={t("customer.enterCustomer")}
              error={errors.identifier?.message}
              autoFocus
              maxLength={CNPJ_CODE_LENGTH}
              {...register("identifier", {
                onChange: (event) => handleChangeIdentifier(event.target.value),
              })}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              label={t("customer.name")}
              text={t("customer.enterCustomer")}
              error={errors.name?.message}
              {...register("name")}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              label={t("customer.phone")}
              text={t("customer.enterCustomer")}
              error={errors.phone?.message}
              {...register("phone", {
                onChange: (event) => handleChangePhone(event.target.value),
              })}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              label={t("customer.email")}
              text={t("customer.enterCustomer")}
              error={errors.email?.message}
              uppercase={false}
              {...register("email")}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              label={t("address.street")}
              text={t("address.enterCustomer")}
              error={errors.address?.street?.message}
              {...register("address.street")}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              label={t("address.number")}
              text={t("address.enterCustomer")}
              error={errors.address?.number?.message}
              {...register("address.number")}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              label={t("address.city")}
              text={t("address.enterCustomer")}
              error={errors.address?.city?.message}
              {...register("address.city")}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              label={t("address.postalCode")}
              text={t("address.enterCustomer")}
              error={errors.address?.postalCode?.message}
              {...register("address.postalCode")}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              label={t("address.state")}
              text={t("address.enterCustomer")}
              error={errors.address?.state?.message}
              {...register("address.state")}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              label={t("address.uf")}
              text={t("address.enterCustomer")}
              error={errors.address?.uf?.message}
              {...register("address.uf")}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              label={t("address.country")}
              text={t("address.enterCustomer")}
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
