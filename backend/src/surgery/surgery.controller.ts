import { Body, Controller, Post } from '@nestjs/common';
import { CreateSurgeryDto } from './dto/surgery.dto';

@Controller({ path: 'surgery', version: '1' })
export class SurgeryController {
  constructor() {}

  // passar o id do usuário na rota
  // testar dto de sutura
  // revisar form de meniscectiomia pra ver se está certo

  @Post()
  async create(@Body() body: CreateSurgeryDto) {
    console.log('body:', body);
    return {
      ok: true,
    };
  }
}
