import { IsNumber, IsString } from 'class-validator';
import { Controller, Param,Body, Get,Post, Delete,JsonController } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi'


class VersionResponse {
  @IsString()
  app_name: string

  @IsNumber()
  version: number
}

@JsonController()
export default class AppController {
  @Get('/version/:zipcode')
  @ResponseSchema(VersionResponse,{statusCode:200,description:"This is a sample response for a 200"})
  @OpenAPI({
    summary: 'returns the app version',
    description:"the very long description of the get version api",
  })
  getVersion(@Param('zipcode') zipcode: string) {
    return 'hello'
  }

  @Post('/check_version/')
  checkVersion(@Body() body: any) {
    return 'Saving user...';
  }
}
