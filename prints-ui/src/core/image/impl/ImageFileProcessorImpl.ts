import { injectable } from "tsyringe";
import { QueueProcessorImpl } from "../../common/impl/QueueProcessorImpl";

@injectable()
export class ImageFileProcessorImpl extends QueueProcessorImpl<File, string> {}