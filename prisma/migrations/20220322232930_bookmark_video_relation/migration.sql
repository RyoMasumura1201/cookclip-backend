-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("videoId") ON DELETE RESTRICT ON UPDATE CASCADE;
