import { rest, setupWorker } from "msw";
import { factory, primaryKey } from "@mswjs/data";

interface Product {
  id: string;
  name: string;
  manufacturedDate: string;
  price: number;
}

const db = factory({
  product: {
    id: primaryKey(String),
    name: String,
    manufacturedDate: Date,
    price: Number,
  },
});

db.product.create({
  id: "1",
  name: "spray",
  manufacturedDate: new Date().toString(),
  price: 200,
});
db.product.create({
  id: "2",
  name: "foam",
  manufacturedDate: new Date("2021-05-22").toString(),
  price: 120,
});

const handlers = [
  rest.get("/products", (req, res, ctx) => {
    return res(ctx.delay(2000), ctx.json(db.product.getAll()));
  }),
  rest.post<Product>("/products", (req, res, ctx) => {
    const createdEntity = db.product.create(req.body);
    return res(ctx.delay(2000), ctx.status(201), ctx.json(createdEntity));
  }),
  rest.put<Product>("/products/:id", (req, res, ctx) => {
    const updatedEntity = db.product.update({
      strict: true,
      where: {
        id: {
          equals: req.params.id as string,
        },
      },
      data: req.body,
    });
    return res(ctx.delay(2000), ctx.json(updatedEntity));
  }),
  rest.delete("/products/:id", (req, res, ctx) => {
    const deletedEntity = db.product.delete({
      strict: true,
      where: {
        id: {
          equals: req.params.id as string,
        },
      },
    });
    return res(ctx.delay(2000), ctx.json(deletedEntity));
  }),
];

export const worker = setupWorker(...handlers);
