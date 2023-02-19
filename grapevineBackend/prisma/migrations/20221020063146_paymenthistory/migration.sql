-- CreateTable
CREATE TABLE "PaymentHistory" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "grapes" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT E'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PaymentHistory_uuid_key" ON "PaymentHistory"("uuid");

-- AddForeignKey
ALTER TABLE "PaymentHistory" ADD CONSTRAINT "PaymentHistory_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "userprofile"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
