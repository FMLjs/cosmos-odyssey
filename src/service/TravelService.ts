import {Injectable} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {Config} from 'src/Config';
import {ConfigService} from '@nestjs/config';
import {firstValueFrom, map} from 'rxjs';
import {PriceList} from 'src/interface/PriceList';

@Injectable()
export class TravelService {
    
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
    ) { }

    async getPriceList(): Promise<PriceList> {
        const url = this.configService.get('COSMOS_ODYSSEY_URL');

        const response = await firstValueFrom(this.httpService.get(url));
        
        return response.data as PriceList
    }
}
