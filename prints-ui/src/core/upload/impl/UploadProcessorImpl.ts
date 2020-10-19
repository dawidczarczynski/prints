import { injectable } from "tsyringe";
import { QueueProcessorImpl } from "../../common/impl/QueueProcessorImpl";
import { ImageContainer } from "../../model/ImageContainer";
import { UploadProgressResult } from "./UploadProgress";

@injectable()
export class UploadProcessor extends QueueProcessorImpl<ImageContainer, UploadProgressResult> {}