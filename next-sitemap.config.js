/** @type {import('next-sitemap').IConfig} */

const dev = process.env.NODE_ENV !== "production";

module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_DOMAIN
};
