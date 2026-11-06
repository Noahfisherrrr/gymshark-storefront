'use strict';

// Backfills price/compareAtPrice on already-seeded Product entries from the
// mock catalog, now that those fields exist on the schema (price-tile
// follow-up to seed-products.js). Run with the dev server stopped.

const path = require('path');
const { pathToFileURL } = require('url');

async function backfill() {
  const { createStrapi } = require('@strapi/strapi');
  const strapi = await createStrapi({ distDir: path.resolve(__dirname, '..') }).load();

  try {
    const mockModuleUrl = pathToFileURL(
      path.resolve(__dirname, '..', '..', 'src', 'api', 'data', 'products.mock.js'),
    );
    const { MOCK_PRODUCTS } = await import(mockModuleUrl.href);

    for (const product of MOCK_PRODUCTS) {
      const existing = await strapi.documents('api::product.product').findFirst({
        filters: { commerceProductId: product.id },
      });
      if (!existing) {
        console.log(`  ! no CMS entry for ${product.id}, run seed-products.js first`);
        continue;
      }

      await strapi.documents('api::product.product').update({
        documentId: existing.documentId,
        data: { price: product.price, compareAtPrice: product.compareAtPrice ?? null },
      });
      await strapi.documents('api::product.product').publish({ documentId: existing.documentId });
      console.log(`  ✓ ${product.id} price=${product.price} compareAtPrice=${product.compareAtPrice ?? 'null'}`);
    }

    console.log('Done.');
  } finally {
    await strapi.destroy();
  }
}

backfill().catch((err) => {
  console.error(err);
  process.exit(1);
});
