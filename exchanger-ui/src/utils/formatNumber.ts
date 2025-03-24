export function formatNumber(n: number | undefined) {
    if (!n) return 0;

    let [integer, decimal] = n.toString().split('.');

    let formattedInteger = new Intl.NumberFormat('ru-Ru').format(Number(integer));

    return decimal ? `${formattedInteger},${decimal}` : formattedInteger;
}