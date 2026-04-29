import { useNavigate } from "react-router-dom";
import { CheckCircle, Trash2, Undo } from "lucide-react";
import { useTranslation } from "react-i18next";
import Button from "../Button";
import { colors } from "../Style/theme";
import { Row } from "../Row";
import { Col } from "../Col";
import { toast } from "react-toastify";

interface ActionFooterProps {
  confirmText: string;
  disabled?: boolean;
  onClear: () => void;
}

export function ActionFooter({
  confirmText,
  disabled,
  onClear,
}: ActionFooterProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onClear();
    navigate("/checkout");
    toast.success("Sucesso");
  };

  return (
    <Row>
      <Col xs={8}>
        <Button
          text={confirmText}
          icon={CheckCircle}
          type="submit"
          disabled={disabled}
          onClick={(e) => e.stopPropagation()}
        >
          {confirmText}
        </Button>
      </Col>
      <Col xs={2}>
        <Button
          text={t("common.cancel")}
          icon={Undo}
          onClick={() => navigate("/checkout")}
        />
      </Col>
      <Col xs={2}>
        <Button
          text={t("common.remove")}
          icon={Trash2}
          color={colors.red}
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            handleClear(event);
          }}
        />
      </Col>
    </Row>
  );
}
