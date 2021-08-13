import crypto from 'crypto';
import S3 from 'aws-sdk/clients/s3';
import { Request, Response, NextFunction } from 'express';

import { AWS_ACCESS_KEY_SECRET, AWS_ACCESS_KEY } from '../../../config/secrets';
import {
  S3_CONTENT_BUCKET,
  S3_CONTENT_LINK_EXPIRATION,
} from '../../../config/settings';
import logger from '../../../util/logger';

const s3 = new S3({
  credentials: {
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_ACCESS_KEY_SECRET,
  },
});

interface File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

interface Document {
  url: string;
  key: string;
}

export const upload = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const s3Requests = (req.files as File[]).map(async (file) => {
      const hash = crypto.createHash('md5').update(file.buffer).digest('hex');
      const key = `${req.user._id.toString()}/${hash}`;
      await s3
        .putObject({
          Body: file.buffer,
          Bucket: S3_CONTENT_BUCKET,
          Key: key,
          ContentType: file.mimetype,
        })
        .promise();

      return {
        url: s3.getSignedUrl('getObject', {
          Bucket: S3_CONTENT_BUCKET,
          Key: key,
          Expires: S3_CONTENT_LINK_EXPIRATION,
        }),
        key,
      };
    });

    const results = await Promise.all(s3Requests);

    res.status(201).json({
      data: results,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
