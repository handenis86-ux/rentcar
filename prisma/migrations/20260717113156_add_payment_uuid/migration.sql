-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "paymentUuid" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Booking_paymentUuid_key" ON "Booking"("paymentUuid");
