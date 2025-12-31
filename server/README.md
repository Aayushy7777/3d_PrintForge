# PrintForge Backend

This is a minimal Express + MongoDB backend for the PrintForge frontend.

Quick start

1. Change into the `server` folder:

```bash
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`) and set `MONGODB_URI`.

4. Seed products (optional):

```bash
npm run seed
```

5. Start the server in development mode:

```bash
npm run dev
```

API endpoints

- `GET /api/products` - list products
- `GET /api/products/:id` - product detail
- `POST /api/products` - create product (admin)
- `POST /api/orders` - create order
- `GET /api/orders/:id` - get order

Static assets

- Images and other frontend assets under `src/assets` are served at `/assets`.
- Public folder is served at `/public`.

For example, after starting the server locally the Geometric Vase image will be available at:
`http://localhost:5000/assets/product-vase.jpg`
