import { CSSProperties } from "react";

export type PaymentBrand =
  | "american express"
  | "diners club"
  | "discover"
  | "jcb"
  | "mastercard"
  | "unionpay"
  | "visa"
  | "unknown";

const PaymentBrandIcon = ({
  brand,
  style,
  size,
  className,
}: {
  brand: PaymentBrand;
  style?: CSSProperties;
  size?: number;
  className?: string;
}) => {
  console.log("brand", brand);

  let Icon;
  switch (brand.toLowerCase()) {
    case "visa":
      Icon = require("react-icons/fa").FaCcVisa;
      break;
    case "mastercard":
      Icon = require("react-icons/fa").FaCcMastercard;
      break;
    case "jcb":
      Icon = require("react-icons/fa").FaCcJcb;
      break;
    default:
      Icon = require("react-icons/fa").FaCcStripe;
      break;
  }
  return <Icon style={style} size={size} className={className} />;
};

export default PaymentBrandIcon;
