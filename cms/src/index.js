'use strict';

// Content types the storefront reads anonymously. Each needs `find` (and
// `findOne` for collection types) enabled on the Public role so React can
// fetch published content without an API token — see
// Strapi_CMS_Setup_Guide.md section 4 ("Public read permissions").
const PUBLIC_READ_ACTIONS = [
  'api::homepage.homepage.find',
  'api::site-settings.site-setting.find',
  'api::product.product.find',
  'api::product.product.findOne',
  'api::category.category.find',
  'api::category.category.findOne',
  'api::collection.collection.find',
  'api::collection.collection.findOne',
  'api::faq.faq.find',
  'api::faq.faq.findOne',
  'api::policy-page.policy-page.find',
  'api::policy-page.policy-page.findOne',
];

async function setPublicReadPermissions({ strapi }) {
  const publicRole = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  if (!publicRole) return;

  for (const action of PUBLIC_READ_ACTIONS) {
    const existing = await strapi.db.query('plugin::users-permissions.permission').findOne({
      where: { action, role: publicRole.id },
    });

    if (existing) {
      if (!existing.enabled) {
        await strapi.db
          .query('plugin::users-permissions.permission')
          .update({ where: { id: existing.id }, data: { enabled: true } });
      }
      continue;
    }

    await strapi.db.query('plugin::users-permissions.permission').create({
      data: { action, role: publicRole.id, enabled: true },
    });
  }
}

module.exports = {
  register(/*{ strapi }*/) {},

  async bootstrap({ strapi }) {
    await setPublicReadPermissions({ strapi });
  },
};
