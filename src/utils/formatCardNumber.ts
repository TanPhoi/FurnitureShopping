//input: 1234 5468 9876 5432
//output : **** **** **** **** 5432

const formatCardNumber = (number: string): string => {
  const cardNumberStr = number.toString();
  const last4Digits = cardNumberStr.slice(-4);
  return `**** **** **** ${last4Digits}`;
};
export default formatCardNumber;
