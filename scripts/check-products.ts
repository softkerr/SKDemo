import { client } from '../src/lib/sanity/client';

async function checkProducts() {
  try {
    console.log('\n🔍 Checking products in Sanity...\n');

    const products = await client.fetch(`*[_type == "product"] | order(sortOrder) {
      _id,
      "productId": productId.current,
      "name": name.en,
      category,
      "priceUSD": pricing.usd,
      "priceEUR": pricing.eur,
      isActive
    }`);

    console.log(`📊 Total products in Sanity: ${products.length}\n`);

    if (products.length > 0) {
      console.log('📦 Products:');
      products.forEach((product: any, index: number) => {
        console.log(`   ${index + 1}. ${product.name}`);
        console.log(`      ID: ${product.productId}`);
        console.log(`      Category: ${product.category}`);
        console.log(`      Price: $${product.priceUSD} / €${product.priceEUR}`);
        console.log(`      Active: ${product.isActive ? '✓' : '✗'}`);
        console.log('');
      });
    }

    console.log('✅ Verification complete!\n');
  } catch (error: any) {
    console.error('\n❌ Error checking products:', error.message);
    process.exit(1);
  }
}

checkProducts();
