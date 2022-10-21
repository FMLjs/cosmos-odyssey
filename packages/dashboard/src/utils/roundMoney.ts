export const roundMoney = (val: string | number) => {
    return (Number(val) / 100).toFixed(2);
}
