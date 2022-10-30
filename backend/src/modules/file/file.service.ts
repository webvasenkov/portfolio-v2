import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as Minio from 'minio';

@Injectable()
export class FileService {
  private bucketName = process.env.MINIO_BUCKET_NAME;
  private minioClient = new Minio.Client({
    accessKey: process.env.MINIO_ROOT_USER,
    secretKey: process.env.MINIO_ROOT_PASSWORD,
    endPoint: 'storage.webvasenkov.com',
    useSSL: true,
  });

  async upload(
    file: Express.Multer.File,
  ): Promise<string> {
    const objectName = file.originalname

    try {
      await this.minioClient.putObject(
        this.bucketName,
        objectName,
        file.buffer
      );
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }

    return `${process.env.MINIO_HOST}/${this.bucketName}/${objectName}`
  }

  delete(name: string): Promise<void> {
    return this.minioClient.removeObject(this.bucketName, name);
  }
}
