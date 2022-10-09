import {Injectable} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {Config} from 'src/Config';
import {firstValueFrom} from 'rxjs';
import {IPriceList} from 'src/interface/IPriceList';

@Injectable()
export class TravelService {
    
    constructor(
        private readonly httpService: HttpService,
    ) { }

    async getPriceList(): Promise<IPriceList> {
        const url = Config.apiUrl;
        
        const response = await firstValueFrom(this.httpService.get(url));
        
        return response.data as IPriceList
    }
}
