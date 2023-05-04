import { BadRequestException, NotFoundException } from "@nestjs/common";

export class GroupError {
    static LeadNotMustBeMember() {
      throw new BadRequestException('Лидер не может быть участником');
    }
    static UserAlreadyLead() {
        throw new BadRequestException('Пользователь уже является лидером');
      }
    static GroupNotFound() {
      throw new NotFoundException('Группа не найдена');
    }
    static MemberIsAlreadyExists() {
      throw new BadRequestException('Пользователь уже есть в группе');
    }
  }