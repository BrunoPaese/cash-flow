import { useTranslation } from "react-i18next";
import { PackagePlus } from "lucide-react";
import { Row } from "../Row";
import { Col } from "../Col";
import { ImageProduct } from "../../pages/Checkout/style";
import noImage from "../../assets/noImage.png";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { productSchema } from "../../validations/productSchema";
import Input from "../Input";
import Button from "../Button";
import Card from "../Card";
import { useNavigate } from "react-router-dom";
import { useProductList } from "../../contexts/ProductList/useProductList";
import { useCallback, useEffect, useState } from "react";
import { PRODUCT_CODE_LENGTH } from "../../domain/constants";

export interface ProductFormData {
  item: string;
  description?: string;
  quantity: number;
  unitPrice?: number;
  price?: number;
  actions?: string;
}

export interface ProductCardProps {
  onAdd: () => void;
}

function ProductCard({ onAdd }: ProductCardProps) {
  const { t } = useTranslation();
  const { addProduct } = useProductList();
  const navigate = useNavigate();

  const [image, setImage] = useState<string>(noImage);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: yupResolver(productSchema(t)),
  });

  const handleAddProduct = (product: ProductFormData) => {
    addProduct(product);
    reset();
  };

  const inputItem = useWatch({
    control,
    name: "item",
  });

  const isValidProductCode = (value: string) =>
    new RegExp(`^\\d{${PRODUCT_CODE_LENGTH}}$`).test(value);

  const clearProductData = useCallback(() => {
    reset({
      item: inputItem,
      description: "",
      unitPrice: 0,
      price: 0,
      quantity: 1,
    });
  }, [inputItem, reset]);

  useEffect(() => {
    if (!isValidProductCode(inputItem)) {
      clearProductData();
      return;
    }
    const loadProduct = async () => {
      // consulta api
      const product = {
        description: "Faca",
        unitPrice: 250,
        price: 450,
        image: "https://via.placeholder.com/150",
      };
      setValue("description", product.description);
      setValue("unitPrice", product.unitPrice);
      setValue("price", product.price);
      setImage(product.image);
    };
    loadProduct();
  }, [clearProductData, inputItem, setValue]);

  return (
    <Card
      title={t("product.product")}
      onClick={() => navigate("/checkout/product")}
      onAdd={onAdd}
    >
      <form onSubmit={handleSubmit(handleAddProduct)}>
        <Row align="center">
          <Col lg={3}>
            <ImageProduct src={image} alt={t("product.noImage")} />
          </Col>
          <Col lg={9}>
            <Row>
              <Col lg={3} align="center" justify="center">
                <Input
                  label={t("product.product")}
                  text={t("product.enterProduct")}
                  error={errors.item?.message}
                  autoFocus
                  maxLength={PRODUCT_CODE_LENGTH}
                  {...register("item")}
                />
              </Col>
              <Col lg={9}>
                <Input
                  label={t("product.description")}
                  text={t("product.description")}
                  {...register("description")}
                />
              </Col>
            </Row>
            <Row>
              <Col lg={3}>
                <Input
                  label={t("product.quantity")}
                  text={t("product.quantity")}
                  type="number"
                  error={errors.quantity?.message}
                  {...register("quantity")}
                />
              </Col>
              <Col lg={3}>
                <Input
                  label={t("product.unitPrice")}
                  text={t("product.unitPrice")}
                  {...register("unitPrice")}
                />
              </Col>
              <Col lg={3}>
                <Input
                  label={t("product.price")}
                  text={t("product.price")}
                  {...register("price")}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Button
                  icon={PackagePlus}
                  text={t("product.addProduct")}
                  type="submit"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                    event.stopPropagation()
                  }
                >
                  {t("product.addProduct")}
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </form>
    </Card>
  );
}

export default ProductCard;
