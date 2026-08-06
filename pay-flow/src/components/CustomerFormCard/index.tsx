import { useTranslation } from "react-i18next";
import Card from "../Card";
import { Row } from "../Row";
import { Col } from "../Col";
import Input from "../Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray, useForm } from "react-hook-form";
import {
  CNPJ_CODE_LENGTH,
  PHONE_LENGTH,
  POSTAL_CODE_LENGTH,
} from "../../domain/constants";
import { ActionFooter } from "../ActionFooter";
import { maskCpfCnpj, maskPhone, maskPostalCode } from "../../utils/mask";
import { newCustomerSchema } from "../../validations/newCustomerSchema";
import { useCustomer } from "../../contexts/Customer/useCustomer";
import FileInput from "../FileInput";
import { ImagePlus, Plus, Search, Trash } from "lucide-react";
import { useState } from "react";
import Button from "../Button";
import InputButton from "../InputButton";
import { useAddress } from "../../contexts/Address/useAddress";
import { colors } from "../Style/theme";

export interface Address {
  street: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city: string;
  postalCode: string;
  uf: string;
}

export interface CustomerFormData {
  identifier: string;
  name: string;
  photo?: File;
  phone: string;
  email: string;
  address: Address[];
}

function CustomerFormCard() {
  const { t } = useTranslation();
  const { addCustomer } = useCustomer();
  const { getAddress } = useAddress();

  const emptyAddress: Address = {
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    postalCode: "",
    uf: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    control,
    formState: { errors },
  } = useForm<CustomerFormData>({
    resolver: yupResolver(newCustomerSchema(t)),
    defaultValues: {
      identifier: "",
      name: "",
      phone: "",
      email: "",
      address: [emptyAddress],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "address",
  });

  const [imagePreview, setImagePreview] = useState("");

  const handleAddCustomer = async (customer: CustomerFormData) => {
    addCustomer(customer);
    // reset();
    setImagePreview("");
  };

  const handleChangeIdentifier = (value: string) => {
    setValue("identifier", maskCpfCnpj(value));
  };

  const handleChangePhone = (value: string) => {
    setValue("phone", maskPhone(value));
  };

  const handlePostalCode = (index: number, value: string) => {
    setValue(`address.${index}.postalCode`, maskPostalCode(value));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    setImagePreview(URL.createObjectURL(file));
    setValue("photo", file);
  };

  const handleRemovePhoto = () => {
    setImagePreview("");
    setValue("photo", undefined);
  };

  const handleGetAddress = async (index: number) => {
    const postalCode = getValues(`address.${index}.postalCode`);

    if (!postalCode) return;

    const address = await getAddress(postalCode);

    if (!address) return;

    setValue(`address.${index}.street`, address.street);
    setValue(`address.${index}.complement`, address.complement);
    setValue(`address.${index}.neighborhood`, address.neighborhood);
    setValue(`address.${index}.city`, address.city);
    setValue(`address.${index}.uf`, address.uf);
  };

  return (
    <form onSubmit={handleSubmit(handleAddCustomer)}>
      <Row>
        <Col>
          <Row>
            <Col xs={12}>
              <Card title={t("customer.personalInformation")}>
                <Row>
                  <Col xs={3}>
                    <FileInput
                      text={t("customer.uploadPhoto")}
                      preview={imagePreview}
                      onChange={handleImageChange}
                      icon={ImagePlus}
                      label=""
                    />
                    {imagePreview && (
                      <Button
                        text={t("customer.removePhoto")}
                        icon={Trash}
                        variant="ghost"
                        color={colors.red}
                        onClick={handleRemovePhoto}
                        fullWidth
                      />
                    )}
                  </Col>
                  <Col xs={9}>
                    <Row>
                      <Col>
                        <Input
                          text=""
                          label={t("customer.name")}
                          placeholder={t("customer.placeholderName")}
                          error={errors.name?.message}
                          {...register("name")}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={6}>
                        <Input
                          text=""
                          label={t("customer.identifier")}
                          placeholder={t("customer.defaultIdentifier")}
                          error={errors.identifier?.message}
                          maxLength={CNPJ_CODE_LENGTH}
                          {...register("identifier")}
                          onChange={(e) =>
                            handleChangeIdentifier(e.target.value)
                          }
                        />
                      </Col>
                      <Col xs={6}>
                        <Input
                          text=""
                          label={t("customer.phone")}
                          placeholder={t("customer.defaultPhone")}
                          error={errors.phone?.message}
                          maxLength={PHONE_LENGTH}
                          {...register("phone")}
                          onChange={(e) => handleChangePhone(e.target.value)}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Input
                          text=""
                          label={t("customer.email")}
                          placeholder={t("customer.defaultEmail")}
                          error={errors.email?.message}
                          uppercase={false}
                          {...register("email")}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          {fields.map((field, index) => (
            <Row key={field.id}>
              <Col xs={12}>
                <Card
                  title={`${t("address.address")} ${index + 1}`}
                  onDelete={fields.length > 1 ? () => remove(index) : undefined}
                >
                  <Row>
                    <Col xs={3}>
                      <InputButton
                        icon={Search}
                        onClick={() => handleGetAddress(index)}
                        text=""
                        placeholder={t("address.placeholderPostalCode")}
                        label={t("address.postalCode")}
                        maxLength={POSTAL_CODE_LENGTH}
                        error={errors.address?.[index]?.postalCode?.message}
                        {...register(`address.${index}.postalCode`)}
                        onChange={(e) =>
                          handlePostalCode(index, e.target.value)
                        }
                      />
                    </Col>
                    <Col xs={9}>
                      <Input
                        text=""
                        placeholder={t("address.placeholderStreet")}
                        label={t("address.street")}
                        error={errors.address?.[index]?.street?.message}
                        {...register(`address.${index}.street`)}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={2}>
                      <Input
                        text=""
                        label={t("address.number")}
                        placeholder={t("address.placeholderNumber")}
                        error={errors.address?.[index]?.number?.message}
                        {...register(`address.${index}.number`)}
                      />
                    </Col>
                    <Col xs={10}>
                      <Input
                        text=""
                        label={t("address.complement")}
                        placeholder={t("address.placeholderComplement")}
                        error={errors.address?.[index]?.complement?.message}
                        {...register(`address.${index}.complement`)}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={4}>
                      <Input
                        text=""
                        label={t("address.neighborhood")}
                        placeholder={t("address.placeholderNeighborhood")}
                        error={errors.address?.[index]?.neighborhood?.message}
                        {...register(`address.${index}.neighborhood`)}
                      />
                    </Col>
                    <Col xs={7}>
                      <Input
                        text=""
                        label={t("address.city")}
                        placeholder={t("address.placeholderCity")}
                        error={errors.address?.[index]?.city?.message}
                        {...register(`address.${index}.city`)}
                      />
                    </Col>
                    <Col xs={1}>
                      <Input
                        text=""
                        label={t("address.uf")}
                        placeholder={t("address.placeholderUf")}
                        error={errors.address?.[index]?.uf?.message}
                        {...register(`address.${index}.uf`)}
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          ))}
          <Row>
            <Col>
              <Button
                text={t("address.addAddress")}
                icon={Plus}
                variant="outline"
                fullWidth
                onClick={() => append(emptyAddress)}
              >
                {t("address.addAddress")}
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <ActionFooter
                confirmText={t("customer.addCustomer")}
                onClear={() => reset()}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </form>
  );
}

export default CustomerFormCard;
