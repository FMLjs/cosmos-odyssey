import {Injectable} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {Config} from 'src/Config';
import {firstValueFrom} from 'rxjs';
import {PriceList} from 'src/interface/PriceList';

@Injectable()
export class TravelService {
    
    constructor(
        private readonly httpService: HttpService,
    ) { }

    async getPriceList(): Promise<PriceList> {
        const url = Config.apiUrl;
        
        const response = await firstValueFrom(this.httpService.get(url));
        
        return response.data as PriceList
    }
}
