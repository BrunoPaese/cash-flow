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

export interface ProductFormData {
  item: string;
  description: string;
  price: number;
  costPrice: number;
  stock: number;
  minStock: number;
  maxStock: number;
  barCode: string;
  isActive: boolean;
}

function ProductFormCard() {
  const { t } = useTranslation();
  const { addProduct } = useProduct();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: yupResolver(newProductSchema(t)),
  });

  const handleAddProduct = async (product: ProductFormData) => {
    const normalizedProduct: ProductFormData = {
      ...product,
      description: product.description.toUpperCase(),
    };
    addProduct(normalizedProduct);
    reset();
  };

  const handleClear = () => {
    reset();
  };

  return (
    <Card title={t("customer.newCustomer")}>
      <form onSubmit={handleSubmit(handleAddProduct)}>
        <Row>
          <Col>
            <Input
              label={t("product.id")}
              text={t("product.enterCustomer")}
              error={errors.item?.message}
              autoFocus
              {...register("item")}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              label={t("product.name")}
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
              label={t("product.constPrice")}
              text={t("customer.enterCustomer")}
              error={errors.costPrice?.message}
              {...register("costPrice")}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              label={t("product.stock")}
              text={t("customer.enterCustomer")}
              error={errors.stock?.message}
              {...register("stock")}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              label={t("product.minStock")}
              text={t("customer.enterCustomer")}
              error={errors.minStock?.message}
              {...register("minStock")}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              label={t("product.maxStock")}
              text={t("customer.enterCustomer")}
              error={errors.maxStock?.message}
              {...register("maxStock")}
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
        <ActionFooter
          confirmText={t("product.addProduct")}
          onClear={handleClear}
        />
      </form>
    </Card>
  );
}

export default ProductFormCard;
