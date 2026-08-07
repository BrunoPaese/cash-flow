import { useTranslation } from "react-i18next";
import Card from "../Card";
import { Row } from "../Row";
import { Col } from "../Col";
import Input from "../Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
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
import { toast } from "react-toastify";
import type { Customer } from "../../contexts/Customer/CustomerProvider";
import { AxiosError } from "axios";
import { useLoading } from "../../hooks/useLoading";

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
  phone: string;
  email: string;
  country?: string;
  photo?: File | null;
  addresses: Address[];
}

function CustomerFormCard() {
  const { t } = useTranslation();
  const { execute } = useLoading();
  const { getAddress } = useAddress();
  const { addCustomer, getCustomer } = useCustomer();

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
      addresses: [emptyAddress],
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "addresses",
  });

  const inputIdentifier = useWatch({
    control,
    name: "identifier",
  });

  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [photo, setPhoto] = useState<File | null>(null);

  const handleClear = () => {
    reset({
      identifier: "",
      name: "",
      phone: "",
      email: "",
    });

    replace([emptyAddress]);

    setPhoto(null);
    setImagePreview("");
    setImageUrl("");
  };

  const handleAddCustomer = async (customer: CustomerFormData) => {
    try {
      await execute(() =>
        addCustomer({
          ...customer,
          photo,
        }),
      );
      toast.success(t("customer.successAddCustomer"));
    } catch {
      toast.error(t("customer.errorAddCustomer"));
    } finally {
      handleClear();
    }
    // reset();
  };

  const handleChangeIdentifier = (value: string) => {
    setValue("identifier", maskCpfCnpj(value));
  };

  const handleChangePhone = (value: string) => {
    setValue("phone", maskPhone(value));
  };

  const handlePostalCode = (index: number, value: string) => {
    setValue(`addresses.${index}.postalCode`, maskPostalCode(value));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setPhoto(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleRemovePhoto = () => {
    setPhoto(null);
    setImagePreview("");
    setImageUrl("");
  };

  const handleGetAddress = async (index: number) => {
    const postalCode = getValues(`addresses.${index}.postalCode`);

    if (!postalCode) return;

    const address = await getAddress(postalCode);

    if (!address) return;

    setValue(`addresses.${index}.street`, address.street);
    setValue(`addresses.${index}.complement`, address.complement);
    setValue(`addresses.${index}.neighborhood`, address.neighborhood);
    setValue(`addresses.${index}.city`, address.city);
    setValue(`addresses.${index}.uf`, address.uf);
  };

  const handleGetCustomer = async () => {
    let customer: Customer | undefined;

    try {
      customer = await execute(() => getCustomer(inputIdentifier));
      toast.success(t("customer.successGetCustomer"));
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 404) {
        toast.warning(t("customer.notFound"));
        return;
      }
      toast.error(t("customer.errorGetCustomer"));
      return;
    }

    if (!customer) return;

    reset({
      identifier: maskCpfCnpj(customer.identifier),
      name: customer.name ?? "",
      phone: customer.phone ? maskPhone(customer.phone) : "",
      email: customer.email ?? "",
    });

    replace(
      customer.addresses.map((address) => ({
        ...address,
        number: address.number?.toString() ?? "",
        postalCode: maskPostalCode(address.postalCode),
      })),
    );

    setImagePreview("");
    setImageUrl(customer.photoUrl ?? "");
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
                      preview={imagePreview || imageUrl}
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
                        <InputButton
                          icon={Search}
                          text=""
                          label={t("customer.identifier")}
                          placeholder={t("customer.defaultIdentifier")}
                          error={errors.identifier?.message}
                          maxLength={CNPJ_CODE_LENGTH}
                          onClick={handleGetCustomer}
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
                        error={errors.addresses?.[index]?.postalCode?.message}
                        {...register(`addresses.${index}.postalCode`)}
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
                        error={errors.addresses?.[index]?.street?.message}
                        {...register(`addresses.${index}.street`)}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={2}>
                      <Input
                        text=""
                        label={t("address.number")}
                        placeholder={t("address.placeholderNumber")}
                        error={errors.addresses?.[index]?.number?.message}
                        {...register(`addresses.${index}.number`)}
                      />
                    </Col>
                    <Col xs={10}>
                      <Input
                        text=""
                        label={t("address.complement")}
                        placeholder={t("address.placeholderComplement")}
                        error={errors.addresses?.[index]?.complement?.message}
                        {...register(`addresses.${index}.complement`)}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={4}>
                      <Input
                        text=""
                        label={t("address.neighborhood")}
                        placeholder={t("address.placeholderNeighborhood")}
                        error={errors.addresses?.[index]?.neighborhood?.message}
                        {...register(`addresses.${index}.neighborhood`)}
                      />
                    </Col>
                    <Col xs={7}>
                      <Input
                        text=""
                        label={t("address.city")}
                        placeholder={t("address.placeholderCity")}
                        error={errors.addresses?.[index]?.city?.message}
                        {...register(`addresses.${index}.city`)}
                      />
                    </Col>
                    <Col xs={1}>
                      <Input
                        text=""
                        label={t("address.uf")}
                        placeholder={t("address.placeholderUf")}
                        error={errors.addresses?.[index]?.uf?.message}
                        {...register(`addresses.${index}.uf`)}
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
                onClear={handleClear}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </form>
  );
}

export default CustomerFormCard;
