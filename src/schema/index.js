const { gql } = require('apollo-server');

const typeDefs = gql`
  type LineItems {
  product_name: String
  product_qty: String
  product_weight: Int
  }

  input LineItemsInput {
    product_name: String!
    product_qty: String!
    product_weight: Int!
  }

  type SellOrder {
    id: ID
    seller_store: String
    shipping_method: String
    external_order_number: String
    email: String
    buyer_full_name: String
    buyer_phone_number: String
    buyer_email: String
    shipping_address: String
    shipping_city: String
    shipping_region: String
    shipping_country: String
    lineItems: [LineItems]
    creation_date: String
    internal_order_number: String
    pack_promise_min: String
    pack_promise_max: String
    ship_promise_min: String
    ship_promise_max: String
    delivery_promise_min: String
    delivery_promise_max: String
    ready_pickup_promise_min: String
    ready_pickup_promise_max: String
  }

  input SellOrderInput {
    seller_store: String!
    shipping_method: Int!
    external_order_number: String!
    email: String!
    buyer_full_name: String!
    buyer_phone_number: String!
    buyer_email: String!
    shipping_address: String!
    shipping_city: String!
    shipping_region: String!
    shipping_country: String!
    lineItems: [LineItemsInput]
  }

  type ShippingMethods {
    id: Int
    name: String
  }

  type Query {
    getSellOrders(id: ID): [SellOrder]
    getShippingMethods: [ShippingMethods]
  }

  type Mutation {
    createSellOrder(cInput: SellOrderInput): SellOrder
  }
`;

module.exports = { typeDefs }
