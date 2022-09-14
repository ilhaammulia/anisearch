-- CreateTable
CREATE TABLE `anime` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `episode` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `season` VARCHAR(191) NOT NULL,
    `year` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `genre` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_anime` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `genre` ADD CONSTRAINT `genre_id_anime_fkey` FOREIGN KEY (`id_anime`) REFERENCES `anime`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
