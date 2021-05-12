import { createParamDecorator } from '@nestjs/common';


export const Subject = createParamDecorator((data, req) => req.args[0].user);
