import aws from "aws-sdk";
import "dotenv-safe/config";
import { Arg, Field, Mutation, ObjectType, Resolver } from "type-graphql";
// process.env.DATABASE_URL,

@ObjectType()
class S3Response {
  @Field()
  signedRequest: string;
  @Field()
  url: string;
}

@Resolver()
export class S3Resolver {
  @Mutation(() => S3Response)
  async signS3(
    @Arg("filename") filename: string,
    @Arg("filetype") filetype: string
  ): Promise<S3Response> {
    const s3 = new aws.S3({
      signatureVersion: "v4",
      region: process.env.BUCKET_REGION,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    });

    const s3Params = {
      Bucket: process.env.BUCKET_NAME,
      Key: filename,
      Expires: 60, // valid for 60 seconds
      ContentType: filetype,
      ACL: "public-read",
    };

    const signedRequest = s3.getSignedUrl("putObject", s3Params);
    const url = `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${filename}`;

    return {
      signedRequest,
      url,
    };
  }
}
