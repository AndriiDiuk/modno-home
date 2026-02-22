import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { s3Storage } from "@payloadcms/storage-s3";
import { Media } from "./collections/Media";
import { Users } from "./collections/Users";
import { Home } from "./globals/Home";
import { Settings } from "./globals/Settings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    theme: "dark",
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media],
  globals: [Home, Settings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: {
          prefix: "",
          generateFileURL: ({ filename }) => {
            const cleanFilename = filename.replace(/^[./]+/, "");
            return `${process.env.NEXT_PUBLIC_S3_PUBLIC_URL}/${cleanFilename}`;
          },
        },
      },
      bucket: process.env.S3_BUCKET || "",
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY || "",
          secretAccessKey: process.env.S3_SECRET_KEY || "",
        },
        forcePathStyle: true,
        region: "auto",
        endpoint: process.env.S3_ENDPOINT || "",
        requestChecksumCalculation: "WHEN_REQUIRED",
      },
      clientUploads: true,
    }),
  ],
});
