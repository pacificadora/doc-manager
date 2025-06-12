import {
    Controller,
    Get,
    Param,
    Post,
    Response,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import {
    ApiBearerAuth,
    ApiBody,
    ApiConsumes,
    ApiCreatedResponse,
    ApiExcludeEndpoint,
    ApiTags,
} from '@nestjs/swagger';
import { Response as ExpressResponse } from 'express';
import { Multer } from 'multer';

import { FileResponseDto } from './dto/file-response.dto';
import { FilesLocalService } from './files.service';

@ApiTags('files')
@Controller({
    path: 'files',
    version: '1',
})
export class FilesLocalController {
    constructor(private readonly filesService: FilesLocalService) { }

    @ApiCreatedResponse({
        type: FileResponseDto,
    })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post('upload')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
        @UploadedFile() file: Multer.File,
    ): Promise<FileResponseDto> {
        return this.filesService.create(file);
    }

    @Get(':path')
    @ApiExcludeEndpoint()
    download(
        @Param('path') path: string,
        @Response() response: ExpressResponse,
    ): void {
        return response.sendFile(path, { root: './files' });
    }
}