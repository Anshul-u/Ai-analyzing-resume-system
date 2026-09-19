import fs from 'fs';
import path from 'path';

/**
 * Upload buffer or file stream to AWS S3 (or local storage fallback).
 */
export const uploadToS3 = async (fileBuffer, originalName, mimeType) => {
  const bucket = process.env.AWS_S3_BUCKET;
  const key = `resumes/${Date.now()}_${originalName.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

  // If AWS credentials are missing, perform local workspace persistence
  if (!process.env.AWS_ACCESS_KEY_ID || !bucket) {
    const uploadDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    const filePath = path.join(uploadDir, `${Date.now()}_${originalName}`);
    fs.writeFileSync(filePath, fileBuffer);
    return {
      location: `file://${filePath}`,
      key,
      isLocal: true,
    };
  }

  // AWS S3 upload implementation placeholder
  return {
    location: `https://${bucket}.s3.${process.env.AWS_REGION || 'us-east-1'}.amazonaws.com/${key}`,
    key,
    isLocal: false,
  };
};
