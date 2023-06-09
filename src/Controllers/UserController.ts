import { Controller, Param, getMetadataArgsStorage,Body, Get,JsonController, Post, Put, Delete } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi'

@JsonController('/users')
export default class UserController {
  @Get('/')
  getAll() {
    return 'This action returns all users';
  }

  @Get('/:id')
  getOne(@Param('id') id: number) {
    return 'This action returns user #' + id;
  }

  @Post('/new')
  newUser(@Body() user: any) {
    return 'Saving user...';
  }

  @Put('/:id')
  put(@Param('id') id: number, @Body() user: any) {
    return 'Updating a user...';
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    return 'Removing user...';
  }
}
