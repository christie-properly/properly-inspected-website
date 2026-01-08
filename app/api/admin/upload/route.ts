import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export const dynamic = 'force-dynamic';

function createS3Client() {
  return new S3Client({});
}

function getBucketConfig() {
  return {
    bucketName: process.env.AWS_BUCKET_NAME ?? '',
    folderPrefix: process.env.AWS_FOLDER_PREFIX ?? '',
  };
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    const { bucketName, folderPrefix } = getBucketConfig();
    
    // Generate unique filename
    const timestamp = Date.now();
    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const key = `${folderPrefix}public/blog/${timestamp}-${sanitizedFileName}`;

    // Upload to S3
    const s3Client = createS3Client();
    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: buffer,
        ContentType: file.type,
      })
    );

    // Get AWS region from environment or default to us-east-1
    const region = process.env.AWS_REGION || 'us-east-1';
    const publicUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;

    return NextResponse.json({ url: publicUrl });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
