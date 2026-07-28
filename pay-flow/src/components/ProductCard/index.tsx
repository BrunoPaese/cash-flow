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
import { useProduct } from "../../contexts/Product/useCustomer";
import { calculateItemSubTotal } from "../../utils/saleCalculations";
import { useCurrency } from "../../contexts/Currency/useCurrency";
import { formatCurrency } from "../../utils/formatCurrency";

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
  const { getProduct } = useProduct();
  const { currency, locale } = useCurrency();
  const navigate = useNavigate();

  const [image, setImage] = useState<string>(noImage);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    setFocus,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: yupResolver(productSchema(t)),
  });

  const handleAddProduct = (product: ProductFormData) => {
    setFocus("item");
    addProduct(product);
    reset({
      item: "",
      description: "",
      quantity: 1,
    });
  };

  const inputItem = useWatch({
    control,
    name: "item",
  });

  const inputQuantity = useWatch({
    control,
    name: "quantity",
  });

  const inputUnitPrice = useWatch({
    control,
    name: "unitPrice",
  });

  const inputPrice = useWatch({
    control,
    name: "price",
  });

  const isValidProductCode = (value: string) =>
    new RegExp(`^\\d{${PRODUCT_CODE_LENGTH}}$`).test(value);

  const clearProductData = useCallback(() => {
    reset({
      item: inputItem,
      description: "",
      quantity: 1,
    });
    setImage(noImage);
  }, [inputItem, reset]);

  useEffect(() => {
    const loadProduct = async () => {
      if (!isValidProductCode(inputItem)) {
        clearProductData();
        return;
      }
      const result = await getProduct(inputItem);
      if (!result) {
        return;
      }
      setValue("description", result.description);
      setValue("unitPrice", result.price);
      setValue("price", calculateItemSubTotal(inputQuantity, result.price));
      setImage(result.imageUrl || noImage);
    };
    loadProduct();
  }, [
    clearProductData,
    getProduct,
    inputItem,
    inputQuantity,
    setValue,
    locale,
    currency,
  ]);

  return (
    <Card
      title={t("product.product")}
      onSearch={() => navigate("/checkout/product")}
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
                  maxLength={PRODUCT_CODE_LENGTH}
                  autoFocus
                  {...register("item")}
                />
              </Col>
              <Col lg={9}>
                <Input
                  label={t("product.description")}
                  text={t("product.description")}
                  disabled
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
                  value={formatCurrency(inputUnitPrice, locale, currency)}
                  disabled
                  {...register("unitPrice")}
                />
              </Col>
              <Col lg={3}>
                <Input
                  label={t("product.price")}
                  text={t("product.price")}
                  value={formatCurrency(inputPrice, locale, currency)}
                  disabled
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
