type Orders = {
    customerName: string,
        shawarmaType: string,
        noOfWrap: string,
        location: string,
        customerContact: string,
        riderName: string,
        deliveryFee: string,
        deliveryOption: string,
        message: string
}


export function getShawarmaPrice(shawarmaType: string, noOfWraps: number) {
    let price;
    if (shawarmaType === "lite") {
        price = noOfWraps * 1700
    } else if (shawarmaType === "regular") {
        price = noOfWraps * 2000
    } else {
        price = noOfWraps * 2300
    }

    return formatToNigerianNaira(price)
}

export const getDailyTotal = (orders: Orders[]) => {
    let total = 0
    let price = 0
    for (const order of orders) {
      if (order.shawarmaType === "lite") {
        price = Number(order.noOfWrap) * 1700
        }
        if (order.shawarmaType === "regular") {
        price = Number(order.noOfWrap) * 2000
        } if(order.shawarmaType === "pro")    {
        price = Number(order.noOfWrap) * 2300
        }
        total += price
    }
    return formatToNigerianNaira(total)
}

export const formatToNigerianNaira = (num: number | string): string => {
 
  const parsedNum = typeof num === 'string' ? parseFloat(num) : num;


  if (isNaN(parsedNum)) {
    throw new Error('Invalid input, please provide a number or a string of a number.');
  }
  
  const formatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  });

  return formatter.format(parsedNum);
};