-- CreateTable
CREATE TABLE "admin" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL DEFAULT '<(10,4),11>'::circle,
    "email" VARCHAR(200) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "username" VARCHAR(200) NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "login" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL DEFAULT '<(10,4),11>'::circle,
    "email" VARCHAR(200) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "block" BOOLEAN NOT NULL DEFAULT false,
    "blocked_reason" TEXT NOT NULL DEFAULT E'',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "login_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BrandDescription" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "BrandDescription_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "DescribesYou" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "DescribesYou_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "userprofile" (
    "id" SERIAL NOT NULL,
    "login_uuid" TEXT NOT NULL,
    "uuid" TEXT NOT NULL DEFAULT '<(10,4),11>'::circle,
    "grapes" INTEGER NOT NULL DEFAULT 4,
    "about" TEXT NOT NULL DEFAULT E'',
    "description" TEXT NOT NULL DEFAULT E'',
    "username" VARCHAR(255) NOT NULL DEFAULT E'',
    "fname" VARCHAR(255) NOT NULL DEFAULT E'',
    "lname" VARCHAR(255) NOT NULL DEFAULT E'',
    "address" VARCHAR(255) NOT NULL DEFAULT E'',
    "engagement_type" VARCHAR(255) NOT NULL DEFAULT E'',
    "brand_name" VARCHAR(255) NOT NULL DEFAULT E'',
    "agency_name" VARCHAR(255) NOT NULL DEFAULT E'',
    "dob" TIMESTAMP(3) NOT NULL,
    "phone" VARCHAR(255) NOT NULL DEFAULT E'',
    "insta" VARCHAR(255) NOT NULL DEFAULT E'',
    "tiktok" VARCHAR(255) NOT NULL DEFAULT E'',
    "tiktok_refresh" VARCHAR(255) NOT NULL DEFAULT E'',
    "tiktok_open_id" VARCHAR(255) NOT NULL DEFAULT E'',
    "google_token" VARCHAR(255) NOT NULL DEFAULT E'',
    "google_refresh_token" VARCHAR(255) NOT NULL DEFAULT E'',
    "blocked" BOOLEAN NOT NULL DEFAULT false,
    "blocked_reason" TEXT NOT NULL DEFAULT E'',
    "gender" VARCHAR(255) NOT NULL DEFAULT E'',
    "ethinicity" VARCHAR(255) NOT NULL DEFAULT E'',
    "collaborate" BOOLEAN NOT NULL DEFAULT false,
    "brand_type" VARCHAR(255) NOT NULL DEFAULT E'',
    "intrests" TEXT[],
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "position" TEXT,
    "employerUuid" TEXT,
    "employeeRole" TEXT,
    "employeeConfirm" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userprofile_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "uuid" TEXT NOT NULL DEFAULT '<(10,4),11>'::circle,
    "title" VARCHAR(255) NOT NULL DEFAULT E'',
    "post_type" VARCHAR(255) NOT NULL DEFAULT E'text',
    "post" VARCHAR(1000000) NOT NULL DEFAULT E'',
    "image_url" VARCHAR(1000000) NOT NULL DEFAULT E'',
    "video_url" VARCHAR(1000000) NOT NULL DEFAULT E'',
    "edited" VARCHAR(1000000) NOT NULL DEFAULT E'',
    "hide" BOOLEAN NOT NULL DEFAULT false,
    "blocked" BOOLEAN NOT NULL DEFAULT false,
    "blocked_reason" TEXT NOT NULL DEFAULT E'',
    "username" TEXT NOT NULL DEFAULT E'',
    "keys" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "shared_post_uuid" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "likes" (
    "id" SERIAL NOT NULL,
    "post_uuid" TEXT NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "uuid" TEXT NOT NULL DEFAULT '<(10,4),11>'::circle,
    "disliked" BOOLEAN NOT NULL DEFAULT false,
    "hide" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" SERIAL NOT NULL,
    "post_uuid" TEXT NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "uuid" TEXT NOT NULL DEFAULT '<(10,4),11>'::circle,
    "comment_text" VARCHAR(1000000) NOT NULL DEFAULT E'',
    "comment_type" VARCHAR(255) NOT NULL DEFAULT E'text',
    "hide" BOOLEAN NOT NULL DEFAULT false,
    "blocked" BOOLEAN NOT NULL DEFAULT false,
    "blocked_reason" TEXT NOT NULL DEFAULT E'',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "commentlikes" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL DEFAULT '<(10,4),11>'::circle,
    "comment_uuid" TEXT NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "post_uuid" TEXT NOT NULL,
    "disliked" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "commentlikes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "friendship" (
    "id" SERIAL NOT NULL,
    "user_request" TEXT NOT NULL,
    "user_accept" TEXT NOT NULL,
    "uuid" TEXT NOT NULL DEFAULT '<(10,4),11>'::circle,
    "type" VARCHAR(255) NOT NULL DEFAULT E'connect',
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    "ignored" BOOLEAN NOT NULL DEFAULT false,
    "blocked" BOOLEAN NOT NULL DEFAULT false,
    "blocked_by" TEXT NOT NULL DEFAULT E'',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "friendship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatRoom" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL DEFAULT '<(10,4),11>'::circle,
    "valid_room" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL DEFAULT E'',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChatRoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chats" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL DEFAULT '<(10,4),11>'::circle,
    "from_user" TEXT NOT NULL,
    "content" TEXT NOT NULL DEFAULT E'',
    "sent_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "room_uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Chats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TiktokPost" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL DEFAULT '<(10,4),11>'::circle,
    "embed_link" TEXT NOT NULL DEFAULT E'',
    "like_count" INTEGER NOT NULL DEFAULT 0,
    "share_count" INTEGER NOT NULL DEFAULT 0,
    "title" TEXT NOT NULL DEFAULT E'',
    "view_count" INTEGER NOT NULL DEFAULT 0,
    "user_uuid" TEXT NOT NULL,

    CONSTRAINT "TiktokPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL DEFAULT '<(10,4),11>'::circle,
    "type" TEXT NOT NULL DEFAULT E'post',
    "from_user_uuid" TEXT NOT NULL DEFAULT E'',
    "from_user_username" TEXT NOT NULL DEFAULT E'',
    "action_uuid" TEXT NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL DEFAULT '<(10,4),11>'::circle,
    "type" TEXT NOT NULL DEFAULT E'post',
    "to_user_uuid" TEXT NOT NULL DEFAULT E'',
    "to_user_username" TEXT NOT NULL DEFAULT E'',
    "action_uuid" TEXT NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "user_uuids" TEXT[],
    "keys" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SearchHistory" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL DEFAULT '<(10,4),11>'::circle,
    "user_uuid" TEXT NOT NULL,
    "search_user_uuid" TEXT NOT NULL DEFAULT E'',
    "search_user_pic" TEXT NOT NULL DEFAULT E'',
    "username" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SearchHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL DEFAULT '<(10,4),11>'::circle,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 25,
    "image" TEXT NOT NULL DEFAULT E'',
    "link" TEXT NOT NULL DEFAULT E'',
    "post_uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BrandDescriptionToUserProfile" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_DescribesYouToUserProfile" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ChatRoomToUserProfile" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_uuid_key" ON "admin"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "admin_email_key" ON "admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "admin_username_key" ON "admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "login_uuid_key" ON "login"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "login_email_key" ON "login"("email");

-- CreateIndex
CREATE UNIQUE INDEX "userprofile_login_uuid_key" ON "userprofile"("login_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "userprofile_uuid_key" ON "userprofile"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "posts_uuid_key" ON "posts"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "likes_uuid_key" ON "likes"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "likes_post_uuid_user_uuid_key" ON "likes"("post_uuid", "user_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "comments_uuid_key" ON "comments"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "commentlikes_uuid_key" ON "commentlikes"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "commentlikes_comment_uuid_user_uuid_key" ON "commentlikes"("comment_uuid", "user_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "friendship_uuid_key" ON "friendship"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "friendship_user_request_user_accept_key" ON "friendship"("user_request", "user_accept");

-- CreateIndex
CREATE UNIQUE INDEX "ChatRoom_uuid_key" ON "ChatRoom"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Chats_uuid_key" ON "Chats"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "TiktokPost_uuid_key" ON "TiktokPost"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Notification_uuid_key" ON "Notification"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Activity_uuid_key" ON "Activity"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "SearchHistory_uuid_key" ON "SearchHistory"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Product_uuid_key" ON "Product"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "_BrandDescriptionToUserProfile_AB_unique" ON "_BrandDescriptionToUserProfile"("A", "B");

-- CreateIndex
CREATE INDEX "_BrandDescriptionToUserProfile_B_index" ON "_BrandDescriptionToUserProfile"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DescribesYouToUserProfile_AB_unique" ON "_DescribesYouToUserProfile"("A", "B");

-- CreateIndex
CREATE INDEX "_DescribesYouToUserProfile_B_index" ON "_DescribesYouToUserProfile"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ChatRoomToUserProfile_AB_unique" ON "_ChatRoomToUserProfile"("A", "B");

-- CreateIndex
CREATE INDEX "_ChatRoomToUserProfile_B_index" ON "_ChatRoomToUserProfile"("B");

-- AddForeignKey
ALTER TABLE "userprofile" ADD CONSTRAINT "userprofile_login_uuid_fkey" FOREIGN KEY ("login_uuid") REFERENCES "login"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userprofile" ADD CONSTRAINT "userprofile_employerUuid_fkey" FOREIGN KEY ("employerUuid") REFERENCES "userprofile"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "userprofile"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "userprofile"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_post_uuid_fkey" FOREIGN KEY ("post_uuid") REFERENCES "posts"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "userprofile"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_uuid_fkey" FOREIGN KEY ("post_uuid") REFERENCES "posts"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commentlikes" ADD CONSTRAINT "commentlikes_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "userprofile"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commentlikes" ADD CONSTRAINT "commentlikes_post_uuid_fkey" FOREIGN KEY ("post_uuid") REFERENCES "posts"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commentlikes" ADD CONSTRAINT "commentlikes_comment_uuid_fkey" FOREIGN KEY ("comment_uuid") REFERENCES "comments"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chats" ADD CONSTRAINT "Chats_room_uuid_fkey" FOREIGN KEY ("room_uuid") REFERENCES "ChatRoom"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TiktokPost" ADD CONSTRAINT "TiktokPost_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "userprofile"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "userprofile"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "userprofile"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SearchHistory" ADD CONSTRAINT "SearchHistory_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "userprofile"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_post_uuid_fkey" FOREIGN KEY ("post_uuid") REFERENCES "posts"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BrandDescriptionToUserProfile" ADD FOREIGN KEY ("A") REFERENCES "BrandDescription"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BrandDescriptionToUserProfile" ADD FOREIGN KEY ("B") REFERENCES "userprofile"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DescribesYouToUserProfile" ADD FOREIGN KEY ("A") REFERENCES "DescribesYou"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DescribesYouToUserProfile" ADD FOREIGN KEY ("B") REFERENCES "userprofile"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatRoomToUserProfile" ADD FOREIGN KEY ("A") REFERENCES "ChatRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatRoomToUserProfile" ADD FOREIGN KEY ("B") REFERENCES "userprofile"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
