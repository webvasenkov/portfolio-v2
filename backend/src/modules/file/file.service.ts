import { Injectable, Logger } from '@nestjs/common';
import { S3 } from 'aws-sdk';

@Injectable()
export class FileService {
  uploadS3(
    fileBuffer: Buffer,
    name: string,
  ): Promise<Error | S3.ManagedUpload.SendData> {
    const s3 = this.getS3();
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: name,
      Body: fileBuffer,
    };

    return new Promise((res, rej) => {
      s3.upload(params, (err: Error, data: S3.ManagedUpload.SendData) => {
        if (err) {
          Logger.error(err);
          rej(err.message);
        }

        res(data);
      });
    });
  }

  deleteS3(name: string): Promise<Error | S3.DeleteObjectOutput> {
    const s3 = this.getS3();
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: name,
    };

    return new Promise((res, rej) => {
      s3.deleteObject(params, (err: Error, data: S3.DeleteObjectOutput) => {
        if (err) {
          Logger.error(err);
          rej(err.message);
        }

        res(data);
      });
    });
  }

  getS3(): S3 {
    return new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }
}
