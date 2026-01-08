import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Get all blog posts
  const posts = await prisma.blogPost.findMany();

  for (const post of posts) {
    let updatedContent = post.content;

    // Fix service slug references
    updatedContent = updatedContent.replace(/\/services\/tampa-bay-home-inspections/g, '/services/buyers-home-inspection');
    updatedContent = updatedContent.replace(/\/services\/insurance-inspections/g, '/services/4-point-inspection');
    updatedContent = updatedContent.replace(/\/services\/new-construction-inspections/g, '/services/new-construction-inspection');
    updatedContent = updatedContent.replace(/\/services\/pre-listing-inspections/g, '/services/pre-listing-inspection');

    // Remove /sample-report references
    updatedContent = updatedContent.replace(/\[See a sample of our detailed inspection reports\]\(\/sample-report\) and book your inspection with confidence\./g, 'Book your inspection with confidence today.');

    // Update if changes were made
    if (updatedContent !== post.content) {
      await prisma.blogPost.update({
        where: { id: post.id },
        data: { content: updatedContent },
      });
      console.log(`Updated post: ${post.title}`);
    }
  }

  console.log('✅ All blog posts updated');
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
