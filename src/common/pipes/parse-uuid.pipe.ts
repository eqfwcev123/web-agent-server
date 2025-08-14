import {
	PipeTransform,
	Injectable,
	ArgumentMetadata,
	BadRequestException,
} from '@nestjs/common';
import { validate } from 'uuid';

@Injectable()
export class ParseUUIDPipe implements PipeTransform {
	transform(value: any, metadata: ArgumentMetadata) {
		if (!validate(value)) {
			throw new BadRequestException(
				`${metadata.data} must be a valid UUID`,
			);
		}
		return value;
	}
}
