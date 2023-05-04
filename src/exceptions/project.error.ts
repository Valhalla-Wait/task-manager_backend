import { NotFoundException } from '@nestjs/common';

export class ProjectError {
  static ProjectNotFound() {
    throw new NotFoundException('Проект не найден');
  }
}
