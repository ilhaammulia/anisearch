/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `anime` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `genre` DROP FOREIGN KEY `genre_id_anime_fkey`;

-- CreateIndex
CREATE UNIQUE INDEX `anime_title_key` ON `anime`(`title`);

-- AddForeignKey
ALTER TABLE `genre` ADD CONSTRAINT `genre_id_anime_fkey` FOREIGN KEY (`id_anime`) REFERENCES `anime`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
