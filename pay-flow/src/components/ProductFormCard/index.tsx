import { useTranslation } from "react-i18next";
import Card from "../Card";
import { Row } from "../Row";
import { Col } from "../Col";
import Input from "../Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ActionFooter } from "../ActionFooter";
import { newProductSchema } from "../../validations/newProductSchema";
import { useProduct } from "../../contexts/Product/useCustomer";
import FileInput from "../FileInput";
import { useState } from "react";
import noImage from "../../assets/noImage.png";
import { ImagePlus } from "lucide-react";

export interface ProductFormData {
  id: string;
  barCode: string;
  description: string;
  image?: File;
  price: number;
  stockQuantity: number;
}

function ProductFormCard() {
  const { t } = useTranslation();
  const { addProduct } = useProduct();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: yupResolver(newProductSchema(t)),
  });

  const [imagePreview, setImagePreview] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setImagePreview(noImage);
      return;
    }
    setImagePreview(URL.createObjectURL(file));
    setValue("image", file);
  };

  const handleAddProduct = async (product: ProductFormData) => {
    const normalizedProduct: ProductFormData = {
      ...product,
      id: product.id?.toUpperCase(),
      barCode: product.barCode?.toUpperCase(),
      description: product.description.toUpperCase(),
    };
    addProduct(normalizedProduct);
    setImagePreview("");
    reset();
  };

  const handleClear = () => {
    setImagePreview("");
    reset();
  };

  return (
    <Card title={t("product.newProduct")}>
      <form onSubmit={handleSubmit(handleAddProduct)}>
        <Row>
          <Col>
            <Input
              label={t("product.id")}
              text={t("product.enterCustomer")}
              error={errors.id?.message}
              autoFocus
              {...register("id")}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              label={t("product.barCode")}
              text={t("customer.enterCustomer")}
              error={errors.barCode?.message}
              {...register("barCode")}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              label={t("product.description")}
              text={t("customer.enterCustomer")}
              error={errors.description?.message}
              {...register("description")}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              label={t("product.price")}
              text={t("customer.enterCustomer")}
              error={errors.price?.message}
              {...register("price")}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              label={t("product.stockQuantity")}
              text={t("customer.enterCustomer")}
              error={errors.stockQuantity?.message}
              {...register("stockQuantity")}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <FileInput
              label={t("product.image")}
              text={t("product.uploadImage")}
              preview={imagePreview}
              onChange={handleImageChange}
              icon={ImagePlus}
            />
          </Col>
        </Row>
        <ActionFooter
          confirmText={t("product.addProduct")}
          onClear={handleClear}
        />
      </form>
    </Card>
  );
}

export default ProductFormCard;
