import { Logger, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Anime } from 'src/animes/animes.entity';
import { CreateAnimeDTO, UpdateAnimeDTO } from './animes.dto';
import { isNil } from 'lodash';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
type AnimeFile = Express.Multer.File;

@Injectable()
export class AnimesService {
  private s3: S3;
  private readonly logger = new Logger(AnimesService.name);
  constructor(
    @InjectRepository(Anime) private animeRepo: Repository<Anime>,
    private configService: ConfigService,
  ) {
    this.s3 = new S3({
      accessKeyId: this.configService.get('config.AWS.ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('config.AWS.SECRET_ACCESS_KEY'),
    });
  }

  public async create(
    payload: CreateAnimeDTO,
    file: AnimeFile,
  ): Promise<Anime> {
    if (!isNil(file)) {
      await this.saveFileToS3(file);
    }
    const newAnime = this.animeRepo.create(payload);
    return this.animeRepo.save(newAnime); //acción duplicada, quitar esta lines
  }

  private async saveFileToS3<T extends AnimeFile>(
    file: T,
  ): Promise<S3.ManagedUpload.SendData> {
    const params = {
      Bucket: this.configService.get('config.AWS.S3_BUCKET'),
      Key: file.filename,
      Body: file,
      ACL: 'public-read',
      ContentType: file.mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'ap-south-1',
      },
    };

    try {
      const s3Response = await this.s3.upload(params).promise();
      return s3Response;
    } catch (e) {
      this.logger.error(e);
    }
  }

  public findAll(): Promise<Anime[]> {
    return this.animeRepo.find();
  }

  public async findOne(id: string): Promise<Anime> {
    const anime = await this.animeRepo.findOne({
      where: { id: id },
    });

    if (!isNil(anime)) {
      throw new Error('Anime not found');
    }

    return anime;
  }

  public async update(id: string, changes: UpdateAnimeDTO): Promise<Anime> {
    const anime = await this.animeRepo.findOne({
      where: { id: id },
    });
    this.animeRepo.merge(anime, changes);
    return this.animeRepo.save(anime);
  }
}
