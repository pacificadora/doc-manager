import {
    Controller,
    Post,
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
    ApiTags,
} from '@nestjs/swagger';
import { FileResponseDto } from './dto/file-response.dto';
import { FilesS3Service } from './files.service';
import { Multer } from 'multer';

@ApiTags('files')
@Controller({
    path: 'files',
    version: '1',
})
export class FilesS3Controller {
    constructor(private readonly filesService: FilesS3Service) { }

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
        @UploadedFile() file: Multer.File & { bucket: string; key: string; location: string },
    ): Promise<FileResponseDto> {
        return this.filesService.create(file);
    }
}