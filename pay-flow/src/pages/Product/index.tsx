import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../contexts/Theme/useTheme";
import { toast } from "react-toastify";
import { Body, Page } from "../Login/style";
import HeaderControls from "../../components/HeaderControls";
import Input from "../../components/Input";

interface ProductFormData {
  product: string;
}

function Product() {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    // resolver: yupResolver(productSchema(t)),
  });

  const onSubmit = (data: ProductFormData) => {
    // chamada login backend
    toast.success("Sucesso");
    console.log(data);
  };

  return (
    <Page theme={theme}>
      <HeaderControls
        breadcrumbs={[
          { label: t("checkout.checkout"), path: "/checkout" },
          { label: t("product.product"), path: "/checkout/product" },
        ]}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Body>
          <Input
            label={t("product.product")}
            text={t("product.enterProduct")}
            error={errors.product?.message}
            {...register("product")}
          />
        </Body>
      </form>
    </Page>
  );
}

export default Product;
