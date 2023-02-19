-- CreateTable
CREATE TABLE "People" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL DEFAULT '<(10,4),11>'::circle,
    "role" TEXT NOT NULL,
    "network" TEXT NOT NULL DEFAULT E'',
    "image" TEXT NOT NULL DEFAULT E'',
    "link" TEXT NOT NULL DEFAULT E'',
    "post_uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "People_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "People_uuid_key" ON "People"("uuid");

-- AddForeignKey
ALTER TABLE "People" ADD CONSTRAINT "People_post_uuid_fkey" FOREIGN KEY ("post_uuid") REFERENCES "posts"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
