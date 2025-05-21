export function formatPriceToPersian(price) {
  if (typeof price !== 'number') return ''
  const englishNumber = price.toLocaleString('en-US')
  const persianDigits = '۰۱۲۳۴۵۶۷۸۹'
  return englishNumber.replace(/\d/g, (d) => persianDigits[d])
}
