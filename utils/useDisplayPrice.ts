const useDisplayPrice = (price) => {
    return `$${(price/100).toFixed(2).toLocaleString()}`
}
export default useDisplayPrice