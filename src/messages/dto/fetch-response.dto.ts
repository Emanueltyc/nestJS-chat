import { Message } from '../message.entity';

export class MessageResponseDto {
    messages: Message[];
    total: number;
    limit: number;
    offset: number;

    constructor(
        messages: Message[],
        total: number,
        limit: number,
        offset: number,
    ) {
        this.messages = messages;
        this.total = total;
        this.limit = limit;
        this.offset = offset;
    }
}
