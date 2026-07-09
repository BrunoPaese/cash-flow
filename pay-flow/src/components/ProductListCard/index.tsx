import { useTranslation } from "react-i18next";
import { Row } from "../Row";
import { Col } from "../Col";
import Table, { type Column } from "../Table";
import type { ProductFormData } from "../ProductCard";
import Card from "../Card";
import { useNavigate } from "react-router-dom";
import Input from "../Input";
import { formatCurrency } from "../../utils/formatCurrency";
import Button from "../Button";
import { Trash } from "lucide-react";
import { useProductList } from "../../contexts/ProductList/useProductList";
import { useCurrency } from "../../contexts/Currency/useCurrency";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { productListSchema } from "../../validations/productListSchema";

export interface ProductListFormData {
  quantity: number;
}

function ProductListCard() {
  const { t } = useTranslation();
  const { currency, locale } = useCurrency();
  const { productList, removeProduct, updateProductQuantity } =
    useProductList();

  const navigate = useNavigate();

  const {
    setValue,
    formState: { errors },
  } = useForm<ProductListFormData>({
    resolver: yupResolver(productListSchema(t)),
  });

  const handleRemove = (product: ProductFormData) => {
    removeProduct(product);
  };

  const handleChangeQuantity = (
    event: React.ChangeEvent<HTMLInputElement>,
    row: ProductFormData,
  ) => {
    updateProductQuantity(row.item, Number(event.target.value));
    setValue("quantity", Number(event.target.value), {
      shouldValidate: true,
    });
  };

  const columns: Column<ProductFormData>[] = [
    {
      key: "item",
      label: t("product.product"),
      align: "center",
      width: "15%",
    },
    {
      key: "description",
      label: t("product.description"),
      align: "center",
      width: "37%",
    },
    {
      key: "quantity",
      label: t("product.quantity"),
      align: "center",
      width: "10%",
      render: (_, row) => (
        <Input
          text={t("product.quantity")}
          value={(row.quantity ?? 0).toString()}
          error={errors.quantity?.message}
          type="number"
          onChange={(event) => handleChangeQuantity(event, row)}
          center
        />
      ),
    },
    {
      key: "unitPrice",
      label: t("product.unitPrice"),
      align: "center",
      width: "15%",
      render: (value, row) => {
        return `${formatCurrency(Number(value), locale, currency)} (${
          row.quantity
        }x)`;
      },
    },
    {
      key: "price",
      label: t("product.price"),
      align: "center",
      width: "15%",
      render: (value) => formatCurrency(Number(value), locale, currency),
    },
    {
      key: "actions",
      label: "",
      align: "center",
      width: "8%",
      render: (_, row) => (
        <Button
          onClick={() => handleRemove(row)}
          text={"product.removeProduct"}
          icon={Trash}
        />
      ),
    },
  ];

  return (
    <Card title={t("productList.productList")}>
      <Row>
        <Col>
          <Table<ProductFormData>
            columns={columns}
            data={productList}
            pageSize={10}
            onRowClick={(row) => navigate(`/checkout/product/${row.item}`)}
          />
        </Col>
      </Row>
    </Card>
  );
}

export default ProductListCard;
