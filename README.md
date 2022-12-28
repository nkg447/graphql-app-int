# Integrate Rest APIs with GraphQL

Integrate multiple Rest APIs with GraphQl and reduce your api calls.

## Example
Consider you have these 3 APIs.

* http://amazon.com/getOrderById
* http://amazon.com/getProductById
* http://amazon.com/getSupplierById

Now to fetch the supplier name of an order id. You would perform following steps.
1. Get Order details from getOrderById.
2. Get Product details form getProductById using the productId received from step 1.
3. Get Supplier details from getSupplierById using the supplierId received form step 2.

But if you integrate your APIs with GraphQL. All you need to do is send the following graphql request.
```graphql
query{
    getOrderById(id: $orderId){
        date
        product{
            name
            supplier{
                name
            }
        }
    }
}
```
And this will give you a response like - 
```json
{
  "getOrderById": {
    "date": "10-12-2021",
    "product": {
      "name": "PS5",
      "supplier": {
        "name": "Sony"
      }
    }
  }
}
```

