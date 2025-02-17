import { BadRequestException } from '@nestjs/common';
import * as sharp from 'sharp';

export async function validateImage(imagePath: string, minPixels = 500) {
  const imageMetadata = await sharp(imagePath).metadata();

  if (!imageMetadata.width || !imageMetadata.height) {
    throw new BadRequestException('Error al procesar la imagen.');
  }

  if (imageMetadata.width !== imageMetadata.height) {
    throw new BadRequestException(
      'La imagen debe tener una relación de aspecto cuadrada.',
    );
  }

  if (imageMetadata.width < minPixels || imageMetadata.height < minPixels) {
    throw new BadRequestException(
      `La imagen debe tener al menos ${minPixels}x${minPixels} píxeles.`,
    );
  }
}
