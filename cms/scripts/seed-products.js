'use strict';

// One-off import of the storefront's placeholder catalog (src/api/data/products.mock.js)
// into Strapi's Product/Category content types, per Strapi_CMS_Setup_Guide.md section 3-4.
// Price/stock/variants stay out of Strapi — Supabase remains authoritative for those
// (see cms-plan.md section 1); only editorial fields (name, slug, description, gallery,
// category) are copied here, joined back to the mock/Supabase record via commerceProductId.
//
// Run with the dev server stopped (both hold the same SQLite file):
//   node scripts/seed-products.js

const path = require('path');
const fs = require('fs');
const { pathToFileURL } = require('url');

const CATEGORIES = [
  { name: 'Men', slug: 'men' },
  { name: 'Women', slug: 'women' },
  { name: 'New', slug: 'new' },
  { name: 'Sale', slug: 'sale' },
  { name: 'Accessories', slug: 'accessories' },
];

async function uploadImage(strapi, absolutePath, name) {
  const uploadService = strapi.plugin('upload').service('upload');
  const stats = fs.statSync(absolutePath);
  const file = {
    filepath: absolutePath,
    originalFilename: name,
    mimetype: 'image/jpeg',
    size: stats.size,
  };
  const [uploaded] = await uploadService.upload({
    data: { fileInfo: { name, alternativeText: name, caption: name } },
    files: file,
  });
  return uploaded;
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function upsertCategory(strapi, { name, slug }) {
  const existing = await strapi.documents('api::category.category').findFirst({
    filters: { slug },
  });
  if (existing) return existing;

  const created = await strapi.documents('api::category.category').create({
    data: { name, slug },
  });
  await strapi.documents('api::category.category').publish({ documentId: created.documentId });
  return created;
}

async function upsertProduct(strapi, product, categoryDocumentId) {
  const existing = await strapi.documents('api::product.product').findFirst({
    filters: { commerceProductId: product.id },
  });
  if (existing) {
    console.log(`  skip ${product.id} (already seeded)`);
    return existing;
  }

  const publicDir = path.resolve(__dirname, '..', '..', 'public');
  const imagePath = path.join(publicDir, product.image);
  let gallery;
  if (fs.existsSync(imagePath)) {
    const uploaded = await uploadImage(strapi, imagePath, `${product.id}.jpg`);
    gallery = [uploaded.id];
  } else {
    console.log(`  ! missing image for ${product.id}: ${imagePath}`);
  }

  const created = await strapi.documents('api::product.product').create({
    data: {
      name: product.name,
      slug: slugify(product.name),
      commerceProductId: product.id,
      description: product.description,
      gallery,
      category: categoryDocumentId,
    },
  });
  await strapi.documents('api::product.product').publish({ documentId: created.documentId });
  console.log(`  + ${product.id} ${product.name}`);
  return created;
}

async function seed() {
  const { createStrapi } = require('@strapi/strapi');
  const strapi = await createStrapi({ distDir: path.resolve(__dirname, '..') }).load();

  try {
    console.log('Upserting categories...');
    const categoryDocIds = {};
    for (const category of CATEGORIES) {
      const doc = await upsertCategory(strapi, category);
      categoryDocIds[category.slug] = doc.documentId;
    }

    console.log('Importing products...');
    const mockModuleUrl = pathToFileURL(
      path.resolve(__dirname, '..', '..', 'src', 'api', 'data', 'products.mock.js'),
    );
    const mockModule = await import(mockModuleUrl.href);
    const { MOCK_PRODUCTS } = mockModule;

    for (const product of MOCK_PRODUCTS) {
      const categoryDocumentId = categoryDocIds[product.category];
      await upsertProduct(strapi, product, categoryDocumentId);
    }

    console.log(`Done. ${MOCK_PRODUCTS.length} products processed.`);
  } finally {
    await strapi.destroy();
  }
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
