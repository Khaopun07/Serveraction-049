import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const students = [
    { firstName: "Pimchanok", lastName: "Srisuk", major: "Information Technology", faculty: "Engineering", email: "pim.srisuk@example.com", phone: "0861234567" },
    { firstName: "Chaiwat", lastName: "Phromma", major: "Economics", faculty: "Social Science", email: "chaiwat.phromma@example.com", phone: "0872345678" },
    { firstName: "Natcha", lastName: "Kongka", major: "Electrical Engineering", faculty: "Engineering", email: "natcha.kongka@example.com", phone: "0883456789" },
    { firstName: "Somsak", lastName: "Preecha", major: "Environmental Science", faculty: "Science", email: "somsak.preecha@example.com", phone: "0894567890" },
    { firstName: "Kanokwan", lastName: "Rojjanakit", major: "Graphic Design", faculty: "Design", email: "kanokwan.rojjanakit@example.com", phone: "0805678901" },
  ];

  await prisma.student.createMany({ data: students, skipDuplicates: true });
  console.log("Seeded 5 students successfully!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
