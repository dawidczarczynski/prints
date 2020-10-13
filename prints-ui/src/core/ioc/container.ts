import 'reflect-metadata';

import { container } from 'tsyringe';
import { UrlGeneratorImpl } from '../common/impl/UrlGeneratorImpl';
import { ImageBlobCacheImpl } from '../image/impl/ImageBlobCacheImpl';
import { ImageFileProcessorImpl } from '../image/impl/ImageFileProcessorImpl';
import { ImageServiceImpl } from '../image/impl/ImageServiceImpl';
import { ResizerImpl } from '../image/impl/ResizerImpl';
import { ThumbnailGeneratorImpl } from '../image/impl/ThumbnailGeneratorImpl';
import { TYPES } from './types';

container.register(TYPES.Resizer, { useClass: ResizerImpl });
container.register(TYPES.UrlGenerator, { useClass: UrlGeneratorImpl });
container.register(TYPES.ImageFileProcessor, { useClass: ImageFileProcessorImpl });
container.register(TYPES.ThumbnailGenerator, { useClass: ThumbnailGeneratorImpl });
container.register(TYPES.ImageBlobCache, { useClass: ImageBlobCacheImpl });
container.register(TYPES.ImageService, { useClass: ImageServiceImpl });

export { container };
